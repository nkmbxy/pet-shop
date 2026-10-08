"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Pet, Status, Summary, api, auth } from "@/lib/api";
import {
  Alert,
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {
  Button,
  ConfirmDialog,
  Header,
  PetFormDialog,
  PetTable,
  SpeciesBar,
  SummaryStrip,
} from "@/components";

const STATUSES: Status[] = ["Available", "Reserved", "Sold"];

export default function DashboardPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [pets, setPets] = useState<Pet[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<Pet | "new" | null>(null);
  const [deletingPet, setDeletingPet] = useState<Pet | null>(null);
  const [deleting, setDeleting] = useState(false);
  const user = ready ? auth.user() : null;

  useEffect(() => {
    if (!auth.token()) router.replace("/login");
    else setReady(true);
  }, [router]);

  const load = useCallback(async () => {
    try {
      const [p, s] = await Promise.all([
        api.pets(search, status),
        api.summary(),
      ]);
      setPets(p);
      setSummary(s);
      setError("");
    } catch (e) {
      setError((e as Error).message);
    }
  }, [search, status]);

  useEffect(() => {
    if (!ready) return;
    const t = setTimeout(load, 250);
    return () => clearTimeout(t);
  }, [ready, load]);

  async function confirmDelete() {
    if (!deletingPet) return;
    setDeleting(true);
    try {
      await api.deletePet(deletingPet.id);
      setDeletingPet(null);
      await load();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setDeleting(false);
    }
  }

  function logout() {
    auth.clear();
    router.replace("/login");
  }

  if (!ready) return null;

  return (
    <>
      <Header userName={user?.fullName} onLogout={logout} />

      <main className="page">
        {error && (
          <Alert
            severity="error"
            sx={{ mb: 3, borderRadius: 2 }}
            onClose={() => setError("")}
          >
            {error}
          </Alert>
        )}

        <SummaryStrip summary={summary} />

        <SpeciesBar summary={summary} />

        <Box
          sx={{
            display: "flex",
            gap: { xs: 1.25, sm: 1.5 },
            flexWrap: "wrap",
            alignItems: "center",
            mb: { xs: 2, sm: 2.5 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: { xs: "100%", md: "auto" },
              mr: { xs: 0, md: "auto" },
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "1.35rem", sm: "1.6rem" },
              }}
            >
              Pets
            </Typography>
          </Box>

          <TextField
            size="small"
            placeholder="Search name, species or breed"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon
                      fontSize="small"
                      sx={{ color: "text.secondary" }}
                    />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              flex: { xs: "1 1 100%", sm: "1 1 220px", md: "0 0 260px" },
            }}
          />

          <FormControl
            size="small"
            sx={{
              flex: { xs: "1 1 calc(50% - 6px)", sm: "0 0 150px" },
            }}
          >
            <InputLabel id="toolbar-status-filter-label">Filter status</InputLabel>
            <Select
              labelId="toolbar-status-filter-label"
              id="toolbar-status-filter"
              value={status}
              label="Filter status"
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="">All statuses</MenuItem>
              {STATUSES.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setEditing("new")}
            sx={{
              flex: { xs: "1 1 calc(50% - 6px)", sm: "0 0 auto" },
              whiteSpace: "nowrap",
            }}
          >
            Add pet
          </Button>
        </Box>

        <PetTable
          pets={pets}
          onEdit={(p) => setEditing(p)}
          onDelete={(p) => setDeletingPet(p)}
        />
      </main>

      <PetFormDialog
        open={editing !== null}
        editing={editing}
        onClose={() => setEditing(null)}
        onSaved={load}
      />

      <ConfirmDialog
        open={deletingPet !== null}
        title="Delete Pet"
        message={
          <>
            Are you sure you want to delete <strong>{deletingPet?.name}</strong>?
            This action cannot be undone.
          </>
        }
        confirmText="Delete"
        cancelText="Cancel"
        confirmColor="error"
        confirmIcon={<DeleteOutlinedIcon />}
        loading={deleting}
        onConfirm={confirmDelete}
        onClose={() => !deleting && setDeletingPet(null)}
      />
    </>
  );
}

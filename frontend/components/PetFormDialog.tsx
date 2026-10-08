"use client";

import * as React from "react";
import {
  Alert,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Button from "./Button";
import { Pet, PetInput, Status, api } from "@/lib/api";

const SPECIES = ["Dog", "Cat", "Bird", "Rabbit", "Fish", "Other"];
const STATUSES: Status[] = ["Available", "Reserved", "Sold"];

const EMPTY: PetInput = {
  name: "",
  species: "Dog",
  breed: "",
  ageMonths: 0,
  price: 0,
  status: "Available",
};

export interface PetFormDialogProps {
  open: boolean;
  editing: Pet | "new" | null;
  onClose: () => void;
  onSaved: () => Promise<void> | void;
}

export function PetFormDialog({
  open,
  editing,
  onClose,
  onSaved,
}: PetFormDialogProps) {
  const [form, setForm] = React.useState<PetInput>(EMPTY);
  const [error, setError] = React.useState("");
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    if (editing === "new") {
      setForm(EMPTY);
      setError("");
    } else if (editing) {
      setForm({
        name: editing.name,
        species: editing.species,
        breed: editing.breed,
        ageMonths: editing.ageMonths,
        price: editing.price,
        status: editing.status,
      });
      setError("");
    }
  }, [editing]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (editing === "new") {
        await api.createPet(form);
      } else if (editing) {
        await api.updatePet(editing.id, form);
      }
      onClose();
      await onSaved();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog
      open={open}
      onClose={() => !saving && onClose()}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          m: { xs: 1.5, sm: 2 },
          width: { xs: "calc(100% - 24px)", sm: "auto" },
          borderRadius: { xs: 3, sm: 4 },
        },
      }}
    >
      <Box component="form" onSubmit={submit}>
        <DialogTitle
          sx={{
            fontSize: { xs: "1.2rem", sm: "1.4rem" },
            fontWeight: 700,
            px: { xs: 2.5, sm: 3 },
            py: { xs: 2, sm: 2.5 },
          }}
        >
          {editing === "new" ? "Add pet" : `Edit ${editing?.name}`}
        </DialogTitle>
        <DialogContent
          dividers
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2.25,
            px: { xs: 2.5, sm: 3 },
            py: { xs: 2, sm: 2.5 },
          }}
        >
          {error && (
            <Alert severity="error" sx={{ borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            required
            label="Name"
            id="pet-name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            slotProps={{ htmlInput: { maxLength: 60 } }}
            autoFocus
          />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2,
            }}
          >
            <FormControl fullWidth required>
              <InputLabel id="pet-species-label">Species</InputLabel>
              <Select
                labelId="pet-species-label"
                id="pet-species"
                value={form.species}
                label="Species"
                onChange={(e) => setForm({ ...form, species: e.target.value })}
              >
                {SPECIES.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Breed"
              id="pet-breed"
              value={form.breed}
              onChange={(e) => setForm({ ...form, breed: e.target.value })}
              slotProps={{ htmlInput: { maxLength: 60 } }}
              placeholder="e.g. Golden Retriever"
            />
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2,
            }}
          >
            <TextField
              fullWidth
              label="Age (months)"
              id="pet-age"
              type="number"
              value={form.ageMonths}
              onChange={(e) =>
                setForm({
                  ...form,
                  ageMonths: Math.max(0, Number(e.target.value)),
                })
              }
              slotProps={{ htmlInput: { min: 0, max: 600 } }}
            />

            <TextField
              fullWidth
              label="Price (฿)"
              id="pet-price"
              type="number"
              value={form.price}
              onChange={(e) =>
                setForm({
                  ...form,
                  price: Math.max(0, Number(e.target.value)),
                })
              }
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">฿</InputAdornment>
                  ),
                },
                htmlInput: { min: 0 },
              }}
            />
          </Box>

          <FormControl fullWidth required>
            <InputLabel id="pet-status-label">Status</InputLabel>
            <Select
              labelId="pet-status-label"
              id="pet-status"
              value={form.status}
              label="Status"
              onChange={(e) =>
                setForm({ ...form, status: e.target.value as Status })
              }
            >
              {STATUSES.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions
          sx={{
            px: { xs: 2.5, sm: 3 },
            py: 2,
            flexDirection: { xs: "column-reverse", sm: "row" },
            gap: { xs: 1, sm: 1.5 },
          }}
        >
          <Button
            variant="outlined"
            onClick={onClose}
            disabled={saving}
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            loading={saving}
            loadingText="Saving…"
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            Save pet
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

export default PetFormDialog;

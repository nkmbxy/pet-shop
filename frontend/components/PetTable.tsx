"use client";

import * as React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Pet } from "@/lib/api";
import Button from "./Button";
import StatusChip from "./StatusChip";

export interface PetTableProps {
  pets: Pet[];
  onEdit: (pet: Pet) => void;
  onDelete: (pet: Pet) => void;
}

const baht = (n: number) => `฿${n.toLocaleString("en-US")}`;
const plural = (n: number, unit: string) => `${n} ${unit}${n === 1 ? "" : "s"}`;
const age = (m: number) => {
  const years = Math.floor(m / 12);
  const months = m % 12;
  if (years === 0) return plural(months, "month");
  return months
    ? `${plural(years, "year")} ${plural(months, "month")}`
    : plural(years, "year");
};

export function PetTable({ pets, onEdit, onDelete }: PetTableProps) {
  if (pets.length === 0) {
    return (
      <Paper
        variant="outlined"
        sx={{
          p: { xs: 4, sm: 6 },
          textAlign: "center",
          color: "text.secondary",
          borderRadius: 3,
          borderColor: "divider",
          backgroundColor: "background.paper",
        }}
      >
        <Typography sx={{ fontWeight: 500 }}>
          No pets match. Add a pet or clear the search.
        </Typography>
      </Paper>
    );
  }

  return (
    <>
      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          flexDirection: "column",
          gap: 1.5,
        }}
      >
        {pets.map((p) => (
          <Paper
            key={p.id}
            variant="outlined"
            sx={{
              p: 2,
              borderRadius: 3,
              borderColor: "divider",
              backgroundColor: "background.paper",
              boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
              display: "flex",
              flexDirection: "column",
              gap: 1.25,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 1,
              }}
            >
              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: "1.05rem" }}>
                  {p.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {p.species} {p.breed ? `• ${p.breed}` : ""}
                </Typography>
              </Box>
              <StatusChip status={p.status} />
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                pt: 0.5,
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", fontSize: "0.85rem" }}
              >
                Age: <strong>{age(p.ageMonths)}</strong>
              </Typography>
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: "1.1rem",
                  color: "primary.main",
                }}
              >
                {baht(p.price)}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 1,
                pt: 1,
                borderTop: "1px solid",
                borderColor: "divider",
              }}
            >
              <Button
                variant="outlined"
                size="small"
                fullWidth
                startIcon={<EditOutlinedIcon />}
                onClick={() => onEdit(p)}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                size="small"
                fullWidth
                startIcon={<DeleteOutlinedIcon />}
                onClick={() => onDelete(p)}
              >
                Delete
              </Button>
            </Box>
          </Paper>
        ))}
      </Box>

      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{
          display: { xs: "none", sm: "block" },
          borderRadius: 3,
          borderColor: "divider",
          overflowX: "auto",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        }}
      >
        <Table sx={{ minWidth: 640 }}>
          <TableHead sx={{ bgcolor: "background.paper" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, color: "text.secondary" }}>
                Name
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: "text.secondary" }}>
                Species
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: "text.secondary" }}>
                Breed
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: "text.secondary" }}>
                Age
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: 600, color: "text.secondary" }}
              >
                Price
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: "text.secondary" }}>
                Status
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: 600, color: "text.secondary" }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pets.map((p) => (
              <TableRow key={p.id} hover>
                <TableCell sx={{ fontWeight: 600 }}>{p.name}</TableCell>
                <TableCell>{p.species}</TableCell>
                <TableCell>{p.breed || "—"}</TableCell>
                <TableCell>{age(p.ageMonths)}</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>
                  {baht(p.price)}
                </TableCell>
                <TableCell>
                  <StatusChip status={p.status} />
                </TableCell>
                <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<EditOutlinedIcon />}
                    onClick={() => onEdit(p)}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    startIcon={<DeleteOutlinedIcon />}
                    onClick={() => onDelete(p)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default PetTable;

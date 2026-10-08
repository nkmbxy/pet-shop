"use client";

import * as React from "react";
import { Box, Typography } from "@mui/material";
import { Summary } from "@/lib/api";

const COLORS = [
  "#0e5f6b",
  "#f4b63a",
  "#7aa7a1",
  "#b3382c",
  "#5b6e69",
  "#a9c9c4",
];

export interface SpeciesBarProps {
  summary: Summary | null;
}

export function SpeciesBar({ summary }: SpeciesBarProps) {
  if (!summary || summary.total <= 0) return null;

  return (
    <Box component="section" sx={{ my: { xs: 2.5, sm: 3 } }} aria-label="Pets by species">
      <Typography
        variant="h6"
        component="h3"
        sx={{
          fontSize: { xs: "1rem", sm: "1.1rem" },
          fontWeight: 700,
          mb: 1,
        }}
      >
        Pets by species
      </Typography>

      <Box
        role="img"
        aria-label="Pets by species chart"
        sx={{
          display: "flex",
          height: { xs: 10, sm: 14 },
          borderRadius: 999,
          overflow: "hidden",
          backgroundColor: "divider",
        }}
      >
        {summary.bySpecies.map((s, i) => (
          <Box
            key={s.species}
            component="span"
            sx={{
              display: "block",
              minWidth: 6,
              width: `${(s.count / summary.total) * 100}%`,
              backgroundColor: COLORS[i % COLORS.length],
            }}
          />
        ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: { xs: "0.4rem 1rem", sm: "0.5rem 1.5rem" },
          mt: 1.25,
          fontSize: { xs: "0.825rem", sm: "0.9rem" },
          color: "text.secondary",
        }}
      >
        {summary.bySpecies.map((s, i) => (
          <Box
            key={s.species}
            sx={{ display: "flex", alignItems: "center", gap: 0.75 }}
          >
            <Box
              component="span"
              sx={{
                width: 10,
                height: 10,
                borderRadius: 0.5,
                backgroundColor: COLORS[i % COLORS.length],
                display: "inline-block",
              }}
            />
            <span>
              {s.species} <strong>{s.count}</strong>
            </span>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default SpeciesBar;

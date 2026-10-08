"use client";

import * as React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { Summary } from "@/lib/api";

export interface SummaryStripProps {
  summary: Summary | null;
}

const LINE = "#dfe7e5";
const baht = (n: number) => `฿${n.toLocaleString("en-US")}`;

export function SummaryStrip({ summary }: SummaryStripProps) {
  const items = [
    {
      label: "Stock value (not sold)",
      value: baht(summary?.inventoryValue ?? 0),
      isPrimary: true,
      gridSpan: { xs: "span 2", sm: "span 1", md: "span 1" },
    },
    {
      label: "Available",
      value: (summary?.available ?? 0).toLocaleString(),
      isPrimary: false,
      gridSpan: { xs: "span 1", sm: "span 1", md: "span 1" },
    },
    {
      label: "Reserved",
      value: (summary?.reserved ?? 0).toLocaleString(),
      isPrimary: false,
      gridSpan: { xs: "span 1", sm: "span 1", md: "span 1" },
    },
    {
      label: "Sold",
      value: (summary?.sold ?? 0).toLocaleString(),
      isPrimary: false,
      gridSpan: { xs: "span 2", sm: "span 1", md: "span 1" },
    },
  ];

  return (
    <Paper
      variant="outlined"
      component="section"
      aria-label="Shop summary"
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr 1fr",
          sm: "1fr 1fr",
          md: "1.4fr 1fr 1fr 1fr",
        },
        borderRadius: { xs: 3, sm: 3 },
        overflow: "hidden",
        borderColor: "divider",
        backgroundColor: "background.paper",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      {items.map((item, idx) => (
        <Box
          key={item.label}
          sx={{
            p: { xs: 2, sm: 2.5, md: 3 },
            backgroundColor: item.isPrimary ? "primary.main" : "transparent",
            color: item.isPrimary ? "#ffffff" : "text.primary",
            borderLeft: {
              xs: idx === 1 || idx === 2 ? `1px solid ${LINE}` : "none",
              sm: idx % 2 === 1 ? `1px solid ${LINE}` : "none",
              md: idx > 0 ? `1px solid ${LINE}` : "none",
            },
            borderTop: {
              xs: idx >= 1 ? `1px solid ${LINE}` : "none",
              sm: idx >= 2 ? `1px solid ${LINE}` : "none",
              md: "none",
            },
            gridColumn: item.gridSpan,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              fontSize: { xs: "0.75rem", sm: "0.85rem" },
              fontWeight: 600,
              color: item.isPrimary ? "#bfe0e4" : "text.secondary",
              mb: 0.5,
              textTransform: "uppercase",
              letterSpacing: "0.03em",
            }}
          >
            {item.label}
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: item.isPrimary ? "1.6rem" : "1.4rem",
                sm: item.isPrimary ? "1.9rem" : "1.6rem",
                md: item.isPrimary ? "2.3rem" : "2rem",
              },
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            {item.value}
          </Typography>
        </Box>
      ))}
    </Paper>
  );
}

export default SummaryStrip;

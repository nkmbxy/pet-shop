"use client";

import * as React from "react";
import { Chip, ChipProps } from "@mui/material";
import { Status } from "@/lib/api";

const CONFIG: Record<Status, { bg: string; color: string; borderColor: string }> = {
  Available: {
    bg: "#dcf1e6",
    color: "#1f7a4d",
    borderColor: "#b6e3cd",
  },
  Reserved: {
    bg: "#fdf0cf",
    color: "#8a6200",
    borderColor: "#fae29f",
  },
  Sold: {
    bg: "#e4e8e7",
    color: "#5b6e69",
    borderColor: "#cfdcd8",
  },
};

export interface StatusChipProps extends Omit<ChipProps, "label"> {
  status: Status;
}

export function StatusChip({ status, sx, ...props }: StatusChipProps) {
  const style = CONFIG[status] ?? {
    bg: "#e4e8e7",
    color: "#5b6e69",
    borderColor: "#cfdcd8",
  };

  return (
    <Chip
      label={status}
      size="small"
      sx={{
        backgroundColor: style.bg,
        color: style.color,
        fontWeight: 600,
        fontStyle: "normal",
        fontSize: "0.8rem",
        border: `1px solid ${style.borderColor}`,
        borderRadius: "999px",
        ...sx,
      }}
      {...props}
    />
  );
}

export default StatusChip;

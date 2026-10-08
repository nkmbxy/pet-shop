"use client";

import * as React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Button from "./Button";

export interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: "error" | "primary" | "secondary" | "warning";
  confirmIcon?: React.ReactNode;
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "primary",
  confirmIcon,
  loading = false,
  onConfirm,
  onClose,
}: ConfirmDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={() => !loading && onClose()}
      maxWidth="xs"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          m: { xs: 2, sm: 2 },
          width: { xs: "calc(100% - 32px)", sm: "auto" },
          borderRadius: { xs: 3, sm: 4 },
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 700,
          fontSize: { xs: "1.15rem", sm: "1.25rem" },
          px: { xs: 2.5, sm: 3 },
          pt: { xs: 2.5, sm: 3 },
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent sx={{ px: { xs: 2.5, sm: 3 }, py: 1.5 }}>
        <DialogContentText sx={{ fontSize: { xs: "0.9rem", sm: "0.95rem" } }}>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          px: { xs: 2.5, sm: 3 },
          pb: { xs: 2.5, sm: 3 },
          flexDirection: { xs: "column-reverse", sm: "row" },
          gap: { xs: 1, sm: 1.5 },
        }}
      >
        <Button
          variant="outlined"
          onClick={onClose}
          disabled={loading}
          sx={{ width: { xs: "100%", sm: "auto" } }}
        >
          {cancelText}
        </Button>
        <Button
          variant="contained"
          color={confirmColor}
          onClick={onConfirm}
          loading={loading}
          loadingText={`${confirmText}…`}
          startIcon={confirmIcon}
          sx={{ width: { xs: "100%", sm: "auto" } }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;

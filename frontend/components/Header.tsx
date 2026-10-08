"use client";

import * as React from "react";
import { Box, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "./Button";
import PawIcon from "./PawIcon";

export interface HeaderProps {
  userName?: string;
  onLogout: () => void;
}

export function Header({ userName, onLogout }: HeaderProps) {
  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: { xs: 1, sm: 2 },
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 1.2, sm: 1.5 },
        backgroundColor: "primary.dark",
        color: "#ffffff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PawIcon size={18} />
        </Box>
        <Typography
          component="span"
          sx={{
            fontWeight: 800,
            fontSize: { xs: "1.15rem", sm: "1.35rem" },
            letterSpacing: "-0.02em",
          }}
        >
          Pet shop management system
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: 1, sm: 2 },
          fontSize: "0.9rem",
        }}
      >
        {userName && (
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              display: { xs: "none", sm: "inline-block" },
              color: "rgba(255,255,255,0.9)",
            }}
          >
            {userName}
          </Typography>
        )}
        <Button
          variant="outlined"
          size="small"
          startIcon={<LogoutIcon />}
          onClick={onLogout}
          sx={{
            color: "#ffffff",
            borderColor: "rgba(255,255,255,0.4)",
            px: { xs: 1.25, sm: 1.75 },
            py: 0.5,
            fontSize: { xs: "0.8rem", sm: "0.875rem" },
            "&:hover": {
              borderColor: "#ffffff",
              backgroundColor: "rgba(255,255,255,0.12)",
            },
          }}
        >
          Sign out
        </Button>
      </Box>
    </Box>
  );
}

export default Header;

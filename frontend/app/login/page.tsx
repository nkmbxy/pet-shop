"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api, auth } from "@/lib/api";
import {
  Alert,
  Box,
  Chip,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@/components/Button";
import PawIcon from "@/components/PawIcon";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (auth.token()) router.replace("/dashboard");
  }, [router]);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);
    const u = ((formData.get("username") as string) || username || "").trim();
    const p = (formData.get("password") as string) || password || "";

    if (!u || !p) {
      setError("Please enter both username and password.");
      setBusy(false);
      return;
    }

    try {
      const res = await api.login(u, p);
      auth.save(res);
      window.location.href = "/dashboard";
    } catch (err) {
      setError(
        err instanceof TypeError
          ? "Can't reach the server. Check that the API is running on http://localhost:5000."
          : (err as Error).message,
      );
      setBusy(false);
    }
  }

  function fillDemo() {
    setUsername("admin");
    setPassword("admin123");
  }

  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 2, sm: 3 },
        py: { xs: 3, sm: 4 },
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(14, 95, 107, 0.12) 0%, rgba(233, 240, 238, 0.8) 60%, #e9f0ee 100%)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -80,
          left: -80,
          color: "primary.main",
          opacity: 0.05,
          pointerEvents: "none",
          transform: "rotate(-20deg)",
          display: { xs: "none", sm: "block" },
        }}
      >
        <PawIcon size={320} />
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: -100,
          right: -80,
          color: "primary.main",
          opacity: 0.05,
          pointerEvents: "none",
          transform: "rotate(25deg)",
          display: { xs: "none", sm: "block" },
        }}
      >
        <PawIcon size={360} />
      </Box>

      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 440,
          p: { xs: 2.75, sm: 4.5 },
          borderRadius: { xs: 3, sm: 4 },
          backgroundColor: "#fbfdfc",
          border: "1px solid",
          borderColor: "divider",
          boxShadow:
            "0 20px 40px -15px rgba(14, 95, 107, 0.1), 0 1px 3px rgba(0, 0, 0, 0.04)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Box
            sx={{
              width: { xs: 50, sm: 58 },
              height: { xs: 50, sm: 58 },
              borderRadius: "50%",
              backgroundColor: "rgba(14, 95, 107, 0.1)",
              color: "primary.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 1.5,
              boxShadow: "inset 0 0 0 1px rgba(14, 95, 107, 0.15)",
            }}
          >
            <PawIcon size={28} />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              mb: 0.5,
            }}
          >
            <Typography
              variant="h5"
              component="h1"
              sx={{
                fontWeight: 800,
                color: "primary.main",
                letterSpacing: "-0.03em",
              }}
            >
              Pet shop management system
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              fontSize: { xs: "0.85rem", sm: "0.875rem" },
            }}
          >
            Every pet, every sale, one tidy place.
          </Typography>
        </Box>

        <Box
          onClick={fillDemo}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: { xs: 1.5, sm: 2 },
            py: 1.1,
            mb: 2.5,
            borderRadius: 2,
            backgroundColor: "rgba(14, 95, 107, 0.05)",
            border: "1px dashed",
            borderColor: "rgba(14, 95, 107, 0.25)",
            fontSize: "0.825rem",
            color: "text.secondary",
            cursor: "pointer",
            transition: "all 0.15s ease",
            "&:hover": {
              backgroundColor: "rgba(14, 95, 107, 0.1)",
              borderColor: "primary.main",
            },
          }}
          title="Click to fill demo credentials"
        >
          <span>Demo credentials:</span>
          <Box
            component="span"
            sx={{
              fontWeight: 700,
              color: "primary.main",
              fontFamily: "monospace",
              fontSize: "0.85rem",
            }}
          >
            admin / admin123
          </Box>
        </Box>

        {error && (
          <Alert
            severity="error"
            sx={{ mb: 2.5, borderRadius: 2 }}
            onClose={() => setError("")}
          >
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={submit} noValidate>
          <TextField
            fullWidth
            name="username"
            label="Username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
            margin="normal"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlinedIcon color="action" />
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextField
            fullWidth
            name="password"
            label="Password"
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            margin="normal"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            loading={busy}
            loadingText="Signing in…"
            startIcon={<LoginIcon />}
            sx={{
              mt: 3,
              py: 1.3,
              fontSize: "1rem",
              fontWeight: 700,
            }}
          >
            Sign in
          </Button>
        </Box>
      </Paper>

      <Typography
        variant="caption"
        sx={{
          mt: 3,
          color: "text.secondary",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
          fontSize: { xs: "0.75rem", sm: "0.8rem" },
        }}
      >
        Pet shop management system • Internal Staff Portal
      </Typography>
    </Box>
  );
}

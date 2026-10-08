import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#0e5f6b",
      dark: "#0a434c",
      light: "#3c7580",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#f4b63a",
      dark: "#d99b26",
      light: "#f7c768",
      contrastText: "#12231f",
    },
    error: {
      main: "#b3382c",
      light: "#fbe9e6",
    },
    success: {
      main: "#1f7a4d",
      light: "#dcf1e6",
    },
    warning: {
      main: "#8a6200",
      light: "#fdf0cf",
    },
    background: {
      default: "#e9f0ee",
      paper: "#fbfdfc",
    },
    text: {
      primary: "#12231f",
      secondary: "#5b6e69",
    },
    divider: "#cfdcd8",
  },
  typography: {
    fontFamily: '"Figtree", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontWeight: 800,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundColor: "#ffffff",
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#0e5f6b",
            borderWidth: 2,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
        },
      },
    },
  },
});

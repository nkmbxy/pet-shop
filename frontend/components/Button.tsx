"use client";

import * as React from "react";
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  CircularProgress,
} from "@mui/material";

export interface ButtonProps extends Omit<MuiButtonProps, "loading"> {
  loading?: boolean;
  loadingText?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      disabled,
      loading = false,
      loadingText,
      startIcon,
      sx,
      ...props
    },
    ref
  ) => {
    const spinnerSize =
      props.size === "small" ? 16 : props.size === "large" ? 22 : 18;

    const computedStartIcon = loading ? (
      <CircularProgress size={spinnerSize} color="inherit" />
    ) : (
      startIcon
    );

    return (
      <MuiButton
        ref={ref}
        disabled={disabled || loading}
        startIcon={computedStartIcon}
        sx={{
          borderRadius: 1,
          textTransform: "none",
          fontWeight: 600,
          fontFamily:
            '"Figtree", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
          ...sx,
        }}
        {...props}
      >
        {loading && loadingText ? loadingText : children}
      </MuiButton>
    );
  }
);

Button.displayName = "Button";

export default Button;

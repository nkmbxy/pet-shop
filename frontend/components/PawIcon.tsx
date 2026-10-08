"use client";

import * as React from "react";

export interface PawIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export function PawIcon({ size = 24, className, ...props }: PawIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="currentColor"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <ellipse cx="50" cy="66" rx="24" ry="20" />
      <ellipse cx="22" cy="40" rx="9" ry="12" />
      <ellipse cx="42" cy="26" rx="9" ry="13" />
      <ellipse cx="62" cy="26" rx="9" ry="13" />
      <ellipse cx="80" cy="40" rx="9" ry="12" />
    </svg>
  );
}

export default PawIcon;

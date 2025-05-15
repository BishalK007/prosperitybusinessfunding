import * as React from "react";

const ProsperityLogo = (props) => (
  <svg
    width={48}
    height={48}
    viewBox="0 0 48 48"
    fill="none"
    aria-label="Prosperity Logo"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <linearGradient id="prosperity-p-gradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0ab5a3" />
        <stop offset="1" stopColor="#067a6e" />
      </linearGradient>
    </defs>
    <path
      d="M8 6h14c7 0 11 4 11 10s-4 10-11 10h-7v12H8V6zm14 14c4 0 6-2 6-4s-2-4-6-4h-7v8h7z"
      fill="url(#prosperity-p-gradient)"
    />
  </svg>
);

export default ProsperityLogo;
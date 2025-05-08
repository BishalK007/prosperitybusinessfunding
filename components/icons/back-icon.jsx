"use client";
import * as React from "react";

const BackIcon = ({ className = "", ...props }) => (
  <span className={`inline-block ${className}`}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      width="40px"
      height="40px"
      viewBox="0 0 24 24"
      className="transition-transform transform group-hover:-translate-x-1"
      {...props}
    >
      <circle
        cx="12"
        cy="12"
        r="11"
        fill="currentColor" /* Use current text color */
        className="transition-colors group-hover:fill-lightGreen"
      />
      <path
        d="M13.707 16.293a1 1 0 0 1-1.414 1.414l-4-4a1 1 0 0 1 0-1.414l4-4a1 1 0 1 1 1.414 1.414L11.414 12l2.293 2.293z"
        fill="white" /* Arrow color */
        className="transition-colors group-hover:fill-gray-100"
      />
    </svg>
  </span>
);

export default BackIcon;
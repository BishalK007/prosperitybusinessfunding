import { cn } from "@/lib/utils";
import React from "react";

export function DotBackground({ className }) {
  return (
    <div
      className={cn(
        "fixed inset-0 w-full h-full z-0 pointer-events-none",
        className
      )}
    >
      <div
        className={cn(
          "absolute inset-0 bg-orange-100/50",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
        )}
      />
    </div>
  );
}
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
          "absolute inset-0 bg-Orange-100/50",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      <p className="relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text py-8 text-4xl font-bold text-transparent sm:text-7xl">
        
      </p>
    </div>
  );
}
import * as React from "react";

import { cn } from "@/lib/utils";

export function SiteBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none fixed inset-0 z-0", className)}
    >
      {/* Base */}
      <div className="absolute inset-0 bg-background" />

      {/* Global off-white tint (reduces “sterile white”) */}
      <div className="absolute inset-0 bg-primary/4 dark:bg-transparent" />

      {/* Slight brand tint (keeps white-first, but not sterile) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,oklch(var(--primary)/0.14),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,oklch(var(--primary)/0.16),transparent_55%)]" />

      {/* Texture: subtle dots */}
      <div className="absolute inset-0 opacity-[0.26] bg-[radial-gradient(oklch(var(--primary)/0.18)_0.6px,transparent_0.6px)] bg-size-[34px_34px] dark:opacity-[0.14] dark:bg-[radial-gradient(rgba(255,255,255,0.10)_0.6px,transparent_0.6px)]" />

      {/* Paper grain */}
      <div className="absolute inset-0 opacity-[0.12] [background-image:url('/paper-noise.svg')] bg-repeat mix-blend-soft-light dark:opacity-[0.07]" />

      {/* Texture: very soft grid (barely there) */}
      <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,oklch(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,oklch(var(--border))_1px,transparent_1px)] bg-size-[180px_180px] dark:opacity-[0.06]" />

      {/* Bottom warmth */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-primary/5 dark:to-primary/10" />
    </div>
  );
}



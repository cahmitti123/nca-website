import * as React from "react";

import { cn } from "@/lib/utils";
import { FullBleed } from "@/components/public/full-bleed";

export type BrandBandProps = React.PropsWithChildren<{
  /**
   * "primary": same vibe as the CTA band (primary background + white dot pattern).
   * "soft": subtle tint with the same dotted/radial treatment (keeps white-first feel).
   */
  variant?: "primary" | "soft";
  /**
   * When true, wraps children in a max-width container (`max-w-6xl`).
   * When false, children render full width (useful for full-width backgrounds like `BackgroundLines`).
   */
  contain?: boolean;
  className?: string;
  containerClassName?: string;
}>;

export function BrandBand({
  variant = "soft",
  contain = true,
  className,
  containerClassName,
  children,
}: BrandBandProps) {
  const isPrimary = variant === "primary";

  return (
    <FullBleed>
      <section
        className={cn(
          "relative overflow-hidden border-y",
          // Soft bands should be visible on white pages (not just a barely-there tint).
          isPrimary
            ? "bg-primary text-primary-foreground"
            : "bg-primary/10 dark:bg-primary/5",
          className,
        )}
      >
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 bg-size-[18px_18px]",
            isPrimary
              ? "opacity-35 bg-[radial-gradient(rgba(255,255,255,0.35)_1px,transparent_1px)]"
              : "opacity-55 bg-[radial-gradient(oklch(var(--primary)/0.28)_1px,transparent_1px)] dark:opacity-45 dark:bg-[radial-gradient(rgba(255,255,255,0.22)_1px,transparent_1px)]",
          )}
        />
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0",
            isPrimary
              ? "bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.25),transparent_55%)]"
              : "bg-[radial-gradient(circle_at_top,oklch(var(--primary)/0.16),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_60%)]",
          )}
        />

        {contain ? (
          <div
            className={cn(
              "mx-auto w-full max-w-6xl px-4 py-12 sm:py-16",
              containerClassName,
            )}
          >
            {children}
          </div>
        ) : (
          children
        )}
      </section>
    </FullBleed>
  );
}



import * as React from "react";

import { cn } from "@/lib/utils";

export type DotBackgroundProps = React.PropsWithChildren<{
  className?: string;
  patternClassName?: string;
  /**
   * Distance between dots in pixels.
   * @default 20
   */
  sizePx?: number;
}>;

export function DotBackground({
  children,
  className,
  patternClassName,
  sizePx = 20,
}: DotBackgroundProps) {
  return (
    <div className={cn("relative", className)}>
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 opacity-35 dark:opacity-25",
          // Our theme tokens are stored as `oklch(...)` values (see `app/globals.css`),
          // so using `hsl(var(--...))` produces incorrect colors.
          "[background-image:radial-gradient(oklch(var(--border))_1px,transparent_1px)]",
          patternClassName,
        )}
        style={{ backgroundSize: `${sizePx}px ${sizePx}px` }}
      />
      {children ? <div className="relative">{children}</div> : null}
    </div>
  );
}



import * as React from "react";

import { cn } from "@/lib/utils";

export type GridBackgroundProps = React.PropsWithChildren<{
  className?: string;
  patternClassName?: string;
  /**
   * Size of the grid cell in pixels.
   * @default 40
   */
  sizePx?: number;
}>;

export function GridBackground({
  children,
  className,
  patternClassName,
  sizePx = 40,
}: GridBackgroundProps) {
  return (
    <div className={cn("relative", className)}>
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 opacity-35 dark:opacity-25",
          // Our theme tokens are stored as `oklch(...)` values (see `app/globals.css`),
          // so using `hsl(var(--...))` produces incorrect colors.
          "[background-image:linear-gradient(to_right,oklch(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,oklch(var(--border))_1px,transparent_1px)]",
          patternClassName,
        )}
        style={{ backgroundSize: `${sizePx}px ${sizePx}px` }}
      />
      {children ? <div className="relative">{children}</div> : null}
    </div>
  );
}



import * as React from "react";

import { cn } from "@/lib/utils";

export function FullBleed({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={cn(
        // Full-bleed without extra math: center a `w-dvw` block relative to the parent.
        "relative left-1/2 w-dvw -translate-x-1/2",
        className
      )}
    >
      {children}
    </div>
  );
}



import * as React from "react";

import { cn } from "@/lib/utils";

export function FullBleed({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={cn(
        // Use margin-based full bleed instead of w-dvw to avoid scrollbar layout shifts/overflow
        "relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] w-[100vw]",
        className
      )}
    >
      {children}
    </div>
  );
}



import * as React from "react";

import { DotBackground } from "@/components/ui/dot-background";
import { cn } from "@/lib/utils";

export type SectionHeaderProps = React.PropsWithChildren<{
  kicker?: React.ReactNode;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  actionsClassName?: string;
  /**
   * Visual strength of the header gradient.
   * @default "soft"
   */
  variant?: "soft" | "strong";
  /**
   * Alignment for the main row (left content + actions).
   * @default "center"
   */
  align?: "center" | "start";
  className?: string;
}>;

export function SectionHeader({
  kicker,
  title,
  description,
  actions,
  actionsClassName,
  variant = "soft",
  align = "center",
  className,
  children,
}: SectionHeaderProps) {
  const from = variant === "strong" ? "from-primary/14" : "from-primary/12";
  const alignClass = align === "start" ? "sm:items-start" : "sm:items-center";

  return (
    <DotBackground
      sizePx={18}
      className={cn(
        "border-muted/60 bg-linear-to-br via-background to-background mb-8 overflow-hidden rounded-2xl border p-4 sm:p-6",
        from,
        className,
      )}
      patternClassName="opacity-60 text-primary/25 [background-image:radial-gradient(currentColor_1px,transparent_1px)] dark:opacity-35"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 text-primary/30 "
      />

      <div
        className={cn(
          "relative z-10 flex flex-col gap-3 sm:flex-row sm:justify-between",
          alignClass,
        )}
      >
        <div className="space-y-2">
          {kicker ? <div className="flex flex-wrap items-center gap-2">{kicker}</div> : null}
          <div className="space-y-1">
            <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
            {description ? (
              <p className="text-muted-foreground max-w-prose text-sm">{description}</p>
            ) : null}
          </div>
        </div>
        {actions ? (
          <div className={cn("flex flex-col gap-2 sm:flex-row", actionsClassName)}>{actions}</div>
        ) : null}
      </div>

      {children ? <div className="relative z-10 mt-4">{children}</div> : null}
    </DotBackground>
  );
}



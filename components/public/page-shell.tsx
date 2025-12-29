import * as React from "react";

import { cn } from "@/lib/utils";

export type PageShellProps = React.PropsWithChildren<{
  className?: string;
}>;

export function PageShell({ className, children }: PageShellProps) {
  return <div className={cn("space-y-8", className)}>{children}</div>;
}

export type PageIntroProps = {
  breadcrumbs?: React.ReactNode;
  kicker?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  /**
   * Text alignment + actions placement.
   * @default "start"
   */
  align?: "start" | "center";
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

export function PageIntro({
  breadcrumbs,
  kicker,
  title,
  description,
  actions,
  align = "start",
  className,
  titleClassName,
  descriptionClassName,
}: PageIntroProps) {
  const isCenter = align === "center";
  const rootClassName = cn("space-y-3", isCenter ? "text-center" : undefined, className);
  const innerClassName = cn(
    "flex flex-col gap-3",
    !isCenter ? "sm:flex-row sm:items-end sm:justify-between" : "items-center",
  );

  return (
    <div className={rootClassName}>
      {breadcrumbs ? (
        <div
          className={cn(
            "text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1 text-xs",
            isCenter ? "justify-center" : undefined,
          )}
        >
          {breadcrumbs}
        </div>
      ) : null}

      <div className={innerClassName}>
        <div className={cn("space-y-2", isCenter ? "mx-auto" : undefined)}>
          {kicker ? (
            <div className={cn("flex flex-wrap items-center gap-2", isCenter ? "justify-center" : undefined)}>
              {kicker}
            </div>
          ) : null}

          <h1
            className={cn(
              "font-heading text-balance text-3xl font-extrabold tracking-tight sm:text-4xl",
              titleClassName,
            )}
          >
            {title}
          </h1>

          {description ? (
            <div
              className={cn(
                "text-muted-foreground mx-auto max-w-2xl text-pretty text-sm leading-relaxed sm:text-base",
                !isCenter ? "mx-0 max-w-prose" : undefined,
                descriptionClassName,
              )}
            >
              {description}
            </div>
          ) : null}
        </div>

        {actions ? (
          <div className={cn("flex flex-col gap-2", isCenter ? "sm:flex-row" : "sm:flex-row")}>
            {actions}
          </div>
        ) : null}
      </div>
    </div>
  );
}



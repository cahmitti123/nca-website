import * as React from "react";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DotBackground } from "@/components/ui/dot-background";
import { GridBackground } from "@/components/ui/grid-background";
import { cn } from "@/lib/utils";

export type StickyRailLink = {
  label: string;
  href: string;
};

export type StickyRailProps = {
  title: string;
  links: readonly StickyRailLink[];
  /**
   * Adds a subtle pattern behind the rail.
   * @default "grid"
   */
  pattern?: "grid" | "dot" | "none";
  className?: string;
  /**
   * Max height for the scrollable link list. Defaults to fit most viewports.
   */
  maxHeightClassName?: string;
  footer?: React.ReactNode;
};

function RailSurface({
  pattern,
  children,
}: {
  pattern: NonNullable<StickyRailProps["pattern"]>;
  children: React.ReactNode;
}) {
  const surfaceClassName =
    "border-muted/60 bg-primary/5 overflow-hidden rounded-xl border";

  if (pattern === "dot") {
    return (
      <DotBackground
        sizePx={18}
        className={cn(surfaceClassName, "relative")}
        patternClassName="opacity-55 text-primary/20 [background-image:radial-gradient(currentColor_1px,transparent_1px)] dark:opacity-30"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 text-primary/25"
        />
        {children}
      </DotBackground>
    );
  }

  if (pattern === "grid") {
    return (
      <GridBackground
        sizePx={44}
        className={cn(surfaceClassName, "relative")}
        patternClassName="opacity-30 text-primary/15 [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] dark:opacity-20"
      >
        {children}
      </GridBackground>
    );
  }

  return <div className={cn(surfaceClassName, "relative")}>{children}</div>;
}

export function StickyRail({
  title,
  links,
  pattern = "grid",
  className,
  maxHeightClassName,
  footer,
}: StickyRailProps) {
  return (
    <div className={cn("sticky top-28 space-y-4", className)}>
      <RailSurface pattern={pattern}>
        <Card className="border-0 bg-transparent  shadow-none ring-0">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">{title}</CardTitle>
          </CardHeader>
          <CardContent className="">
            <div className="relative">
     

              <nav
                className={cn(
                  "grid gap-1 overflow-y-auto py-1 pr-2 [scrollbar-gutter:stable] max-h-[calc(100vh-22rem)]",
                  maxHeightClassName,
                )}
              >
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="hover:bg-primary/10 hover:text-foreground rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>
          </CardContent>
        </Card>
      </RailSurface>

      {footer ? <div>{footer}</div> : null}
    </div>
  );
}



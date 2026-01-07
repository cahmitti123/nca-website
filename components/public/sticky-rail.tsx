"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DotBackground } from "@/components/ui/dot-background";
import { GridBackground } from "@/components/ui/grid-background";
import { cn } from "@/lib/utils";

import {
  Newspaper,
  Users,
  Handshake,
  Info,
  Phone,
  Scale,
  Shield,
  Cookie,
  FileText,
  AlertCircle,
  Home,
  LayoutDashboard,
  FileCheck,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";

export type StickyRailLink = {
  label: string;
  href: string;
  iconName?: string;
};

export type StickyRailSection = {
  title?: string;
  links: readonly StickyRailLink[];
};

export type StickyRailProps = {
  title: string;
  links?: readonly StickyRailLink[];
  sections?: readonly StickyRailSection[];
  pattern?: "grid" | "dot" | "none";
  className?: string;
  maxHeightClassName?: string;
  footer?: React.ReactNode;
};

const ICON_MAP: Record<string, LucideIcon> = {
  Newspaper,
  Users,
  Handshake,
  Info,
  Phone,
  Scale,
  Shield,
  Cookie,
  FileText,
  AlertCircle,
  Home,
  LayoutDashboard,
  FileCheck,
};

function RailSurface({
  pattern,
  children,
}: {
  pattern: NonNullable<StickyRailProps["pattern"]>;
  children: React.ReactNode;
}) {
  const surfaceClassName =
    "border-muted/60 bg-primary/5 overflow-hidden rounded-md border";

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
  sections,
  pattern = "grid",
  className,
  maxHeightClassName,
  footer,
}: StickyRailProps) {
  const pathname = usePathname();
  const allSections: StickyRailSection[] = sections
    ? [...sections]
    : links
    ? [{ links }]
    : [];

  return (
    <div className={cn("sticky top-24 space-y-4", className)}>
      <RailSurface pattern={pattern}>
        <Card className="border-0 bg-transparent  shadow-none ring-0">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">{title}</CardTitle>
          </CardHeader>
          <CardContent className="">
            <div className="relative">
              <nav
                className={cn(
                  "overflow-y-auto py-1 pr-2 [scrollbar-gutter:stable] max-h-[calc(100vh-22rem)] space-y-4",
                  maxHeightClassName,
                )}
              >
                {allSections.map((section, idx) => (
                  <div key={section.title ?? idx} className="space-y-2">
                    {section.title ? (
                      <h4 className="text-muted-foreground px-3 text-xs font-semibold uppercase tracking-wider">
                        {section.title}
                      </h4>
                    ) : null}
                    <div className="grid gap-1">
                      {section.links.map((l) => {
                         const isActive = pathname === l.href || pathname.startsWith(`${l.href}/`);
                         const Icon = l.iconName ? ICON_MAP[l.iconName] : null;
                         return (
                          <Link
                            key={l.href}
                            href={l.href}
                            className={cn(
                                "group flex items-center justify-between rounded-md px-3 py-2 text-sm transition-all duration-200",
                                isActive 
                                  ? "bg-primary/10 text-primary font-semibold hover:bg-primary/15"
                                  : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
                            )}
                          >
                            <span className="flex items-center gap-2">
                                {Icon && <Icon className={cn("size-4", isActive ? "text-primary" : "text-muted-foreground/70 group-hover:text-foreground")} />}
                                {l.label}
                            </span>
                            {isActive && (
                                <ChevronRight className="size-4 opacity-50" />
                            )}
                          </Link>
                         );
                      })}
                    </div>
                  </div>
                ))}
              </nav>
            </div>
          </CardContent>
        </Card>
      </RailSurface>

      {/* Enhanced Footer Contact Card */}
      {footer ? (
        <div>{footer}</div>
      ) : (
         <div className="rounded-xl border border-muted/60 bg-card p-4 shadow-sm">
            <div className="flex items-center gap-3">
               <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Phone className="size-5" />
               </div>
               <div>
                  <div className="text-xs font-medium text-muted-foreground">Besoin d&apos;aide ?</div>
                  <a href="tel:0164074768" className="font-bold hover:underline text-sm block">01 64 07 47 68</a>
               </div>
            </div>
         </div>
      )}
    </div>
  );
}

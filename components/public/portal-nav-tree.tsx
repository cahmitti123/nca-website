"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { PORTAL_NAV, type PortalNavItem, normalizePathname } from "@/lib/portal/portal-nav";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronRight, FolderTree } from "lucide-react";

function isActiveLink(pathname: string, item: PortalNavItem) {
  if (!item.href) return false;
  const normalized = normalizePathname(pathname);
  const href = normalizePathname(item.href);
  const match = item.match ?? "exact";
  if (match === "prefix") return normalized.startsWith(href);
  return normalized === href;
}

function hasActiveDescendant(pathname: string, item: PortalNavItem): boolean {
  if (isActiveLink(pathname, item)) return true;
  if (!item.children?.length) return false;
  return item.children.some((child) => hasActiveDescendant(pathname, child));
}

function TreeLink({
  href,
  label,
  icon: Icon,
  isActive,
  onNavigate,
}: {
  href: string;
  label: string;
  icon?: PortalNavItem["icon"];
  isActive: boolean;
  onNavigate?: () => void;
}) {
  return (
    <Button
      variant={isActive ? "secondary" : "ghost"}
      size="sm"
      className="w-full justify-start gap-2"
      asChild
    >
      <Link href={href} onClick={onNavigate}>
        {Icon ? <Icon className="size-4" aria-hidden={true} /> : null}
        <span className="truncate">{label}</span>
      </Link>
    </Button>
  );
}

function TreeGroup({
  label,
  icon: Icon,
  isActive,
  defaultOpen,
  children,
}: {
  label: string;
  icon?: PortalNavItem["icon"];
  isActive: boolean;
  defaultOpen: boolean;
  children: React.ReactNode;
}) {
  return (
    <Collapsible defaultOpen={defaultOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant={isActive ? "secondary" : "ghost"}
          size="sm"
          className={cn("w-full justify-between group/portal-tree")}
          type="button"
        >
          <span className="flex min-w-0 items-center gap-2">
            {Icon ? <Icon className="size-4" aria-hidden={true} /> : null}
            <span className="truncate">{label}</span>
          </span>
          <ChevronRight
            className="size-4 shrink-0 transition-transform group-data-[state=open]/portal-tree:rotate-90"
            aria-hidden="true"
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="data-open:mt-1">
        <div className="border-muted/60 ml-3 space-y-1 border-l pl-3">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export function PortalNavTree({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const normalizedPathname = normalizePathname(pathname);

  function renderItem(item: PortalNavItem): React.ReactNode {
    const active = hasActiveDescendant(normalizedPathname, item);

    if (item.href) {
      return (
        <TreeLink
          key={item.href}
          href={item.href}
          label={item.label}
          icon={item.icon}
          isActive={isActiveLink(normalizedPathname, item)}
          onNavigate={onNavigate}
        />
      );
    }

    if (item.children?.length) {
      const defaultOpen = item.children.some((child) => hasActiveDescendant(normalizedPathname, child));
      return (
        <TreeGroup
          key={item.label}
          label={item.label}
          icon={item.icon ?? FolderTree}
          isActive={active}
          defaultOpen={defaultOpen}
        >
          {item.children.map((child) => renderItem(child))}
        </TreeGroup>
      );
    }

    return null;
  }

  return (
    <nav aria-label="Navigation du portail" className={cn("space-y-1", className)}>
      {PORTAL_NAV.map((item) => renderItem(item))}
    </nav>
  );
}



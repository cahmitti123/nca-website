import Link from "next/link";

import { IconLogout, IconMenu2 } from "@tabler/icons-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { requireAdmin } from "@/lib/auth/admin";

import { signOutAction } from "./actions";

export default async function AdminProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { profile, userEmail } = await requireAdmin();

  const navItems = [
    { href: "/admin", label: "Overview" },
    { href: "/admin/leads", label: "Leads" },
    { href: "/admin/blog", label: "Blog" },
    ...(profile.role === "admin" ? [{ href: "/admin/users", label: "Users" }] : []),
  ] as const;

  return (
    <div className="h-dvh overflow-hidden">
      <header className="bg-background/80 supports-[backdrop-filter]:bg-background/60 border-b backdrop-blur">
        <div className="flex h-14 items-center gap-3 px-4">
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon-sm" aria-label="Open menu">
                  <IconMenu2 />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel>Admin</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {navItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/">Back to site</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Link href="/admin" className="text-sm font-medium tracking-tight">
            Admin
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-muted-foreground hidden text-xs sm:block">
              {userEmail ?? profile.email}
            </span>
            <ThemeToggle />
            <form action={signOutAction}>
              <Button
                variant="ghost"
                size="icon-sm"
                type="submit"
                className="sm:hidden"
                aria-label="Sign out"
              >
                <IconLogout />
              </Button>
              <Button variant="ghost" size="sm" type="submit" className="hidden sm:inline-flex">
                Sign out
              </Button>
            </form>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100dvh-3.5rem)] overflow-hidden">
        <aside className="hidden w-60 shrink-0 border-r md:flex md:flex-col">
          <ScrollArea className="flex-1">
            <nav className="space-y-1 p-3">
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  asChild
                >
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              ))}
            </nav>
          </ScrollArea>
          <div className="border-t p-3">
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/">Back to site</Link>
            </Button>
          </div>
        </aside>

        <main className="min-w-0 flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="px-4 py-6 md:px-6">{children}</div>
          </ScrollArea>
        </main>
      </div>
    </div>
  );
}



"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { IconSearch, IconFileText, IconShieldCheck, IconPhone, IconHome } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { insuranceProducts } from "@/lib/insurance-products";

export function SiteCommandMenu({ ...props }: React.ComponentProps<typeof Button>) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-8 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-60 lg:w-64"
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className="hidden lg:inline-flex">Rechercher une solution...</span>
        <span className="inline-flex lg:hidden">Rechercher...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Tapez une commande ou recherchez..." />
        <CommandList>
          <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
          <CommandGroup heading="Assurances">
            {insuranceProducts.map((product) => (
              <CommandItem
                key={product.href}
                value={product.title}
                onSelect={() => {
                  runCommand(() => router.push(product.href));
                }}
              >
                <IconShieldCheck className="mr-2 size-4" />
                {product.title}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Agence">
            <CommandItem
              value="Accueil"
              onSelect={() => {
                runCommand(() => router.push("/"));
              }}
            >
              <IconHome className="mr-2 size-4" />
              Accueil
            </CommandItem>
             <CommandItem
              value="Qui sommes-nous"
              onSelect={() => {
                runCommand(() => router.push("/qui-sommes-nous"));
              }}
            >
              <IconFileText className="mr-2 size-4" />
              Qui sommes-nous
            </CommandItem>
            <CommandItem
              value="Contact"
              onSelect={() => {
                runCommand(() => router.push("/contactez-nous"));
              }}
            >
              <IconPhone className="mr-2 size-4" />
              Contactez-nous
            </CommandItem>
             <CommandItem
              value="Blog"
              onSelect={() => {
                runCommand(() => router.push("/blog"));
              }}
            >
              <IconFileText className="mr-2 size-4" />
              Actualités & Conseils
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

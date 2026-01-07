import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

export function BulletList({
  items,
  columns = 1,
  className,
}: {
  items: string[];
  columns?: 1 | 2;
  className?: string;
}) {
  return (
    <ul
      className={cn(
        "gap-y-2 gap-x-4",
        columns === 2 ? "grid sm:grid-cols-2" : "space-y-2",
        className
      )}
    >
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-sm leading-relaxed text-muted-foreground items-start">
          <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}



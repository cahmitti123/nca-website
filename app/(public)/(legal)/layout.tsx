import * as React from "react";

import { ContactCtaCard } from "@/components/public/contact-cta-card";
import { StickyRail } from "@/components/public/sticky-rail";
import { legalLinks } from "@/lib/public-links";

export default function LegalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="py-10 sm:py-12">
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <StickyRail
            title="Navigation rapide"
            links={legalLinks}
            pattern="dot"
            footer={
              <ContactCtaCard
                title="Besoin d’aide ?"
                description="Notre équipe vous répond rapidement."
              />
            }
          />
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}


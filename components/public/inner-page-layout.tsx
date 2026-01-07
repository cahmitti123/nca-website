import * as React from "react";

import { ContactCtaCard } from "@/components/public/contact-cta-card";
import { StickyRail, type StickyRailLink, type StickyRailSection } from "@/components/public/sticky-rail";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export type InnerPageLayoutProps = {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  sidebarLinks?: readonly StickyRailLink[];
  sidebarSections?: readonly StickyRailSection[]; // Added support for grouped links
  sidebarTitle?: string;
  sidebarFooter?: React.ReactNode;
  rightSidebar?: React.ReactNode;
  showContactCard?: boolean;
  className?: string;
};

export function InnerPageLayout({
  children,
  sidebar,
  sidebarLinks,
  sidebarSections,
  sidebarTitle = "Dans cette section",
  sidebarFooter,
  rightSidebar,
  showContactCard = true,
  className,
}: InnerPageLayoutProps) {
  return (
    <div className={cn("relative container mx-auto px-4 md:px-6", className)}>
      <div 
        className={cn(
          "grid grid-cols-1 gap-8 py-8 lg:py-12",
          rightSidebar 
            ? "lg:grid-cols-[16rem_1fr_16rem] xl:grid-cols-[18rem_1fr_18rem] lg:gap-10" 
            : "lg:grid-cols-[16rem_1fr] lg:gap-12 xl:grid-cols-[18rem_1fr]"
        )}
      >
        {/* Left Sidebar (Desktop) - Sticky */}
        <aside className="hidden lg:block sticky top-24 self-start pb-10">
          {sidebar ? (
            <div className="pr-4">{sidebar}</div>
          ) : sidebarLinks || sidebarSections ? (
            <StickyRail
              title={sidebarTitle}
              links={sidebarLinks}
              sections={sidebarSections}
              pattern="none"
              className="static"
              maxHeightClassName="max-h-none"
              footer={
                <div className="mt-8 space-y-6 pb-6">
                  {sidebarFooter}
                  {showContactCard ? (
                    <ContactCtaCard
                      title="Besoin d’aide ?"
                      description="Nos experts sont là pour vous."
                      className="bg-muted/30"
                      primaryAction={{
                        label: "Contactez-nous",
                        href: "/contactez-nous",
                        variant: "outline",
                      }}
                      secondaryAction={null}
                    />
                  ) : null}
                </div>
              }
            />
          ) : null}
        </aside>

        {/* Main Content */}
        <main className="min-w-0">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            {children}
          </div>
        </main>

        {/* Right Sidebar (Desktop) - Sticky */}
        {rightSidebar && (
          <aside className="hidden lg:block sticky top-24 self-start pb-10">
            <div className="pl-4">
              {rightSidebar}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}


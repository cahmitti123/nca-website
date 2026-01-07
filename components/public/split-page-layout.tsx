import * as React from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

export type SplitPageLayoutProps = {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  sidebarTitle?: string;
  className?: string;
  sidePanelClassName?: string;
  contentPanelClassName?: string;
};

export function SplitPageLayout({
  children,
  sidebar,
  sidebarTitle,
  className,
  sidePanelClassName,
  contentPanelClassName,
}: SplitPageLayoutProps) {
  return (
    <div className={cn("relative min-h-[calc(100vh-6rem)]", className)}>
      <div className="flex flex-col lg:flex-row">
        {/* Left Panel (Sidebar) */}
        <aside
          className={cn(
            "w-full lg:w-[24rem] xl:w-[28rem] lg:border-r bg-muted/20",
            sidePanelClassName
          )}
        >
          <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)]">
            <ScrollArea className="h-full">
              <div className="p-6 lg:p-10 space-y-8">
                {sidebarTitle && (
                  <h2 className="text-2xl font-bold tracking-tight text-foreground/90">
                    {sidebarTitle}
                  </h2>
                )}
                {sidebar}
              </div>
            </ScrollArea>
          </div>
        </aside>

        {/* Right Panel (Content) */}
        <main
          className={cn(
            "flex-1 min-w-0 bg-background",
            contentPanelClassName
          )}
        >
          <div className="p-6 lg:p-12 xl:p-16 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

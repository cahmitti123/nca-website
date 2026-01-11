import { InnerPageLayout, type InnerPageLayoutProps } from "@/components/public/inner-page-layout";
import { SplitPageLayout } from "@/components/public/split-page-layout";
import { StickyRail } from "@/components/public/sticky-rail";
import { PortalSidebar } from "@/components/public/portal-sidebar";
import { insuranceProducts } from "@/lib/insurance-products";
import { contentLinks, formLinks, legalLinks, marketingLinks } from "@/lib/public-links";

export type InnerSection = "content" | "forms" | "legal" | "marketing" | "products" | "portal";

// Helper to group product links
const groupedProductSections: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Véhicules",
    links: insuranceProducts
      .filter((p) => p.group === "vehicle")
      .map((p) => ({ label: p.title, href: p.href })),
  },
  {
    title: "Santé & Famille",
    links: insuranceProducts
      .filter((p) => p.group === "health")
      .map((p) => ({ label: p.title, href: p.href })),
  },
  {
    title: "Immobilier & Pro",
    links: insuranceProducts
      .filter((p) => p.group === "property")
      .map((p) => ({ label: p.title, href: p.href })),
  },
  {
    title: "Autre",
    links: insuranceProducts
      .filter((p) => p.group === "other")
      .map((p) => ({ label: p.title, href: p.href })),
  },
].filter((s) => s.links.length > 0);


type SectionConfig = Omit<InnerPageLayoutProps, "children">;

const SECTION_CONFIG: Record<InnerSection, SectionConfig> = {
  content: {
    sidebarLinks: contentLinks,
    sidebarTitle: "Ressources & Infos",
  },
  forms: {
    sidebarLinks: formLinks,
    sidebarTitle: "Démarches en ligne",
    showContactCard: false,
  },
  legal: {
    sidebarLinks: legalLinks,
    sidebarTitle: "Navigation rapide",
  },
  marketing: {
    sidebarLinks: marketingLinks,
    sidebarTitle: "Navigation",
  },
  products: {
    sidebarSections: groupedProductSections, // Use sections instead of flat links
    sidebarTitle: "Nos Assurances",
  },
  portal: {
    sidebar: <PortalSidebar />,
  },
};

export function InnerSectionLayout({
  section,
  children,
}: Readonly<{
  section: InnerSection;
  children: React.ReactNode;
}>) {
  const config = SECTION_CONFIG[section];

  if (section === "forms") {
    // Enhanced Split Layout for Forms
    return (
      <SplitPageLayout
        sidebarTitle={config.sidebarTitle}
        sidebar={
          <StickyRail
            title="Accès rapide"
            links={config.sidebarLinks || []}
            pattern="none"
            className="static"
            maxHeightClassName="max-h-none"
          />
        }
      >
        {children}
      </SplitPageLayout>
    );
  }

  return <InnerPageLayout {...config}>{children}</InnerPageLayout>;
}



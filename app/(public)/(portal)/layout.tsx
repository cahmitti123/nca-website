import * as React from "react";

import { InnerSectionLayout } from "@/components/public/inner-section-layout";

export default function PortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <InnerSectionLayout section="portal">{children}</InnerSectionLayout>;
}

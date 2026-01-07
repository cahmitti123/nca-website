import * as React from "react";

import { InnerSectionLayout } from "@/components/public/inner-section-layout";

export default function MarketingPagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <InnerSectionLayout section="marketing">{children}</InnerSectionLayout>;
}
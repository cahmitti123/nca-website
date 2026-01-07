import * as React from "react";

import { InnerSectionLayout } from "@/components/public/inner-section-layout";

export default function LegalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <InnerSectionLayout section="legal">{children}</InnerSectionLayout>;
}

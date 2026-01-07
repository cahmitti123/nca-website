import * as React from "react";

import { InnerSectionLayout } from "@/components/public/inner-section-layout";

export default function FormsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <InnerSectionLayout section="forms">{children}</InnerSectionLayout>;
}
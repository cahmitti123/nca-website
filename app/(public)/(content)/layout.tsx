import * as React from "react";

import { InnerSectionLayout } from "@/components/public/inner-section-layout";

export default function ContentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <InnerSectionLayout section="content">{children}</InnerSectionLayout>;
}

import * as React from "react";

import { InnerSectionLayout } from "@/components/public/inner-section-layout";

export default function ProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <InnerSectionLayout section="products">{children}</InnerSectionLayout>;
}

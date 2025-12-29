import * as React from "react";

export default function ProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="py-10 sm:py-12">
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </div>
  );
}


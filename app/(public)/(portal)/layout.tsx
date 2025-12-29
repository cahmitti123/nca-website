export default function PortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="py-10 sm:py-12">{children}</div>;
}



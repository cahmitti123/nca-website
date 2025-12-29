import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { SiteBackground } from "@/components/public/site-background";

export const metadata: Metadata = {
  title: "Net Courtage Assurances",
  description: "Courtier en assurances — Net Courtage Assurances (NCA).",
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-dvh">
      <SiteBackground />
      <div className="relative z-10 min-h-dvh">
        <Navbar />
        <main className="mx-auto w-full max-w-7xl px-4 pb-12">{children}</main>
        <Footer />
      </div>
    </div>
  );
}



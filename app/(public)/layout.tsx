import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

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
    <div className="min-h-dvh ">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 pb-10 ">{children}</main>
      <Footer />
    </div>
  );
}



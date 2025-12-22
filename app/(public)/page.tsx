import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import Blog from "@/components/blog";
import Contact from "@/components/contact";
import { CtaBand } from "@/components/cta-band";
import FAQ from "@/components/faq";
import Features from "@/components/features";
import Hero from "@/components/hero";
import HowItWorks from "@/components/how-it-works";
import InsuranceCarousel from "@/components/insurance-carousel";
import LogoCloud from "@/components/logo-cloud";
import Stats from "@/components/stats";
import Testimonials from "@/components/testimonials";
import { desc, eq } from "drizzle-orm";

export default async function PublicHomePage() {
  const latestPosts = await db
    .select({
      id: blogPosts.id,
      title: blogPosts.title,
      slug: blogPosts.slug,
      excerpt: blogPosts.excerpt,
      coverImageUrl: blogPosts.coverImageUrl,
      publishedAt: blogPosts.publishedAt,
    })
    .from(blogPosts)
    .where(eq(blogPosts.status, "published"))
    .orderBy(desc(blogPosts.publishedAt), desc(blogPosts.updatedAt))
    .limit(3);

  return (
    <div className="">
        <Hero />
        <CtaBand />
      <InsuranceCarousel />
      <HowItWorks />
      <LogoCloud />
      <Features />
      <Stats />
      <Testimonials />
      <Blog posts={latestPosts} />
      <FAQ />
      <Contact />
      </div>
  );
}



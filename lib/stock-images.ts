export const PEXELS_DEFAULT_LOCALE = "fr-FR" as const;
export const PEXELS_DEFAULT_REVALIDATE_SECONDS = 60 * 60 * 24 * 30;

export function pexelsBlogQueryForSlug(slug: string): string {
  const s = slug.toLowerCase();
  if (s.includes("mutuelle") || s.includes("sante")) return "health insurance consultation";
  if (s.includes("prevoyance")) return "family protection insurance";
  if (s.includes("emprunteur") || s.includes("credit") || s.includes("immobilier"))
    return "mortgage advisor house keys";
  if (s.includes("auto") || s.includes("voiture")) return "car keys driver";
  if (s.includes("moto")) return "motorcycle rider";
  if (s.includes("decennale") || s.includes("batiment") || s.includes("construction"))
    return "construction worker building site";
  return "insurance advisor meeting";
}



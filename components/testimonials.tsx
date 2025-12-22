import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { BrandBand } from "@/components/public/brand-band";
import { Star } from "lucide-react";

const animatedTestimonials = [
  {
    quote: "Des explications claires et une proposition adaptée à mon dossier.",
    name: "Client NCA",
    designation: "Assurance emprunteur",
    src: "/avatar-n.svg",
  },
  {
    quote: "Réactifs et disponibles. J’ai pu comparer plusieurs options rapidement.",
    name: "Client NCA",
    designation: "Mutuelle santé",
    src: "/avatar-c.svg",
  },
  {
    quote: "Un accompagnement simple, sans pression, avec des garanties bien expliquées.",
    name: "Client NCA",
    designation: "Assurance auto",
    src: "/avatar-a.svg",
  },
] as const;

const Testimonials = () => {
  return (
    <BrandBand variant="soft">
      <div className="space-y-10">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
        <div className="bg-background text-foreground flex size-11 items-center justify-center rounded-xl border">
          <Star className="size-5 text-primary" aria-hidden="true" />
        </div>
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Retours clients
          </h2>
          <p className="text-muted-foreground mx-auto max-w-prose text-sm leading-relaxed sm:text-base">
            Des exemples de retours. Nous mettrons en avant des avis vérifiés dès qu’ils seront
            disponibles.
          </p>
        </div>
        <div className="text-muted-foreground flex items-center justify-center gap-1 text-xs">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} className="size-3.5 fill-primary text-primary" aria-hidden="true" />
          ))}
          <span className="ml-2">Satisfaction client</span>
        </div>
      </div>

      <AnimatedTestimonials
        testimonials={[...animatedTestimonials]}
        autoplay
        className="border-muted/60 bg-background/60 backdrop-blur-sm rounded-2xl border p-4 sm:p-6"
      />
      </div>
    </BrandBand>
  );
};

export default Testimonials;



import { Separator } from "@/components/ui/separator";
import { insuranceProducts } from "@/lib/insurance-products";
import { siteContact } from "@/lib/site-contact";
import Link from "next/link";

const footerProductKeys = [
  "mutuelle-sante",
  "assurance-auto",
  "assurance-emprunteur",
  "assurance-moto",
  "assurance-prevoyance",
  "garantie-decennale",
] as const;

const footerProducts = footerProductKeys
  .map((key) => insuranceProducts.find((p) => p.key === key))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-primary-foreground/20 bg-primary text-primary-foreground">
      {/* Dotted pattern overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-35 bg-[radial-gradient(rgba(255,255,255,0.35)_1px,transparent_1px)] bg-size-[18px_18px]"
      />
      {/* Top radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.25),transparent_55%)]"
      />

      <div className="relative z-10 mx-auto grid max-w-6xl gap-8 px-4 py-10 text-sm md:grid-cols-3">
        <div className="space-y-2">
          <div className="text-xs font-medium tracking-tight">{siteContact.brandName}</div>
          <p className="text-primary-foreground/80 text-xs leading-relaxed">
            Courtier en assurance de référence depuis 2007. Nous proposons une large gamme de
            solutions d’assurance pour les particuliers et les professionnels. Contactez-nous pour
            obtenir un devis personnalisé.
          </p>
          <div className="text-primary-foreground/75 space-y-1 text-xs">
            <div>{siteContact.address}</div>
            <div>
              <a
                className="hover:text-primary-foreground transition-colors"
                href={`tel:${siteContact.phonePrimary.tel}`}
              >
                {siteContact.phonePrimary.display}
              </a>
            </div>
            <div>
              <a
                className="hover:text-primary-foreground transition-colors"
                href={`tel:${siteContact.phoneSecondary.tel}`}
              >
                {siteContact.phoneSecondary.display}
              </a>
            </div>
            <div>
              <a
                className="hover:text-primary-foreground transition-colors"
                href={`mailto:${siteContact.email}`}
              >
                {siteContact.email}
              </a>
            </div>
            <div>{siteContact.hours.display}</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-medium tracking-tight">Plus sur NCA</div>
          <ul className="text-primary-foreground/75 space-y-1 text-xs">
            <li>
              <Link className="hover:text-primary-foreground transition-colors" href="/qui-sommes-nous">
                Qui sommes-nous
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary-foreground transition-colors" href="/gerer-les-cookies">
                Gérer les cookies
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-primary-foreground transition-colors"
                href="/politique-de-confidentialite"
              >
                Politique de confidentialité
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary-foreground transition-colors" href="/mentions-legales-cgu">
                Mentions légales – CGU
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-primary-foreground transition-colors"
                href="/services-clients-reclamations"
              >
                Services clients & réclamations
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-primary-foreground transition-colors"
                href="/demander-un-devis"
              >
                Demander un devis
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary-foreground transition-colors" href="/blog">
                Nos articles
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-medium tracking-tight">Nos assurances</div>
          <ul className="text-primary-foreground/75 space-y-1 text-xs">
            {footerProducts.map((p) => (
              <li key={p.key}>
                <Link className="hover:text-primary-foreground transition-colors" href={p.href}>
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Separator className="bg-primary-foreground/20" />

      <div className="relative z-10 text-primary-foreground/75 mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} Net Courtage Assurances</span>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <Link className="hover:text-primary-foreground transition-colors" href="/espace-juridique">
            Espace juridique
          </Link>
          <a
            className="hover:text-primary-foreground transition-colors"
            href="https://www.facebook.com/Netcourtageassurances"
            target="_blank"
            rel="noreferrer"
          >
            Facebook
          </a>
          <a
            className="hover:text-primary-foreground transition-colors"
            href="https://www.pinterest.fr/netcourtageassurances/"
            target="_blank"
            rel="noreferrer"
          >
            Pinterest
          </a>
          <a
            className="hover:text-primary-foreground transition-colors"
            href="https://www.linkedin.com/company/netcourtageassurances/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a
            className="hover:text-primary-foreground transition-colors"
            href="https://www.instagram.com/netcourtageassurances/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
          <a
            className="hover:text-primary-foreground transition-colors"
            href="https://www.youtube.com/@NetCourtageAssurances"
            target="_blank"
            rel="noreferrer"
          >
            YouTube
          </a>
          <Link className="hover:text-primary-foreground transition-colors" href="/admin">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;



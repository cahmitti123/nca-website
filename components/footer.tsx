import { Separator } from "@/components/ui/separator";
import { siteContact } from "@/lib/site-contact";
import Link from "next/link";

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
            Courtier en assurance de référence. Demandez un devis gratuit et sans engagement.
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
                href="/contact-reclamations/demande"
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
            <li>
              <Link
                className="hover:text-primary-foreground transition-colors"
                href="/sante-prevoyance/mutuelle-sante"
              >
                Mutuelle Santé
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary-foreground transition-colors" href="/assurance-auto">
                Assurance Auto
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary-foreground transition-colors" href="/assurance-emprunteur">
                Assurance Emprunteur
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary-foreground transition-colors" href="/assurance-moto">
                Assurance Moto
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-primary-foreground transition-colors"
                href="/sante-prevoyance/prevoyance"
              >
                Assurance Prévoyance
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary-foreground transition-colors" href="/garantie-decennale">
                Garantie Décennale
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <Separator className="bg-primary-foreground/20" />

      <div className="relative z-10 text-primary-foreground/75 mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} Net Courtage Assurances</span>
        <div className="flex items-center gap-3">
          <Link className="hover:text-primary-foreground transition-colors" href="/admin">
            Admin
          </Link>
          <Link className="hover:text-primary-foreground transition-colors" href="/espace-juridique">
            Espace juridique
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;



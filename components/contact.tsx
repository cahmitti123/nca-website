import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
import { siteContact } from "@/lib/site-contact";
import {
  MailIcon,
  MapPinIcon,
  MessageCircle,
  PhoneIcon,
  Timer,
} from "lucide-react";
import Link from "next/link";

const Contact = () => (
  <section className="relative w-full overflow-hidden rounded-3xl border border-muted/60 bg-primary dark:bg-transparent">
    <div className="absolute inset-0 z-0">
      <DottedGlowBackground
        opacity={0.4}
        color="rgba(255, 255, 255, 0.2)"
        darkColor="rgba(255, 255, 255, 0.1)"
        glowColor="rgba(255, 255, 255, 0.5)"
      />
    </div>
    <div className="relative z-10 px-6 py-16 sm:px-10 md:py-24">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
        <div className="bg-primary-foreground/10 text-primary-foreground flex size-11 items-center justify-center rounded-xl border border-primary-foreground/20 dark:bg-background dark:text-foreground dark:border-border">
          <MessageCircle className="size-5" aria-hidden="true" />
        </div>
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl text-primary-foreground dark:text-foreground">
            Nous contacter
          </h2>
          <p className="mx-auto max-w-prose text-sm leading-relaxed sm:text-base text-primary-foreground/80 dark:text-muted-foreground">
            Une question, un devis, ou une réclamation ? Nous vous répondons
            rapidement.
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground backdrop-blur-sm rounded-xl border p-4 transition-colors hover:bg-primary-foreground/20 dark:bg-background/60 dark:border-muted/60 dark:text-foreground dark:hover:bg-background/80">
          <div className="flex items-center gap-3">
            <div className="bg-primary-foreground/20 flex size-9 items-center justify-center rounded-md border border-primary-foreground/20 dark:bg-background dark:border-border dark:text-foreground">
              <MailIcon className="size-4" />
            </div>
            <div className="text-sm font-medium">Email</div>
          </div>
          <p className="mt-3 text-sm opacity-90">{siteContact.email}</p>
          <Link
            className="mt-2 inline-block text-xs transition-opacity hover:opacity-100 opacity-80 underline decoration-dotted underline-offset-4"
            href={`mailto:${siteContact.email}`}
          >
            Écrire un email
          </Link>
        </div>

        <div className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground backdrop-blur-sm rounded-xl border p-4 transition-colors hover:bg-primary-foreground/20 dark:bg-background/60 dark:border-muted/60 dark:text-foreground dark:hover:bg-background/80">
          <div className="flex items-center gap-3">
            <div className="bg-primary-foreground/20 flex size-9 items-center justify-center rounded-md border border-primary-foreground/20 dark:bg-background dark:border-border dark:text-foreground">
              <MapPinIcon className="size-4" />
            </div>
            <div className="text-sm font-medium">Adresse</div>
          </div>
          <p className="mt-3 text-sm opacity-90">{siteContact.address}</p>
          <Link
            className="mt-2 inline-block text-xs transition-opacity hover:opacity-100 opacity-80 underline decoration-dotted underline-offset-4"
            href={siteContact.mapsUrl}
            target="_blank"
            rel="noreferrer"
          >
            Ouvrir dans Google Maps
          </Link>
        </div>

        <div className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground backdrop-blur-sm rounded-xl border p-4 transition-colors hover:bg-primary-foreground/20 dark:bg-background/60 dark:border-muted/60 dark:text-foreground dark:hover:bg-background/80">
          <div className="flex items-center gap-3">
            <div className="bg-primary-foreground/20 flex size-9 items-center justify-center rounded-md border border-primary-foreground/20 dark:bg-background dark:border-border dark:text-foreground">
              <PhoneIcon className="size-4" />
            </div>
            <div className="text-sm font-medium">Téléphone</div>
          </div>
          <div className="mt-3 space-y-1 text-sm opacity-90">
            <div>{siteContact.phonePrimary.display}</div>
            <div>{siteContact.phoneSecondary.display}</div>
          </div>
          <div className="mt-2 flex flex-wrap gap-3">
            <Link
              className="inline-block text-xs transition-opacity hover:opacity-100 opacity-80 underline decoration-dotted underline-offset-4"
              href={`tel:${siteContact.phonePrimary.tel}`}
            >
              Appeler {siteContact.phonePrimary.display}
            </Link>
            <Link
              className="inline-block text-xs transition-opacity hover:opacity-100 opacity-80 underline decoration-dotted underline-offset-4"
              href={`tel:${siteContact.phoneSecondary.tel}`}
            >
              Appeler {siteContact.phoneSecondary.display}
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs text-primary-foreground/80 dark:text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <Timer className="size-4" aria-hidden="true" />
          Horaires : {siteContact.hours.display}
        </span>
        <span aria-hidden="true">·</span>{" "}
        <Link
          className="transition-opacity hover:opacity-100 opacity-80 underline decoration-dotted underline-offset-4"
          href="/contact-reclamations/demande"
        >
          Demander un devis en ligne
        </Link>
      </div>
    </div>
  </section>
);

export default Contact;

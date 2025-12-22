import * as dotenv from "dotenv";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { eq } from "drizzle-orm";

import { blogPosts } from "../db/schema";

type SeedPost = {
  title: string;
  slug: string;
  excerpt: string;
  coverImageUrl: string | null;
  publishedAt: string; // ISO string
  contentHtml: string;
};

type SeedOptions = {
  dryRun: boolean;
  overwrite: boolean;
};

function parseOptions(argv: readonly string[]): SeedOptions {
  const args = new Set(argv);
  return {
    dryRun: args.has("--dry-run"),
    overwrite: args.has("--overwrite"),
  };
}

function getDatabaseUrl(): string {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL is not set. Add it to .env.local before running db:seed.",
    );
  }
  return databaseUrl;
}

function createDb(databaseUrl: string) {
  const isLocal =
    databaseUrl.includes("localhost") || databaseUrl.includes("127.0.0.1");

  const sql = postgres(databaseUrl, {
    // Keep consistent with our app runtime (Supabase pooler transaction mode).
    prepare: false,
    ...(isLocal ? {} : { ssl: "require" as const }),
  });

  const db = drizzle(sql, { schema: { blogPosts } });
  return { db, sql };
}

const posts: readonly SeedPost[] = [
  {
    title: "Assurance emprunteur : comment changer facilement (et quand comparer)",
    slug: "assurance-emprunteur-changer-facilement",
    excerpt:
      "Changer d’assurance emprunteur peut réduire le coût total de votre crédit. Voici les étapes simples pour comparer, préparer votre dossier et basculer sans stress.",
    coverImageUrl: "/cover-emprunteur.svg",
    publishedAt: "2025-12-05T09:00:00.000Z",
    contentHtml: `
      <p>Lorsque vous souscrivez un crédit immobilier, l’assurance emprunteur pèse souvent lourd dans le budget total. Bonne nouvelle : il est souvent possible de <strong>comparer</strong> et d’<strong>optimiser</strong> votre couverture, tout en gardant des garanties cohérentes avec votre situation.</p>

      <h2>Pourquoi comparer ?</h2>
      <ul>
        <li><strong>Coût global</strong> : sur la durée du prêt, une différence de tarif peut représenter un montant significatif.</li>
        <li><strong>Garanties</strong> : vous pouvez ajuster les options (incapacité, invalidité, etc.) à votre profil.</li>
        <li><strong>Lisibilité</strong> : un conseiller peut vous aider à comprendre les exclusions, délais de franchise et conditions.</li>
      </ul>

      <h2>Les étapes (simplement)</h2>
      <ol>
        <li><strong>Faites le point</strong> : type de prêt, quotité, garanties exigées par la banque.</li>
        <li><strong>Comparez</strong> : tarifs, garanties, exclusions, délais, franchises.</li>
        <li><strong>Préparez le dossier</strong> : informations de prêt + éléments médicaux/administratifs si nécessaires.</li>
        <li><strong>Validez l’équivalence</strong> : la banque doit retrouver un niveau de garanties cohérent avec ses exigences.</li>
        <li><strong>Basculez</strong> : une fois accepté, la nouvelle assurance remplace l’ancienne.</li>
      </ol>

      <h2>Checklist rapide</h2>
      <ul>
        <li>Montant du prêt et durée</li>
        <li>Tableau d’amortissement (si disponible)</li>
        <li>Garanties demandées (décès, PTIA, IPT/ITT…)</li>
        <li>Infos sur votre situation (âge, profession, sport, fumeur/non-fumeur)</li>
      </ul>

      <h2>Besoin d’aide ?</h2>
      <p>Chez NCA, on vous accompagne pour clarifier les garanties et comparer des solutions adaptées à votre projet.</p>
      <p><a href="/assurance-emprunteur">Découvrir l’assurance emprunteur</a> · <a href="/contact-reclamations/demande">Demander un devis</a></p>

      <hr />
      <p><em>Informations générales à visée informative. Pour une recommandation adaptée, contactez un conseiller.</em></p>
    `.trim(),
  },
  {
    title: "Mutuelle santé : 7 critères pour choisir une couverture adaptée",
    slug: "mutuelle-sante-criteres-choix",
    excerpt:
      "Niveau de remboursement, hospitalisation, optique/dentaire, délais de carence… Voici 7 critères concrets pour choisir une mutuelle santé sans se tromper.",
    coverImageUrl: "/cover-sante.svg",
    publishedAt: "2025-12-06T09:00:00.000Z",
    contentHtml: `
      <p>Choisir une mutuelle santé ne se résume pas à “prendre la moins chère”. L’objectif est de trouver un équilibre entre <strong>besoins réels</strong> et <strong>budget</strong>.</p>

      <h2>1) L’hospitalisation</h2>
      <p>Regardez la prise en charge des frais d’hospitalisation (chambre particulière, honoraires, forfait journalier). C’est souvent le poste le plus impactant.</p>

      <h2>2) Les soins courants</h2>
      <p>Consultations, analyses, médicaments : vérifiez les niveaux de remboursement et la cohérence avec votre fréquence de soins.</p>

      <h2>3) Optique & dentaire</h2>
      <p>Ce sont des postes très variables. Comparez les plafonds, les paniers et les conditions (renouvellement, équipements).</p>

      <h2>4) Les délais de carence</h2>
      <p>Certains contrats appliquent un délai avant que certaines garanties ne s’activent. À vérifier si vous avez un besoin immédiat.</p>

      <h2>5) Les exclusions</h2>
      <p>Un tarif attractif peut cacher des exclusions importantes. Lisez les conditions (ou faites-vous accompagner).</p>

      <h2>6) Les services</h2>
      <ul>
        <li>Téléconsultation</li>
        <li>Réseau de soins</li>
        <li>Assistance (aide à domicile, etc.)</li>
      </ul>

      <h2>7) Le budget mensuel… sur l’année</h2>
      <p>Comparez le coût total sur 12 mois et la stabilité de la cotisation (selon l’âge, la situation, etc.).</p>

      <p><a href="/sante-prevoyance/mutuelle-sante">Voir notre page Mutuelle Santé</a> · <a href="/contact-reclamations/demande">Demander un devis</a></p>
      <hr />
      <p><em>Conseils généraux. Un devis personnalisé permet de comparer sur votre profil.</em></p>
    `.trim(),
  },
  {
    title: "Garantie décennale : à quoi sert-elle (et qui est concerné) ?",
    slug: "garantie-decennale-obligation",
    excerpt:
      "La garantie décennale protège pendant 10 ans après la réception des travaux. Découvrez ce qu’elle couvre, les obligations et les bonnes pratiques côté pro.",
    coverImageUrl: "/cover-decennale.svg",
    publishedAt: "2025-12-07T09:00:00.000Z",
    contentHtml: `
      <p>La garantie décennale est une assurance incontournable dans le bâtiment. Elle vise à protéger le client contre certains dommages pouvant affecter l’ouvrage.</p>

      <h2>Ce que couvre (en général) la décennale</h2>
      <ul>
        <li>Dommages compromettant la solidité de l’ouvrage</li>
        <li>Dommages rendant l’ouvrage impropre à sa destination</li>
      </ul>

      <h2>Durée</h2>
      <p>La protection s’étend sur <strong>10 ans</strong> à compter de la réception des travaux (dans les conditions prévues au contrat).</p>

      <h2>Pourquoi l’attestation est importante</h2>
      <p>Elle rassure vos clients et sécurise vos chantiers. Elle est souvent demandée dès l’ouverture du chantier et lors des devis.</p>

      <h2>Nos conseils</h2>
      <ul>
        <li>Déclarez précisément votre activité (lots / métiers)</li>
        <li>Vérifiez les franchises et exclusions</li>
        <li>Gardez une copie de l’attestation à jour</li>
      </ul>

      <p><a href="/garantie-decennale">Découvrir la garantie décennale</a> · <a href="/contact-reclamations/demande">Demander un devis</a></p>
      <hr />
      <p><em>Article informatif. La couverture exacte dépend de votre contrat et de votre activité déclarée.</em></p>
    `.trim(),
  },
  {
    title: "Assurance auto : tiers, tiers +, tous risques — comment choisir ?",
    slug: "assurance-auto-tiers-tous-risques",
    excerpt:
      "Tiers ou tous risques ? Le bon choix dépend de votre véhicule, de votre usage et de votre budget. Voici une méthode simple pour décider.",
    coverImageUrl: "/cover-auto.svg",
    publishedAt: "2025-12-08T09:00:00.000Z",
    contentHtml: `
      <p>Le niveau de protection en assurance auto doit correspondre à votre véhicule et à votre usage. Voici une façon simple d’y voir clair.</p>

      <h2>Tiers</h2>
      <p>Le tiers couvre généralement la responsabilité civile : les dommages causés à autrui. C’est souvent adapté à un véhicule ancien ou à faible valeur.</p>

      <h2>Tiers + (ou intermédiaire)</h2>
      <p>On ajoute généralement des garanties comme vol, incendie, bris de glace (selon contrat). C’est un bon compromis.</p>

      <h2>Tous risques</h2>
      <p>Protection plus complète, utile si votre véhicule a une valeur importante ou si vous roulez beaucoup.</p>

      <h2>3 questions pour choisir</h2>
      <ul>
        <li>Quelle est la valeur de mon véhicule (revente/remplacement) ?</li>
        <li>Quel est mon usage (kilométrage, stationnement, trajet) ?</li>
        <li>Quelle franchise suis-je prêt à assumer en cas de sinistre ?</li>
      </ul>

      <p><a href="/assurance-auto">Découvrir l’assurance auto</a> · <a href="/contact-reclamations/demande">Demander un devis</a></p>
    `.trim(),
  },
  {
    title: "Prévoyance : à quoi ça sert (et pourquoi ce n’est pas une mutuelle)",
    slug: "prevoyance-a-quoi-ca-sert",
    excerpt:
      "La prévoyance protège vos revenus et vos proches en cas de coup dur. On fait le point sur les garanties clés et les situations où c’est utile.",
    coverImageUrl: "/cover-prevoyance.svg",
    publishedAt: "2025-12-09T09:00:00.000Z",
    contentHtml: `
      <p>La mutuelle santé rembourse des soins. La prévoyance, elle, vise plutôt à protéger <strong>vos revenus</strong> et <strong>vos proches</strong> en cas d’aléas (arrêt de travail, invalidité, décès…).</p>

      <h2>Garanties fréquentes</h2>
      <ul>
        <li>Indemnités en cas d’arrêt de travail (selon conditions)</li>
        <li>Rente ou capital en cas d’invalidité</li>
        <li>Capital décès / rente éducation</li>
      </ul>

      <h2>Quand y penser ?</h2>
      <ul>
        <li>Indépendants et professions libérales</li>
        <li>Revenus variables</li>
        <li>Charges fixes importantes (loyer, crédit, famille)</li>
      </ul>

      <p><a href="/sante-prevoyance/prevoyance">Découvrir la prévoyance</a> · <a href="/contact-reclamations/demande">Demander un devis</a></p>
      <hr />
      <p><em>Les garanties et délais varient selon les contrats.</em></p>
    `.trim(),
  },
  {
    title: "Assurance moto : protections essentielles (conducteur, vol, assistance)",
    slug: "assurance-moto-protections-essentielles",
    excerpt:
      "Au-delà du tiers obligatoire, certaines garanties font la différence en moto : conducteur, vol, assistance… Voici quoi regarder.",
    coverImageUrl: "/cover-moto.svg",
    publishedAt: "2025-12-10T09:00:00.000Z",
    contentHtml: `
      <p>En moto, l’exposition au risque est différente. Une bonne assurance moto se choisit selon votre usage, votre véhicule et votre niveau de protection souhaité.</p>

      <h2>La garantie du conducteur</h2>
      <p>Elle peut être déterminante : elle vise à mieux protéger le conducteur en cas de dommage corporel (selon conditions et plafonds).</p>

      <h2>Vol / incendie</h2>
      <p>Particulièrement utile si votre moto stationne à l’extérieur ou si sa valeur est élevée.</p>

      <h2>Assistance</h2>
      <p>Panne, remorquage, retour : vérifiez les conditions (kilométrage, exclusions, franchises).</p>

      <p><a href="/assurance-moto">Découvrir l’assurance moto</a> · <a href="/contact-reclamations/demande">Demander un devis</a></p>
    `.trim(),
  },
] as const;

async function main() {
  dotenv.config({ path: ".env.local" });

  const options = parseOptions(process.argv.slice(2));
  const databaseUrl = getDatabaseUrl();
  const { db, sql } = createDb(databaseUrl);

  let inserted = 0;
  let updated = 0;
  let skipped = 0;

  try {
    for (const post of posts) {
      const existing = await db
        .select({ id: blogPosts.id })
        .from(blogPosts)
        .where(eq(blogPosts.slug, post.slug))
        .limit(1);

      if (existing.length > 0 && !options.overwrite) {
        skipped += 1;
        console.log(`skip  ${post.slug} (already exists)`);
        continue;
      }

      if (options.dryRun) {
        console.log(
          `${existing.length > 0 ? "would update" : "would insert"} ${post.slug}`,
        );
        continue;
      }

      if (existing.length > 0) {
        await db
          .update(blogPosts)
          .set({
            title: post.title,
            excerpt: post.excerpt,
            coverImageUrl: post.coverImageUrl,
            contentHtml: post.contentHtml,
            status: "published",
            publishedAt: new Date(post.publishedAt),
            updatedAt: new Date(),
          })
          .where(eq(blogPosts.id, existing[0].id));
        updated += 1;
      } else {
        await db.insert(blogPosts).values({
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          coverImageUrl: post.coverImageUrl,
          contentHtml: post.contentHtml,
          status: "published",
          publishedAt: new Date(post.publishedAt),
        });
        inserted += 1;
      }
    }
  } finally {
    await sql.end({ timeout: 5 });
  }

  console.log(
    `done  inserted=${inserted} updated=${updated} skipped=${skipped} (total=${posts.length})`,
  );
}

main().catch((err: unknown) => {
  console.error(err);
  process.exitCode = 1;
});



import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faq = [
  {
    question: "Le devis est-il gratuit ?",
    answer:
      "Oui. La demande de devis est gratuite et sans engagement.",
  },
  {
    question: "Quels éléments dois-je fournir pour une demande ?",
    answer:
      "Selon votre besoin : quelques informations de contact, votre situation (profil/usage) et, si possible, votre contrat actuel.",
  },
  {
    question: "En combien de temps puis-je être recontacté ?",
    answer:
      "Nous vous recontactons généralement rapidement pendant nos horaires d’ouverture afin de finaliser votre dossier.",
  },
  {
    question: "Puis-je comparer plusieurs offres avant de choisir ?",
    answer:
      "Oui. Notre rôle est de vous aider à comparer et comprendre les garanties afin de choisir une solution adaptée.",
  },
  {
    question: "Comment déposer une réclamation ?",
    answer:
      "Vous pouvez utiliser le formulaire dédié depuis la page « Services clients & réclamations » pour un traitement plus rapide.",
  },
];

const FAQ = () => {
  return (
    <section className="space-y-10 py-24">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
        <div className="bg-background text-foreground flex size-11 items-center justify-center rounded-xl border">
          <HelpCircle className="size-5 text-primary" aria-hidden="true" />
        </div>
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Questions fréquentes
          </h2>
          <p className="text-muted-foreground mx-auto max-w-prose text-sm leading-relaxed sm:text-base">
            Les réponses aux questions les plus courantes avant une demande de devis.
          </p>
        </div>
      </div>

      <Accordion type="single" defaultValue="question-0" className="mx-auto max-w-3xl">
        {faq.map(({ question, answer }, index) => (
          <AccordionItem key={question} value={`question-${index}`}>
            <AccordionTrigger className="text-left text-sm sm:text-base">
              {question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm leading-relaxed sm:text-base">
              {answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FAQ;

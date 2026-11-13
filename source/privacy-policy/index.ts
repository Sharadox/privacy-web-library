import type {
  PolicySection,
  PrivacyLocale,
  PrivacyOptions,
  PrivacyPolicy,
  Words,
} from "@sharadox/privacy-web-library/privacy-policy/type";

const CNPD = { name: "Comissão Nacional de Proteção de Dados (CNPD)", url: "https://www.cnpd.pt" };
const LANGUAGE_TAGS: Record<PrivacyLocale, string> = { en: "en-US", pt: "pt-PT" };

/** Joins a list as people write it: "a, b and c" / "a, b e c". */
const list = (items: readonly string[], locale: PrivacyLocale) =>
  items.length < 2
    ? items.join("")
    : `${items.slice(0, -1).join(", ")} ${locale === "en" ? "and" : "e"} ${items.at(-1)}`;

/**
 * A GDPR (RGPD) privacy policy in English or Portuguese, written from what the site really collects: who is
 * responsible, what is collected and why (with the legal basis), who receives it and where, how long it is kept, the
 * visitor's rights and where to complain (Portugal's CNPD by default). Render it with `PrivacyPolicyView`.
 *
 * @example
 * const policy = privacyPolicy({ controller, updated: "2026-11-12", recipients: [vercel] }, "pt");
 */
export function privacyPolicy(options: PrivacyOptions, locale: PrivacyLocale): PrivacyPolicy {
  const { controller, contactForm, remembered = [], consentRecord, maps, recipients } = options;
  const authority = options.authority ?? CNPD;
  const say = (words: Words) => words[locale];
  const en = locale === "en";
  const legalName = controller.legalName ?? controller.name;
  const months = contactForm?.retentionMonths ?? 24;
  const date = new Date(`${options.updated}T12:00:00Z`).toLocaleDateString(LANGUAGE_TAGS[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  const reach = [controller.email, controller.phone].filter(Boolean) as string[];

  const collected: string[] = [];
  if (contactForm) {
    const fields = list(contactForm.fields.map(say), locale);
    collected.push(
      en
        ? `When you send us a message through the form, we receive what you write in it (${fields}) and the address of your internet connection (IP address), which we use only to stop abuse. We use your message to answer you and arrange what you ask for. The legal basis is taking steps at your request before a contract (Article 6(1)(b) GDPR).`
        : `Quando nos envia uma mensagem pelo formulário, recebemos o que escreve (${fields}) e o endereço da sua ligação à internet (endereço IP), que usamos apenas para impedir abusos. Usamos a sua mensagem para lhe responder e tratar do que nos pede. O fundamento é a realização de diligências pré-contratuais a seu pedido (artigo 6.º, n.º 1, alínea b) do RGPD).`,
    );
  }
  collected.push(
    en
      ? "When you visit, the company that hosts the site records technical data (IP address, browser, pages requested and the time) to keep it secure and working. The legal basis is our legitimate interest in a safe, working site (Article 6(1)(f) GDPR); these records are kept for a short time."
      : "Quando nos visita, a empresa que aloja o site regista dados técnicos (endereço IP, navegador, páginas pedidas e a hora) para o manter seguro e a funcionar. O fundamento é o nosso interesse legítimo num site seguro e funcional (artigo 6.º, n.º 1, alínea f) do RGPD); estes registos são guardados por pouco tempo.",
  );
  const kept = [
    ...remembered.map(say),
    ...(consentRecord ? [en ? "your cookie choices" : "as suas escolhas de cookies"] : []),
  ];
  if (kept.length) {
    collected.push(
      en
        ? `The site keeps ${list(kept, locale)} on your device, so it remembers them next time. This is strictly necessary to give you what you asked for and needs no consent (Lei 41/2004, Article 5).`
        : `O site guarda ${list(kept, locale)} no seu dispositivo, para os lembrar da próxima vez. Isto é estritamente necessário para lhe dar o que pediu e não precisa de consentimento (Lei 41/2004, artigo 5.º).`,
    );
  }
  if (maps) {
    collected.push(
      en
        ? "Only if you allow map cookies, the page shows Google Maps: Google then receives your IP address and may set its own cookies. The legal basis is your consent (Article 6(1)(a) GDPR), which you can withdraw at any time in Cookie Preferences."
        : "Só se permitir os cookies de mapas, a página mostra o Google Maps: a Google recebe então o seu endereço IP e pode usar os seus próprios cookies. O fundamento é o seu consentimento (artigo 6.º, n.º 1, alínea a) do RGPD), que pode retirar a qualquer momento nas Preferências de Cookies.",
    );
  }
  collected.push(
    en
      ? "We do not use analytics or advertising trackers, and we never sell your data."
      : "Não usamos ferramentas de análise nem de publicidade, e nunca vendemos os seus dados.",
  );

  const sections: PolicySection[] = [
    {
      title: en ? "Who we are" : "Quem somos",
      paragraphs: [
        en
          ? `${legalName}${controller.taxNumber ? ` (NIPC ${controller.taxNumber})` : ""}, ${controller.address}, is responsible for the personal data handled through ${controller.website}. You can reach us at ${list(reach, locale)}.`
          : `${legalName}${controller.taxNumber ? ` (NIPC ${controller.taxNumber})` : ""}, ${controller.address}, é responsável pelos dados pessoais tratados através de ${controller.website}. Pode contactar-nos por ${list(reach, locale)}.`,
      ],
    },
    { title: en ? "What we collect, and why" : "O que recolhemos, e porquê", paragraphs: collected },
    {
      title: en ? "Who receives it" : "Quem os recebe",
      paragraphs: [
        en
          ? "Only the companies that run the services the site needs, bound by contract to use the data solely for that:"
          : "Apenas as empresas que prestam os serviços de que o site precisa, obrigadas por contrato a usar os dados só para isso:",
      ],
      items: recipients.map((recipient) => `${recipient.name}: ${say(recipient.purpose)} (${say(recipient.location)})`),
    },
    {
      title: en ? "Transfers outside the European Union" : "Transferências para fora da União Europeia",
      paragraphs: [
        en
          ? "Some of these companies are based in, or use servers in, the United States. Those transfers rely on the EU–US Data Privacy Framework or on the European Commission's standard contractual clauses."
          : "Algumas destas empresas estão sediadas, ou usam servidores, nos Estados Unidos. Essas transferências baseiam-se no Quadro de Privacidade de Dados UE-EUA ou nas cláusulas contratuais-tipo da Comissão Europeia.",
      ],
    },
    {
      title: en ? "How long we keep it" : "Durante quanto tempo os guardamos",
      paragraphs: [
        ...(contactForm
          ? [
              en
                ? `Messages are kept for ${months} months after our last contact, unless they become part of a contract or the law asks us to keep them longer.`
                : `As mensagens são guardadas durante ${months} meses após o nosso último contacto, salvo se fizerem parte de um contrato ou a lei exigir que as guardemos mais tempo.`,
            ]
          : []),
        en
          ? "What the site keeps on your device stays until you clear it in your browser."
          : "O que o site guarda no seu dispositivo fica até o apagar no seu navegador.",
      ],
    },
    {
      title: en ? "Your rights" : "Os seus direitos",
      paragraphs: [
        en
          ? `You may ask us, at any time and free of charge, to:`
          : `Pode pedir-nos, a qualquer momento e sem custos, para:`,
      ],
      items: en
        ? [
            "see the data we hold about you, and get a copy",
            "correct it",
            "delete it",
            "limit how we use it",
            "receive it in a common format, or have it sent to someone else",
            "object to how we use it",
            "withdraw any consent you gave, without affecting what was done before",
          ]
        : [
            "ver os dados que temos sobre si, e receber uma cópia",
            "corrigi-los",
            "apagá-los",
            "limitar o modo como os usamos",
            "recebê-los num formato comum, ou enviá-los a outra entidade",
            "opor-se ao modo como os usamos",
            "retirar um consentimento que tenha dado, sem afetar o que foi feito antes",
          ],
    },
    {
      title: en ? "How to ask, or complain" : "Como pedir, ou reclamar",
      paragraphs: [
        en
          ? `${controller.email ? `Write to ${controller.email}` : `Call us on ${controller.phone}`}; we answer within one month. If you think we have not handled your data properly, you may complain to the ${authority.name} (${authority.url}).`
          : `${controller.email ? `Escreva para ${controller.email}` : `Ligue-nos para ${controller.phone}`}; respondemos no prazo de um mês. Se considerar que não tratámos bem os seus dados, pode apresentar reclamação à ${authority.name} (${authority.url}).`,
      ],
    },
    {
      title: en ? "Changes" : "Alterações",
      paragraphs: [
        en
          ? "If anything here changes, we update this page; the date at the top shows the current version."
          : "Se algo aqui mudar, atualizamos esta página; a data no topo indica a versão em vigor.",
      ],
    },
  ];
  return {
    title: en ? "Privacy Policy" : "Política de Privacidade",
    updated: en ? `Last updated: ${date}` : `Última atualização: ${date}`,
    sections,
  };
}

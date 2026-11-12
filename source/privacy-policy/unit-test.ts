import { describe, expect, test } from "vitest";
import { privacyPolicy } from "@sharadox/privacy-web-library/privacy-policy";
import type { PrivacyOptions } from "@sharadox/privacy-web-library/privacy-policy/type";

const full: PrivacyOptions = {
  controller: {
    name: "Example",
    legalName: "Example, Lda.",
    taxNumber: "PT500000000",
    address: "Rua A 1, 8000-000 Faro",
    email: "hi@example.com",
    phone: "+351 900 000 000",
    website: "https://example.com",
  },
  updated: "2026-11-12",
  contactForm: {
    fields: [
      { en: "name", pt: "nome" },
      { en: "email", pt: "email" },
      { en: "message", pt: "mensagem" },
    ],
    retentionMonths: 12,
  },
  remembered: [{ en: "your language", pt: "o seu idioma" }],
  consentRecord: true,
  maps: true,
  recipients: [
    {
      name: "Vercel",
      purpose: { en: "hosts the site", pt: "aloja o site" },
      location: { en: "United States", pt: "Estados Unidos" },
    },
  ],
};
const text = (policy: ReturnType<typeof privacyPolicy>) =>
  policy.sections
    .map((section) => [section.title, ...section.paragraphs, ...(section.items ?? [])].join("\n"))
    .join("\n");

describe("privacyPolicy", () => {
  test("says exactly what a site with a form, preferences and a map collects, in English", () => {
    const policy = privacyPolicy(full, "en");
    expect(policy.title).toBe("Privacy Policy");
    expect(policy.updated).toBe("Last updated: November 12, 2026");
    const all = text(policy);
    expect(all).toContain("Example, Lda. (NIPC PT500000000), Rua A 1, 8000-000 Faro, is responsible");
    expect(all).toContain("You can reach us at hi@example.com and +351 900 000 000.");
    expect(all).toContain("(name, email and message)");
    expect(all).toContain("The site keeps your language and your cookie choices on your device");
    expect(all).toContain("Only if you allow map cookies");
    expect(all).toContain("Vercel: hosts the site (United States)");
    expect(all).toContain("Messages are kept for 12 months");
    expect(all).toContain("Comissão Nacional de Proteção de Dados (CNPD) (https://www.cnpd.pt)");
    expect(policy.sections.find((section) => section.title === "Your rights")!.items).toHaveLength(7);
  });

  test("leaves out what a site does not do, in Portuguese", () => {
    const policy = privacyPolicy(
      {
        controller: { name: "Café", address: "Faro", email: "cafe@example.com", website: "https://cafe.pt" },
        updated: "2026-01-05",
        recipients: [],
        authority: { name: "Autoridade", url: "https://example.org" },
      },
      "pt",
    );
    expect(policy.title).toBe("Política de Privacidade");
    expect(policy.updated).toBe("Última atualização: 5 de janeiro de 2026");
    const all = text(policy);
    expect(all).toContain("Café, Faro, é responsável");
    expect(all).toContain("Pode contactar-nos por cafe@example.com.");
    expect(all).not.toContain("formulário");
    expect(all).not.toContain("no seu dispositivo, para");
    expect(all).not.toContain("Google Maps");
    expect(all).not.toContain("meses após");
    expect(all).toContain("à Autoridade (https://example.org)");
  });

  test("keeps messages two years by default, and joins two items without a comma", () => {
    const policy = privacyPolicy(
      {
        ...full,
        contactForm: {
          fields: [
            { en: "name", pt: "nome" },
            { en: "phone", pt: "telefone" },
          ],
        },
        remembered: [],
        consentRecord: false,
      },
      "pt",
    );
    const all = text(policy);
    expect(all).toContain("(nome e telefone)");
    expect(all).toContain("durante 24 meses");
    expect(all).not.toContain("as suas escolhas de cookies");
  });
});

test("writes every part in Portuguese, and a bare site in English", () => {
  const portuguese = text(privacyPolicy(full, "pt"));
  expect(portuguese).toContain("(NIPC PT500000000)");
  expect(portuguese).toContain("(nome, email e mensagem)");
  expect(portuguese).toContain("O site guarda o seu idioma e as suas escolhas de cookies no seu dispositivo");
  expect(portuguese).toContain("Só se permitir os cookies de mapas");
  expect(portuguese).toContain("durante 12 meses");
  const english = text(
    privacyPolicy(
      {
        controller: { name: "Café", address: "Faro", email: "cafe@example.com", website: "https://cafe.pt" },
        updated: "2026-01-05",
        consentRecord: true,
        recipients: [],
      },
      "en",
    ),
  );
  expect(english).toContain("Café, Faro, is responsible");
  expect(english).toContain("The site keeps your cookie choices on your device");
  expect(english).not.toContain("Messages are kept");
});

# @sharadox/privacy-web-library

GDPR (RGPD) privacy policies for websites, in English and Portuguese. Each policy is written from what the site really collects, so it says exactly that and nothing more.

It covers:

- who is responsible for the data (name, NIPC, address, contacts)
- what is collected and why, with the legal basis: the contact form, the host's technical records, what is remembered on the device, and Google Maps when allowed
- who receives the data, and where, including transfers outside the European Union
- how long it is kept
- the visitor's rights, how to use them, and where to complain (Portugal's CNPD by default)

## Install

```sh
pnpm add @sharadox/privacy-web-library
```

## Use

```tsx
import { privacyPolicy } from "@sharadox/privacy-web-library/privacy-policy";
import { PrivacyPolicyView } from "@sharadox/privacy-web-library/privacy-policy-view";

const policy = privacyPolicy(
  {
    controller: { name: "Example", legalName: "Example, Lda.", taxNumber: "PT500000000", address: "Rua A 1, 8000-000 Faro", email: "hi@example.com", website: "https://example.com" },
    updated: "2026-11-12",
    contactForm: { fields: [{ en: "name", pt: "nome" }, { en: "email", pt: "email" }] },
    remembered: [{ en: "your language", pt: "o seu idioma" }],
    recipients: [{ name: "Vercel", purpose: { en: "hosts the site", pt: "aloja o site" }, location: { en: "United States", pt: "Estados Unidos" } }],
  },
  "pt",
);

<h1>{policy.title}</h1>
<PrivacyPolicyView policy={policy} className={styles.policy} />
```

## API

| Import                  | Export                                                                                                                               |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `…/privacy-policy`      | `privacyPolicy(options, locale)` → `{ title, updated, sections: [{ title, paragraphs, items? }] }`; types in `…/privacy-policy/type` |
| `…/privacy-policy-view` | `<PrivacyPolicyView policy className? />`: the date, then each part as `section > h2, p, ul`, unstyled                               |

**Options:**

- **`controller`:** `name`, `legalName?`, `taxNumber?`, `address`, `email`, `phone?`, `website`.
- **`updated`:** the date the policy last changed.
- **`contactForm?`:** `{ fields, retentionMonths? = 24 }`.
- **`remembered?`:** what the site keeps on the device.
- **`consentRecord?`:** true when a cookie panel records choices.
- **`maps?`:** true when Google Maps loads with consent.
- **`recipients`:** `[{ name, purpose, location }]`.
- **`authority?`:** where to complain; the CNPD by default.

The wording is a careful default, not legal advice. Have a lawyer review it for each business.

## Develop

`pnpm verify` runs formatting, lint, type-check, tests with 100% coverage and the build. Branches follow `<feature>.development` → `development` → `index`, and releases are `v<version>` tags on `index`.

## License

Licença Sharadox de Código Aberto, versão 0.1.0. See [português](LICENCA.md) (the binding text) and the [English translation](LICENSE.md).

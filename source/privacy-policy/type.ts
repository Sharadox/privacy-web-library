/** The languages the policy is written in. */
export type PrivacyLocale = "en" | "pt";

/** A text in every language the policy is written in. */
export type Words = Readonly<Record<PrivacyLocale, string>>;

/** Who is responsible for the data (the controller). */
export interface Controller {
  /** The name people know, for example "Luis Pires Decor". */
  name: string;
  /** The registered name, for example "Luis Pires Decor, Unipessoal, Lda."; `name` when left out. */
  legalName?: string;
  /** The company's tax number (NIPC), for example "PT513385207". */
  taxNumber?: string;
  /** The postal address, on one line. */
  address: string;
  /** Where rights requests go; at least one of `email` and `phone`. */
  email?: string;
  phone?: string;
  /** The site's address, for example "https://luispiresdecor.com". */
  website: string;
}

/** A company that handles data on the controller's behalf (a processor) or receives it. */
export interface Recipient {
  name: string;
  /** What it does with the data: "hosts the website". */
  purpose: Words;
  /** Where: "European Union", "United States". */
  location: Words;
}

/** What the site really collects, so the policy says exactly that and no more. */
export interface PrivacyOptions {
  controller: Controller;
  /** When the policy last changed: "2026-11-12". */
  updated: string;
  /** A contact or booking form: the fields it asks for, and how long messages are kept (24 months by default). */
  contactForm?: { fields: readonly Words[]; retentionMonths?: number };
  /** What the site remembers on the visitor's device: "your language", "the style you chose". */
  remembered?: readonly Words[];
  /** True when a cookie panel records the visitor's choices. */
  consentRecord?: boolean;
  /** True when the site shows Google Maps once the visitor allows it. */
  maps?: boolean;
  /** Everyone who handles the data for the controller. */
  recipients: readonly Recipient[];
  /** Where to complain; Portugal's CNPD by default. */
  authority?: { name: string; url: string };
}

/** One part of the policy: a heading, its paragraphs and an optional list. */
export interface PolicySection {
  title: string;
  paragraphs: readonly string[];
  items?: readonly string[];
}

/** The policy in one language, ready to show. */
export interface PrivacyPolicy {
  title: string;
  /** "Last updated: November 12, 2026". */
  updated: string;
  sections: readonly PolicySection[];
}

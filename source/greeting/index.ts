import type { GreetingOptions } from "@sharadox/privacy-web-library/greeting/type";

/** An example function: replace it with the library's first real piece. */
export function greeting({ name, language = "en" }: GreetingOptions): string {
  return language === "pt" ? `Olá, ${name}!` : `Hello, ${name}!`;
}

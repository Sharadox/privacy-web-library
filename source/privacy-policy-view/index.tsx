import type { PrivacyPolicyViewProperties } from "@sharadox/privacy-web-library/privacy-policy-view/type";

/**
 * A privacy policy as plain, semantic HTML: the date it was updated, then a heading, paragraphs and a list for each
 * part. The page supplies the main heading (`policy.title`); the site styles everything through `className`.
 *
 * @example
 * <h1>{policy.title}</h1>
 * <PrivacyPolicyView policy={policy} className={styles.policy} />
 */
export function PrivacyPolicyView({ policy, className }: PrivacyPolicyViewProperties) {
  return (
    <div className={className}>
      <p>
        <small>{policy.updated}</small>
      </p>
      {policy.sections.map((section) => (
        <section key={section.title}>
          <h2>{section.title}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {section.items && (
            <ul>
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}

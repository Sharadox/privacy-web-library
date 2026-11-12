import type { PrivacyPolicy } from "@sharadox/privacy-web-library/privacy-policy/type";

export interface PrivacyPolicyViewProperties {
  policy: PrivacyPolicy;
  /** The site styles the policy through this class (its `h2`, `p`, `ul` and `time`). */
  className?: string;
}

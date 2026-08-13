import type { Metadata } from "next";

export const SITE_URL = "https://aharonberk.com";
export const SITE_NAME = "Aharon Berk";
export const SITE_TITLE =
  "Aharon Berk | Jewish Wedding Singer & Recording Artist";
export const SITE_DESCRIPTION =
  "Aharon Berk is a Jewish singer, recording artist and live performer, bringing live music to chuppahs, weddings and simchas.";

/**
 * Build metadata for a page.
 *
 * Next merges metadata shallowly: a page that declares `openGraph` replaces the
 * root layout's `openGraph` outright rather than merging into it. Restating
 * siteName/locale/type here keeps every page's share card complete.
 *
 * `title` is the bare page name — the layout's title template appends the brand.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: `${SITE_URL}${path}`,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

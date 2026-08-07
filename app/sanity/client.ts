import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

export type SanityImage = {
  asset: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number; height: number; width: number };
};

export const sanityClient = createClient({
  projectId: "kcf82upt",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
});

const builder = createImageUrlBuilder(sanityClient);

export function urlForImage(source: SanityImage) {
  return builder.image(source);
}

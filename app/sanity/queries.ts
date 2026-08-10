import { sanityClient, type SanityImage } from "./client";

export type Performance = {
  _id: string;
  title: string;
  slug: string;
  videoUrl: string;
  thumbnail: SanityImage;
  duration?: string;
  imagePosition?: string;
};

export type WatchPage = {
  heading: string;
  watchMoreLabel: string;
  watchMoreUrl: string;
};

export type Release = {
  _id: string;
  title: string;
  slug: string;
  format: "Single" | "EP" | "Album";
  dateLabel?: string;
  releaseDate?: string;
  description?: string;
  coverArt: SanityImage;
  listenUrl?: string;
  appleMusicUrl?: string;
  watchUrl?: string;
  featured: boolean;
};

export type MusicPage = {
  heroTitle: string;
  heroIntroduction: string;
  heroLinks: { label: string; href: string }[];
  platforms: { label: string; href: string; icon: SanityImage }[];
};

const performanceProjection = `{
  _id,
  title,
  "slug": slug.current,
  videoUrl,
  thumbnail,
  duration,
  imagePosition
}`;

const releaseProjection = `{
  _id,
  title,
  "slug": slug.current,
  format,
  dateLabel,
  releaseDate,
  description,
  coverArt,
  listenUrl,
  appleMusicUrl,
  watchUrl,
  featured
}`;

export async function getWatchPage(): Promise<WatchPage | null> {
  return sanityClient.fetch(
    `*[_id == "watchPage"][0]{ heading, watchMoreLabel, watchMoreUrl }`,
  );
}

export async function getPerformances(): Promise<Performance[]> {
  return sanityClient.fetch(
    `*[_type == "performance"] | order(order asc) ${performanceProjection}`,
  );
}

export async function getMusicPage(): Promise<MusicPage | null> {
  return sanityClient.fetch(
    `*[_id == "musicPage"][0]{ heroTitle, heroIntroduction, heroLinks, platforms }`,
  );
}

export async function getReleases(): Promise<Release[]> {
  return sanityClient.fetch(
    `*[_type == "release"] | order(order asc) ${releaseProjection}`,
  );
}

export async function getFeaturedReleases(): Promise<Release[]> {
  return sanityClient.fetch(
    `*[_type == "release" && featured == true] | order(order asc) ${releaseProjection}`,
  );
}

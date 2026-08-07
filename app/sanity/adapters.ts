import { urlForImage } from "./client";
import type { Performance, Release } from "./queries";
import type { PerformanceItem } from "../PerformanceShowcase";
import type { MusicFeatureAlbum } from "../MusicFeature";
import type { MusicRelease } from "../content/releases";

export function toPerformanceItem(performance: Performance): PerformanceItem {
  return {
    id: performance.slug,
    title: performance.title,
    duration: performance.duration ?? "",
    image: urlForImage(performance.thumbnail).width(960).url(),
    url: performance.videoUrl,
    position: performance.imagePosition,
  };
}

export function toMusicFeatureAlbum(release: Release): MusicFeatureAlbum {
  return {
    title: release.title,
    slug: release.slug,
    cover: urlForImage(release.coverArt).width(640).height(640).url(),
    spotify: release.listenUrl ?? release.watchUrl ?? "#",
  };
}

export function toMusicRelease(release: Release): MusicRelease {
  const cover = urlForImage(release.coverArt).width(1000).height(1000).url();
  return {
    id: release.slug,
    title: release.title,
    publishedAt: release.releaseDate,
    dateLabel: release.dateLabel ?? "",
    format: release.format === "Album" ? "EP" : release.format,
    description: release.description ?? "",
    cover: { webp: cover, fallback: cover, alt: `${release.title} cover artwork` },
    links: { listen: release.listenUrl, watch: release.watchUrl },
  };
}

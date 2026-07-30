export type MusicRelease = {
  id: string;
  title: string;
  publishedAt?: string;
  dateLabel: string;
  format: "EP" | "Single";
  description: string;
  cover: {
    webp: string;
    fallback: string;
    alt: string;
  };
  links: {
    listen: string;
    watch?: string;
  };
};

/*
 * CMS integration boundary:
 * A CMS query can replace this array as long as it returns MusicRelease[].
 * The carousel component does not contain release-specific content.
 */
export const musicReleases = [
  {
    id: "nafsheinu",
    title: "Nafsheinu",
    publishedAt: "2026-07-31",
    dateLabel: "7/31/26",
    format: "EP",
    description:
      "A song of yearning, faith and collective Jewish spirit.",
    cover: {
      webp: "/music/covers/nafsheinu.webp",
      fallback: "/music/covers/nafsheinu.jpg",
      alt: "Nafsheinu album cover",
    },
    links: {
      listen: "https://open.spotify.com/album/0VEbu8A4mTR2e401opxbh7",
    },
  },
  {
    id: "40-days",
    title: "40 Days",
    dateLabel: "Previous release",
    format: "Single",
    description:
      "A reflective prayer about waiting, hope and finding one another.",
    cover: {
      webp: "/music/covers/40-days.webp",
      fallback: "/music/covers/40-days.jpg",
      alt: "40 Days album cover",
    },
    links: {
      listen: "https://open.spotify.com/album/5ZH20UI0C8JdPthYiwUzcg",
      watch: "https://www.youtube.com/watch?v=c98dV9drWoM",
    },
  },
  {
    id: "piha-pascha",
    title: "Piha Pascha",
    dateLabel: "Previous release",
    format: "Single",
    description:
      "A contemporary celebration shaped for meaningful wedding moments.",
    cover: {
      webp: "/music/covers/piha-pascha.webp",
      fallback: "/music/covers/piha-pascha.jpg",
      alt: "Piha Pascha album cover",
    },
    links: {
      listen: "https://open.spotify.com/album/1U329vXa5l0MxMfAFIEPHp",
    },
  },
  {
    id: "tefilas-hashla",
    title: "Tefilas Hashla",
    dateLabel: "Previous release",
    format: "Single",
    description:
      "A heartfelt prayer for children, home and generations to come.",
    cover: {
      webp: "/music/covers/tefilas-hashla.webp",
      fallback: "/music/covers/tefilas-hashla.jpg",
      alt: "Tefilas Hashla album cover",
    },
    links: {
      listen: "https://open.spotify.com/album/745D1UXIIBflDRkx227irz",
    },
  },
] satisfies readonly MusicRelease[];

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
    listen?: string;
    watch?: string;
  };
};

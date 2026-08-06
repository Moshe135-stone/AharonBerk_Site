export type MusicPageLink = {
  label: string;
  href: string;
};

export type MusicPageRelease = {
  slug: string;
  title: string;
  year: string;
  description?: string;
  artwork?: {
    desktop: string;
    mobile: string;
    alt: string;
  };
  links: {
    watch: string;
    listen: string;
  };
};

export type MusicPageContent = {
  hero: {
    title: string;
    introduction: string;
    links: MusicPageLink[];
  };
  featuredRelease: MusicPageRelease;
  platforms: Array<MusicPageLink & { icon: string }>;
  releases: MusicPageRelease[];
};

const youtubeSearch = (title: string) =>
  `https://www.youtube.com/results?search_query=${encodeURIComponent(
    `Aharon Berk ${title}`,
  )}`;

/*
 * ClientManager CMS integration boundary.
 * A CMS adapter only needs to return this MusicPageContent shape; the route
 * and responsive presentation contain no release-specific content.
 */
export const musicPageContent: MusicPageContent = {
  hero: {
    title: "Music",
    introduction:
      "Aharon Berk is a Jewish singer and recording artist whose music is rooted in tefillah, Jewish life and emotion. Explore the latest release, selected songs and videos below.",
    links: [
      {
        label: "Watch now",
        href: "https://www.youtube.com/channel/UCxAJ-494ZAh1azhFI_j0Krw",
      },
      {
        label: "Listen",
        href: "https://open.spotify.com/artist/2on0c6iQBHGTIn30q7te5Q",
      },
    ],
  },
  featuredRelease: {
    slug: "halev-sheli",
    title: "Halev Sheli",
    year: "2025",
    description:
      "A moving collaboration with Ari Goldwag, shaped by prayer, vulnerability and the strength found in a broken heart.",
    artwork: {
      desktop: "/music/covers/halev-sheli-large.jpg",
      mobile: "/music/covers/halev-sheli-mobile.jpg",
      alt: "Halev Sheli by Aharon Berk and Ari Goldwag album cover",
    },
    links: {
      watch: youtubeSearch("Halev Sheli"),
      listen: "https://open.spotify.com/album/1TCOEgc8fbRcW9o9kLS82n",
    },
  },
  platforms: [
    {
      label: "Listen on Spotify",
      href: "https://open.spotify.com/album/1TCOEgc8fbRcW9o9kLS82n",
      icon: "/social/spotify.svg",
    },
    {
      label: "Listen on Apple Music",
      href: "https://music.apple.com/us/artist/aharon-berk/1521973943",
      icon: "/music/apple-music.svg",
    },
  ],
  releases: [
    {
      slug: "tefilas-hashla",
      title: "Tefilas Hashla",
      year: "2024",
      artwork: {
        desktop: "/music/covers/tefilas-hashla.webp",
        mobile: "/music/covers/tefilas-hashla.jpg",
        alt: "Tefilas Hashla cover artwork",
      },
      links: {
        watch: youtubeSearch("Tefilas Hashla"),
        listen: "https://open.spotify.com/album/745D1UXIIBflDRkx227irz",
      },
    },
    {
      slug: "tefilas-haemunah",
      title: "Tefilas HaEmunah",
      year: "2024",
      artwork: {
        desktop: "/music/covers/tefilas-haemunah.jpg",
        mobile: "/music/covers/tefilas-haemunah.jpg",
        alt: "Tefilas HaEmunah cover artwork",
      },
      links: {
        watch: youtubeSearch("Tefilas HaEmunah"),
        listen: "https://open.spotify.com/album/34cOAYbniwvUvj3n9hNeH9",
      },
    },
    {
      slug: "piha-pascha",
      title: "Piha Pascha",
      year: "2024",
      artwork: {
        desktop: "/music/covers/piha-pascha.webp",
        mobile: "/music/covers/piha-pascha.jpg",
        alt: "Piha Pascha cover artwork",
      },
      links: {
        watch: youtubeSearch("Piha Pascha"),
        listen: "https://open.spotify.com/album/1U329vXa5l0MxMfAFIEPHp",
      },
    },
    {
      slug: "nafsheinu",
      title: "Nafsheinu",
      year: "2025",
      artwork: {
        desktop: "/music/covers/nafsheinu.webp",
        mobile: "/music/covers/nafsheinu.jpg",
        alt: "Nafsheinu cover artwork",
      },
      links: {
        watch: youtubeSearch("Nafsheinu"),
        listen: "https://open.spotify.com/album/0VEbu8A4mTR2e401opxbh7",
      },
    },
    {
      slug: "40-days",
      title: "40 Days",
      year: "2022",
      artwork: {
        desktop: "/music/covers/40-days.webp",
        mobile: "/music/covers/40-days.jpg",
        alt: "40 Days cover artwork",
      },
      links: {
        watch: "https://www.youtube.com/watch?v=c98dV9drWoM",
        listen: "https://open.spotify.com/album/5ZH20UI0C8JdPthYiwUzcg",
      },
    },
  ],
};

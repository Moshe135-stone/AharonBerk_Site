import WeddingLanding from "../WeddingLanding";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata({
  title: "Weddings & Music",
  description:
    "Aharon Berk is a Jewish singer, recording artist and live performer, available for weddings, simchas and live shows.",
  path: "/home",
});

export default function HomePage() {
  return <WeddingLanding />;
}

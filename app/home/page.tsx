import type { Metadata } from "next";
import WeddingLanding from "../WeddingLanding";

export const metadata: Metadata = {
  title: "Aharon Berk | Weddings & Music",
  description:
    "Aharon Berk is a Jewish singer, recording artist and live performer based in Johannesburg.",
};

export default function HomePage() {
  return <WeddingLanding />;
}

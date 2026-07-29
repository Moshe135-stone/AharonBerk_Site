import type { Metadata } from "next";
import WeddingLanding from "../WeddingLanding";

export const metadata: Metadata = {
  title: "Weddings | Aharon Berk",
  description:
    "Live Jewish wedding music by Aharon Berk and Azamra for Chuppas, Horas and receptions.",
};

export default function WeddingsPage() {
  return <WeddingLanding />;
}

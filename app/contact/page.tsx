import type { Metadata } from "next";
import { SiteFooter } from "../SiteFooter";
import { ContactPage } from "./ContactPage";

export const metadata: Metadata = {
  title: "Contact Aharon Berk | Weddings & Performances",
  description:
    "Contact Aharon Berk about weddings, live performances and other enquiries.",
};

export default function ContactRoute() {
  return (
    <>
      <ContactPage />
      <SiteFooter />
    </>
  );
}

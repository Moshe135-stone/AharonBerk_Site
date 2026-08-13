import { SiteFooter } from "../SiteFooter";
import { ContactPage } from "./ContactPage";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata({
  title: "Contact & Bookings",
  description:
    "Contact Aharon Berk about weddings, live performances and other enquiries.",
  path: "/contact",
});

export default function ContactRoute() {
  return (
    <>
      <ContactPage />
      <SiteFooter />
    </>
  );
}

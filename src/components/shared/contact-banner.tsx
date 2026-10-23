import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

export function ContactBanner({ title, text, buttonLabel, eyebrow }: { title: string; text: string; buttonLabel: string; eyebrow: string }) {
  return <section className="contact-banner">
    <Image src="/images/locations/kobe-city-at-night.png" alt="Kobe harbor at dusk" fill sizes="100vw" />
    <div className="banner-shade" />
    <div className="container banner-content"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2><p>{text}</p><Link href="/contact" className="button button-gold">{buttonLabel}<ArrowRight size={18} /></Link></div>
  </section>;
}

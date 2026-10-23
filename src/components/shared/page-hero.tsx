import Image from "next/image";

export function PageHero({ eyebrow, title, description, image, size = "default" }: { eyebrow: string; title: string; description: string; image: string; size?: "default" | "compact" }) {
  return <section className={`page-hero ${size === "compact" ? "page-hero-compact" : ""}`}>
    <Image src={image} alt="" fill priority sizes="100vw" className="cover-image" />
    <div className="hero-shade" />
    <div className="container page-hero-content"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{description}</p></div>
  </section>;
}

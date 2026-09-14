import { Reveal } from "./Reveal";

type Props = {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
  light?: boolean;
};

export function SectionTitle({ kicker, title, subtitle, align = "left", as: Tag = "h2", className = "", light = false }: Props) {
  const center = align === "center";
  return (
    <Reveal className={`${center ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      {kicker && <p className={`kicker mb-4 ${light ? "text-plum-200" : ""}`}>{kicker}</p>}
      <Tag className={`text-display-md font-medium ${light ? "text-cream" : ""}`}>{title}</Tag>
      {subtitle && (
        <p className={`mt-4 font-serif text-xl italic leading-relaxed sm:text-2xl ${light ? "text-plum-100" : "text-mist"}`}>
          {subtitle}
        </p>
      )}
      <span
        aria-hidden="true"
        className={`mt-6 block h-px w-14 ${light ? "bg-plum-300" : "bg-plum-500"} ${center ? "mx-auto" : ""}`}
      />
    </Reveal>
  );
}

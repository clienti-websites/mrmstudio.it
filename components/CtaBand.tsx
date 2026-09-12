import { AnchorLink } from "./AnchorLink";

export interface CtaBandProps {
  title: string;
  cta: string;
  href: string;
  tone?: "light" | "dark";
}

// Single source of truth for the CTA band repeated at the bottom of most
// pages (light, on nebbia) and the dark closing band on the home page.
// `mx-auto` on the title fixes a real bug: globals.css caps every bare `p`
// at max-width:70ch, so inside a wider centred container the paragraph box
// itself was flush-left while the button beneath it centred normally —
// visibly misaligned. Centring the box once here fixes it everywhere.
export function CtaBand({ title, cta, href, tone = "light" }: CtaBandProps) {
  const buttonClass =
    tone === "dark"
      ? "mt-6 inline-block bg-muschio px-8 py-3 font-medium text-carta hover:bg-muschio/90"
      : "inline-block bg-muschio px-6 py-3 font-medium text-carta hover:bg-muschio/90";

  if (tone === "dark") {
    return (
      <section className="bg-grafite px-6 py-24 text-carta md:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mx-auto text-2xl font-black md:text-3xl">{title}</h2>
          <AnchorLink href={href} className={buttonClass}>
            {cta}
          </AnchorLink>
        </div>
      </section>
    );
  }

  return (
    <div className="mt-16 bg-nebbia p-8 text-center">
      <p className="mx-auto mb-4 text-lg font-medium text-grafite">{title}</p>
      <AnchorLink href={href} className={buttonClass}>
        {cta}
      </AnchorLink>
    </div>
  );
}

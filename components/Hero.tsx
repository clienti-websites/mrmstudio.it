import Image from "next/image";
import Link from "next/link";

export function Hero({ image, title }: { image: { src: string; alt: string }; title: string }) {
  return (
    <section className="relative h-[85dvh] min-h-[560px] w-full">
      <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className="object-cover" />
      <div className="absolute bottom-0 left-0 max-w-xl bg-grafite/85 p-8 md:p-12">
        <h1 className="text-3xl font-black leading-tight text-carta md:text-5xl">{title}</h1>
        <p className="mt-4 text-carta/85">
          Progettiamo, gestiamo l&apos;appalto, dirigiamo il cantiere e coordiniamo le maestranze. Un solo studio, un
          solo interlocutore.
        </p>
        <Link
          href="/contatti"
          className="mt-6 inline-block bg-muschio px-6 py-3 font-medium text-carta hover:bg-muschio/90"
        >
          Contattaci
        </Link>
      </div>
    </section>
  );
}

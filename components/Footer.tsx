import Link from "next/link";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-grafite px-6 py-16 text-carta md:px-12">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
        <div>
          <p className="text-lg font-black">{SITE.name}</p>
          <p className="mt-2 text-sm text-carta/70">{SITE.legalName}</p>
          <p className="mt-4 text-sm text-carta/70">
            P.IVA {SITE.vatNumber} — REA {SITE.rea}
          </p>
        </div>

        {SITE.offices.map((office) => (
          <div key={office.id}>
            <p className="font-medium">{office.city}</p>
            <p className="text-sm text-carta/70">{office.streetAddress}</p>
            <a href={`tel:${office.phone}`} className="mt-2 block text-sm text-carta/70 hover:text-carta">
              {office.phoneDisplay}
            </a>
            <a href={`tel:${office.mobile}`} className="block text-sm text-carta/70 hover:text-carta">
              {office.mobileDisplay}
            </a>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl items-center justify-between border-t border-carta/20 pt-6 text-sm text-carta/60">
        <a href={`mailto:${SITE.email}`} className="hover:text-carta">
          {SITE.email}
        </a>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-carta">
            Privacy
          </Link>
          <Link href="/contatti" className="hover:text-carta">
            Contatti
          </Link>
        </div>
      </div>
    </footer>
  );
}

import { buildLocalBusinessJsonLd } from "@/lib/localBusiness";
import type { Office } from "@/lib/site";

export function LocalBusinessJsonLd({ office }: { office: Office }) {
  const data = buildLocalBusinessJsonLd(office);
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

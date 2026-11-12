import type { Metadata } from "next";
import { PaginaApproccio } from "@/components/PaginaApproccio";
import { getApproccio } from "@/lib/approcci";

const APPROCCIO = getApproccio("appalto");

export const metadata: Metadata = {
  title: APPROCCIO.metaTitolo,
  description: APPROCCIO.metaDescrizione,
};

export default function Pagina() {
  return <PaginaApproccio approccio={APPROCCIO} />;
}

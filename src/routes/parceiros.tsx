import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, Radio, Cpu, Truck, CreditCard, Building2, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/parceiros")({
  head: () => ({
    meta: [
      { title: "Parceiros — Direta Cargas Transportes" },
      {
        name: "description",
        content:
          "Conheça os parceiros estratégicos da Direta Cargas: Sompo Seguros, Vérttice, Bsoft, FreteBras, Repom e Uniforte Seguros.",
      },
      { property: "og:title", content: "Parceiros — Direta Cargas" },
      {
        property: "og:description",
        content: "Sompo, Vérttice, Bsoft, FreteBras, Repom e Uniforte ao lado da Direta Cargas.",
      },
    ],
  }),
  component: PartnersPage,
});

const partners = [
  { icon: Shield, name: "Sompo Seguros", desc: "Seguradora responsável pela cobertura RC-DC, RCT-RC e RC-V de até R$ 1 milhão." },
  { icon: Radio, name: "Vérttice", desc: "Gerenciadora de riscos homologada, com rastreamento, bloqueio remoto e monitoramento 24h." },
  { icon: Cpu, name: "Bsoft", desc: "Plataforma de gestão para emissão de CTE, MDF-e e integração de sistemas." },
  { icon: Truck, name: "FreteBras", desc: "Plataforma líder de fretes, conectando-nos a uma ampla malha de embarcadores e transportadores." },
  { icon: CreditCard, name: "Repom", desc: "Soluções de pagamentos e gestão financeira para o transporte rodoviário." },
  { icon: Building2, name: "Uniforte Seguros", desc: "Parceria em soluções securitárias complementares para nossas operações." },
];

function PartnersPage() {
  return (
    <SiteLayout>
      <section className="bg-brand-black text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Quem caminha com a gente
            </p>
            <h1 className="mt-3 font-display text-5xl sm:text-6xl font-bold">
              Nossos <span className="text-primary">parceiros</span>
            </h1>
            <p className="mt-6 text-lg text-white/80 max-w-2xl">
              Construímos uma rede sólida de parceiros estratégicos para garantir
              segurança, tecnologia e qualidade em cada operação.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((p) => (
              <div
                key={p.name}
                className="group rounded-2xl border border-border bg-card p-8 transition-smooth hover:border-primary hover:shadow-elegant hover:-translate-y-1"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-smooth group-hover:bg-gradient-primary group-hover:text-primary-foreground">
                  <p.icon className="h-7 w-7" />
                </div>
                <h2 className="mt-6 font-display text-xl font-bold">{p.name}</h2>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-brand-black p-12 text-center text-white">
            <h2 className="font-display text-3xl sm:text-4xl font-bold">
              Quer fazer parte da nossa rede?
            </h2>
            <p className="mt-4 text-white/70 max-w-xl mx-auto">
              Estamos sempre abertos a novas parcerias estratégicas.
            </p>
            <Link
              to="/contato"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-elegant transition-smooth hover:bg-primary-glow hover:scale-105"
            >
              Falar com a Direta Cargas
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

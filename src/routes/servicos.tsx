import { createFileRoute, Link } from "@tanstack/react-router";
import { Truck, Shield, Radio, Cpu, ArrowRight, CheckCircle2, MapPin, Clock } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import servicesCargo from "@/assets/services-cargo.jpg";

export const Route = createFileRoute("/servicos")({
  head: () => ({
    meta: [
      { title: "Serviços — Direta Cargas | Carga Lotação Nacional" },
      {
        name: "description",
        content:
          "Transporte de carga fechada (lotação) com TAC, trucks e carretas. Seguro até R$ 1 milhão, gerenciamento de riscos e tecnologia integrada.",
      },
      { property: "og:title", content: "Serviços — Direta Cargas" },
      {
        property: "og:description",
        content: "Carga lotação com seguro, monitoramento e tecnologia em todo o Brasil.",
      },
    ],
  }),
  component: ServicesPage,
});

const fleet = [
  { label: "TAC", desc: "Transporte Autônomo de Carga para envios menores e mais ágeis." },
  { label: "Truck", desc: "Capacidade média ideal para entregas regionais e urbanas." },
  { label: "Carreta", desc: "Alta capacidade para grandes volumes em rotas de longa distância." },
];

const differentials = [
  {
    icon: Truck,
    title: "Carga Fechada (Lotação)",
    desc: "Especializada em transporte de carga fechada com excelente custo-benefício. Veículo dedicado para sua operação, sem transbordos, com agilidade e segurança em todo o Brasil.",
    items: ["TAC, trucks e carretas", "Cobertura nacional", "Preços competitivos", "Entrega no prazo combinado"],
  },
  {
    icon: Shield,
    title: "Seguro RC-DC, RCT-RC e RC-V",
    desc: "Sua carga protegida com cobertura securitária Sompo Seguros de até R$ 1.000.000,00, garantindo tranquilidade contra roubo, acidentes e danos a terceiros.",
    items: ["Cobertura de até R$ 1 milhão", "Ampliação rápida para valores maiores", "Liberação sem burocracia", "Operação que não para"],
  },
  {
    icon: Radio,
    title: "Gerenciamento de Riscos",
    desc: "A Vérttice Gerenciadora de Riscos, homologada pela nossa seguradora, usa tecnologia de ponta para monitorar veículos com rastreamento preciso e bloqueio remoto.",
    items: ["Rastreamento em tempo real", "Bloqueio remoto", "Liberação de motoristas qualificados", "Monitoramento 24h"],
  },
  {
    icon: Cpu,
    title: "Tecnologia Bsoft",
    desc: "Gestão integrada do transporte com emissão rápida de CTE, MDF-e e demais documentos fiscais. Mais controle, agilidade e precisão na sua operação.",
    items: ["Emissão de CTE e MDF-e", "Integração entre sistemas", "Redução de erros", "Operação conectada"],
  },
];

function ServicesPage() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative bg-brand-black text-white py-24 overflow-hidden">
        <img
          src={servicesCargo}
          alt="Container de carga vermelho sendo carregado"
          width={1600}
          height={1024}
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/70 to-brand-black" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Nossos serviços
            </p>
            <h1 className="mt-3 font-display text-5xl sm:text-6xl font-bold">
              Especialistas em <span className="text-primary">carga lotação</span>
            </h1>
            <p className="mt-6 text-lg text-white/80 max-w-2xl">
              Soluções sob medida com excelente custo-benefício. Ampla rede nacional
              de veículos, sua carga sempre segurada e acompanhada em cada etapa.
            </p>
          </div>
        </div>
      </section>

      {/* FROTA */}
      <section className="py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Nossa frota
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold">
              Veículos para cada operação
            </h2>
            <p className="mt-4 text-muted-foreground">
              Ampla rede nacional com flexibilidade total para sua carga.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {fleet.map((f) => (
              <div
                key={f.label}
                className="rounded-2xl border border-border bg-card p-8 text-center transition-smooth hover:border-primary hover:shadow-elegant hover:-translate-y-1"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                  <Truck className="h-7 w-7" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold">{f.label}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Diferenciais
            </p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold">
              Tudo o que sua carga precisa
            </h2>
          </div>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
            {differentials.map((s) => (
              <article
                key={s.title}
                className="group relative rounded-2xl border border-border bg-card p-8 transition-smooth hover:border-primary hover:shadow-elegant hover:-translate-y-1"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-smooth group-hover:bg-gradient-primary group-hover:text-primary-foreground">
                  <s.icon className="h-7 w-7" />
                </div>
                <h2 className="mt-6 font-display text-2xl font-bold">{s.title}</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">{s.desc}</p>
                <ul className="mt-5 space-y-2">
                  {s.items.map((it) => (
                    <li key={it} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* DESTAQUES */}
      <section className="bg-brand-black py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: MapPin, label: "Atuação", value: "Nacional" },
              { icon: Shield, label: "Cobertura", value: "Até R$ 1 MI" },
              { icon: Clock, label: "Compromisso", value: "Prazo combinado" },
            ].map((s) => (
              <div key={s.label}>
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <s.icon className="h-7 w-7" />
                </div>
                <div className="mt-4 font-display text-3xl font-bold text-primary">{s.value}</div>
                <div className="mt-1 text-sm text-white/60 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border-2 border-primary bg-card p-12 text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold">
              Pronto para transportar com a Direta Cargas?
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Fale com nossa equipe e receba uma cotação personalizada para sua operação.
            </p>
            <Link
              to="/contato"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-elegant transition-smooth hover:bg-primary-glow hover:scale-105"
            >
              Solicitar cotação
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

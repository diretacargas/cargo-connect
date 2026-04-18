import { createFileRoute, Link } from "@tanstack/react-router";
import { Truck, Package, Snowflake, Warehouse, MapPin, Shield, ArrowRight, CheckCircle2 } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import servicesCargo from "@/assets/services-cargo.jpg";

export const Route = createFileRoute("/servicos")({
  head: () => ({
    meta: [
      { title: "Serviços de Transporte — Direta Cargas Transportes" },
      {
        name: "description",
        content:
          "Carga lotação, transporte dedicado, refrigerada e armazenagem. Soluções logísticas completas para empresas de todos os portes.",
      },
      { property: "og:title", content: "Serviços — Direta Cargas Transportes" },
      {
        property: "og:description",
        content: "Soluções logísticas completas: lotação, dedicada, refrigerada e armazenagem.",
      },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    icon: Truck,
    title: "Transporte Rodoviário",
    desc: "Frota moderna para todos os tipos de carga, com cobertura em todo o território nacional.",
    items: ["Cargas secas e líquidas", "Veículos de 1 a 30 toneladas", "Rastreamento 24/7"],
  },
  {
    icon: Package,
    title: "Carga Lotação",
    desc: "Compartilhe espaço e reduza custos sem abrir mão da agilidade na entrega.",
    items: ["Coletas diárias", "Consolidação inteligente", "Custo otimizado"],
  },
  {
    icon: MapPin,
    title: "Transporte Dedicado",
    desc: "Veículo exclusivo para sua carga, com rota e horário planejados sob demanda.",
    items: ["Exclusividade", "Maior segurança", "Flexibilidade total"],
  },
  {
    icon: Snowflake,
    title: "Carga Refrigerada",
    desc: "Cadeia de frio garantida para alimentos, medicamentos e produtos sensíveis.",
    items: ["Controle de temperatura", "Veículos certificados", "Monitoramento contínuo"],
  },
  {
    icon: Warehouse,
    title: "Armazenagem",
    desc: "Centros de distribuição estratégicos com gestão completa do seu estoque.",
    items: ["Inventário em tempo real", "Cross-docking", "Picking e packing"],
  },
  {
    icon: Shield,
    title: "Cargas Especiais",
    desc: "Transporte de cargas indivisíveis, projetos e produtos de alto valor agregado.",
    items: ["Escolta dedicada", "Seguro all-risk", "Equipe especializada"],
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
              Soluções logísticas{" "}
              <span className="text-primary">sob medida</span>
            </h1>
            <p className="mt-6 text-lg text-white/80 max-w-2xl">
              Atendemos empresas de todos os portes com um portfólio completo de serviços
              de transporte e logística.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
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

      {/* CTA */}
      <section className="pb-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border-2 border-primary bg-card p-12 text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold">
              Não encontrou o serviço que procura?
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Fale com nossa equipe e desenvolvemos uma solução personalizada para sua operação.
            </p>
            <Link
              to="/contato"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-elegant transition-smooth hover:bg-primary-glow hover:scale-105"
            >
              Solicitar atendimento
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Truck, Shield, Clock, MapPin, ArrowRight, CheckCircle2, Package, Zap, Globe2,
} from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import heroTruck from "@/assets/hero-truck.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Direta Cargas Transportes — Transporte em Todo o Brasil" },
      {
        name: "description",
        content:
          "Transporte de cargas com segurança, agilidade e tecnologia. Frota moderna, rastreamento em tempo real e cobertura nacional.",
      },
      { property: "og:title", content: "Direta Cargas Transportes" },
      {
        property: "og:description",
        content: "Frota moderna, rastreamento em tempo real e cobertura nacional.",
      },
    ],
  }),
  component: HomePage,
});

const features = [
  { icon: Shield, title: "100% Seguro", desc: "Cargas seguradas e monitoradas 24/7." },
  { icon: Clock, title: "Pontualidade", desc: "Entregas no prazo, sempre." },
  { icon: Globe2, title: "Cobertura Nacional", desc: "Atendemos todos os estados do Brasil." },
  { icon: Zap, title: "Tecnologia", desc: "Rastreamento em tempo real via app." },
];

const stats = [
  { value: "15+", label: "Anos de mercado" },
  { value: "500+", label: "Veículos na frota" },
  { value: "98%", label: "Entregas no prazo" },
  { value: "27", label: "Estados atendidos" },
];

function HomePage() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-brand-black">
        <img
          src={heroTruck}
          alt="Caminhão Direta Cargas Transportes em estrada ao pôr do sol"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Transportando o Brasil há 15 anos
            </div>
            <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05]">
              Sua carga no destino,{" "}
              <span className="text-primary">no tempo certo.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-2xl leading-relaxed">
              Soluções logísticas inteligentes para empresas que não podem parar.
              Frota moderna, rastreamento em tempo real e atendimento dedicado.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/contato"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-elegant transition-smooth hover:bg-primary-glow hover:scale-105"
              >
                Solicitar Cotação
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/servicos"
                className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/5 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-smooth hover:bg-white/10"
              >
                Nossos Serviços
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border bg-brand-black text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-4xl sm:text-5xl font-bold text-primary">
                  {s.value}
                </div>
                <div className="mt-2 text-sm text-white/60">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Por que escolher
            </p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold">
              Logística que move seu negócio
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Combinamos experiência, tecnologia e uma equipe dedicada para entregar
              resultados que você pode contar.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="group relative rounded-xl border border-border bg-card p-6 transition-smooth hover:border-primary hover:shadow-elegant hover:-translate-y-1"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-smooth group-hover:bg-gradient-primary group-hover:text-primary-foreground">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="bg-muted/30 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Nossos serviços
              </p>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold">
                Da carga lotação ao transporte dedicado
              </h2>
              <ul className="mt-8 space-y-4">
                {[
                  "Carga lotação para todo o Brasil",
                  "Transporte dedicado com exclusividade",
                  "Logística especializada e cargas refrigeradas",
                  "Armazenagem e gestão de estoque",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                    <span className="text-base">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/servicos"
                className="mt-10 inline-flex items-center gap-2 rounded-md bg-foreground px-6 py-3 text-sm font-semibold text-background transition-smooth hover:bg-primary"
              >
                Ver todos os serviços <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Truck, label: "Rodoviário" },
                { icon: Package, label: "Lotação" },
                { icon: MapPin, label: "Dedicado" },
                { icon: Shield, label: "Especializado" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="aspect-square rounded-2xl bg-card border border-border p-6 flex flex-col items-center justify-center text-center transition-smooth hover:bg-primary hover:text-primary-foreground hover:shadow-glow hover:-translate-y-1"
                >
                  <s.icon className="h-10 w-10" />
                  <span className="mt-3 font-semibold">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-brand-black p-12 sm:p-16 text-center shadow-elegant">
            <div className="absolute inset-0 bg-gradient-primary opacity-20" />
            <div className="relative">
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
                Pronto para mover sua carga?
              </h2>
              <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
                Solicite uma cotação personalizada e descubra como podemos otimizar sua logística.
              </p>
              <Link
                to="/contato"
                className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-glow transition-smooth hover:bg-primary-glow hover:scale-105"
              >
                Falar com especialista
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

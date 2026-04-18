import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Truck, Shield, Clock, ArrowRight, CheckCircle2, Radio, Cpu, MapPin,
} from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import heroTruck from "@/assets/hero-truck.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Direta Cargas — Transporte de Carga Lotação Nacional" },
      {
        name: "description",
        content:
          "Especialistas em carga fechada (lotação) com TAC, trucks e carretas. Seguro de até R$ 1 milhão, monitoramento 24h e cobertura nacional.",
      },
      { property: "og:title", content: "Direta Cargas — Carga Lotação Nacional" },
      {
        property: "og:description",
        content: "Carga lotação com seguro, monitoramento e tecnologia em todo o Brasil.",
      },
    ],
  }),
  component: HomePage,
});

const features = [
  { icon: Shield, title: "Seguro até R$ 1 MI", desc: "Cobertura RC-DC, RCT-RC e RC-V com a Sompo Seguros." },
  { icon: Radio, title: "Monitoramento 24h", desc: "Gerenciamento de riscos pela Vérttice com bloqueio remoto." },
  { icon: MapPin, title: "Atuação Nacional", desc: "TAC, trucks e carretas em todo o território brasileiro." },
  { icon: Cpu, title: "Tecnologia Integrada", desc: "Emissão ágil de CTE, MDF-e e integração de sistemas." },
];

const highlights = [
  { value: "R$ 1 MI", label: "Cobertura securitária" },
  { value: "Nacional", label: "Cobertura de atuação" },
  { value: "Lotação", label: "Carga fechada (FTL)" },
  { value: "24h", label: "Monitoramento" },
];

function HomePage() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-brand-black">
        <img
          src={heroTruck}
          alt="Caminhão Direta Cargas em estrada ao pôr do sol"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Especialistas em Carga Fechada — Full Truck
            </div>
            <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05]">
              Transporte sem complicação,{" "}
              <span className="text-primary">com eficiência do início ao fim.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-2xl leading-relaxed">
              Soluções completas em carga lotação para todo o Brasil. Atendimento direto,
              transparente e confiável — porque cada carga é importante para o seu negócio.
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

      {/* HIGHLIGHTS */}
      <section className="border-y border-border bg-brand-black text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {highlights.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-3xl sm:text-4xl font-bold text-primary">
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
              Por que escolher a Direta Cargas
            </p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold">
              Segurança, tecnologia e compromisso
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Reunimos os melhores parceiros do setor para entregar tranquilidade
              e previsibilidade em cada operação.
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
                Carga lotação em todo o Brasil
              </h2>
              <ul className="mt-8 space-y-4">
                {[
                  "Carga fechada (FTL) com TAC, trucks e carretas",
                  "Seguro RC-DC, RCT-RC e RC-V de até R$ 1 milhão",
                  "Gerenciamento de riscos com bloqueio remoto",
                  "Tecnologia Bsoft: CTE, MDF-e e integração",
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
                { icon: Truck, label: "Lotação" },
                { icon: Shield, label: "Seguro" },
                { icon: Radio, label: "Monitoramento" },
                { icon: Clock, label: "Pontualidade" },
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

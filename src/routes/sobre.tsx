import { createFileRoute } from "@tanstack/react-router";
import { Target, Eye, Compass, Shield, CheckCircle2, Scale, Users, Heart } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import aboutFleet from "@/assets/about-fleet.jpg";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre a Direta Cargas — Especialista em Carga Lotação" },
      {
        name: "description",
        content:
          "Conheça a Direta Cargas: nascida da experiência prática no transporte rodoviário, oferecemos soluções completas em carga fechada (lotação) em todo o Brasil.",
      },
      { property: "og:title", content: "Sobre Nós — Direta Cargas" },
      {
        property: "og:description",
        content: "Transporte sem complicação, com eficiência do início ao fim.",
      },
    ],
  }),
  component: AboutPage,
});

const pillars = [
  { icon: Target, title: "Missão", desc: "Oferecer soluções em transporte de cargas com eficiência, segurança e pontualidade, garantindo a entrega do início ao destino final e atendendo com excelência às necessidades de cada cliente." },
  { icon: Eye, title: "Visão", desc: "Ser referência no transporte de carga lotação em todo o território nacional, reconhecida pela confiabilidade, agilidade e qualidade no atendimento." },
  { icon: Compass, title: "Propósito", desc: "Conectar negócios em todo o Brasil por meio de um transporte ágil, seguro e eficiente, contribuindo para o crescimento dos nossos clientes e o desenvolvimento do país." },
];

const values = [
  { icon: Shield, title: "Segurança", desc: "Garantimos a integridade das cargas por meio do uso de veículos adequados, processos rigorosos e monitoramento contínuo das operações." },
  { icon: CheckCircle2, title: "Confiabilidade", desc: "Cumprimos prazos e compromissos com precisão, assegurando entregas dentro do tempo acordado e com total previsibilidade." },
  { icon: Scale, title: "Ética e Integridade", desc: "Atuamos com transparência, honestidade e responsabilidade em todas as relações, fortalecendo a confiança com clientes, colaboradores e parceiros." },
  { icon: Users, title: "Foco no Cliente", desc: "Colocamos o cliente no centro das nossas decisões, buscando compreender suas necessidades e superar expectativas em cada entrega." },
  { icon: Heart, title: "Respeito", desc: "Valorizamos as pessoas e cultivamos relações baseadas no respeito, colaboração e profissionalismo em toda a cadeia de operação." },
];

function AboutPage() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative bg-brand-black text-white py-24 overflow-hidden">
        <img
          src={aboutFleet}
          alt="Frota de caminhões Direta Cargas em centro de distribuição"
          width={1600}
          height={1024}
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/60 via-brand-black/70 to-brand-black" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Quem somos
            </p>
            <h1 className="mt-3 font-display text-5xl sm:text-6xl font-bold">
              Transporte sem <span className="text-primary">complicação</span>
            </h1>
            <p className="mt-6 text-lg text-white/80 max-w-2xl">
              Especialistas em carga lotação, com eficiência do início ao fim.
              Atendimento direto, transparente e confiável em todo o território nacional.
            </p>
          </div>
        </div>
      </section>

      {/* HISTORY */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Nossa história
          </p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold">
            Construída na prática, entregue com excelência
          </h2>
          <div className="mt-8 space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              A <span className="text-foreground font-semibold">Direta Cargas</span> nasceu
              da experiência real de quem conhece o transporte rodoviário na prática. Com uma
              trajetória construída ao longo de mais de uma década no setor, seu fundador
              transformou conhecimento e dedicação em uma empresa preparada para atender com
              eficiência as demandas do mercado.
            </p>
            <p>
              Hoje, a Direta Cargas oferece soluções completas em transporte de
              <span className="text-foreground font-semibold"> carga lotação</span>,
              garantindo agilidade, segurança e pontualidade em cada operação.
            </p>
            <p>
              Atuamos em todo o território nacional, conectando empresas e entregando
              resultados com excelência. Nosso compromisso é simplificar a logística dos
              nossos clientes, oferecendo um atendimento direto, transparente e confiável —
              porque entendemos que cada carga é importante para o seu negócio.
            </p>
          </div>
        </div>
      </section>

      {/* MISSÃO / VISÃO / PROPÓSITO */}
      <section className="bg-muted/30 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Nossa essência
            </p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold">
              O que nos move
            </h2>
          </div>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl bg-card border border-border p-8 transition-smooth hover:border-primary hover:shadow-elegant hover:-translate-y-1"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground shadow-glow">
                  <p.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold">{p.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALORES */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Nossos pilares
            </p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold">
              Valores que nos guiam
            </h2>
          </div>
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl bg-card border border-border p-8 transition-smooth hover:border-primary hover:shadow-elegant hover:-translate-y-1"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

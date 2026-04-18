import { createFileRoute } from "@tanstack/react-router";
import { Target, Eye, Heart, Award } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import aboutFleet from "@/assets/about-fleet.jpg";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre a Direta Cargas Transportes — Nossa História" },
      {
        name: "description",
        content:
          "Conheça a Direta Cargas Transportes: 15 anos transportando o Brasil com segurança, inovação e compromisso com cada cliente.",
      },
      { property: "og:title", content: "Sobre Nós — Direta Cargas Transportes" },
      {
        property: "og:description",
        content: "15 anos transportando o Brasil com segurança, inovação e compromisso.",
      },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: Target, title: "Missão", desc: "Conectar pessoas e mercados através de soluções logísticas eficientes, seguras e sustentáveis." },
  { icon: Eye, title: "Visão", desc: "Ser referência nacional em transporte de cargas, reconhecida pela excelência e inovação." },
  { icon: Heart, title: "Valores", desc: "Compromisso, segurança, ética, inovação e respeito a clientes, colaboradores e meio ambiente." },
  { icon: Award, title: "Qualidade", desc: "Certificações e processos auditados garantem o mais alto padrão em todas as operações." },
];

function AboutPage() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative bg-brand-black text-white py-24 overflow-hidden">
        <img
          src={aboutFleet}
          alt="Frota de caminhões Direta Cargas Transportes em centro de distribuição"
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
              Movidos por <span className="text-primary">confiança</span>
            </h1>
            <p className="mt-6 text-lg text-white/80 max-w-2xl">
              Há mais de 15 anos transportando os produtos que movem o Brasil,
              com o compromisso de entregar excelência em cada quilômetro.
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
            De um caminhão a uma frota nacional
          </h2>
          <div className="mt-8 space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              A Direta Cargas Transportes nasceu em 2010 com um único caminhão e um propósito claro:
              transportar não apenas mercadorias, mas a confiança de quem entrega seu negócio
              em nossas mãos. Desde então, crescemos junto com nossos clientes.
            </p>
            <p>
              Hoje, somos uma das transportadoras de referência no país, com mais de
              <span className="text-foreground font-semibold"> 500 veículos </span>
              em operação, equipe especializada e tecnologia de ponta para garantir
              que cada entrega seja realizada com a máxima eficiência e segurança.
            </p>
            <p>
              Investimos continuamente em renovação de frota, capacitação de pessoas e
              em práticas sustentáveis, porque acreditamos que crescer com responsabilidade
              é o único caminho.
            </p>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-muted/30 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Nossos pilares
            </p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold">
              O que nos guia
            </h2>
          </div>
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl bg-card border border-border p-8 transition-smooth hover:border-primary hover:shadow-elegant hover:-translate-y-1"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground shadow-glow">
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NUMBERS */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-brand-black p-12 sm:p-16 text-white">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
              {[
                { v: "15+", l: "Anos de mercado" },
                { v: "500+", l: "Veículos próprios" },
                { v: "1.200+", l: "Colaboradores" },
                { v: "10k+", l: "Clientes atendidos" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-5xl sm:text-6xl font-bold text-primary">
                    {s.v}
                  </div>
                  <div className="mt-2 text-white/60">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

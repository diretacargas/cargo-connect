import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Direta Cargas Transportes" },
      {
        name: "description",
        content:
          "Entre em contato com a Direta Cargas Transportes. Solicite uma cotação personalizada para sua carga ou tire suas dúvidas com nossos especialistas.",
      },
      { property: "og:title", content: "Contato — Direta Cargas Transportes" },
      {
        property: "og:description",
        content: "Solicite uma cotação personalizada para sua carga.",
      },
    ],
  }),
  component: ContactPage,
});

const channels = [
  { icon: Phone, label: "Telefone", value: "(11) 4002-8922", href: "tel:+551140028922" },
  { icon: Mail, label: "E-mail", value: "comercial@diretacargas.com.br", href: "mailto:comercial@diretacargas.com.br" },
  { icon: MapPin, label: "Endereço", value: "Av. das Indústrias, 1500 — São Paulo/SP" },
  { icon: Clock, label: "Atendimento", value: "Seg a Sex, 8h às 18h" },
];

function ContactPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setSent(false), 5000);
  }

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="bg-brand-black text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Fale conosco
            </p>
            <h1 className="mt-3 font-display text-5xl sm:text-6xl font-bold">
              Vamos mover sua <span className="text-primary">carga</span> juntos
            </h1>
            <p className="mt-6 text-lg text-white/80 max-w-2xl">
              Preencha o formulário ou utilize um dos nossos canais de atendimento.
              Nossa equipe responde em até 2 horas úteis.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* CHANNELS */}
            <div className="lg:col-span-2 space-y-4">
              {channels.map((c) => {
                const inner = (
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <c.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                        {c.label}
                      </div>
                      <div className="mt-1 text-lg font-medium">{c.value}</div>
                    </div>
                  </div>
                );
                return c.href ? (
                  <a
                    key={c.label}
                    href={c.href}
                    className="block rounded-xl border border-border bg-card p-6 transition-smooth hover:border-primary hover:shadow-elegant"
                  >
                    {inner}
                  </a>
                ) : (
                  <div
                    key={c.label}
                    className="rounded-xl border border-border bg-card p-6"
                  >
                    {inner}
                  </div>
                );
              })}
            </div>

            {/* FORM */}
            <div className="lg:col-span-3">
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-border bg-card p-8 shadow-elegant"
              >
                <h2 className="font-display text-2xl font-bold">Solicitar cotação</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Preencha os dados abaixo e nossa equipe entrará em contato.
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field name="nome" label="Nome completo" required />
                  <Field name="empresa" label="Empresa" />
                  <Field name="email" label="E-mail" type="email" required />
                  <Field name="telefone" label="Telefone" type="tel" required />
                  <Field name="origem" label="Origem da carga" />
                  <Field name="destino" label="Destino" />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2">Detalhes da carga</label>
                  <textarea
                    name="mensagem"
                    rows={4}
                    required
                    placeholder="Tipo de carga, peso, dimensões, prazo desejado..."
                    className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm transition-smooth focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-6 inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-md bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-elegant transition-smooth hover:bg-primary-glow hover:scale-[1.02]"
                >
                  <Send className="h-4 w-4" />
                  Enviar solicitação
                </button>

                {sent && (
                  <div className="mt-4 flex items-center gap-2 rounded-md bg-primary/10 border border-primary/30 p-4 text-sm text-primary">
                    <CheckCircle2 className="h-5 w-5 shrink-0" />
                    <span>Solicitação enviada! Entraremos em contato em breve.</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({
  name, label, type = "text", required = false,
}: { name: string; label: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium mb-2">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm transition-smooth focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}

import { Link } from "@tanstack/react-router";
import { Truck, Mail, Phone, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-brand-black text-white/80 mt-20">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-primary">
                <Truck className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
              </div>
              <span className="font-display text-lg font-bold text-white leading-tight">
                Direta <span className="text-primary">Cargas</span> Transportes
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">
              Soluções completas em transporte de cargas para todo o Brasil. Pontualidade,
              segurança e tecnologia em cada entrega.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white">Navegação</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/" className="hover:text-primary transition-smooth">Início</Link></li>
              <li><Link to="/servicos" className="hover:text-primary transition-smooth">Serviços</Link></li>
              <li><Link to="/sobre" className="hover:text-primary transition-smooth">Sobre</Link></li>
              <li><Link to="/contato" className="hover:text-primary transition-smooth">Contato</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white">Contato</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <span>(11) 4002-8922</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <span>contato@diretacargas.com.br</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <span>São Paulo — SP</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} Direta Cargas Transportes. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}

import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo-horizontal.png";

export function PublicFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#111c2a] text-white/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">
        <div>
          <img src={logo} alt="Vasconcelos & Nogueira" className="h-10 w-auto brightness-0 invert opacity-90" />
          <p className="mt-4 max-w-xs text-sm text-white/60">
            Hub jurídico inteligente para organizar casos, controlar prazos e produzir documentos com apoio de IA.
          </p>
        </div>
        <div>
          <p className="label-caps text-[var(--gold)]">Plataforma</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/recursos" className="hover:text-[var(--gold)]">Recursos</Link></li>
            <li><Link to="/ia-juridica" className="hover:text-[var(--gold)]">IA Jurídica</Link></li>
            <li><Link to="/planos" className="hover:text-[var(--gold)]">Planos</Link></li>
            <li><Link to="/faq" className="hover:text-[var(--gold)]">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <p className="label-caps text-[var(--gold)]">Contato</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>contato@vneadvogados.com.br</li>
            <li>+55 (11) 4002-8922</li>
            <li>Av. Paulista, 1000 — São Paulo/SP</li>
          </ul>
        </div>
        <div>
          <p className="label-caps text-[var(--gold)]">Comece agora</p>
          <p className="mt-4 text-sm text-white/70">
            Apresente a plataforma à sua equipe e tenha uma demonstração guiada.
          </p>
          <Link
            to="/contato"
            className="mt-4 inline-flex items-center justify-center rounded-md bg-[var(--gold)] px-5 py-2.5 text-sm font-medium text-white"
          >
            Solicitar demonstração
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Vasconcelos & Nogueira Advogados Associados. Todos os direitos reservados.</p>
          <p>Política de privacidade · Termos de uso</p>
        </div>
      </div>
    </footer>
  );
}

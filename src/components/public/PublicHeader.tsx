import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo-horizontal.png";

export function PublicHeader() {
  const links = [
    { to: "/", label: "Início" },
    { to: "/recursos", label: "Recursos" },
    { to: "/ia-juridica", label: "IA Jurídica" },
    { to: "/planos", label: "Planos" },
    { to: "/faq", label: "FAQ" },
    { to: "/contato", label: "Contato" },
  ] as const;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Vasconcelos & Nogueira" className="h-10 w-auto" />
        </Link>
        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="text-sm text-foreground/75 transition-colors hover:text-[var(--gold)] data-[status=active]:text-[var(--gold)]"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden text-sm text-foreground/80 hover:text-foreground sm:inline"
          >
            Entrar
          </Link>
          <Link
            to="/contato"
            className="inline-flex items-center justify-center rounded-md bg-[var(--gold)] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-opacity hover:opacity-90"
          >
            Solicitar demonstração
          </Link>
        </div>
      </div>
    </header>
  );
}

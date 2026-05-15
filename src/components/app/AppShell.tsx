import { Link, useRouterState } from "@tanstack/react-router";
import { useState, ReactNode } from "react";
import {
  LayoutDashboard,
  Briefcase,
  CalendarClock,
  Sparkles,
  CheckSquare,
  FileText,
  Users,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  Plus,
} from "lucide-react";
import logo from "@/assets/logo-horizontal.png";
import logoCircular from "@/assets/logo-circular.png";
import { cn } from "@/lib/utils";

type NavItem = { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean };

const nav: NavItem[] = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/app/casos", label: "Casos", icon: Briefcase },
  { to: "/app/prazos", label: "Prazos", icon: CalendarClock },
  { to: "/app/peticoes", label: "Petições com IA", icon: Sparkles },
  { to: "/app/tarefas", label: "Tarefas", icon: CheckSquare },
  { to: "/app/documentos", label: "Documentos", icon: FileText },
  { to: "/app/usuarios", label: "Usuários", icon: Users },
  { to: "/app/alertas", label: "Alertas", icon: Bell },
  { to: "/app/configuracoes", label: "Configurações", icon: Settings },
];

export function AppShell({ children }: { children: ReactNode }) {
  const [openMobile, setOpenMobile] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar - desktop */}
      <aside className="hidden w-64 flex-col bg-[#111c2a] text-white lg:flex">
        <SidebarInner path={path} />
      </aside>

      {/* Sidebar - mobile drawer */}
      {openMobile && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpenMobile(false)} />
          <aside className="relative flex h-full w-72 flex-col bg-[#111c2a] text-white">
            <button
              className="absolute right-3 top-3 rounded-md p-2 text-white/70 hover:bg-white/10"
              onClick={() => setOpenMobile(false)}
              aria-label="Fechar menu"
            >
              <X className="h-5 w-5" />
            </button>
            <SidebarInner path={path} onNavigate={() => setOpenMobile(false)} />
          </aside>
        </div>
      )}

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/90 px-4 backdrop-blur lg:px-8">
          <button
            className="rounded-md p-2 text-foreground/70 hover:bg-muted lg:hidden"
            onClick={() => setOpenMobile(true)}
            aria-label="Abrir menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="relative hidden max-w-md flex-1 md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Buscar casos, clientes, documentos…"
              className="h-10 w-full rounded-md border border-border bg-card pl-9 pr-3 text-sm outline-none focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)]"
            />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Link
              to="/app/peticoes"
              className="hidden items-center gap-2 rounded-md bg-[var(--gold)] px-4 py-2 text-sm font-medium text-white hover:opacity-90 sm:inline-flex"
            >
              <Plus className="h-4 w-4" /> Nova petição com IA
            </Link>
            <button
              className="relative rounded-md border border-border bg-card p-2 text-foreground/70 hover:bg-muted"
              aria-label="Notificações"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[var(--danger)]" />
            </button>
            <div className="flex items-center gap-2 rounded-md border border-border bg-card px-2.5 py-1.5">
              <div className="grid h-7 w-7 place-items-center rounded-full bg-[#111c2a] text-[11px] font-semibold text-[var(--gold)]">
                MA
              </div>
              <div className="hidden text-left sm:block">
                <p className="text-xs font-medium leading-tight">Marina Azevedo</p>
                <p className="text-[10px] text-muted-foreground leading-tight">Sócia</p>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 px-4 py-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}

function SidebarInner({ path, onNavigate }: { path: string; onNavigate?: () => void }) {
  return (
    <>
      <div className="flex h-20 items-center gap-3 border-b border-white/10 px-5">
        <img src={logoCircular} alt="V&N" className="h-9 w-9 rounded-full" />
        <div>
          <p className="font-serif text-base leading-tight">Vasconcelos</p>
          <p className="font-serif text-base leading-tight">& Nogueira</p>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-5">
        <p className="label-caps mb-3 px-3 text-white/40">Operação</p>
        <ul className="space-y-1">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = item.exact ? path === item.to : path.startsWith(item.to);
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={onNavigate}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors",
                    active
                      ? "bg-[var(--gold)]/15 text-[var(--gold)]"
                      : "text-white/75 hover:bg-white/5 hover:text-white",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                  {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4">
          <p className="label-caps text-[var(--gold)]">Assistente IA</p>
          <p className="mt-2 text-sm text-white/85">
            Gere petições e insights com base no caso selecionado.
          </p>
          <Link
            to="/app/peticoes"
            onClick={onNavigate}
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[var(--gold)] px-3 py-2 text-xs font-medium text-white"
          >
            <Sparkles className="h-3.5 w-3.5" /> Nova petição com IA
          </Link>
        </div>
      </nav>
      <div className="border-t border-white/10 p-4">
        <img src={logo} alt="V&N" className="h-6 w-auto opacity-70 brightness-0 invert" />
      </div>
    </>
  );
}

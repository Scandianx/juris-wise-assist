import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import logo from "@/assets/logo-vertical.png";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar — Vasconcelos & Nogueira" },
      { name: "description", content: "Acesse sua conta na plataforma jurídica." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-[#111c2a] p-10 text-white lg:flex">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 20%, rgba(187,151,100,0.6), transparent 40%), radial-gradient(circle at 70% 70%, rgba(187,151,100,0.4), transparent 45%)",
          }}
        />
        <Link to="/" className="relative">
          <img src={logo} alt="V&N" className="h-32 w-auto brightness-0 invert opacity-90" />
        </Link>
        <div className="relative max-w-md">
          <p className="label-caps text-[var(--gold)]">Plataforma jurídica</p>
          <h2 className="mt-2 font-serif text-4xl leading-tight">
            Organize casos, controle prazos e produza petições com IA.
          </h2>
          <p className="mt-4 text-white/70">
            Sua operação jurídica em um único hub, com inteligência e segurança.
          </p>
        </div>
        <p className="relative text-xs text-white/40">© Vasconcelos & Nogueira</p>
      </aside>

      <main className="flex items-center justify-center px-6 py-12">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: "/app" });
          }}
          className="w-full max-w-sm"
        >
          <p className="label-caps text-[var(--gold)]">Bem-vindo de volta</p>
          <h1 className="mt-1 font-serif text-3xl">Entrar na plataforma</h1>
          <p className="mt-1 text-sm text-muted-foreground">Acesse com suas credenciais</p>

          <div className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">E-mail</label>
              <input
                type="email"
                defaultValue="marina@vneadvogados.com.br"
                className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)]"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Senha</label>
              <input
                type="password"
                defaultValue="••••••••"
                className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)]"
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-muted-foreground">
                <input type="checkbox" className="rounded border-border" /> Manter conectado
              </label>
              <a className="text-[var(--gold)] hover:underline" href="#">
                Esqueci minha senha
              </a>
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-[var(--gold)] py-2.5 text-sm font-medium text-white hover:opacity-90"
            >
              Entrar
            </button>
          </div>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Ainda não tem acesso?{" "}
            <Link to="/contato" className="text-[var(--gold)] hover:underline">
              Solicite uma demonstração
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
}

import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = { title: "Sign in" };

interface LoginPageProps {
  searchParams: Promise<{ next?: string; expired?: string }>;
}

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const { next, expired } = await searchParams;
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <p className="font-mono text-xs tracking-wide text-ink-muted">Portfolio admin</p>
        <h1 className="type-h2 mt-2">Sign in</h1>
        <p className="type-meta mt-2 text-ink-muted">
          {expired
            ? "Your session ended. Sign in again to carry on."
            : "With the admin login of the Portfolio API."}
        </p>
        <LoginForm next={next ?? "/admin"} />
      </div>
    </main>
  );
}

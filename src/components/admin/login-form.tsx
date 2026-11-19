"use client";

import { useActionState } from "react";
import { Loader2, LogIn } from "lucide-react";
import { login, type ActionState } from "@/app/admin/actions";

export function LoginForm({ next }: { next: string }) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(login, {});

  return (
    <form action={formAction} className="mt-8 space-y-5">
      <input type="hidden" name="next" value={next} />
      <div>
        <label htmlFor="admin-username" className="field-label">
          Username
        </label>
        <input
          id="admin-username"
          name="username"
          autoComplete="username"
          required
          className="field"
        />
      </div>
      <div>
        <label htmlFor="admin-password" className="field-label">
          Password
        </label>
        <input
          id="admin-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="field"
        />
      </div>
      {state.error ? (
        <p role="alert" className="type-meta text-error">
          {state.error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="btn-primary inline-flex h-11 w-full items-center justify-center gap-2 rounded-full text-[0.9375rem] font-medium disabled:opacity-60"
      >
        {pending ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <LogIn className="h-4 w-4" aria-hidden="true" />
        )}
        Sign in
      </button>
    </form>
  );
}

"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  CheckCircle2,
  FileText,
  Loader2,
  LogIn,
  Send,
  TriangleAlert,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { StarRating } from "./star-rating";

interface TestimonialUser {
  name: string;
  email: string;
  image?: string | null;
}

interface TestimonialFormProps {
  /** Authenticated Google user, or null when signed out (locked preview). */
  user: TestimonialUser | null;
  /** Server action that starts the Google sign-in flow. */
  signInAction?: () => Promise<void>;
}

type FormState = { phone: string; subject: string; message: string };
type FormErrors = Partial<Record<keyof FormState | "rating" | "file", string>>;
const initialForm: FormState = { phone: "", subject: "", message: "" };
const inputStyles =
  "card-surface w-full rounded-xl px-4 py-3 text-sm outline-none placeholder:text-muted focus:border-primary disabled:cursor-not-allowed disabled:opacity-60";

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function TestimonialForm({ user, signInAction }: TestimonialFormProps) {
  const locked = !user;
  const [form, setForm] = useState<FormState>(initialForm);
  const [rating, setRating] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function validate() {
    const next: FormErrors = {};
    if (!/^[+\d][\d\s\-()]{6,29}$/.test(form.phone.trim()))
      next.phone = "Enter a valid phone number.";
    if (!form.subject.trim()) next.subject = "Subject is required.";
    if (form.message.trim().length < 10)
      next.message = "Please write a testimonial of at least 10 characters.";
    if (!rating) next.rating = "Please select a rating.";
    if (
      file &&
      (file.size > 5 * 1024 * 1024 ||
        ![
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(file.type))
    )
      next.file = "Choose a PDF, DOC, or DOCX file smaller than 5 MB.";
    return next;
  }

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  }
  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0] ?? null;
    setFile(selected);
    setErrors((current) => ({ ...current, file: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (locked) return;
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setStatus("sending");
    setErrorMessage("");
    const data = new FormData();
    data.set("phone", form.phone.trim());
    data.set("subject", form.subject.trim());
    data.set("message", form.message.trim());
    data.set("rating", String(rating));
    if (file) data.set("referenceLetter", file);
    try {
      const response = await fetch("/api/testimonials", { method: "POST", body: data });
      const result = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;
      if (!response.ok)
        throw new Error(result?.error ?? "Could not submit your testimonial.");
      setForm(initialForm);
      setFile(null);
      setRating(0);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Could not submit your testimonial.",
      );
    }
  }

  if (status === "success")
    return (
      <Card className="bg-primary-soft flex flex-col items-center px-6 py-12 text-center">
        <CheckCircle2 className="text-primary h-12 w-12" aria-hidden="true" />
        <h3 className="mt-4 text-xl font-bold tracking-tight">Testimonial received!</h3>
        <p className="text-muted mt-2 max-w-sm text-sm leading-relaxed">
          Thank you for sharing your experience. Your verified testimonial is awaiting
          review.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="border-border-strong hover:border-primary hover:text-primary mt-6 rounded-full border px-5 py-2 text-sm font-medium transition-colors"
        >
          Submit another testimonial
        </button>
      </Card>
    );

  const fields = (
    <>
      <fieldset disabled={locked} className="contents">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="testimonial-name" className="mb-2 block text-sm font-medium">
              Name
            </label>
            <input
              id="testimonial-name"
              value={user?.name ?? ""}
              readOnly
              placeholder="Filled from your Google account"
              className="border-border bg-muted/40 text-muted h-11 w-full rounded-xl border px-4 text-sm disabled:opacity-60"
            />
          </div>
          <div>
            <label htmlFor="testimonial-email" className="mb-2 block text-sm font-medium">
              Email
            </label>
            <input
              id="testimonial-email"
              value={user?.email ?? ""}
              readOnly
              placeholder="Filled from your Google account"
              className="border-border bg-muted/40 text-muted h-11 w-full rounded-xl border px-4 text-sm disabled:opacity-60"
            />
          </div>
        </div>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="testimonial-phone" className="mb-2 block text-sm font-medium">
              Phone number
            </label>
            <input
              id="testimonial-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+92 300 0000000"
              value={form.phone}
              onChange={handleChange}
              aria-invalid={Boolean(errors.phone)}
              className={cn(inputStyles, errors.phone && "border-red-500")}
            />
            {errors.phone && (
              <p role="alert" className="mt-1.5 text-xs text-red-500">
                {errors.phone}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="testimonial-subject"
              className="mb-2 block text-sm font-medium"
            >
              Subject
            </label>
            <input
              id="testimonial-subject"
              name="subject"
              placeholder="Project collaboration"
              value={form.subject}
              onChange={handleChange}
              aria-invalid={Boolean(errors.subject)}
              className={cn(inputStyles, errors.subject && "border-red-500")}
            />
            {errors.subject && (
              <p role="alert" className="mt-1.5 text-xs text-red-500">
                {errors.subject}
              </p>
            )}
          </div>
        </div>
        <div className="mt-5">
          <label htmlFor="testimonial-message" className="mb-2 block text-sm font-medium">
            Testimonial
          </label>
          <textarea
            id="testimonial-message"
            name="message"
            rows={3}
            placeholder="Share your experience working together…"
            value={form.message}
            onChange={handleChange}
            aria-invalid={Boolean(errors.message)}
            className={cn(inputStyles, "resize-y", errors.message && "border-red-500")}
          />
          {errors.message && (
            <p role="alert" className="mt-1.5 text-xs text-red-500">
              {errors.message}
            </p>
          )}
        </div>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-medium">Rating</p>
            <StarRating
              value={rating}
              onChange={(value) => {
                setRating(value);
                setErrors((current) => ({ ...current, rating: undefined }));
              }}
              disabled={locked || status === "sending"}
            />
            {errors.rating && (
              <p role="alert" className="mt-1.5 text-xs text-red-500">
                {errors.rating}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="testimonial-file" className="mb-2 block text-sm font-medium">
              Reference letter{" "}
              <span className="text-muted font-normal">(optional, PDF/DOC/DOCX)</span>
            </label>
            <input
              id="testimonial-file"
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleFile}
              className="sr-only"
            />
            <label
              htmlFor="testimonial-file"
              className={cn(
                "border-border text-muted flex items-center gap-2 rounded-xl border border-dashed px-4 py-3 text-sm",
                locked
                  ? "cursor-not-allowed opacity-60"
                  : "hover:border-primary hover:text-primary cursor-pointer",
              )}
            >
              <FileText className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="truncate">{file ? file.name : "Choose a document"}</span>
            </label>
            {file && (
              <button
                type="button"
                onClick={() => setFile(null)}
                className="text-muted hover:text-foreground mt-2 inline-flex items-center gap-1 text-xs"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
                Remove file
              </button>
            )}
            {errors.file && (
              <p role="alert" className="mt-1.5 text-xs text-red-500">
                {errors.file}
              </p>
            )}
          </div>
        </div>
        <input
          name="company"
          tabIndex={-1}
          autoComplete="off"
          className="sr-only"
          aria-hidden="true"
        />
      </fieldset>
      {!locked && (
        <>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button type="submit" size="lg" disabled={status === "sending"}>
              {status === "sending" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Sending…
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" aria-hidden="true" />
                  Submit for review
                </>
              )}
            </Button>
            <p className="text-muted text-xs">
              Only approved testimonials are published publicly.
            </p>
          </div>
          {status === "error" && (
            <p
              role="alert"
              className="mt-4 flex items-start gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-500"
            >
              <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{errorMessage}</span>
            </p>
          )}
        </>
      )}
    </>
  );

  return (
    <Card className="p-6 sm:p-8">
      <div className="flex items-center gap-3">
        {user?.image ? (
          <span
            role="img"
            aria-label="Your Google profile image"
            className="h-11 w-11 rounded-full bg-cover bg-center"
            style={{ backgroundImage: `url(${user.image})` }}
          />
        ) : (
          <span className="bg-primary-soft text-primary flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold">
            {user ? initials(user.name) : "?"}
          </span>
        )}
        <div>
          <p className="font-semibold">Share your experience</p>
          <p className="text-muted text-sm">
            Your identity is verified through Google before publication.
          </p>
        </div>
      </div>

      {locked && (
        <div className="border-primary/30 bg-primary-soft mt-6 flex flex-col gap-4 rounded-xl border border-dashed p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
          <p className="text-sm leading-relaxed">
            To keep testimonials authentic, sign in with Google to enable the form. Your
            name and email are filled in automatically once you sign in.
          </p>
          {signInAction && (
            <form action={signInAction} className="shrink-0">
              <Button type="submit">
                <LogIn className="h-4 w-4" aria-hidden="true" />
                Sign in with Google
              </Button>
            </form>
          )}
        </div>
      )}

      {locked ? (
        <div className="mt-7">
          {fields}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            {signInAction && (
              <form action={signInAction}>
                <Button type="submit" size="lg">
                  <LogIn className="h-4 w-4" aria-hidden="true" />
                  Sign in to submit
                </Button>
              </form>
            )}
            <p className="text-muted text-xs">
              Only approved testimonials are published publicly.
            </p>
          </div>
        </div>
      ) : (
        <form className="mt-7" onSubmit={handleSubmit} noValidate>
          {fields}
        </form>
      )}
    </Card>
  );
}

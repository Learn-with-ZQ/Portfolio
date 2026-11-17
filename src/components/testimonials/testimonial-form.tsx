"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import {
  CheckCircle2,
  FileText,
  Loader2,
  LogIn,
  Send,
  TriangleAlert,
  Undo2,
  X,
} from "lucide-react";
import type { MyTestimonial, StatusTone, TestimonialStatus } from "@/types";
import { Button } from "@/components/ui/button";
import { Status } from "@/components/ui/badge";
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
  /** The visitor's saved testimonial, which the form edits. */
  existing?: MyTestimonial | null;
  /** Signed in, but the Google token has expired: ask them to sign in again. */
  needsReauth?: boolean;
  /** Signed in, but their saved testimonial couldn't be loaded. */
  loadFailed?: boolean;
}

type FormState = { phone: string; subject: string; message: string };
type FormErrors = Partial<Record<keyof FormState | "rating" | "file", string>>;

/** 4 MB: Vercel refuses request bodies over 4.5 MB. */
const MAX_FILE_SIZE = 4 * 1024 * 1024;
const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

/**
 * What the visitor typed, kept across the Google sign-in redirect when their
 * one-hour token runs out mid-edit (the redirect would otherwise lose it).
 * Per tab, cleared once restored. A chosen file can't be kept.
 */
const DRAFT_KEY = "testimonial-draft";
type Draft = FormState & { rating: number; hadFile: boolean };

// How the author sees each review status (UI.md R19: teal = in progress).
const statusView: Record<TestimonialStatus, { label: string; tone: StatusTone; note: string }> = {
  Pending: {
    label: "Waiting for review",
    tone: "pending",
    note: "You can still make changes; saving keeps it in review.",
  },
  Approved: {
    label: "Published",
    tone: "verified",
    note: "It's on this page. Saving changes sends it back for review.",
  },
  Rejected: {
    label: "Not published",
    tone: "neutral",
    note: "You can edit it and submit it for review again.",
  },
};

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="type-meta mt-1.5 text-error">
      {message}
    </p>
  );
}

function SignInPanel({
  message,
  signInAction,
}: {
  message: string;
  signInAction?: () => Promise<void>;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-dashed border-rule-strong p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <p className="type-meta text-ink">{message}</p>
      {signInAction ? (
        <form action={signInAction} className="shrink-0">
          <Button type="submit">
            <LogIn className="h-4 w-4" aria-hidden="true" />
            Sign in with Google
          </Button>
        </form>
      ) : null}
    </div>
  );
}

export function TestimonialForm({
  user,
  signInAction,
  existing = null,
  needsReauth = false,
  loadFailed = false,
}: TestimonialFormProps) {
  const locked = !user;
  const [saved, setSaved] = useState<MyTestimonial | null>(existing);
  const [form, setForm] = useState<FormState>({
    phone: existing?.phone ?? "",
    subject: existing?.subject ?? "",
    message: existing?.message ?? "",
  });
  const [rating, setRating] = useState<number>(existing?.rating ?? 0);
  const [file, setFile] = useState<File | null>(null);
  const [removeDocument, setRemoveDocument] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [reauth, setReauth] = useState(needsReauth);
  // Status before the last save, for the success message.
  const [previousStatus, setPreviousStatus] = useState<TestimonialStatus | null>(null);
  // A draft was kept for after sign-in / was restored after it.
  const [draftKept, setDraftKept] = useState(false);
  const [restored, setRestored] = useState<"text" | "text-and-file" | null>(null);

  // Restore what the visitor typed before a forced sign-in. Runs after
  // hydration, so the server-rendered form and the first client render match.
  useEffect(() => {
    if (locked || reauth) return;
    try {
      const raw = window.sessionStorage.getItem(DRAFT_KEY);
      if (!raw) return;
      window.sessionStorage.removeItem(DRAFT_KEY);
      const draft = JSON.parse(raw) as Partial<Draft>;
      setForm({
        phone: String(draft.phone ?? ""),
        subject: String(draft.subject ?? ""),
        message: String(draft.message ?? ""),
      });
      if (typeof draft.rating === "number" && draft.rating >= 1 && draft.rating <= 5)
        setRating(draft.rating);
      setRestored(draft.hadFile ? "text-and-file" : "text");
    } catch {
      // Storage blocked or the draft unreadable: start from the saved values.
    }
  }, [locked, reauth]);

  const currentDocument =
    saved?.documentName && !removeDocument ? { name: saved.documentName } : null;

  function validate() {
    const next: FormErrors = {};
    if (!/^[+\d][\d\s\-()]{6,29}$/.test(form.phone.trim()))
      next.phone = "Enter a valid phone number.";
    if (!form.subject.trim()) next.subject = "Subject is required.";
    if (form.message.trim().length < 10)
      next.message = "Please write a testimonial of at least 10 characters.";
    if (!rating) next.rating = "Please select a rating.";
    if (file && (file.size > MAX_FILE_SIZE || !ALLOWED_FILE_TYPES.includes(file.type)))
      next.file = "Choose a PDF, DOC, or DOCX file of 4 MB or less.";
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
    else if (removeDocument) data.set("removeDocument", "true");
    try {
      const response = await fetch("/api/testimonials", { method: "POST", body: data });
      const result = (await response.json().catch(() => null)) as {
        error?: string;
        reauth?: boolean;
        testimonial?: MyTestimonial;
      } | null;
      if (response.status === 401 && result?.reauth) {
        try {
          const draft: Draft = { ...form, rating, hadFile: Boolean(file) };
          window.sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
          setDraftKept(true);
        } catch {
          // Storage blocked: the panel then makes no promise about the text.
        }
        setStatus("idle");
        setReauth(true);
        return;
      }
      if (!response.ok)
        throw new Error(result?.error ?? "Could not save your testimonial.");
      setPreviousStatus(saved?.status ?? null);
      if (result?.testimonial) setSaved(result.testimonial);
      setFile(null);
      setRemoveDocument(false);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Could not save your testimonial.",
      );
    }
  }

  if (!locked && reauth)
    return (
      <div className="surface p-6 sm:p-8">
        <SignInPanel
          message={
            draftKept
              ? "Your Google sign-in has expired. Sign in again and what you wrote will be waiting; a letter you chose will need choosing again."
              : "Sign in with Google again to see or edit your testimonial. For your security, a sign-in here lasts an hour."
          }
          signInAction={signInAction}
        />
      </div>
    );

  if (!locked && loadFailed)
    return (
      <div role="status" className="surface p-6 sm:p-8">
        <h3 className="type-h3">Your testimonial couldn&apos;t be loaded</h3>
        <p className="type-body mt-2 text-ink-muted">
          Refresh the page in a minute to see or edit it.
        </p>
      </div>
    );

  if (status === "success") {
    const isEdit = previousStatus !== null;
    return (
      <div role="status" className="surface flex flex-col items-start p-6 sm:p-8">
        <CheckCircle2 className="h-8 w-8 text-primary" aria-hidden="true" />
        <h3 className="type-h3 mt-4">{isEdit ? "Changes saved" : "Testimonial received"}</h3>
        <p className="type-body mt-2 text-ink-muted">
          {previousStatus === "Approved"
            ? "Your testimonial is back in review, and it'll be published again once I've approved the changes."
            : isEdit
              ? "It's waiting for review, and it'll be published once I've approved it."
              : "Thank you for sharing your experience. It's waiting for review, and it'll be published once I've approved it."}
        </p>
        <Button variant="secondary" className="mt-6" onClick={() => setStatus("idle")}>
          Edit your testimonial
        </Button>
      </div>
    );
  }

  const view = saved ? statusView[saved.status] : null;

  const fields = (
    <fieldset disabled={locked} className="contents">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="testimonial-name" className="field-label">
            Name
          </label>
          <input
            id="testimonial-name"
            value={user?.name ?? ""}
            readOnly
            placeholder="Filled from your Google account"
            className="field"
          />
        </div>
        <div>
          <label htmlFor="testimonial-email" className="field-label">
            Email
          </label>
          <input
            id="testimonial-email"
            value={user?.email ?? ""}
            readOnly
            placeholder="Filled from your Google account"
            className="field"
          />
        </div>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="testimonial-phone" className="field-label">
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
            aria-describedby={errors.phone ? "testimonial-phone-error" : undefined}
            className="field"
          />
          <FieldError id="testimonial-phone-error" message={errors.phone} />
        </div>
        <div>
          <label htmlFor="testimonial-subject" className="field-label">
            Subject
          </label>
          <input
            id="testimonial-subject"
            name="subject"
            placeholder="Project collaboration"
            value={form.subject}
            onChange={handleChange}
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? "testimonial-subject-error" : undefined}
            className="field"
          />
          <FieldError id="testimonial-subject-error" message={errors.subject} />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="testimonial-message" className="field-label">
          Testimonial
        </label>
        <textarea
          id="testimonial-message"
          name="message"
          rows={4}
          placeholder="Share your experience working together…"
          value={form.message}
          onChange={handleChange}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "testimonial-message-error" : undefined}
          className="field resize-y"
        />
        <FieldError id="testimonial-message-error" message={errors.message} />
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <p className="field-label" id="testimonial-rating-label">
            Rating
          </p>
          <StarRating
            value={rating}
            onChange={(value) => {
              setRating(value);
              setErrors((current) => ({ ...current, rating: undefined }));
            }}
            disabled={locked || status === "sending"}
          />
          <FieldError id="testimonial-rating-error" message={errors.rating} />
        </div>
        <div>
          <label htmlFor="testimonial-file" className="field-label">
            Reference letter{" "}
            <span className="font-normal text-ink-muted">(optional, PDF/DOC/DOCX, 4 MB)</span>
          </label>

          {currentDocument && !file ? (
            <p className="type-meta mb-2 flex min-w-0 items-center gap-2 text-ink">
              <FileText className="h-4 w-4 shrink-0 text-ink-muted" aria-hidden="true" />
              <span className="truncate">{currentDocument.name}</span>
            </p>
          ) : null}

          {/* The real input is visually hidden; the label below shows its focus ring. */}
          <input
            id="testimonial-file"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleFile}
            aria-describedby={errors.file ? "testimonial-file-error" : undefined}
            className="peer sr-only"
          />
          <label
            htmlFor="testimonial-file"
            className={
              locked
                ? "flex min-h-11 cursor-not-allowed items-center gap-2 rounded-lg border border-dashed border-rule-strong px-3.5 text-[0.9375rem] text-ink-muted opacity-60"
                : "flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border border-dashed border-rule-strong px-3.5 text-[0.9375rem] text-ink-muted transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary hover:border-ink hover:text-ink"
            }
          >
            <FileText className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="truncate">
              {file ? file.name : currentDocument ? "Replace the letter" : "Choose a document"}
            </span>
          </label>

          {file ? (
            <button
              type="button"
              onClick={() => setFile(null)}
              className="type-meta mt-1 inline-flex min-h-9 items-center gap-1 text-ink-muted hover:text-ink"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
              {currentDocument ? "Keep the current letter" : "Remove file"}
            </button>
          ) : currentDocument ? (
            <button
              type="button"
              onClick={() => setRemoveDocument(true)}
              className="type-meta mt-1 inline-flex min-h-9 items-center gap-1 text-ink-muted hover:text-ink"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
              Remove the letter
            </button>
          ) : removeDocument ? (
            <p className="type-meta mt-1 flex flex-wrap items-center gap-x-2 text-ink-muted">
              The letter will be removed when you save.
              <button
                type="button"
                onClick={() => setRemoveDocument(false)}
                className="inline-flex min-h-9 items-center gap-1 text-ink hover:text-primary"
              >
                <Undo2 className="h-3.5 w-3.5" aria-hidden="true" />
                Keep it
              </button>
            </p>
          ) : null}
          <FieldError id="testimonial-file-error" message={errors.file} />
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
  );

  return (
    <div className="surface p-6 sm:p-8">
      {locked ? (
        <>
          <div className="mb-7">
            <SignInPanel
              message="To keep testimonials authentic, sign in with Google to enable the form. Your name and email are filled in automatically once you sign in."
              signInAction={signInAction}
            />
          </div>
          {fields}
        </>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          {view ? (
            <div className="mb-7 border-b border-rule pb-5">
              <Status tone={view.tone} emphasis>
                {view.label}
              </Status>
              <p className="type-meta mt-1.5 text-ink-muted">{view.note}</p>
            </div>
          ) : null}
          {restored ? (
            <p role="status" className="type-meta mb-6 text-ink">
              {restored === "text-and-file"
                ? "What you wrote before signing in again is back. Choose your letter again, then save."
                : "What you wrote before signing in again is back. Save when you're ready."}
            </p>
          ) : null}
          {fields}
          <div className="mt-7">
            <Button type="submit" size="lg" disabled={status === "sending"}>
              {status === "sending" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  {saved ? "Saving…" : "Sending…"}
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" aria-hidden="true" />
                  {saved ? "Save changes" : "Submit for review"}
                </>
              )}
            </Button>
          </div>
          {status === "error" ? (
            <p
              role="alert"
              className="type-meta mt-5 flex items-start gap-2 rounded-lg border border-error/50 px-4 py-3 text-error"
            >
              <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{errorMessage}</span>
            </p>
          ) : null}
        </form>
      )}
    </div>
  );
}

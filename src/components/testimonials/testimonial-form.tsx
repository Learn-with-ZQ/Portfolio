"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { CheckCircle2, FileText, Loader2, LogIn, Send, TriangleAlert, X } from "lucide-react";
import { Button } from "@/components/ui/button";
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

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="type-meta mt-1.5 text-error">
      {message}
    </p>
  );
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
      <div role="status" className="surface flex flex-col items-start p-6 sm:p-8">
        <CheckCircle2 className="h-8 w-8 text-verdigris" aria-hidden="true" />
        <h3 className="type-h3 mt-4">Testimonial received!</h3>
        <p className="type-body mt-2 text-ink-muted">
          Thank you for sharing your experience. Your verified testimonial is awaiting
          review.
        </p>
        <Button variant="secondary" className="mt-6" onClick={() => setStatus("idle")}>
          Submit another testimonial
        </Button>
      </div>
    );

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
            <span className="font-normal text-ink-muted">(optional, PDF/DOC/DOCX)</span>
          </label>
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
                : "flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border border-dashed border-rule-strong px-3.5 text-[0.9375rem] text-ink-muted transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-verdigris hover:border-ink hover:text-ink"
            }
          >
            <FileText className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="truncate">{file ? file.name : "Choose a document"}</span>
          </label>
          {file ? (
            <button
              type="button"
              onClick={() => setFile(null)}
              className="type-meta mt-1 inline-flex min-h-9 items-center gap-1 text-ink-muted hover:text-ink"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
              Remove file
            </button>
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
          <div className="mb-7 flex flex-col gap-4 rounded-lg border border-dashed border-rule-strong p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <p className="type-meta text-ink">
              To keep testimonials authentic, sign in with Google to enable the form. Your
              name and email are filled in automatically once you sign in.
            </p>
            {signInAction ? (
              <form action={signInAction} className="shrink-0">
                <Button type="submit">
                  <LogIn className="h-4 w-4" aria-hidden="true" />
                  Sign in with Google
                </Button>
              </form>
            ) : null}
          </div>
          {fields}
        </>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          {fields}
          <div className="mt-7">
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

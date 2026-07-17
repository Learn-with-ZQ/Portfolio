"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send, TriangleAlert } from "lucide-react";
import { contactInfo } from "@/data/contact";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;
type SubmitStatus = "idle" | "sending" | "success" | "error";

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const inputStyles =
  "card-surface w-full rounded-xl px-4 py-3 text-sm outline-none placeholder:text-muted focus:border-primary";

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [honeypot, setHoneypot] = useState("");

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!form.name.trim()) nextErrors.name = "Name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (form.phone.trim() && !/^[+\d][\d\s\-()]{6,19}$/.test(form.phone.trim())) {
      nextErrors.phone = "Enter a valid phone number.";
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      nextErrors.message = "Please write a message of at least 10 characters.";
    }
    return nextErrors;
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
          company: honeypot,
        }),
      });

      if (!response.ok) throw new Error(`Request failed (${response.status})`);
      setStatus("success");
      setForm(initialState);
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center rounded-2xl bg-primary-soft px-6 py-12 text-center"
      >
        <CheckCircle2 className="h-12 w-12 text-primary" aria-hidden="true" />
        <h3 className="mt-4 text-xl font-bold tracking-tight">Message received!</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
          Thanks for reaching out — your message has been recorded and I&apos;ll get
          back to you soon.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 rounded-full border border-border-strong px-5 py-2 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={cn(inputStyles, errors.name && "border-red-500")}
          />
          {errors.name ? (
            <p id="contact-name-error" role="alert" className="mt-1.5 text-xs text-red-500">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="contact-email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={cn(inputStyles, errors.email && "border-red-500")}
          />
          {errors.email ? (
            <p id="contact-email-error" role="alert" className="mt-1.5 text-xs text-red-500">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-phone" className="mb-2 block text-sm font-medium">
            Phone <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+92 300 0000000"
            value={form.phone}
            onChange={handleChange}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "contact-phone-error" : undefined}
            className={cn(inputStyles, errors.phone && "border-red-500")}
          />
          {errors.phone ? (
            <p id="contact-phone-error" role="alert" className="mt-1.5 text-xs text-red-500">
              {errors.phone}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="contact-subject" className="mb-2 block text-sm font-medium">
            Subject <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            placeholder="What is this about?"
            value={form.subject}
            onChange={handleChange}
            className={inputStyles}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="contact-message" className="mb-2 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          placeholder="Tell me about your project, role, or question…"
          value={form.message}
          onChange={handleChange}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={cn(inputStyles, "resize-y", errors.message && "border-red-500")}
        />
        {errors.message ? (
          <p id="contact-message-error" role="alert" className="mt-1.5 text-xs text-red-500">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="contact-company">Company (leave blank)</label>
        <input
          id="contact-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

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
              Send Message
            </>
          )}
        </Button>
        <p className="text-xs text-muted">
          Your message is recorded securely — no account or email app needed.
        </p>
      </div>

      {status === "error" ? (
        <p
          role="alert"
          className="mt-4 flex items-start gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-500"
        >
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>
            Something went wrong sending your message. Please try again, or email me
            directly at{" "}
            <a href={`mailto:${contactInfo.email}`} className="font-medium underline">
              {contactInfo.email}
            </a>
            .
          </span>
        </p>
      ) : null}
    </form>
  );
}

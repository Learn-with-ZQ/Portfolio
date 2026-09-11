"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send, TriangleAlert } from "lucide-react";
import { contactInfo } from "@/data/contact";
import { Button } from "@/components/ui/button";

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

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="type-meta mt-1.5 text-error">
      {message}
    </p>
  );
}

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
      <div role="status" className="surface-quiet flex flex-col items-start p-6">
        <CheckCircle2 className="h-8 w-8 text-verdigris" aria-hidden="true" />
        <h3 className="type-h3 mt-4">Message received!</h3>
        <p className="type-body mt-2 text-ink-muted">
          Thanks for reaching out — your message has been recorded and I&apos;ll get back to
          you soon.
        </p>
        <Button variant="secondary" className="mt-6" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="relative">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="field-label">
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
            className="field"
          />
          <FieldError id="contact-name-error" message={errors.name} />
        </div>

        <div>
          <label htmlFor="contact-email" className="field-label">
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
            className="field"
          />
          <FieldError id="contact-email-error" message={errors.email} />
        </div>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-phone" className="field-label">
            Phone <span className="font-normal text-ink-muted">(optional)</span>
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
            className="field"
          />
          <FieldError id="contact-phone-error" message={errors.phone} />
        </div>

        <div>
          <label htmlFor="contact-subject" className="field-label">
            Subject <span className="font-normal text-ink-muted">(optional)</span>
          </label>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            placeholder="What is this about?"
            value={form.subject}
            onChange={handleChange}
            className="field"
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="contact-message" className="field-label">
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
          className="field resize-y"
        />
        <FieldError id="contact-message-error" message={errors.message} />
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

      <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
        <Button type="submit" size="lg" disabled={status === "sending"}>
          {status === "sending" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden="true" />
              Send message
            </>
          )}
        </Button>
        <p className="type-meta text-ink-muted">
          Your message is recorded securely — no account or email app needed.
        </p>
      </div>

      {status === "error" ? (
        <p
          role="alert"
          className="type-meta mt-5 flex items-start gap-2 rounded-lg border border-error/50 px-4 py-3 text-error"
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

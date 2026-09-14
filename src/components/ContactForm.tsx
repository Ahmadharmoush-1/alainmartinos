"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Button } from "./Button";
import { getContent } from "@/lib/i18n";
import { site, whatsappHref } from "@/lib/site";

const t = getContent();
const f = t.contact.form;

const field =
  "peer w-full border-0 border-b border-plum-200 bg-transparent px-0 py-3 font-sans text-[0.95rem] text-ink placeholder:text-mist/60 transition-colors duration-300 focus:border-plum-700 focus:outline-none focus:ring-0";
const label = "block font-sans text-[0.65rem] font-medium uppercase tracking-wider2 text-plum-500";

type Status = "idle" | "sending" | "success" | "error";

/**
 * Contact / appointment request form.
 * If NEXT_PUBLIC_FORM_ENDPOINT is set, the form POSTs JSON there (Formspree,
 * a CRM webhook, an API route…). Otherwise it composes a WhatsApp message
 * so no request is ever lost.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
  const [preset, setPreset] = useState("");

  // Pre-select the service when arriving from /services?service=…
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("service");
    if (q) setPreset(q);
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    if (data.company) return; // honeypot

    if (!endpoint) {
      const msg =
        `Appointment request – Salon Alain\n` +
        `Name: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\n` +
        `Location: ${data.location}\nService: ${data.service}\nPreferred date: ${data.date}\n` +
        (data.message ? `Message: ${data.message}` : "");
      window.open(whatsappHref(msg), "_blank", "noopener");
      setStatus("success");
      form.reset();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8" noValidate={false}>
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>{f.name}</label>
          <input id="name" name="name" type="text" autoComplete="name" required className={field} />
        </div>
        <div>
          <label htmlFor="phone" className={label}>{f.phone}</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" required className={field} />
        </div>
        <div>
          <label htmlFor="email" className={label}>{f.email}</label>
          <input id="email" name="email" type="email" autoComplete="email" required className={field} />
        </div>
        <div>
          <label htmlFor="location" className={label}>{f.location}</label>
          <select id="location" name="location" required defaultValue="" className={`${field} cursor-pointer`}>
            <option value="" disabled>{f.locationPlaceholder}</option>
            {site.locations.map((l) => (
              <option key={l.id} value={l.country}>{l.country}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="service" className={label}>{f.service}</label>
          <select id="service" name="service" required value={preset} onChange={(e) => setPreset(e.target.value)} className={`${field} cursor-pointer`}>
            <option value="" disabled>{f.servicePlaceholder}</option>
            {preset && !t.services.list.some((s) => s.name === preset) && (
              <option value={preset}>{preset}</option>
            )}
            {t.services.list.map((s) => (
              <option key={s.slug} value={s.name}>{s.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="date" className={label}>{f.date}</label>
          <input id="date" name="date" type="date" className={field} />
        </div>
      </div>
      <div>
        <label htmlFor="message" className={label}>{f.message}</label>
        <textarea id="message" name="message" rows={3} placeholder={f.messagePlaceholder} className={`${field} resize-none`} />
      </div>
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={status === "sending"}>
          {status === "sending" ? f.sending : f.submit}
        </Button>
        <p className="text-sm text-mist">{f.fallbackNote}</p>
      </div>

      <p role="status" aria-live="polite" className={`text-sm ${status === "error" ? "text-red-700" : "text-plum-700"}`}>
        {status === "success" && f.success}
        {status === "error" && f.error}
      </p>
    </form>
  );
}

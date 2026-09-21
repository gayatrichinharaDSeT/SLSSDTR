"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { programs } from "@/data/programs";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Request failed");

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const inputClasses =
    "w-full rounded-btn border border-navy/15 bg-grey/60 px-4 py-3 text-sm text-ink placeholder:text-ink/40 transition-all duration-200 hover:border-navy/30 hover:bg-white focus:border-green focus:bg-white focus:outline-none focus:ring-4 focus:ring-green/10";
  const labelClasses = "mb-1.5 block text-sm font-semibold font-heading text-navy";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClasses}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your full name"
            required
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClasses}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            className={inputClasses}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={labelClasses}>
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Optional"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="organization" className={labelClasses}>
            Organization
          </label>
          <input
            id="organization"
            name="organization"
            type="text"
            placeholder="Optional"
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <label htmlFor="interest" className={labelClasses}>
          Interest / Program
        </label>
        <select
          id="interest"
          name="interest"
          className={`${inputClasses} cursor-pointer`}
          defaultValue=""
        >
          <option value="" disabled>
            Select an area of interest
          </option>
          {programs.map((program) => (
            <option key={program.slug} value={program.name}>
              {program.name}
            </option>
          ))}
          <option value="General Enquiry">General Enquiry</option>
          <option value="Partnership">Partnership</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClasses}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Tell us a little about what you're looking for..."
          required
          rows={5}
          className={`${inputClasses} resize-y`}
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group inline-flex items-center justify-center gap-2 rounded-btn bg-navy px-6 py-3 text-sm font-semibold font-heading text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-green hover:shadow-lg hover:shadow-green/20 disabled:pointer-events-none disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
        <Send
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
          strokeWidth={2}
          aria-hidden="true"
        />
      </button>

      <div role="status" aria-live="polite">
        {status === "success" ? (
          <p className="flex items-center gap-2 text-sm font-medium text-green-dark">
            <CheckCircle2 className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden="true" />
            Thank you. Your message has been received.
          </p>
        ) : null}
        {status === "error" ? (
          <p className="flex items-center gap-2 text-sm font-medium text-red-600">
            <AlertCircle className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden="true" />
            Something went wrong. Please try again.
          </p>
        ) : null}
      </div>
    </form>
  );
}

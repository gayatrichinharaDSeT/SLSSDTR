"use client";

import { useState, type FormEvent } from "react";
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
    "w-full rounded-btn border border-navy/15 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-ink/40 focus:border-green focus:outline-none";
  const labelClasses = "mb-1.5 block text-sm font-semibold font-heading text-navy";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClasses}>
            Name
          </label>
          <input id="name" name="name" type="text" required className={inputClasses} />
        </div>
        <div>
          <label htmlFor="email" className={labelClasses}>
            Email
          </label>
          <input id="email" name="email" type="email" required className={inputClasses} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={labelClasses}>
            Phone
          </label>
          <input id="phone" name="phone" type="tel" className={inputClasses} />
        </div>
        <div>
          <label htmlFor="organization" className={labelClasses}>
            Organization
          </label>
          <input id="organization" name="organization" type="text" className={inputClasses} />
        </div>
      </div>

      <div>
        <label htmlFor="interest" className={labelClasses}>
          Interest / Program
        </label>
        <select id="interest" name="interest" className={inputClasses} defaultValue="">
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
          required
          rows={5}
          className={inputClasses}
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center rounded-btn bg-navy px-6 py-3 text-sm font-semibold font-heading text-white transition-colors hover:bg-green disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>

      <div role="status" aria-live="polite">
        {status === "success" ? (
          <p className="text-sm font-medium text-green-dark">
            Thank you. Your message has been received.
          </p>
        ) : null}
        {status === "error" ? (
          <p className="text-sm font-medium text-red-600">
            Something went wrong. Please try again.
          </p>
        ) : null}
      </div>
    </form>
  );
}

import type { InputHTMLAttributes } from "react";

// Matches the field styling already established in ContactForm.tsx
// (components/contact/ContactForm.tsx) so auth forms look like the same
// design system, not a separate product.
export const fieldInputClasses =
  "w-full rounded-btn border border-navy/15 bg-grey/60 px-4 py-3 text-sm text-ink placeholder:text-ink/40 transition-all duration-200 hover:border-navy/30 hover:bg-white focus:border-green focus:bg-white focus:outline-none focus:ring-4 focus:ring-green/10";
export const fieldLabelClasses = "mb-1.5 block text-sm font-semibold font-heading text-navy";

type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export default function FormField({ label, error, id, ...inputProps }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className={fieldLabelClasses}>
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={fieldInputClasses}
        {...inputProps}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

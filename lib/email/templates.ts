import type { EmailMessage } from "./types";

// Shared brand layout for every transactional email this app sends for the
// 3 lead-capture flows (program enquiry, contact, customized modules).
// Inline styles only — email clients don't reliably load external
// stylesheets, and this mirrors the site's own navy/green/mist palette
// (app/globals.css) rather than inventing a separate email look.
const NAVY = "#212B4D";
const GREEN = "#2F8C5C";
const INK = "#3D4759";
const MIST = "#EEF4F1";
const BORDER = "#E5E9EF";

function appUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL ?? "https://slssdtr.vercel.app";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export type DetailRow = { label: string; value: string };

function detailRowsHtml(rows: DetailRow[]): string {
  return rows
    .map(
      ({ label, value }) => `
        <tr>
          <td style="padding:6px 0;color:#8a93a6;font-size:12px;width:140px;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:6px 0;color:${INK};font-size:14px;vertical-align:top;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join("");
}

function detailRowsText(rows: DetailRow[]): string {
  return rows.map(({ label, value }) => `${label}: ${value}`).join("\n");
}

function layout({ preheader, bodyHtml }: { preheader: string; bodyHtml: string }): string {
  const url = appUrl();
  return `<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background-color:${MIST};font-family:Arial,Helvetica,sans-serif;">
    <span style="display:none;font-size:1px;color:${MIST};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${escapeHtml(preheader)}</span>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${MIST};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:12px;overflow:hidden;border:1px solid ${BORDER};">
            <tr>
              <td style="background-color:${NAVY};padding:24px 32px;">
                <span style="font-family:Arial,Helvetica,sans-serif;font-size:18px;font-weight:800;color:#ffffff;">SLSSDTR</span>
                <div style="font-size:11px;color:rgba(255,255,255,0.7);margin-top:2px;">School of Life Science</div>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;color:${INK};font-size:14px;line-height:1.6;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;border-top:1px solid ${BORDER};color:#8a93a6;font-size:12px;">
                School of Life Science – Skill Development, Training &amp; Research (SLSSDTR)<br/>
                <a href="${url}" style="color:${GREEN};text-decoration:none;">${url.replace(/^https?:\/\//, "")}</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

// --- Program Enquiry --------------------------------------------------

type ProgramEnquiryDetails = {
  name: string;
  email: string;
  phone?: string | null;
  organization?: string | null;
  programName: string;
  preferredBatch?: string | null;
  message: string;
};

export function programEnquiryUserEmail(details: ProgramEnquiryDetails): EmailMessage {
  const { name, programName } = details;
  const html = layout({
    preheader: `We've received your enquiry about ${programName}.`,
    bodyHtml: `
      <p>Hi ${escapeHtml(name)},</p>
      <p>Thank you for your interest in <strong>${escapeHtml(programName)}</strong>. We've received your enquiry and a member of the SLSSDTR team will get back to you shortly.</p>
      <p style="margin-top:24px;">In the meantime, feel free to reply directly to this email if you have any questions.</p>
      <p style="margin-top:24px;">Warm regards,<br/>SLSSDTR Team</p>
    `,
  });
  const text = `Hi ${name},\n\nThank you for your interest in ${programName}. We've received your enquiry and a member of the SLSSDTR team will get back to you shortly.\n\nYou can reply directly to this email if you have any questions.\n\nWarm regards,\nSLSSDTR Team`;

  return { to: details.email, subject: `We've received your enquiry — ${programName}`, html, text };
}

export function programEnquiryAdminEmail(details: ProgramEnquiryDetails, adminEmail: string): EmailMessage {
  const rows: DetailRow[] = [
    { label: "Name", value: details.name },
    { label: "Email", value: details.email },
    { label: "Phone", value: details.phone || "—" },
    { label: "Organization", value: details.organization || "—" },
    { label: "Program", value: details.programName },
    { label: "Preferred batch", value: details.preferredBatch || "—" },
  ];

  const html = layout({
    preheader: `New program enquiry from ${details.name} — ${details.programName}`,
    bodyHtml: `
      <p style="margin:0 0 16px;font-weight:700;color:${NAVY};">New program enquiry</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${detailRowsHtml(rows)}</table>
      <p style="margin-top:20px;padding-top:16px;border-top:1px solid ${BORDER};">${escapeHtml(details.message)}</p>
    `,
  });
  const text = `New program enquiry\n\n${detailRowsText(rows)}\n\n${details.message}`;

  return {
    to: adminEmail,
    subject: `New program enquiry: ${details.name} — ${details.programName}`,
    html,
    text,
    replyTo: details.email,
  };
}

// --- Contact Form -------------------------------------------------------

type ContactDetails = {
  name: string;
  email: string;
  phone?: string | null;
  organization?: string | null;
  interest?: string | null;
  message: string;
};

export function contactUserEmail(details: ContactDetails): EmailMessage {
  const html = layout({
    preheader: "We've received your message and will be in touch shortly.",
    bodyHtml: `
      <p>Hi ${escapeHtml(details.name)},</p>
      <p>Thank you for reaching out to SLSSDTR. We've received your message and a member of our team will get back to you shortly.</p>
      <p style="margin-top:24px;">In the meantime, feel free to reply directly to this email if you have any questions.</p>
      <p style="margin-top:24px;">Warm regards,<br/>SLSSDTR Team</p>
    `,
  });
  const text = `Hi ${details.name},\n\nThank you for reaching out to SLSSDTR. We've received your message and a member of our team will get back to you shortly.\n\nYou can reply directly to this email if you have any questions.\n\nWarm regards,\nSLSSDTR Team`;

  return { to: details.email, subject: "We've received your message — SLSSDTR", html, text };
}

export function contactAdminEmail(details: ContactDetails, adminEmail: string): EmailMessage {
  const rows: DetailRow[] = [
    { label: "Name", value: details.name },
    { label: "Email", value: details.email },
    { label: "Phone", value: details.phone || "—" },
    { label: "Organization", value: details.organization || "—" },
    { label: "Interest", value: details.interest || "—" },
  ];

  const html = layout({
    preheader: `New contact message from ${details.name}`,
    bodyHtml: `
      <p style="margin:0 0 16px;font-weight:700;color:${NAVY};">New contact form message</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${detailRowsHtml(rows)}</table>
      <p style="margin-top:20px;padding-top:16px;border-top:1px solid ${BORDER};">${escapeHtml(details.message)}</p>
    `,
  });
  const text = `New contact form message\n\n${detailRowsText(rows)}\n\n${details.message}`;

  return {
    to: adminEmail,
    subject: `New contact message from ${details.name}`,
    html,
    text,
    replyTo: details.email,
  };
}

// --- Customized Modules ---------------------------------------------------

type CustomizedModuleDetails = {
  name: string;
  email: string;
  phone?: string | null;
  organization?: string | null;
  programName?: string | null;
  departments: string[];
  message?: string | null;
};

export function customizedModuleUserEmail(details: CustomizedModuleDetails): EmailMessage {
  const html = layout({
    preheader: "We've received your customized module request.",
    bodyHtml: `
      <p>Hi ${escapeHtml(details.name)},</p>
      <p>Thank you for your interest in a customized training module. We've received your request covering <strong>${escapeHtml(details.departments.join(", "))}</strong> and a member of the SLSSDTR team will get back to you with a tailored program.</p>
      <p style="margin-top:24px;">In the meantime, feel free to reply directly to this email if you have any questions.</p>
      <p style="margin-top:24px;">Warm regards,<br/>SLSSDTR Team</p>
    `,
  });
  const text = `Hi ${details.name},\n\nThank you for your interest in a customized training module. We've received your request covering ${details.departments.join(", ")} and a member of the SLSSDTR team will get back to you with a tailored program.\n\nYou can reply directly to this email if you have any questions.\n\nWarm regards,\nSLSSDTR Team`;

  return { to: details.email, subject: "We've received your customized module request — SLSSDTR", html, text };
}

export function customizedModuleAdminEmail(details: CustomizedModuleDetails, adminEmail: string): EmailMessage {
  const rows: DetailRow[] = [
    { label: "Name", value: details.name },
    { label: "Email", value: details.email },
    { label: "Phone", value: details.phone || "—" },
    { label: "Organization", value: details.organization || "—" },
    { label: "Related program", value: details.programName || "—" },
    { label: "Departments", value: details.departments.join(", ") },
  ];

  const html = layout({
    preheader: `New customized module request from ${details.name}`,
    bodyHtml: `
      <p style="margin:0 0 16px;font-weight:700;color:${NAVY};">New customized module request</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${detailRowsHtml(rows)}</table>
      ${details.message ? `<p style="margin-top:20px;padding-top:16px;border-top:1px solid ${BORDER};">${escapeHtml(details.message)}</p>` : ""}
    `,
  });
  const text = `New customized module request\n\n${detailRowsText(rows)}${details.message ? `\n\n${details.message}` : ""}`;

  return {
    to: adminEmail,
    subject: `New customized module request from ${details.name}`,
    html,
    text,
    replyTo: details.email,
  };
}

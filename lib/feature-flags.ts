// Temporary guard for the first client-review deployment: the admin
// panel's code, database models, auth, and authorization all stay fully
// intact — every /admin page and /api/admin/* route additionally checks
// this flag first and 404s (not 403, so its existence isn't hinted at)
// when it's off. To enable the admin panel for a later deployment, set
// ADMIN_PANEL_ENABLED=true (server) and NEXT_PUBLIC_ADMIN_PANEL_ENABLED=true
// (client, so the nav's "Admin" link reappears) in that environment —
// nothing else needs to change.
export function isAdminPanelEnabled(): boolean {
  return process.env.ADMIN_PANEL_ENABLED === "true";
}

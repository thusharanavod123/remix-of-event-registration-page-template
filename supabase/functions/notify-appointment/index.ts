import { createClient } from "npm:@supabase/supabase-js@2";

const cors = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type" };
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });
const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[c]!));

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response(null, { headers: cors });
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
  const url = Deno.env.get("SUPABASE_URL");
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const resendKey = Deno.env.get("RESEND_API_KEY");
  const adminEmail = Deno.env.get("ADMIN_NOTIFICATION_EMAIL");
  const from = Deno.env.get("APPOINTMENT_FROM_EMAIL") || "Elladria Lanka Careers <appointments@example.com>";
  if (!url || !key) return json({ error: "Server is not configured" }, 500);

  let appointmentId = "";
  try { appointmentId = String((await request.json()).appointment_id || ""); } catch { return json({ error: "Invalid request" }, 400); }
  if (!appointmentId) return json({ error: "appointment_id is required" }, 400);
  const admin = createClient(url, key);
  const { data: a } = await admin.from("appointments").select("*, vacancies(title)").eq("id", appointmentId).maybeSingle();
  if (!a) return json({ error: "Appointment not found" }, 404);
  if (Date.now() - new Date(a.created_at).getTime() > 10 * 60_000) return json({ error: "Notification window expired" }, 403);
  if (!resendKey || !adminEmail) return json({ queued: false, reason: "Email secrets are not configured" });

  const name = escapeHtml(a.customer_name);
  const topic = escapeHtml(a.vacancies?.title || "General consultation");
  const details = `<p><strong>${name}</strong> requested an appointment.</p><ul><li>Date: ${a.appointment_date}</li><li>Time: ${a.start_time.slice(0, 5)}</li><li>Topic: ${topic}</li><li>Phone: ${escapeHtml(a.phone)}</li><li>Email: ${escapeHtml(a.email)}</li><li>Reference: ${a.reference_code}</li></ul>`;
  const customer = `<p>Hello ${name},</p><p>We received your appointment request for <strong>${a.appointment_date} at ${a.start_time.slice(0, 5)}</strong>.</p><p>Your reference is <strong>${a.reference_code}</strong>. Our team will contact you after review.</p>`;
  const send = (to: string, subject: string, html: string, idempotency: string) => fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json", "Idempotency-Key": idempotency }, body: JSON.stringify({ from, to: [to], subject, html }) });
  const [adminResult, customerResult] = await Promise.all([
    send(adminEmail, `New appointment: ${a.customer_name}`, details, `appointment-admin-${a.id}`),
    send(a.email, `Appointment request ${a.reference_code}`, customer, `appointment-customer-${a.id}`),
  ]);
  if (!adminResult.ok || !customerResult.ok) return json({ error: "One or more emails could not be delivered" }, 502);
  return json({ sent: true });
});

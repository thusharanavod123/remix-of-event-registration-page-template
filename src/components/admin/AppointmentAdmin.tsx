import { useState } from "react";
import { CalendarOff, Loader2, Mail, Phone, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAppointments, useAppointmentMutations, useAvailabilityRules, useAvailabilityMutations,
  useBlockedPeriods, useBlockedPeriodMutations, type AppointmentStatus } from "@/hooks/useAppointments";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const STATUS: AppointmentStatus[] = ["pending", "confirmed", "completed", "cancelled", "no_show"];
const STATUS_BADGE_CLASSES: Record<AppointmentStatus, string> = {
  pending: "border-yellow-300 bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300",
  confirmed: "border-green-300 bg-green-100 text-green-800 hover:bg-green-100 dark:border-green-800 dark:bg-green-950 dark:text-green-300",
  completed: "border-blue-300 bg-blue-100 text-blue-800 hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300",
  cancelled: "border-red-300 bg-red-100 text-red-800 hover:bg-red-100 dark:border-red-800 dark:bg-red-950 dark:text-red-300",
  no_show: "border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300",
};
const displayStatus = (s: string) => s.replace("_", " ").replace(/^./, (c) => c.toUpperCase());
const displayTime = (s: string) => new Date(`2000-01-01T${s}`).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

export function AppointmentsTab() {
  const { data = [], isLoading, error } = useAppointments();
  const { update } = useAppointmentMutations();
  const [filter, setFilter] = useState<"upcoming" | "all">("upcoming");
  const today = new Date().toISOString().slice(0, 10);
  const shown = data.filter((a) => filter === "all" || (a.appointment_date >= today && a.status !== "cancelled"));
  const save = (id: string, changes: any, message: string) => update.mutate({ id, ...changes }, { onSuccess: () => toast.success(message), onError: (e: any) => toast.error(e.message) });

  if (isLoading) return <Loader2 className="h-5 w-5 animate-spin" />;
  if (error) return <p className="text-sm text-destructive">Could not load appointments. Apply the appointment migration to Supabase first.</p>;
  return <div className="space-y-5">
    <div className="flex flex-wrap items-center justify-between gap-3"><p className="text-sm text-muted-foreground">{shown.length} appointments</p><div className="flex rounded-lg border p-1"><Button size="sm" variant={filter === "upcoming" ? "secondary" : "ghost"} onClick={() => setFilter("upcoming")}>Upcoming</Button><Button size="sm" variant={filter === "all" ? "secondary" : "ghost"} onClick={() => setFilter("all")}>All</Button></div></div>
    {!shown.length && <div className="rounded-2xl border border-dashed py-12 text-center text-sm text-muted-foreground">No appointments to show.</div>}
    {shown.map((a) => <article key={a.id} className="rounded-2xl border bg-card p-5">
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <div><div className="flex flex-wrap items-center gap-2"><h3 className="font-display text-lg font-semibold">{a.customer_name}</h3><Badge variant="outline" className={STATUS_BADGE_CLASSES[a.status]}>{displayStatus(a.status)}</Badge><span className="text-xs text-muted-foreground">#{a.reference_code}</span></div>
          <p className="mt-2 font-medium">{new Date(`${a.appointment_date}T00:00:00`).toLocaleDateString(undefined, { weekday: "short", year: "numeric", month: "short", day: "numeric" })} · {displayTime(a.start_time)}–{displayTime(a.end_time)}</p>
          <p className="mt-1 text-sm text-muted-foreground">{a.vacancies?.title || "General consultation"}</p>
          <div className="mt-3 flex flex-wrap gap-4 text-sm"><a className="flex items-center gap-1 text-primary" href={`tel:${a.phone}`}><Phone className="h-3.5 w-3.5" />{a.phone}</a><a className="flex items-center gap-1 text-primary" href={`mailto:${a.email}`}><Mail className="h-3.5 w-3.5" />{a.email}</a></div>
          {a.message && <p className="mt-3 rounded-lg bg-muted p-3 text-sm">{a.message}</p>}
        </div>
        <div className="w-full space-y-3 sm:w-56"><div><Label>Status</Label><select value={a.status} onChange={(e) => save(a.id, { status: e.target.value }, "Appointment updated")} disabled={update.isPending} className="mt-1 h-10 w-full rounded-md border bg-background px-3 text-sm">{STATUS.map((s) => <option key={s} value={s}>{displayStatus(s)}</option>)}</select></div>
          <div><Label>Private admin notes</Label><Textarea defaultValue={a.admin_notes ?? ""} rows={2} maxLength={2000} onBlur={(e) => { if (e.target.value !== (a.admin_notes ?? "")) save(a.id, { admin_notes: e.target.value }, "Notes saved"); }} /></div></div>
      </div>
    </article>)}
  </div>;
}

export function AvailabilityTab() {
  const { data: rules = [], isLoading } = useAvailabilityRules();
  const { update, create } = useAvailabilityMutations();
  const { data: blocks = [] } = useBlockedPeriods();
  const blockMutations = useBlockedPeriodMutations();
  const [block, setBlock] = useState({ blocked_date: "", start_time: "", end_time: "", reason: "" });
  const ruleByDay = new Map(rules.map((r) => [r.day_of_week, r]));
  const saveRule = (day: number, changes: any) => {
    const rule = ruleByDay.get(day); const mutation = rule ? update : create;
    const input: any = rule ? { id: rule.id, ...changes } : { day_of_week: day, start_time: "09:00", end_time: "17:00", slot_minutes: 30, is_active: true, ...changes };
    mutation.mutate(input, { onSuccess: () => toast.success(`${DAYS[day]} availability saved`), onError: (e: any) => toast.error(e.message) });
  };
  if (isLoading) return <Loader2 className="h-5 w-5 animate-spin" />;
  return <div className="space-y-8">
    <section><h2 className="font-display text-lg font-semibold">Weekly office hours</h2><p className="mt-1 text-sm text-muted-foreground">Changes control which slots visitors can book.</p><div className="mt-4 space-y-2">{DAYS.map((day, index) => { const r = ruleByDay.get(index); return <div key={day} className="grid items-center gap-3 rounded-xl border bg-card p-3 sm:grid-cols-[120px_70px_1fr_1fr_110px]">
      <span className="font-medium">{day}</span><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={r?.is_active ?? false} onChange={(e) => saveRule(index, { is_active: e.target.checked })} /> Open</label>
      <Input type="time" aria-label={`${day} opening time`} value={(r?.start_time ?? "09:00").slice(0, 5)} disabled={!r?.is_active} onChange={(e) => saveRule(index, { start_time: e.target.value })} />
      <Input type="time" aria-label={`${day} closing time`} value={(r?.end_time ?? "17:00").slice(0, 5)} disabled={!r?.is_active} onChange={(e) => saveRule(index, { end_time: e.target.value })} />
      <select aria-label={`${day} slot length`} value={r?.slot_minutes ?? 30} disabled={!r?.is_active} onChange={(e) => saveRule(index, { slot_minutes: Number(e.target.value) })} className="h-10 rounded-md border bg-background px-3 text-sm"><option value={15}>15 min</option><option value={30}>30 min</option><option value={45}>45 min</option><option value={60}>60 min</option></select>
    </div>; })}</div></section>
    <section><h2 className="font-display text-lg font-semibold">Blocked dates and times</h2><p className="mt-1 text-sm text-muted-foreground">Leave both times blank to close the entire day.</p>
      <form className="mt-4 grid gap-3 rounded-xl border bg-card p-4 sm:grid-cols-2" onSubmit={(e) => { e.preventDefault(); if (!block.blocked_date || (!!block.start_time !== !!block.end_time)) return toast.error("Choose a date and either both times or neither time."); blockMutations.create.mutate({ blocked_date: block.blocked_date, start_time: block.start_time || null, end_time: block.end_time || null, reason: block.reason || null }, { onSuccess: () => { toast.success("Time blocked"); setBlock({ blocked_date: "", start_time: "", end_time: "", reason: "" }); }, onError: (err: any) => toast.error(err.message) }); }}>
        <div><Label>Date</Label><Input type="date" required value={block.blocked_date} onChange={(e) => setBlock({ ...block, blocked_date: e.target.value })} /></div><div><Label>Reason (optional)</Label><Input value={block.reason} maxLength={200} onChange={(e) => setBlock({ ...block, reason: e.target.value })} /></div><div><Label>From (optional)</Label><Input type="time" value={block.start_time} onChange={(e) => setBlock({ ...block, start_time: e.target.value })} /></div><div><Label>Until (optional)</Label><Input type="time" value={block.end_time} onChange={(e) => setBlock({ ...block, end_time: e.target.value })} /></div><Button className="sm:col-span-2" disabled={blockMutations.create.isPending}><CalendarOff className="mr-2 h-4 w-4" />Block availability</Button>
      </form>
      <div className="mt-4 space-y-2">{blocks.map((b) => <div key={b.id} className="flex items-center justify-between rounded-xl border bg-card p-3 text-sm"><div><strong>{b.blocked_date}</strong> · {b.start_time ? `${displayTime(b.start_time)}–${displayTime(b.end_time!)}` : "All day"}{b.reason && <span className="text-muted-foreground"> · {b.reason}</span>}</div><Button size="icon" variant="ghost" onClick={() => blockMutations.remove.mutate(b.id, { onSuccess: () => toast.success("Block removed") })}><Trash2 className="h-4 w-4 text-destructive" /></Button></div>)}</div>
    </section>
  </div>;
}

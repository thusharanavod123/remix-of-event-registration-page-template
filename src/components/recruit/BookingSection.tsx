import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CalendarDays, Check, CheckCircle2, Clock, Loader2, Mail, Phone, ShieldCheck, Sparkles, User } from "lucide-react";
import { useAvailableSlots, useBookAppointment } from "@/hooks/useAppointments";
import { useVacancies } from "@/hooks/useVacancies";

const localDate = (date = new Date()) => { const offset = date.getTimezoneOffset() * 60_000; return new Date(date.getTime() - offset).toISOString().slice(0, 10); };
const formatTime = (time: string) => new Date(`2000-01-01T${time}`).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
const empty = { name: "", phone: "", email: "", date: "", time: "", vacancyId: "", message: "" };
const fieldClass = "mt-2 h-12 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition-all placeholder:text-muted-foreground/65 focus:border-primary focus:ring-4 focus:ring-primary/10";

export function BookingSection() {
  const [form, setForm] = useState(empty);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const { data: vacancies = [] } = useVacancies();
  const { data: slots = [], isLoading: slotsLoading, isError: slotsError } = useAvailableSlots(form.date);
  const booking = useBookAppointment();
  const openVacancies = useMemo(() => vacancies.filter((v) => v.status === "Open"), [vacancies]);
  const selectedVacancy = openVacancies.find((v) => v.id === form.vacancyId);

  useEffect(() => setForm((current) => ({ ...current, time: "" })), [form.date]);
  const set = (key: string, value: string) => { setForm((current) => ({ ...current, [key]: value })); setErrors((current) => ({ ...current, [key]: "", submit: "" })); };
  const validateDetails = () => {
    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) next.name = "Enter your full name.";
    if (!/^\+?[\d ()-]{7,24}$/.test(form.phone.trim())) next.phone = "Enter a valid phone number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = "Enter a valid email address.";
    setErrors(next); if (Object.keys(next).length) return false; return true;
  };
  const nextStep = () => { if (validateDetails()) setStep(2); };
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (step === 1) return nextStep();
    const next: Record<string, string> = {};
    if (!form.date || form.date < localDate()) next.date = "Choose a valid future date.";
    if (!form.time) next.time = "Choose an available time.";
    setErrors(next); if (Object.keys(next).length) return;
    booking.mutate({ customer_name: form.name.trim(), phone: form.phone.trim(), email: form.email.trim(), appointment_date: form.date, start_time: form.time, vacancy_id: form.vacancyId || null, message: form.message.trim() || null }, {
      onSuccess: (result) => { setConfirmation(result.reference_code); setForm(empty); setStep(1); },
      onError: (error: any) => setErrors({ submit: error.message || "We could not book that slot. Please try again." }),
    });
  };

  return <section id="book" className="relative overflow-hidden bg-slate-50 py-20 lg:py-28">
    <div className="pointer-events-none absolute -left-40 top-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" /><div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-ro-yellow/10 blur-3xl" />
    <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
      <div className="mb-10 text-center"><span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary"><Sparkles className="h-3.5 w-3.5" />Free consultation</span><h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl">Let’s plan your next career move.</h2><p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Choose a live available appointment. No account, no commitment, and no hidden consultation fee.</p></div>
      <div className="grid overflow-hidden rounded-[2rem] border bg-card shadow-2xl shadow-ro-blue/10 lg:grid-cols-[0.72fr_1.28fr]">
        <aside className="relative overflow-hidden bg-ro-blue p-7 text-white sm:p-9 lg:p-10">
          <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-primary/30 blur-3xl" />
          <div className="relative"><p className="text-xs font-bold uppercase tracking-[0.18em] text-ro-yellow">How it works</p><h3 className="mt-3 font-display text-2xl font-bold">A clearer path starts with a conversation.</h3>
            <div className="mt-9 space-y-7">{[
              ["1", "Tell us about you", "Share your contact details and the opportunity you’re interested in."],
              ["2", "Choose a live slot", "Only currently available appointment times are shown."],
              ["3", "We confirm with you", "Our team reviews the request and contacts you directly."],
            ].map(([number, title, text]) => <div key={number} className="flex gap-4"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-sm font-bold text-ro-yellow">{number}</span><div><p className="font-semibold">{title}</p><p className="mt-1 text-sm leading-6 text-white/60">{text}</p></div></div>)}</div>
            <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-4"><p className="flex items-center gap-2 text-sm font-semibold"><ShieldCheck className="h-4 w-4 text-ro-yellow" />Your information stays private</p><p className="mt-2 text-xs leading-5 text-white/55">Booking details are visible only to authorized Elladria Lanka administrators.</p></div>
          </div>
        </aside>

        <div className="p-6 sm:p-9 lg:p-10">
          {confirmation ? <Success reference={confirmation} reset={() => setConfirmation(null)} /> : <form onSubmit={submit} noValidate>
            <div className="mb-8 flex items-center gap-3"><StepBadge number={1} label="Your details" active={step === 1} complete={step > 1} /><div className={`h-px flex-1 ${step > 1 ? "bg-primary" : "bg-border"}`} /><StepBadge number={2} label="Date & time" active={step === 2} complete={false} /></div>
            <AnimatePresence mode="wait" initial={false}>
              {step === 1 ? <motion.div key="details" initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 18 }} transition={{ duration: 0.25 }}>
                <h3 className="font-display text-2xl font-bold">Tell us about yourself</h3><p className="mt-1 text-sm text-muted-foreground">We’ll use these details only to discuss your appointment.</p>
                <div className="mt-7 grid gap-5 sm:grid-cols-2"><Field label="Full name" error={errors.name} icon={<User className="h-4 w-4" />}><input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Your full name" maxLength={100} className={fieldClass} aria-invalid={!!errors.name} /></Field><Field label="Phone number" error={errors.phone} icon={<Phone className="h-4 w-4" />}><input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+94 77 123 4567" maxLength={24} className={fieldClass} aria-invalid={!!errors.phone} /></Field><div className="sm:col-span-2"><Field label="Email address" error={errors.email} icon={<Mail className="h-4 w-4" />}><input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" maxLength={254} className={fieldClass} aria-invalid={!!errors.email} /></Field></div><div className="sm:col-span-2"><label className="text-sm font-semibold">What would you like to discuss?</label><select value={form.vacancyId} onChange={(e) => set("vacancyId", e.target.value)} className={fieldClass}><option value="">General career consultation</option>{openVacancies.map((v) => <option key={v.id} value={v.id}>{v.title} — {v.city}</option>)}</select></div></div>
                <button type="button" onClick={nextStep} className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5">Continue to availability <ArrowRight className="h-4 w-4" /></button>
              </motion.div> : <motion.div key="schedule" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} transition={{ duration: 0.25 }}>
                <div className="flex items-start justify-between gap-4"><div><h3 className="font-display text-2xl font-bold">Choose your appointment</h3><p className="mt-1 text-sm text-muted-foreground">Times shown are live and update after every booking.</p></div><button type="button" onClick={() => setStep(1)} className="flex items-center gap-1 text-xs font-semibold text-primary"><ArrowLeft className="h-3.5 w-3.5" />Edit details</button></div>
                <div className="mt-7"><Field label="Preferred date" error={errors.date} icon={<CalendarDays className="h-4 w-4" />}><input type="date" min={localDate()} value={form.date} onChange={(e) => set("date", e.target.value)} className={fieldClass} aria-invalid={!!errors.date} /></Field></div>
                <div className="mt-6"><label className="flex items-center gap-2 text-sm font-semibold"><Clock className="h-4 w-4 text-primary" />Available times</label>{!form.date ? <div className="mt-3 rounded-xl border border-dashed bg-muted/40 p-6 text-center text-sm text-muted-foreground">Choose a date to see available times.</div> : slotsLoading ? <div className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-muted/40 p-6 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" />Checking availability…</div> : slots.length ? <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">{slots.map((slot) => <button key={slot} type="button" onClick={() => set("time", slot)} className={`rounded-xl border px-3 py-3 text-sm font-semibold transition-all ${form.time === slot ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20" : "bg-background hover:border-primary hover:text-primary"}`}>{formatTime(slot)}</button>)}</div> : <div className="mt-3 rounded-xl border border-dashed bg-muted/40 p-6 text-center text-sm text-muted-foreground">No slots are available on this date. Please try another day.</div>}{errors.time && <p className="mt-2 text-xs text-destructive">{errors.time}</p>}{slotsError && <p className="mt-2 text-xs text-destructive">Could not load availability.</p>}</div>
                <div className="mt-6"><label className="text-sm font-semibold">Anything we should know? <span className="font-normal text-muted-foreground">(optional)</span></label><textarea value={form.message} onChange={(e) => set("message", e.target.value)} maxLength={1000} rows={3} className={`${fieldClass} h-auto py-3`} placeholder="Documents, questions, accessibility needs…" /></div>
                {(form.date || form.time) && <div className="mt-6 rounded-2xl border border-primary/15 bg-primary/5 p-4"><p className="text-xs font-bold uppercase tracking-wide text-primary">Your appointment</p><p className="mt-2 text-sm font-semibold">{selectedVacancy?.title || "General career consultation"}</p><p className="mt-1 text-sm text-muted-foreground">{form.date || "Choose a date"}{form.time ? ` at ${formatTime(form.time)}` : ""}</p></div>}
                {errors.submit && <p className="mt-4 rounded-xl bg-destructive/10 p-3 text-sm text-destructive" role="alert">{errors.submit}</p>}
                <button type="submit" disabled={booking.isPending || !form.date || !form.time} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-50">{booking.isPending ? <><Loader2 className="h-4 w-4 animate-spin" />Reserving your slot…</> : <><Check className="h-4 w-4" />Request appointment</>}</button>
              </motion.div>}
            </AnimatePresence>
          </form>}
        </div>
      </div>
    </div>
  </section>;
}

function Field({ label, error, icon, children }: { label: string; error?: string; icon: React.ReactNode; children: React.ReactNode }) { return <div><label className="flex items-center gap-2 text-sm font-semibold"><span className="text-primary">{icon}</span>{label}</label>{children}{error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}</div>; }
function StepBadge({ number, label, active, complete }: { number: number; label: string; active: boolean; complete: boolean }) { return <div className={`flex items-center gap-2 ${active || complete ? "text-foreground" : "text-muted-foreground"}`}><span className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${active || complete ? "bg-primary text-primary-foreground" : "bg-muted"}`}>{complete ? <Check className="h-4 w-4" /> : number}</span><span className="hidden text-xs font-semibold sm:block">{label}</span></div>; }
function Success({ reference, reset }: { reference: string; reset: () => void }) { return <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="flex min-h-[480px] flex-col items-center justify-center text-center" role="status"><span className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10"><CheckCircle2 className="h-10 w-10 text-success" /></span><p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-success">Request received</p><h3 className="mt-3 font-display text-3xl font-bold">Your appointment is saved.</h3><p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">Our team will review the request and contact you. Keep this reference number for your records.</p><div className="mt-6 rounded-xl border bg-muted/50 px-6 py-4"><span className="text-xs text-muted-foreground">Reference number</span><p className="mt-1 font-display text-2xl font-extrabold tracking-widest text-primary">{reference}</p></div><button type="button" className="mt-7 text-sm font-semibold text-primary" onClick={reset}>Book another appointment</button></motion.div>; }

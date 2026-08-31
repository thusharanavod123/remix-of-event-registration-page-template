import { useEffect, useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, Clock, Loader2, Mail, Phone, User } from "lucide-react";
import { useAvailableSlots, useBookAppointment } from "@/hooks/useAppointments";
import { useVacancies } from "@/hooks/useVacancies";

const localDate = (date = new Date()) => {
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 10);
};
const formatTime = (time: string) => new Date(`2000-01-01T${time}`).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
const empty = { name: "", phone: "", email: "", date: "", time: "", vacancyId: "", message: "" };

export function BookingSection() {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const { data: vacancies = [] } = useVacancies();
  const { data: slots = [], isLoading: slotsLoading, isError: slotsError } = useAvailableSlots(form.date);
  const booking = useBookAppointment();
  const openVacancies = useMemo(() => vacancies.filter((v) => v.status === "Open"), [vacancies]);

  useEffect(() => setForm((current) => ({ ...current, time: "" })), [form.date]);
  const set = (key: string, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "", submit: "" }));
  };
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) next.name = "Enter your full name.";
    if (!/^\+?[\d ()-]{7,24}$/.test(form.phone.trim())) next.phone = "Enter a valid phone number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = "Enter a valid email address.";
    if (!form.date || form.date < localDate()) next.date = "Choose a valid future date.";
    if (!form.time) next.time = "Choose an available time.";
    setErrors(next);
    if (Object.keys(next).length) return;
    booking.mutate({ customer_name: form.name.trim(), phone: form.phone.trim(), email: form.email.trim(), appointment_date: form.date,
      start_time: form.time, vacancy_id: form.vacancyId || null, message: form.message.trim() || null }, {
      onSuccess: (result) => { setConfirmation(result.reference_code); setForm(empty); },
      onError: (error: any) => setErrors({ submit: error.message || "We could not book that slot. Please try again." }),
    });
  };
  const fieldClass = "mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring";

  return (
    <section id="book" className="bg-secondary/60 py-16">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-start">
        <div className="lg:sticky lg:top-24">
          <span className="rounded-full bg-ro-red/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ro-red">Visit our office</span>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">Book an appointment with our team</h2>
          <p className="mt-4 max-w-md text-muted-foreground">Choose a live available slot. No account is required, and our team will review your request.</p>
          <ul className="mt-6 space-y-2 text-sm text-muted-foreground"><li>• Free consultation with transparent guidance</li><li>• Bring your passport and CV if available</li><li>• Sinhala, Tamil, and English speaking staff</li></ul>
        </div>
        {confirmation ? (
          <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm" role="status">
            <CheckCircle2 className="mx-auto h-12 w-12 text-success" />
            <h3 className="mt-4 font-display text-2xl font-bold">Appointment requested</h3>
            <p className="mt-2 text-sm text-muted-foreground">Your reference is <strong className="text-foreground">{confirmation}</strong>. We’ll contact you after review.</p>
            <button className="mt-6 text-sm font-semibold text-primary" onClick={() => setConfirmation(null)}>Book another appointment</button>
          </div>
        ) : (
          <form onSubmit={submit} className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8" noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" error={errors.name} icon={<User className="h-4 w-4" />}><input value={form.name} onChange={(e) => set("name", e.target.value)} maxLength={100} className={fieldClass} aria-invalid={!!errors.name} /></Field>
              <Field label="Phone number" error={errors.phone} icon={<Phone className="h-4 w-4" />}><input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+94 77 123 4567" maxLength={24} className={fieldClass} aria-invalid={!!errors.phone} /></Field>
              <div className="sm:col-span-2"><Field label="Email address" error={errors.email} icon={<Mail className="h-4 w-4" />}><input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} maxLength={254} className={fieldClass} aria-invalid={!!errors.email} /></Field></div>
              <div className="sm:col-span-2"><label className="text-sm font-medium">What would you like to discuss?</label><select value={form.vacancyId} onChange={(e) => set("vacancyId", e.target.value)} className={fieldClass}><option value="">General consultation</option>{openVacancies.map((v) => <option key={v.id} value={v.id}>{v.title} — {v.city}</option>)}</select></div>
              <Field label="Preferred date" error={errors.date} icon={<CalendarDays className="h-4 w-4" />}><input type="date" min={localDate()} value={form.date} onChange={(e) => set("date", e.target.value)} className={fieldClass} aria-invalid={!!errors.date} /></Field>
              <div><label className="flex items-center gap-2 text-sm font-medium"><Clock className="h-4 w-4 text-muted-foreground" />Available time</label><select value={form.time} onChange={(e) => set("time", e.target.value)} disabled={!form.date || slotsLoading} className={fieldClass} aria-invalid={!!errors.time}><option value="">{slotsLoading ? "Checking availability…" : !form.date ? "Choose a date first" : slots.length ? "Choose a time" : "No slots available"}</option>{slots.map((slot) => <option key={slot} value={slot}>{formatTime(slot)}</option>)}</select>{errors.time && <p className="mt-1 text-xs text-destructive">{errors.time}</p>}{slotsError && <p className="mt-1 text-xs text-destructive">Could not load availability.</p>}</div>
              <div className="sm:col-span-2"><label className="text-sm font-medium">Message <span className="text-muted-foreground">(optional)</span></label><textarea value={form.message} onChange={(e) => set("message", e.target.value)} maxLength={1000} rows={3} className={fieldClass} placeholder="Anything our team should know?" /></div>
            </div>
            {errors.submit && <p className="mt-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive" role="alert">{errors.submit}</p>}
            <button type="submit" disabled={booking.isPending} className="mt-5 flex w-full items-center justify-center rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60">{booking.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{booking.isPending ? "Reserving slot…" : "Request appointment"}</button>
          </form>
        )}
      </div>
    </section>
  );
}

function Field({ label, error, icon, children }: { label: string; error?: string; icon: React.ReactNode; children: React.ReactNode }) {
  return <div><label className="flex items-center gap-2 text-sm font-medium"><span className="text-muted-foreground">{icon}</span>{label}</label>{children}{error && <p className="mt-1 text-xs text-destructive">{error}</p>}</div>;
}

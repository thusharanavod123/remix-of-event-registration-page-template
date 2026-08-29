import { useState } from "react";
import { CalendarDays, Clock, Phone, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BookingForm {
  name: string;
  date: string;
  time: string;
  phone: string;
}

const initial: BookingForm = { name: "", date: "", time: "", phone: "" };

export function BookingSection() {
  const { toast } = useToast();
  const [form, setForm] = useState<BookingForm>(initial);
  const [errors, setErrors] = useState<Partial<BookingForm>>({});

  const set = (key: keyof BookingForm) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Partial<BookingForm> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (form.name.trim().length > 100) errs.name = "Name must be under 100 characters";
    if (!form.date) errs.date = "Please pick a date";
    if (!form.time) errs.time = "Please pick a time";
    if (!/^\+?[\d\s-]{7,20}$/.test(form.phone.trim())) errs.phone = "Enter a valid phone number";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    toast({
      title: "Appointment booked!",
      description: `See you on ${form.date} at ${form.time}, ${form.name.trim()}. We'll confirm by phone.`,
    });
    setForm(initial);
    setErrors({});
  };

  const inputCls =
    "w-full rounded-xl border border-input bg-background px-4 py-3 pl-11 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring";
  const errCls = "mt-1 text-xs text-destructive";
  const today = new Date().toISOString().split("T")[0];

  return (
    <section id="book" className="bg-secondary/60 py-16">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="inline-block rounded-full bg-ro-red/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ro-red">
            Visit our office
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
            Book an appointment with our team
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Prefer to talk face to face? Schedule a visit to our office and we'll walk you through
            the application process, documents you need, and current openings in Romania and beyond.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
            <li>• Free consultation — no hidden fees</li>
            <li>• Bring your passport and CV if available</li>
            <li>• Sinhala, Tamil, and English speaking staff</li>
          </ul>
        </div>

        <form
          onSubmit={submit}
          className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
          noValidate
        >
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium" htmlFor="bk-name">
                Full name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="bk-name"
                  type="text"
                  value={form.name}
                  onChange={set("name")}
                  placeholder="Your full name"
                  maxLength={100}
                  className={inputCls}
                />
              </div>
              {errors.name && <p className={errCls}>{errors.name}</p>}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium" htmlFor="bk-date">
                  Date
                </label>
                <div className="relative">
                  <CalendarDays className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="bk-date"
                    type="date"
                    min={today}
                    value={form.date}
                    onChange={set("date")}
                    className={inputCls}
                  />
                </div>
                {errors.date && <p className={errCls}>{errors.date}</p>}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium" htmlFor="bk-time">
                  Time
                </label>
                <div className="relative">
                  <Clock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="bk-time"
                    type="time"
                    value={form.time}
                    onChange={set("time")}
                    className={inputCls}
                  />
                </div>
                {errors.time && <p className={errCls}>{errors.time}</p>}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium" htmlFor="bk-phone">
                Phone number
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="bk-phone"
                  type="tel"
                  value={form.phone}
                  onChange={set("phone")}
                  placeholder="+94 77 123 4567"
                  maxLength={20}
                  className={inputCls}
                />
              </div>
              {errors.phone && <p className={errCls}>{errors.phone}</p>}
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Confirm appointment
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

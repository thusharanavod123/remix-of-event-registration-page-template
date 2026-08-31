import { ArrowRight, BriefcaseBusiness, Building2, Loader2, MapPin } from "lucide-react";
import { useCompanyCareers } from "@/hooks/useCompanyCareers";

export default function RecruitCareers() {
  const { data: roles = [], isLoading, isError } = useCompanyCareers();
  return <div>
    <section className="border-b bg-card">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-ro-red">Careers at EuroBridge</span>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight sm:text-5xl">Do meaningful work that opens doors across borders.</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">Join the team helping Sri Lankan professionals build safer, stronger careers in Europe.</p>
      </div>
    </section>
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="flex items-end justify-between gap-4"><div><span className="text-xs font-semibold uppercase tracking-wide text-primary">Join our team</span><h2 className="mt-2 font-display text-3xl font-bold">Open positions</h2></div><span className="text-sm text-muted-foreground">{roles.length} {roles.length === 1 ? "opening" : "openings"}</span></div>
      {isLoading && <div className="mt-10 flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" />Loading positions…</div>}
      {isError && <p className="mt-10 rounded-2xl border border-dashed p-8 text-center text-sm text-muted-foreground">Careers will appear here once Supabase is connected.</p>}
      {!isLoading && !isError && roles.length === 0 && <div className="mt-10 rounded-2xl border border-dashed bg-card px-6 py-14 text-center"><BriefcaseBusiness className="mx-auto h-9 w-9 text-muted-foreground" /><h3 className="mt-4 font-display text-lg font-semibold">No open positions right now</h3><p className="mt-2 text-sm text-muted-foreground">Please check again soon as our team continues to grow.</p></div>}
      <div className="mt-10 grid gap-5 md:grid-cols-2">{roles.map((role) => {
        const href = role.application_url || `mailto:${role.application_email}?subject=${encodeURIComponent(`Application: ${role.title}`)}`;
        return <article key={role.id} className="group rounded-2xl border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-start justify-between gap-4"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary"><Building2 className="h-5 w-5" /></span><span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">{role.employment_type}</span></div>
          <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-primary">{role.department}</p><h2 className="mt-2 font-display text-xl font-semibold">{role.title}</h2>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground"><MapPin className="h-3.5 w-3.5" />{role.location}</p><p className="mt-4 text-sm leading-6 text-muted-foreground">{role.summary}</p>
          {role.requirements && <div className="mt-4 whitespace-pre-line border-t pt-4 text-sm text-muted-foreground"><strong className="text-foreground">What we’re looking for</strong><br />{role.requirements}</div>}
          <a href={href} target={role.application_url ? "_blank" : undefined} rel={role.application_url ? "noreferrer" : undefined} className="mt-6 inline-flex items-center gap-2 font-semibold text-primary">Apply for this role <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></a>
        </article>;
      })}</div>
    </section>
  </div>;
}

import { Factory, Truck, Warehouse } from "lucide-react";

// Replace these neutral placeholders with verified partner logos and names.
const partners = [
  { name: "Logistics partner", icon: Truck },
  { name: "Manufacturing partner", icon: Factory },
  { name: "Warehouse partner", icon: Warehouse },
];

export function PartnerMarquee() {
  const repeated = [...partners, ...partners, ...partners, ...partners];
  return <section className="border-y border-border bg-card py-8" aria-labelledby="partner-heading">
    <div className="mx-auto mb-6 flex max-w-6xl items-center gap-5 px-4 sm:px-6">
      <p id="partner-heading" className="shrink-0 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Employers we work with</p>
      <span className="h-px flex-1 bg-border" />
      <p className="hidden text-xs text-muted-foreground sm:block">Trusted opportunities across Europe</p>
    </div>
    <div className="partner-marquee relative overflow-hidden" role="region" aria-label="Employer partner logos">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-card to-transparent sm:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-card to-transparent sm:w-40" />
      <div className="partner-marquee-track flex w-max items-center gap-5 pl-5">
        {repeated.map(({ name, icon: Icon }, index) => <div key={`${name}-${index}`} aria-hidden={index >= partners.length} className="flex h-20 w-72 shrink-0 items-center gap-4 rounded-2xl border border-border bg-background px-6 text-foreground/70 shadow-sm transition-all hover:border-primary/30 hover:text-foreground hover:shadow-md">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon className="h-5 w-5" /></span>
          <div><p className="font-display text-base font-bold tracking-tight">{name}</p><p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">Verified employer slot</p></div>
        </div>)}
      </div>
    </div>
  </section>;
}


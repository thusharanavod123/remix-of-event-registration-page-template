import { useMemo, useState } from "react";
import { ExternalLink, Loader2, Map, MapPin, Search, SlidersHorizontal } from "lucide-react";
import { useVacancies } from "@/hooks/useVacancies";

export default function RecruitVacancies() {
  const { data: vacancies = [], isLoading } = useVacancies();
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("All countries");
  const [city, setCity] = useState("All cities");

  const countries = useMemo(
    () => ["All countries", ...Array.from(new Set(vacancies.map((v) => v.country)))],
    [vacancies]
  );
  const cities = useMemo(() => ["All cities", ...Array.from(new Set(vacancies.filter((v) => country === "All countries" || v.country === country).map((v) => v.city)))], [vacancies, country]);
  const mapLocation = city !== "All cities" ? `${city}${country !== "All countries" ? `, ${country}` : ""}` : country !== "All countries" ? country : "Romania";
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(mapLocation)}&output=embed`;

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return vacancies.filter((v) => {
      const matchQ =
        !q ||
        v.title.toLowerCase().includes(q) ||
        v.city.toLowerCase().includes(q) ||
        v.country.toLowerCase().includes(q);
      const matchC = country === "All countries" || v.country === country;
      const matchCity = city === "All cities" || v.city === city;
      return matchQ && matchC && matchCity;
    });
  }, [query, country, city, vacancies]);

  const showOnMap = (nextCountry: string, nextCity: string) => {
    setCountry(nextCountry);
    setCity(nextCity);
    document.getElementById("vacancy-map")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <section className="grid items-stretch gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="flex flex-col justify-center py-4">
          <span className="text-xs font-semibold uppercase tracking-wide text-ro-red">Find your role</span>
          <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Opportunities across Europe</h1>
          <p className="mt-4 max-w-xl text-muted-foreground">Choose a country and city to explore where each opportunity is located.</p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <div><label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Country</label><select value={country} onChange={(e) => { setCountry(e.target.value); setCity("All cities"); }} className="w-full rounded-xl border bg-card px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring">{countries.map((item) => <option key={item}>{item}</option>)}</select></div>
            <div><label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">City</label><select value={city} onChange={(e) => setCity(e.target.value)} className="w-full rounded-xl border bg-card px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring">{cities.map((item) => <option key={item}>{item}</option>)}</select></div>
          </div>
          <p className="mt-4 flex items-center gap-2 text-sm font-medium text-primary"><MapPin className="h-4 w-4" />Showing {mapLocation}</p>
        </div>
        <div id="vacancy-map" className="relative min-h-[360px] overflow-hidden rounded-3xl border bg-muted shadow-lg shadow-ro-blue/10">
          <iframe key={mapLocation} title={`Map of ${mapLocation}`} src={mapUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 h-full w-full border-0" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/10 to-transparent" />
          <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapLocation)}`} target="_blank" rel="noreferrer" className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-ro-blue shadow-lg">Open full map <ExternalLink className="h-3.5 w-3.5" /></a>
        </div>
      </section>

      {/* Filters */}
      <div className="mt-12 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by job title or city…"
            maxLength={80}
            className="w-full rounded-full border border-input bg-card py-3 pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="relative sm:w-64">
          <SlidersHorizontal className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <select
            value={country}
            onChange={(e) => { setCountry(e.target.value); setCity("All cities"); }}
            className="w-full appearance-none rounded-full border border-input bg-card py-3 pl-11 pr-8 text-sm outline-none focus:ring-2 focus:ring-ring"
          >
            {countries.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results */}
      {isLoading ? (
        <div className="mt-10 flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading vacancies…
        </div>
      ) : (
        <>
          <p className="mt-6 text-sm text-muted-foreground">
            {results.length} {results.length === 1 ? "vacancy" : "vacancies"} found
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {results.map((v) => (
              <article
                key={v.id}
                className="rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-display text-lg font-semibold">{v.title}</h2>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                      v.status === "Open"
                        ? "bg-ro-yellow/25 text-ro-blue"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {v.status}
                  </span>
                </div>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 text-ro-red" />
                  {v.city}, {v.country}
                </p>
                <button type="button" onClick={() => showOnMap(v.country, v.city)} className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"><Map className="h-3.5 w-3.5" />Show on map</button>
                {v.description && (
                  <p className="mt-3 text-sm text-muted-foreground">{v.description}</p>
                )}
                <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-sm">
                  <span className="font-medium">{v.salary}</span>
                  <span className="text-muted-foreground">{v.job_type}</span>
                </div>
                <a
                  href="#book"
                  className={`mt-4 block rounded-full py-2.5 text-center text-sm font-semibold transition-opacity hover:opacity-90 ${
                    v.status === "Open"
                      ? "bg-primary text-primary-foreground"
                      : "cursor-default bg-muted text-muted-foreground"
                  }`}
                >
                  {v.status === "Open" ? "Apply — book an appointment" : "Opening soon"}
                </a>
              </article>
            ))}
            {results.length === 0 && (
              <p className="col-span-full rounded-2xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
                No vacancies match your search. Try a different keyword or country.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

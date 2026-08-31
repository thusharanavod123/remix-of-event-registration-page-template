import { useState } from "react";
import { Loader2, Pencil, Plus, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCompanyCareers, useCompanyCareerMutations, type CompanyCareer, type CompanyCareerInput } from "@/hooks/useCompanyCareers";

const empty: CompanyCareerInput = { title: "", department: "", location: "Sri Lanka", employment_type: "Full-time", summary: "", requirements: "", application_email: "", application_url: "", status: "draft", sort_order: 0 };

function CareerForm({ initial, busy, cancel, save }: { initial: CompanyCareerInput; busy: boolean; cancel: () => void; save: (input: CompanyCareerInput) => void }) {
  const [form, setForm] = useState(initial);
  const set = (key: keyof CompanyCareerInput, value: any) => setForm((current) => ({ ...current, [key]: value }));
  return <form className="rounded-2xl border bg-card p-5" onSubmit={(e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.department.trim() || !form.location.trim() || form.summary.trim().length < 10) return toast.error("Add a title, department, location and a useful summary.");
    if (form.status === "published" && !form.application_email?.trim() && !form.application_url?.trim()) return toast.error("Published roles need an application email or URL.");
    save({ ...form, title: form.title.trim(), department: form.department.trim(), location: form.location.trim(), summary: form.summary.trim(), requirements: form.requirements?.trim() || null, application_email: form.application_email?.trim() || null, application_url: form.application_url?.trim() || null });
  }}>
    <div className="flex items-center justify-between"><h3 className="font-display font-semibold">{initial.title ? "Edit company role" : "New company role"}</h3><Button type="button" size="icon" variant="ghost" onClick={cancel}><X className="h-4 w-4" /></Button></div>
    <div className="mt-4 grid gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2"><Label>Job title</Label><Input value={form.title} maxLength={120} onChange={(e) => set("title", e.target.value)} /></div>
      <div><Label>Department</Label><Input value={form.department} maxLength={80} placeholder="Recruitment" onChange={(e) => set("department", e.target.value)} /></div>
      <div><Label>Location</Label><Input value={form.location} maxLength={120} placeholder="Colombo / Hybrid" onChange={(e) => set("location", e.target.value)} /></div>
      <div><Label>Employment type</Label><select value={form.employment_type} onChange={(e) => set("employment_type", e.target.value)} className="mt-2 h-10 w-full rounded-md border bg-background px-3 text-sm"><option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option></select></div>
      <div><Label>Publishing status</Label><select value={form.status} onChange={(e) => set("status", e.target.value)} className="mt-2 h-10 w-full rounded-md border bg-background px-3 text-sm"><option value="draft">Draft</option><option value="published">Published</option><option value="closed">Closed</option></select></div>
      <div className="sm:col-span-2"><Label>Role summary</Label><Textarea value={form.summary} maxLength={600} rows={3} onChange={(e) => set("summary", e.target.value)} /></div>
      <div className="sm:col-span-2"><Label>Requirements (optional)</Label><Textarea value={form.requirements ?? ""} maxLength={2000} rows={5} placeholder="Add one requirement per line" onChange={(e) => set("requirements", e.target.value)} /></div>
      <div><Label>Application email</Label><Input type="email" value={form.application_email ?? ""} maxLength={254} placeholder="careers@company.com" onChange={(e) => set("application_email", e.target.value)} /></div>
      <div><Label>Application URL</Label><Input type="url" value={form.application_url ?? ""} maxLength={500} placeholder="https://…" onChange={(e) => set("application_url", e.target.value)} /></div>
      <div><Label>Sort order</Label><Input type="number" value={form.sort_order} onChange={(e) => set("sort_order", Number(e.target.value))} /></div>
    </div>
    <div className="mt-5 flex gap-2"><Button disabled={busy}>{busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Save role</Button><Button type="button" variant="ghost" onClick={cancel}>Cancel</Button></div>
  </form>;
}

export function CareersAdmin() {
  const { data: roles = [], isLoading, isError } = useCompanyCareers();
  const { create, update, remove } = useCompanyCareerMutations();
  const [editing, setEditing] = useState<CompanyCareer | "new" | null>(null);
  const busy = create.isPending || update.isPending;
  const done = () => { toast.success("Company role saved"); setEditing(null); };
  return <div className="space-y-5">
    <div className="flex items-center justify-between"><p className="text-sm text-muted-foreground">{roles.length} company roles</p><Button size="sm" onClick={() => setEditing("new")}><Plus className="mr-1 h-4 w-4" />New role</Button></div>
    {isError && <p className="text-sm text-destructive">Apply the company careers migration to Supabase first.</p>}
    {editing === "new" && <CareerForm initial={{ ...empty, sort_order: roles.length + 1 }} busy={busy} cancel={() => setEditing(null)} save={(input) => create.mutate(input, { onSuccess: done, onError: (e: any) => toast.error(e.message) })} />}
    {isLoading && <Loader2 className="h-5 w-5 animate-spin" />}
    <div className="space-y-3">{roles.map((role) => editing !== "new" && editing?.id === role.id ? <CareerForm key={role.id} initial={role} busy={busy} cancel={() => setEditing(null)} save={(input) => update.mutate({ id: role.id, ...input }, { onSuccess: done, onError: (e: any) => toast.error(e.message) })} /> :
      <article key={role.id} className="flex items-start justify-between gap-4 rounded-2xl border bg-card p-4"><div><div className="flex flex-wrap items-center gap-2"><h3 className="font-display font-semibold">{role.title}</h3><span className={`rounded-full px-2.5 py-0.5 text-xs ${role.status === "published" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>{role.status}</span></div><p className="mt-1 text-sm text-muted-foreground">{role.department} · {role.location} · {role.employment_type}</p></div><div className="flex"><Button size="icon" variant="ghost" onClick={() => setEditing(role)}><Pencil className="h-4 w-4" /></Button><Button size="icon" variant="ghost" onClick={() => { if (confirm(`Delete “${role.title}”?`)) remove.mutate(role.id, { onSuccess: () => toast.success("Role deleted"), onError: (e: any) => toast.error(e.message) }); }}><Trash2 className="h-4 w-4 text-destructive" /></Button></div></article>)}
    </div>
  </div>;
}


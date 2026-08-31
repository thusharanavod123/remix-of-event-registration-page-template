import { useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, Pencil, Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useVacancies, useVacancyMutations, type Vacancy } from "@/hooks/useVacancies";
import { useFaqs, useFaqMutations, type Faq } from "@/hooks/useFaqs";
import { AppointmentsTab, AvailabilityTab } from "@/components/admin/AppointmentAdmin";

const emptyVacancy = {
  title: "",
  country: "Romania",
  city: "",
  salary: "TBA",
  job_type: "Full-time",
  status: "Open",
  description: "",
  sort_order: 0,
};

function VacancyForm({
  initial,
  onCancel,
  onSubmit,
  busy,
}: {
  initial: typeof emptyVacancy;
  onCancel: () => void;
  onSubmit: (v: typeof emptyVacancy) => void;
  busy: boolean;
}) {
  const [form, setForm] = useState(initial);
  const set = (k: string, v: string | number) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!form.title.trim() || !form.city.trim() || !form.country.trim()) {
          toast.error("Title, city and country are required.");
          return;
        }
        onSubmit(form);
      }}
      className="rounded-2xl border border-border bg-card p-5"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label>Job title</Label>
          <Input value={form.title} maxLength={120} onChange={(e) => set("title", e.target.value)} />
        </div>
        <div>
          <Label>Country</Label>
          <Input value={form.country} maxLength={60} onChange={(e) => set("country", e.target.value)} />
        </div>
        <div>
          <Label>City</Label>
          <Input value={form.city} maxLength={60} onChange={(e) => set("city", e.target.value)} />
        </div>
        <div>
          <Label>Salary</Label>
          <Input value={form.salary} maxLength={60} onChange={(e) => set("salary", e.target.value)} />
        </div>
        <div>
          <Label>Job type</Label>
          <Input value={form.job_type} maxLength={40} onChange={(e) => set("job_type", e.target.value)} />
        </div>
        <div>
          <Label>Status</Label>
          <select
            value={form.status}
            onChange={(e) => set("status", e.target.value)}
            className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
          >
            <option>Open</option>
            <option>Coming soon</option>
            <option>Closed</option>
          </select>
        </div>
        <div>
          <Label>Sort order</Label>
          <Input
            type="number"
            value={form.sort_order}
            onChange={(e) => set("sort_order", Number(e.target.value))}
          />
        </div>
        <div className="sm:col-span-2">
          <Label>Description (optional)</Label>
          <Textarea
            value={form.description ?? ""}
            maxLength={800}
            onChange={(e) => set("description", e.target.value)}
          />
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <Button type="submit" disabled={busy}>
          {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save vacancy
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

function VacanciesTab() {
  const { data: vacancies = [], isLoading } = useVacancies();
  const { create, update, remove } = useVacancyMutations();
  const [editing, setEditing] = useState<Vacancy | "new" | null>(null);

  const busy = create.isPending || update.isPending;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{vacancies.length} vacancies</p>
        <Button size="sm" onClick={() => setEditing("new")}>
          <Plus className="mr-1 h-4 w-4" /> New vacancy
        </Button>
      </div>

      {editing === "new" && (
        <VacancyForm
          initial={{ ...emptyVacancy, sort_order: vacancies.length + 1 }}
          busy={busy}
          onCancel={() => setEditing(null)}
          onSubmit={(v) =>
            create.mutate(v as any, {
              onSuccess: () => {
                toast.success("Vacancy added");
                setEditing(null);
              },
              onError: (e: any) => toast.error(e.message),
            })
          }
        />
      )}

      {isLoading && <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />}

      <div className="space-y-3">
        {vacancies.map((v) =>
          editing !== "new" && editing?.id === v.id ? (
            <VacancyForm
              key={v.id}
              initial={{ ...v, description: v.description ?? "" } as any}
              busy={busy}
              onCancel={() => setEditing(null)}
              onSubmit={(form) =>
                update.mutate(
                  { id: v.id, ...(form as any) },
                  {
                    onSuccess: () => {
                      toast.success("Vacancy updated");
                      setEditing(null);
                    },
                    onError: (e: any) => toast.error(e.message),
                  }
                )
              }
            />
          ) : (
            <div
              key={v.id}
              className="flex items-start justify-between gap-4 rounded-2xl border border-border bg-card p-4"
            >
              <div>
                <p className="font-display font-semibold">{v.title}</p>
                <p className="text-sm text-muted-foreground">
                  {v.city}, {v.country} · {v.salary} · {v.job_type}
                </p>
                <span className="mt-2 inline-block rounded-full bg-muted px-2.5 py-0.5 text-xs">
                  {v.status}
                </span>
              </div>
              <div className="flex shrink-0 gap-1">
                <Button size="icon" variant="ghost" onClick={() => setEditing(v)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => {
                    if (!confirm(`Delete "${v.title}"?`)) return;
                    remove.mutate(v.id, {
                      onSuccess: () => toast.success("Vacancy deleted"),
                      onError: (e: any) => toast.error(e.message),
                    });
                  }}
                >
                  <Trash2 className="h-4 w-4 text-ro-red" />
                </Button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

function FaqsTab() {
  const { data: faqs = [], isLoading } = useFaqs();
  const { create, update, remove } = useFaqMutations();
  const [editing, setEditing] = useState<Faq | "new" | null>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [order, setOrder] = useState(0);

  const startNew = () => {
    setQuestion("");
    setAnswer("");
    setOrder(faqs.length + 1);
    setEditing("new");
  };

  const startEdit = (f: Faq) => {
    setQuestion(f.question);
    setAnswer(f.answer);
    setOrder(f.sort_order);
    setEditing(f);
  };

  const save = () => {
    if (!question.trim() || !answer.trim()) {
      toast.error("Question and answer are required.");
      return;
    }
    const payload = { question: question.trim(), answer: answer.trim(), sort_order: order };
    const done = {
      onSuccess: () => {
        toast.success("Saved");
        setEditing(null);
      },
      onError: (e: any) => toast.error(e.message),
    };
    if (editing === "new") create.mutate(payload, done);
    else if (editing) update.mutate({ id: editing.id, ...payload }, done);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{faqs.length} questions</p>
        <Button size="sm" onClick={startNew}>
          <Plus className="mr-1 h-4 w-4" /> New question
        </Button>
      </div>

      {editing && (
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <p className="font-display font-semibold">
              {editing === "new" ? "New question" : "Edit question"}
            </p>
            <Button size="icon" variant="ghost" onClick={() => setEditing(null)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-4 space-y-4">
            <div>
              <Label>Question</Label>
              <Input value={question} maxLength={200} onChange={(e) => setQuestion(e.target.value)} />
            </div>
            <div>
              <Label>Answer</Label>
              <Textarea
                value={answer}
                rows={4}
                maxLength={1000}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>
            <div className="sm:w-40">
              <Label>Sort order</Label>
              <Input type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))} />
            </div>
            <Button onClick={save} disabled={create.isPending || update.isPending}>
              Save question
            </Button>
          </div>
        </div>
      )}

      {isLoading && <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />}

      <div className="space-y-3">
        {faqs.map((f) => (
          <div
            key={f.id}
            className="flex items-start justify-between gap-4 rounded-2xl border border-border bg-card p-4"
          >
            <div>
              <p className="font-display font-semibold">{f.question}</p>
              <p className="mt-1 text-sm text-muted-foreground">{f.answer}</p>
            </div>
            <div className="flex shrink-0 gap-1">
              <Button size="icon" variant="ghost" onClick={() => startEdit(f)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => {
                  if (!confirm("Delete this question?")) return;
                  remove.mutate(f.id, {
                    onSuccess: () => toast.success("Deleted"),
                    onError: (e: any) => toast.error(e.message),
                  });
                }}
              >
                <Trash2 className="h-4 w-4 text-ro-red" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminPanel() {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex gap-1">
              <span className="h-4 w-1.5 rounded-sm bg-ro-blue" />
              <span className="h-4 w-1.5 rounded-sm bg-ro-yellow" />
              <span className="h-4 w-1.5 rounded-sm bg-ro-red" />
            </span>
            <span className="font-display font-bold">Admin panel</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground">
              View site
            </Link>
            <Button size="sm" variant="ghost" onClick={() => signOut()}>
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <h1 className="font-display text-2xl font-bold">Site management</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Signed in as {user?.email}. Changes appear on the public site immediately.
        </p>

        <Tabs defaultValue="appointments" className="mt-8">
          <TabsList className="h-auto flex-wrap justify-start">
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
            <TabsTrigger value="vacancies">Vacancies</TabsTrigger>
            <TabsTrigger value="faqs">FAQs</TabsTrigger>
          </TabsList>
          <TabsContent value="appointments" className="mt-6"><AppointmentsTab /></TabsContent>
          <TabsContent value="availability" className="mt-6"><AvailabilityTab /></TabsContent>
          <TabsContent value="vacancies" className="mt-6">
            <VacanciesTab />
          </TabsContent>
          <TabsContent value="faqs" className="mt-6">
            <FaqsTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

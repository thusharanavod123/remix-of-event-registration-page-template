import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Vacancy {
  id: string;
  title: string;
  country: string;
  city: string;
  salary: string;
  job_type: string;
  status: string;
  description: string | null;
  sort_order: number;
}

export type VacancyInput = Omit<Vacancy, "id">;

const db = () => (supabase as any).from("vacancies");

export function useVacancies() {
  return useQuery({
    queryKey: ["vacancies"],
    queryFn: async (): Promise<Vacancy[]> => {
      const { data, error } = await db().select("*").order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as Vacancy[];
    },
  });
}

export function useVacancyMutations() {
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: ["vacancies"] });

  const create = useMutation({
    mutationFn: async (input: VacancyInput) => {
      const { error } = await db().insert(input);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });

  const update = useMutation({
    mutationFn: async ({ id, ...input }: Partial<Vacancy> & { id: string }) => {
      const { error } = await db().update(input).eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await db().delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });

  return { create, update, remove };
}

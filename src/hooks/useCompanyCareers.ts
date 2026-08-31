import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface CompanyCareer {
  id: string; title: string; department: string; location: string; employment_type: string;
  summary: string; requirements: string | null; application_email: string | null;
  application_url: string | null; status: "draft" | "published" | "closed"; sort_order: number;
}
export type CompanyCareerInput = Omit<CompanyCareer, "id">;
const db = () => (supabase as any).from("company_careers");

export function useCompanyCareers() {
  return useQuery({ queryKey: ["company-careers"], queryFn: async (): Promise<CompanyCareer[]> => {
    const { data, error } = await db().select("*").order("sort_order").order("created_at", { ascending: false });
    if (error) throw error; return data ?? [];
  }});
}
export function useCompanyCareerMutations() {
  const qc = useQueryClient(); const refresh = () => qc.invalidateQueries({ queryKey: ["company-careers"] });
  const create = useMutation({ mutationFn: async (input: CompanyCareerInput) => { const { error } = await db().insert(input); if (error) throw error; }, onSuccess: refresh });
  const update = useMutation({ mutationFn: async ({ id, ...input }: Partial<CompanyCareer> & { id: string }) => { const { error } = await db().update(input).eq("id", id); if (error) throw error; }, onSuccess: refresh });
  const remove = useMutation({ mutationFn: async (id: string) => { const { error } = await db().delete().eq("id", id); if (error) throw error; }, onSuccess: refresh });
  return { create, update, remove };
}


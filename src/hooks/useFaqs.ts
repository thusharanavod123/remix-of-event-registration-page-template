import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Faq {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
}

export type FaqInput = Omit<Faq, "id">;

const db = () => (supabase as any).from("faqs");

export function useFaqs() {
  return useQuery({
    queryKey: ["faqs"],
    queryFn: async (): Promise<Faq[]> => {
      const { data, error } = await db().select("*").order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as Faq[];
    },
  });
}

export function useFaqMutations() {
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: ["faqs"] });

  const create = useMutation({
    mutationFn: async (input: FaqInput) => {
      const { error } = await db().insert(input);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });

  const update = useMutation({
    mutationFn: async ({ id, ...input }: Partial<Faq> & { id: string }) => {
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

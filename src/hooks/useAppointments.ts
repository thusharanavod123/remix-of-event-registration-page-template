import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled" | "no_show";
export interface Appointment {
  id: string; reference_code: string; customer_name: string; phone: string; email: string;
  vacancy_id: string | null; appointment_type: "general" | "vacancy"; appointment_date: string;
  start_time: string; end_time: string; message: string | null; status: AppointmentStatus;
  admin_notes: string | null; created_at: string; vacancies?: { title: string } | null;
}
export interface AvailabilityRule { id: string; day_of_week: number; start_time: string; end_time: string; slot_minutes: number; is_active: boolean; }
export interface BlockedPeriod { id: string; blocked_date: string; start_time: string | null; end_time: string | null; reason: string | null; }
const db = supabase as any;

export function useAvailableSlots(date: string) {
  return useQuery({ queryKey: ["appointment-slots", date], enabled: Boolean(date), staleTime: 15_000,
    queryFn: async (): Promise<string[]> => { const { data, error } = await db.rpc("get_available_appointment_slots", { p_date: date }); if (error) throw error; return (data ?? []).map((r: any) => r.slot_time); } });
}
export function useBookAppointment() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: async (input: any) => { const { data, error } = await db.rpc("book_appointment", {
    p_customer_name: input.customer_name, p_phone: input.phone, p_email: input.email,
    p_appointment_date: input.appointment_date, p_start_time: input.start_time,
    p_vacancy_id: input.vacancy_id, p_message: input.message,
  }); if (error) throw error;
    const result = data[0] as { appointment_id: string; reference_code: string };
    supabase.functions.invoke("notify-appointment", { body: { appointment_id: result.appointment_id } }).catch(() => undefined);
    return result; },
  onSuccess: (_data, input) => qc.invalidateQueries({ queryKey: ["appointment-slots", input.appointment_date] }) });
}
export function useAppointments() {
  const qc = useQueryClient();
  useEffect(() => {
    const channel = supabase.channel("admin-appointments").on("postgres_changes", { event: "*", schema: "public", table: "appointments" }, () => qc.invalidateQueries({ queryKey: ["appointments"] })).subscribe();
    return () => { void supabase.removeChannel(channel); };
  }, [qc]);
  return useQuery({ queryKey: ["appointments"], queryFn: async (): Promise<Appointment[]> => { const { data, error } = await db.from("appointments").select("*, vacancies(title)").order("appointment_date").order("start_time"); if (error) throw error; return data ?? []; } });
}
export function useAppointmentMutations() {
  const qc = useQueryClient();
  const update = useMutation({ mutationFn: async ({ id, vacancies: _v, ...changes }: Partial<Appointment> & { id: string }) => { const { error } = await db.from("appointments").update(changes).eq("id", id); if (error) throw error; },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["appointments"] }); qc.invalidateQueries({ queryKey: ["appointment-slots"] }); } });
  return { update };
}
export function useAvailabilityRules() {
  return useQuery({ queryKey: ["availability-rules"], queryFn: async (): Promise<AvailabilityRule[]> => { const { data, error } = await db.from("availability_rules").select("*").order("day_of_week"); if (error) throw error; return data ?? []; } });
}
export function useAvailabilityMutations() {
  const qc = useQueryClient(); const refresh = () => qc.invalidateQueries({ queryKey: ["availability-rules"] });
  const update = useMutation({ mutationFn: async ({ id, ...changes }: Partial<AvailabilityRule> & { id: string }) => { const { error } = await db.from("availability_rules").update(changes).eq("id", id); if (error) throw error; }, onSuccess: refresh });
  const create = useMutation({ mutationFn: async (input: Omit<AvailabilityRule, "id">) => { const { error } = await db.from("availability_rules").insert(input); if (error) throw error; }, onSuccess: refresh });
  return { update, create };
}
export function useBlockedPeriods() {
  return useQuery({ queryKey: ["blocked-periods"], queryFn: async (): Promise<BlockedPeriod[]> => { const { data, error } = await db.from("blocked_periods").select("*").order("blocked_date"); if (error) throw error; return data ?? []; } });
}
export function useBlockedPeriodMutations() {
  const qc = useQueryClient(); const refresh = () => qc.invalidateQueries({ queryKey: ["blocked-periods"] });
  const create = useMutation({ mutationFn: async (input: Omit<BlockedPeriod, "id">) => { const { error } = await db.from("blocked_periods").insert(input); if (error) throw error; }, onSuccess: refresh });
  const remove = useMutation({ mutationFn: async (id: string) => { const { error } = await db.from("blocked_periods").delete().eq("id", id); if (error) throw error; }, onSuccess: refresh });
  return { create, remove };
}

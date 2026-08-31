import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useIsAdmin } from "@/hooks/useIsAdmin";

export function AdminOnly({ children }: { children: React.ReactNode }) {
  const { user, loading, signOut } = useAuth();
  const isAdmin = useIsAdmin();

  if (loading || (user && isAdmin === null)) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) return <Navigate to="/auth?redirect=%2Fadmin" replace />;
  if (!isAdmin) return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="font-display text-2xl font-bold">Administrator access required</h1>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">This account does not have the admin role. Ask the site owner to assign it in Supabase.</p>
      <button className="mt-6 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground" onClick={() => void signOut()}>Sign out</button>
    </div>
  );

  return <>{children}</>;
}

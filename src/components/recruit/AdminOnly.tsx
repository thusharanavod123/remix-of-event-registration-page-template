import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useIsAdmin } from "@/hooks/useIsAdmin";

export function AdminOnly({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const isAdmin = useIsAdmin();

  if (loading || (user && isAdmin === null)) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) return <Navigate to="/auth?redirect=%2Fadmin" replace />;
  if (!isAdmin) return <Navigate to="/admin/claim" replace />;

  return <>{children}</>;
}

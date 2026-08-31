import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminClaim() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const claim = async () => {
    setLoading(true);
    const { data, error } = await (supabase as any).rpc("claim_first_admin");
    setLoading(false);
    if (error) return toast.error(error.message);
    if (data === true) {
      toast.success("You are now the site administrator.");
      window.location.href = "/admin";
    } else {
      toast.error("An administrator already exists for this site.");
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-16 text-center">
      <h1 className="font-display text-2xl font-bold">Admin access required</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        {user ? `Signed in as ${user.email}.` : "You are not signed in."} This account does not have
        administrator rights yet. If you are the site owner and no admin exists, claim access below.
      </p>
      <Button className="mt-6" onClick={claim} disabled={loading}>
        {loading ? "Checking…" : "Claim admin access"}
      </Button>
      <button
        onClick={async () => {
          await signOut();
          navigate("/auth?redirect=%2Fadmin");
        }}
        className="mt-4 text-xs text-muted-foreground underline"
      >
        Sign in with a different account
      </button>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useBackend } from "@gooddata/sdk-ui";

export type GoodDataUserInfo = {
  fullName?: string;
  email?: string;
};

export function useGoodDataUser() {
  const backend = useBackend();
  const [user, setUser] = useState<GoodDataUserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        // GoodData SDK: fetch current user profile
        // Using 'any' as SDK types differ across versions
        const u: any = await backend?.currentUser?.().getUser?.();
        if (!mounted) return;
        const fullName: string | undefined =
          u?.profile?.fullName ||
          [u?.profile?.firstName, u?.profile?.lastName].filter(Boolean).join(" ") ||
          u?.name ||
          u?.login;
        const email: string | undefined = u?.profile?.email || u?.email || u?.login;
        setUser({ fullName, email });
      } catch (e) {
        if (!mounted) return;
        setError(e);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [backend]);

  return { user, loading, error };
}

import Hero from "@/components/hero";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";

export default async function Home() {
  return (
    <>
        {hasEnvVars ? <Hero /> : <Hero />}
    </>
  );
}

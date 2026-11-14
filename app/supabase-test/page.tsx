import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";

async function ConnectionCheck() {
  const supabase = await createClient();
  const { error } = await supabase.from("listings").select("id").limit(1);

  let message = "✅ Connected to Supabase!";
  if (error) {
    if (error.code === "PGRST205" || error.code === "42P01") {
      message = "✅ Connected to Supabase! (No 'listings' table yet, that's expected.)";
    } else {
      message = "❌ Problem: " + error.message;
    }
  }

  return <p>{message}</p>;
}

export default function SupabaseTest() {
  return (
    <main style={{ padding: 40, fontSize: 24 }}>
      <Suspense fallback={<p>Checking connection…</p>}>
        <ConnectionCheck />
      </Suspense>
    </main>
  );
}
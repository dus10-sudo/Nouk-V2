// src/app/share/page.tsx

import { createClient } from "@/lib/supabase";
import { redirect } from "next/navigation";

export default function SharePage() {
  async function share(formData: FormData) {
    "use server";

    const supabase = createClient();
    const title = String(formData.get("title") || "").trim();

    if (!title) return;

    await supabase.from("threads").insert({
      title,
      room_id: "hearth", // all posts go to Hearth
    });

    redirect("/home");
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Share a Thought</h1>
      <p className="text-neutral-400 mb-6">
        Say what's on your mind. It'll stay for 24 hours.
      </p>

      <form action={share} className="space-y-4">
        <textarea
          name="title"
          rows={4}
          placeholder="What's on your mind?"
          className="w-full p-4 rounded-xl bg-white/10 border border-white/10 resize-none outline-none focus:border-white/40"
        />

        <button
          type="submit"
          className="w-full bg-amber-300 text-black py-3 rounded-xl font-semibold"
        >
          Post
        </button>
      </form>
    </div>
  );
}

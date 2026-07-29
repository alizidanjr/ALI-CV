import { Desktop } from "@/components/desktop/desktop";
import { getResume } from "@/lib/resume";

// Re-checked on every request so a save in /admin shows up on next load.
export const dynamic = "force-dynamic";

export default async function Home() {
  const { resume, pdfUrl } = await getResume();

  return (
    <main className="h-screen w-screen overflow-hidden">
      <Desktop resume={resume} pdfUrl={pdfUrl} />
    </main>
  );
}

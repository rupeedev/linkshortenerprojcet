import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";
import LinkCard from "@/components/LinkCard";
import { getLinksForUser } from "@/data/links";

export default async function Dashboard() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }


  const linksRes = await getLinksForUser(userId!);
  const userLinks = linksRes.success ? linksRes.data : [];

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      {/* Client-side dashboard header and create link dialog */}
      <DashboardClient />

      <div className="mt-6 space-y-4">
        <h2 className="text-lg font-semibold">My Links</h2>
        {userLinks.length === 0 && <p className="text-sm text-muted-foreground">No links yet.</p>}
        {userLinks.map((l: any) => (
          <LinkCard key={l.id} link={l} />
        ))}
      </div>
    </div>
  );
}

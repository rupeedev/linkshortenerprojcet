import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

export default async function Dashboard() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }


  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      {/* Client-side dashboard header and create link dialog */}
      <DashboardClient />
      {/* TODO: List of links here */}
    </div>
  );
}

"use client";
import CreateLinkDialog from "@/components/CreateLinkDialog";

export default function DashboardClient() {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <CreateLinkDialog />
    </div>
  );
}
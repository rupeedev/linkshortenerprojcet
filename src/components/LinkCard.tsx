"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { useState } from "react";
import { updateLink, deleteLink } from "@/app/dashboard/actions";
import { useRouter } from "next/navigation";

export default function LinkCard({ link }: { link: any }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [url, setUrl] = useState(link.original_url ?? link.originalUrl ?? "");
  const [slug, setSlug] = useState(link.short_code ?? link.shortCode ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await updateLink({ id: link.id, url, customSlug: slug });
      if (res.error) setError(res.error);
      else {
        setEditing(false);
        router.refresh();
      }
    } catch (err) {
      setError("Failed to update");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await deleteLink({ id: link.id });
      if (res.error) setError(res.error);
      else {
        setDeleting(false);
        router.refresh();
      }
    } catch (err) {
      setError("Failed to delete");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-4">
      <CardContent>
        <div className="flex items-start justify-between">
          <div>
            <div className="font-medium">{link.short_code ?? link.shortCode}</div>
            <div className="text-sm text-muted-foreground">{link.original_url ?? link.originalUrl}</div>
            <div className="text-xs text-muted-foreground mt-2">Created: {new Date(link.created_at ?? link.createdAt).toLocaleDateString()}</div>
          </div>
          <div className="flex flex-col gap-2 ml-4">
            <Dialog open={editing} onOpenChange={setEditing}>
              <DialogTrigger asChild>
                <Button variant="outline">Edit</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Link</DialogTitle>
                  <DialogDescription>Update URL or custom slug for this link.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleUpdate} className="space-y-4 mt-4">
                  <div>
                    <label className="block text-sm text-muted-foreground">URL</label>
                    <input value={url} onChange={(e) => setUrl(e.target.value)} className="mt-2 w-full rounded-md border px-2 py-2 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground">Custom Slug</label>
                    <input value={slug} onChange={(e) => setSlug(e.target.value)} className="mt-2 w-full rounded-md border px-2 py-2 text-sm" />
                  </div>
                  {error && <div className="text-red-500">{error}</div>}
                  <CardFooter className="justify-end p-0 pt-2 gap-2">
                    <DialogClose asChild>
                      <Button type="button" variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save"}</Button>
                  </CardFooter>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog open={deleting} onOpenChange={setDeleting}>
              <DialogTrigger asChild>
                <Button variant="destructive">Delete</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm delete</DialogTitle>
                  <DialogDescription>Are you sure you want to delete this link? This action cannot be undone.</DialogDescription>
                </DialogHeader>
                <div className="mt-4 flex justify-end gap-2">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button variant="destructive" onClick={handleDelete} disabled={loading}>{loading ? "Deleting..." : "Delete"}</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

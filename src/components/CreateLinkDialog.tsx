"use client";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { createLink } from "@/app/dashboard/actions";
import { useRouter } from "next/navigation";

export default function CreateLinkDialog() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // TODO: Replace with server action to persist link
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!originalUrl) {
      setError("Please provide a valid URL.");
      setLoading(false);
      return;
    }

    try {
      const res = await createLink({ url: originalUrl, customSlug: customSlug || undefined });
      if (res.error) {
        setError(res.error);
      } else {
        setOriginalUrl("");
        setCustomSlug("");
        setOpen(false);
        router.refresh();
      }
    } catch (err) {
      setError("Failed to create link. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Create Link</Button>
      </DialogTrigger>

      <DialogContent>
        <div className="relative">
          <DialogHeader>
            <DialogTitle>Create Shortened Link</DialogTitle>
            <DialogDescription>
              Enter a URL to shorten. You can optionally provide a custom slug.
            </DialogDescription>
          </DialogHeader>
          <DialogClose asChild>
            <button
              aria-label="Close"
              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-md bg-transparent text-muted-foreground hover:bg-accent/10"
            >
              ✕
            </button>
          </DialogClose>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <CardContent className="p-0 space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground">
                URL
              </label>
              <input
                type="url"
                required
                placeholder="https://example.com"
                className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                disabled={loading}
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-muted-foreground">Custom Slug <span className="text-xs text-muted-foreground">(Optional)</span></label>
              </div>
              <input
                type="text"
                placeholder="my-custom-link"
                className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
                value={customSlug}
                onChange={(e) => setCustomSlug(e.target.value)}
                disabled={loading}
              />
              <p className="mt-2 text-xs text-muted-foreground">Leave empty to auto-generate a short code</p>
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}
          </CardContent>

          <CardFooter className="justify-end p-0 pt-2 gap-2">
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Link"}
            </Button>
          </CardFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

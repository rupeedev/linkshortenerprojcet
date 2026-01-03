"use client";
import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function CreateLinkDialog() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // TODO: Replace with server action
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setOriginalUrl("");
      // Optionally close dialog or show success
    }, 1000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Link</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new short link</DialogTitle>
          <DialogDescription>Paste your long URL below to generate a short link.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <CardContent className="p-0">
            <input
              type="url"
              required
              placeholder="https://your-long-url.com"
              className="w-full rounded border px-3 py-2 text-sm"
              value={originalUrl}
              onChange={e => setOriginalUrl(e.target.value)}
              disabled={loading}
            />
            {error && <div className="text-red-500 text-xs mt-2">{error}</div>}
          </CardContent>
          <CardFooter className="justify-end p-0 pt-4 gap-2">
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={loading || !originalUrl}>
              {loading ? "Creating..." : "Create"}
            </Button>
          </CardFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

"use server";

import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { createLinkForUser } from "@/data/links";
import { updateLinkForUser, deleteLinkForUser } from "@/data/links";

const createLinkSchema = z.object({
  url: z.string().url(),
  customSlug: z.string().min(1).optional(),
});

export async function createLink(input: unknown) {
  const { userId } = await auth();
  if (!userId) {
    return { error: "Unauthorized" };
  }

  try {
    const validated = createLinkSchema.parse(input);
    const res = await createLinkForUser(userId, { url: validated.url, customSlug: validated.customSlug });
    if (res.error) return { error: res.error };
    return { success: true, data: res.data };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return { error: "Invalid input data" };
    }
    return { error: "Failed to create link" };
  }
}

const updateLinkSchema = z.object({
  id: z.string().uuid(),
  url: z.string().url().optional(),
  customSlug: z.string().min(1).optional(),
});

export async function updateLink(input: unknown) {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  try {
    const validated = updateLinkSchema.parse(input);
    const res = await updateLinkForUser(userId, validated.id, { url: validated.url, customSlug: validated.customSlug });
    if (res.error) return { error: res.error };
    return { success: true, data: res.data };
  } catch (err) {
    if (err instanceof z.ZodError) return { error: "Invalid input data" };
    return { error: "Failed to update link" };
  }
}

const deleteLinkSchema = z.object({ id: z.string().uuid() });

export async function deleteLink(input: unknown) {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  try {
    const { id } = deleteLinkSchema.parse(input);
    const res = await deleteLinkForUser(userId, id);
    if (res.error) return { error: res.error };
    return { success: true };
  } catch (err) {
    if (err instanceof z.ZodError) return { error: "Invalid input data" };
    return { error: "Failed to delete link" };
  }
}

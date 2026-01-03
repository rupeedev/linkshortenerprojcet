import db from "../../db";
import { links } from "../../db/schema";
import { eq, desc, and } from "drizzle-orm";

function generateShortCode(length = 7) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let out = "";
  for (let i = 0; i < length; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

export async function createLinkForUser(userId: string, input: { url: string; customSlug?: string }) {
  const shortCode = input.customSlug && input.customSlug.trim().length ? input.customSlug.trim() : generateShortCode();

  try {
    await db.insert(links).values({ shortCode, originalUrl: input.url, userId });
    return { success: true, data: { shortCode, originalUrl: input.url, userId } };
  } catch (err) {
    return { error: "Database error" };
  }
}

export async function getLinksForUser(userId: string) {
  try {
    const rows = await db.select().from(links).where(eq(links.userId, userId)).orderBy(desc(links.createdAt));
    return { success: true, data: rows };
  } catch (err) {
    return { error: "Failed to fetch links" };
  }
}

export async function updateLinkForUser(userId: string, id: string, input: { url?: string; customSlug?: string }) {
  try {
    const update: any = {};
    if (input.url) update.originalUrl = input.url;
    if (input.customSlug) update.shortCode = input.customSlug;

    const res = await db.update(links).set(update).where(and(eq(links.id, id), eq(links.userId, userId)));
    return { success: true, data: res };
  } catch (err) {
    return { error: "Failed to update link" };
  }
}

export async function deleteLinkForUser(userId: string, id: string) {
  try {
    await db.delete(links).where(and(eq(links.id, id), eq(links.userId, userId)));
    return { success: true };
  } catch (err) {
    return { error: "Failed to delete link" };
  }
}

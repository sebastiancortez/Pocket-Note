import { db } from "$lib/db";
import { users } from "$lib/db/schema";
import { generateinboxId } from "$lib/profile";
import { error } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

// Function to get the user profile
export const getProfile = async (locals: App.Locals) => {
  const { user } = await locals.safeGetSession();

  if (!user) {
    return null;
  }

  const curProfile = await db.query.users.findFirst({
    where: eq(users.userId, user.id),
  });

  if (curProfile) {
    return curProfile;
  }

  return null;
};

// Function to create a new user profile
export const createProfile = async (locals: App.Locals, username: string) => {
  const { user } = await locals.safeGetSession();

  if (!user) {
    return null;
  }

  const inboxId = generateinboxId();

  await db.insert(users).values({
    userId: user.id,
    email: user.email ?? "",
    username: username,
    currentInboxUrl: inboxId,
  });

  const newProfile = await db.query.users.findFirst({
    where: eq(users.userId, user.id),
  });

  if (!newProfile) {
    throw error(500, "Could not create profile");
  }

  return newProfile;
};

export const getProfileByUsername = async (username: string) => {
  const userProfile = await db.query.users.findFirst({
    where: eq(users.username, username),
  });

  if (!userProfile) {
    throw error(404, "Profile not found");
  }

  return userProfile;
};
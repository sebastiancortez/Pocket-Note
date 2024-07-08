import { db } from "$lib/db";
import { users } from "$lib/db/schema";
import { generateinboxId } from "$lib/profile";
import { error } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export const getOrCreateUserProfile = async (locals: App.Locals, username: string) => {
  const { user } = await locals.safeGetSession();

  if (!user) {
    console.log("No user found in session");
    return null;
  }

  console.log("User found:", user);

  const curProfile = await db.query.users.findFirst({
    where: eq(users.id, user.id),
  });

  if (curProfile) {
    console.log("Profile already exists:", curProfile);
    return curProfile;
  }

  const inboxId = generateinboxId();

  console.log("Creating new profile with username:", username);

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
    console.error("Could not create profile");
    error(500, "Could not create profile");
  }

  console.log("New profile created:", newProfile);
  return newProfile;
};
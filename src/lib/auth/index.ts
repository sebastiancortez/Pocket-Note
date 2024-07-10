import { db } from "$lib/db";
import { users } from "$lib/db/schema";
import { generateinboxId } from "$lib/profile";
import { error } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

// Function to get the user profile
export const getProfile = async (locals: App.Locals) => {
  const { user } = await locals.safeGetSession();

  if (!user) {
    console.log("No user found in session");
    return null;
  }

  console.log("User found:", user);

  const curProfile = await db.query.users.findFirst({
    where: eq(users.userId, user.id),
  });

  if (curProfile) {
    console.log("Profile already exists:", curProfile);
    return curProfile;
  }

  console.log("No profile found for user:", user);
  return null;
};

// Function to create a new user profile
export const createProfile = async (locals: App.Locals, username: string) => {
  const { user } = await locals.safeGetSession();

  if (!user) {
    console.log("No user found in session");
    return null;
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
    throw error(500, "Could not create profile");
  }

  console.log("New profile created:", newProfile);
  return newProfile;
};

export const getProfileByUsername = async (username: string) => {
  const userProfile = await db.query.users.findFirst({
    where: eq(users.username, username),
  });

  if (!userProfile) {
    console.error("Profile not found for username:", username);
    throw error(404, "Profile not found");
  }

  console.log("Profile found for username:", username, userProfile);
  return userProfile;
};
"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { AuthSession } from "@/types/types";
import { getServerSession } from "next-auth";

export const customGet = async (url: string, session: AuthSession | null) => {
  if (!session) {
    return null;
  }

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    });

    if (!res.ok) {
      // Handle HTTP errors (e.g., 404, 500)
      console.error(`Fetch error: ${res.status} - ${res.statusText}`);
      return null;
    }

    return await res.json();
  } catch (error) {
    // Handle network errors or unexpected exceptions
    console.error('Fetch failed:', error);
    return null;
  }
};

export const getAuthSession = async () => {
  const session = (await getServerSession(authOptions)) as AuthSession;
  if (!session) {
    return null;
  }

  const currentTimestamp = Math.floor(Date.now() / 1000); // divide by 1000 to get seconds
  if (currentTimestamp >= session.user.expires_at) {
    return null;
  }

  return session;
};

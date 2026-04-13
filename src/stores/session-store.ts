"use client";

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface SessionUser {
  name: string;
  email: string;
}

interface SessionState {
  user: SessionUser | null;
  login: (email: string) => void;
  logout: () => void;
}

function nameFromEmail(email: string): string {
  const local = email.split("@")[0] ?? email;
  return local
    .split(/[._-]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export const useSessionStore = create<SessionState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        login: (email) =>
          set({ user: { email, name: nameFromEmail(email) } }),
        logout: () => set({ user: null }),
      }),
      {
        name: "hf-session",
      }
    ),
    { name: "SessionStore" }
  )
);

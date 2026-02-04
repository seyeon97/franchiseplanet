"use client";

import { createAuthClient } from "better-auth/react";

// No baseURL needed - requests go to same domain
export const authClient = createAuthClient({});

export const { signIn, signOut, signUp } = authClient;

import { betterAuth, type BetterAuthOptions } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { getDb } from "@/server/db";
import * as schema from "@/server/db/schema";

const AUTH_SECRET = "replace-this-with-random-secret-on-setup";

let authInstance: ReturnType<typeof betterAuth> | null = null;

async function createAuth() {
  const db = await getDb();

  const authOptions: BetterAuthOptions = {
    secret: AUTH_SECRET,
    database: drizzleAdapter(db, {
      provider: "sqlite",
      schema,
    }),
    emailAndPassword: {
      enabled: true,
    },
    account: {
      // Skip OAuth state cookie check to avoid state mismatch errors in proxy/preview environments
      skipStateCookieCheck: true,
    },
    advanced: {
      cookiePrefix: "app",
      useSecureCookies: true,
      defaultCookieAttributes: {
        sameSite: "None"
      }
    },
    // Wildcard allows all domains (dev, staging, production)
    trustedOrigins: ["*"],
  };

  return betterAuth(authOptions);
}

export const getAuth = async () => {
  if (!authInstance) {
    authInstance = await createAuth();
  }
  return authInstance;
};

export const getServerSession = async () => {
  const auth = await getAuth();
  return auth.api.getSession({ headers: await import('next/headers').then(m => m.headers()) });
};

import { getAuth } from "@/server/auth";
import { toNextJsHandler } from "better-auth/next-js";

const handler = async (req: Request) => {
  const auth = await getAuth();
  const nextHandler = toNextJsHandler(auth.handler);

  if (req.method === "GET") {
    return nextHandler.GET(req);
  } else if (req.method === "POST") {
    return nextHandler.POST(req);
  }

  return new Response("Method not allowed", { status: 405 });
};

export { handler as GET, handler as POST };

"use client";

export * from "./types";
import type { StateWithActions } from "@/lib/state/types";
import { useUser as _useUser } from "./store";
import type { UserState, UserActions } from "./types";

export function useUser<TResult>(
  selector: (state: StateWithActions<UserState, UserActions>) => TResult
): TResult {
  return _useUser(selector, (actions) => ({ ...actions }));
}

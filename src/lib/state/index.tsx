"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMemo, useCallback } from "react";
import { create, StoreApi, UseBoundStore } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useRouter } from "next/navigation";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import type { Draft } from "immer";
import type { StateWithActions, UseStoreHook, StateSelector } from "./types";
import { useGlobalStoreContext } from "./provider";
import { setAutoFreeze } from "immer";
import { useShallow } from "./shallow";
export { StateProvider } from './provider'

setAutoFreeze(false);

export function createStateFactory<
  TState extends Record<string, any>,
  TActions extends Record<string, (...args: any[]) => any>,
>(config: {
  initialize: () => TState;
  actions: (
    set: (
      fn: (draft: Draft<TState>) => void,
      options?: { silent?: boolean }
    ) => void,
    get: () => TState & { actions: TActions },
    context: { router: AppRouterInstance }
  ) => TActions;
}): [
  UseStoreHook<TState, TActions>,
  () => () => StateWithActions<TState, TActions>,
] {
  type StoreType = StateWithActions<TState, TActions>;
  type BoundStore = UseBoundStore<StoreApi<StoreType>>;

  // Generate unique Symbol key for this store
  const storeKey = Symbol("store");

  const useStore: UseStoreHook<TState, TActions> = (
    selector?: any,
    overrideActions?: (actions: TActions) => any
  ) => {
    const boundStore = useBoundStore();

    // overrideActions가 없으면 기본값으로 actions => actions 사용
    const actualOverrideActions = overrideActions ?? ((actions: TActions) => actions);

    const actions = useMemo(
      () => actualOverrideActions(boundStore.getState().actions),
      [boundStore, actualOverrideActions]
    );

    // selector가 있으면 useShallow로 최적화된 선택 적용
    const shallowSelector = useShallow((state: StoreType) => {
      const stateWithOverriddenActions = {
        ...state,
        actions,
      };
      return selector
        ? selector(stateWithOverriddenActions as any)
        : stateWithOverriddenActions;
    });

    const result: any = selector
      ? boundStore(shallowSelector)
      : { ...boundStore(), actions };

    return result;
  };

  // Internal hook to get raw store
  const useBoundStore = (): BoundStore => {
    const storeMap = useGlobalStoreContext();
    const router = useRouter();

    const store = useMemo(() => {
      // Check if store already exists
      if (storeMap.has(storeKey)) {
        return storeMap.get(storeKey) as BoundStore;
      }

      // Create new store with initialize + actions
      const context = { router };

      const boundStore = create<StoreType>()(
        immer((set, get) => {
          const initialState = config.initialize();

          // Wrapped set function with replace option
          const wrappedSet = (
            fn: (draft: Draft<TState>) => void,
            { silent = false }: { silent?: boolean } = {}
          ) => {
            if (silent) {
              // When replace is true, directly mutate the state without triggering re-renders
              const state = get();
              fn(state as unknown as Draft<TState>);
            } else {
              // Normal set behavior with re-renders
              set(fn);
            }
          };

          // Actions 생성 - wrappedSet, get, context 전달
          const actions = config.actions(wrappedSet, get, context);

          return {
            ...initialState,
            actions,
          } as StoreType;
        })
      ) as BoundStore;

      // Register store in global map
      storeMap.set(storeKey, boundStore);

      return boundStore;
    }, [storeMap, router]);

    return store;
  };

  // useStoreContext - Returns getState function
  const useStoreContext = () => {
    const store = useBoundStore();

    return useCallback(() => store.getState(), [store]);
  };

  return [useStore, useStoreContext];
}

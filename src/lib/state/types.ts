/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactNode } from "react";
import type { Draft } from "immer";
import type { StoreApi, UseBoundStore } from "zustand";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export interface TransformFunction<TResource, TState> {
  (resource: TResource): TState;
}

export interface ActionsFunction<TState, TActions> {
  (
    set: (fn: (draft: Draft<TState>) => void) => void,
    get: () => TState & { actions: TActions }
  ): TActions;
}

export interface StateFactoryConfig<TResource, TState, TActions> {
  transform: TransformFunction<TResource, TState>;
  actions: ActionsFunction<TState, TActions>;
}

export type StateWithActions<TState, TActions> = TState & {
  actions: TActions;
};

export type StateSelector<TState, TActions, TResult> = (
  state: StateWithActions<TState, TActions>
) => TResult;

export type UseStoreHook<TState, TActions> = {
  // selector만 사용하는 경우
  <TResult>(
    selector: (state: StateWithActions<TState, TActions>) => TResult
  ): TResult;

  // selector와 overrideActions 둘 다 사용하는 경우
  <TPublicActions, TResult>(
    selector: (state: StateWithActions<TState, TPublicActions>) => TResult,
    overrideActions: (actions: TActions) => TPublicActions
  ): TResult;

  // 아무 인자도 없이 전체 state 반환
  (): StateWithActions<TState, TActions>;
};

export interface StoreProviderProps<TResource> {
  resource: TResource;
  children: ReactNode;
}

export type StoreProvider<TResource> = React.FC<StoreProviderProps<TResource>>;

export type StateFactoryReturn<TResource, TState, TActions> = [
  UseStoreHook<TState, TActions>,
  StoreProvider<TResource>,
  () => UseBoundStore<StoreApi<StateWithActions<TState, TActions>>>,
];

// Utility types for domain action creators
export type StateSetFn<TState> = (
  fn: (draft: Draft<TState>) => void,
  options?: { silent?: boolean }
) => void;

export type StateGetFn<TState, TActions = any> = () => TState & {
  actions: TActions;
};

export type StateContext = { router: AppRouterInstance };

export type StateActionParams<TState, TActions = any> = [
  StateSetFn<TState>,
  StateGetFn<TState, TActions>,
  StateContext,
];

/**
 * @description 함수 타입의 마지막에 파라미터를 추가하는 유틸리티 타입
 * @example
 * type Original = (a: string, b: number) => void;
 * type WithExtra = AddLastParameter<Original, boolean>;
 * // Result: (a: string, b: number, arg2: boolean) => void
 */
export type AddLastParameter<
  TFunc extends (...args: any[]) => any,
  TParam,
> = TFunc extends (...args: infer TArgs) => infer TReturn
  ? (...args: [...TArgs, TParam]) => TReturn
  : never;

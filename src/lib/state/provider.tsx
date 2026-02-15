"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { StoreApi, UseBoundStore } from "zustand";

type StoreMap = Map<symbol, UseBoundStore<StoreApi<any>>>;

const GlobalStoreContext = createContext<StoreMap | null>(null);

export function StateProvider({ children }: { children: ReactNode }) {
  const [storeMap] = useState<StoreMap>(() => new Map());

  return (
    <GlobalStoreContext.Provider value={storeMap}>
      {children}
    </GlobalStoreContext.Provider>
  );
}

export function useGlobalStoreContext(): StoreMap {
  const context = useContext(GlobalStoreContext);

  if (!context) {
    throw new Error(
      "useGlobalStoreContext must be called within StateProvider"
    );
  }

  return context;
}

import { useRef } from "react";

/**
 * Deep equal comparison with early return optimization
 */
export function isEqual<T>(a: T, b: T): boolean {
  // 먼저 === 비교로 얼리 리턴 (가장 빠른 경로)
  if (a === b) {
    return true;
  }

  // null/undefined 처리
  if (a == null || b == null) {
    return a === b;
  }

  // 타입이 다르면 false
  if (typeof a !== typeof b) {
    return false;
  }

  // 원시값은 이미 위에서 === 비교로 처리됨
  if (typeof a !== "object") {
    return false;
  }

  // Date 객체 처리
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  // RegExp 객체 처리
  if (a instanceof RegExp && b instanceof RegExp) {
    return a.toString() === b.toString();
  }

  // 배열 처리
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }
    for (let i = 0; i < a.length; i++) {
      if (!isEqual(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }

  // 배열과 객체가 섞인 경우
  if (Array.isArray(a) !== Array.isArray(b)) {
    return false;
  }

  // 객체 처리
  const objA = a as Record<string, unknown>;
  const objB = b as Record<string, unknown>;
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(objB, key)) {
      return false;
    }
    if (!isEqual(objA[key], objB[key])) {
      return false;
    }
  }

  return true;
}

/**
 * Enhanced shallow comparison that handles primitives and objects
 */
export function shallow<T>(a: T, b: T): boolean {
  // deep equal 사용
  return isEqual(a, b);
}

/**
 * Custom useShallow hook that works with both primitives and objects
 */
export function useShallow<S, U>(selector: (state: S) => U): (state: S) => U {
  const prev = useRef<U>(undefined);

  return (state) => {
    const next = selector(state);
    return shallow(prev.current, next)
      ? (prev.current as U)
      : (prev.current = next);
  };
}

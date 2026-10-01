import { useSyncExternalStore } from 'react';

export type StartupErrorSnapshot = {
  message: string;
  name: string;
  stack?: string;
  isFatal: boolean;
} | null;

type ErrorListener = () => void;

const listeners = new Set<ErrorListener>();
let startupError: StartupErrorSnapshot = null;

function normalizeError(error: unknown, isFatal: boolean): NonNullable<StartupErrorSnapshot> {
  if (error instanceof Error) {
    return {
      message: error.message || 'Error sin mensaje',
      name: error.name || 'Error',
      stack: error.stack,
      isFatal,
    };
  }

  return {
    message: String(error),
    name: 'Error',
    isFatal,
  };
}

function publishError(error: unknown, isFatal: boolean): void {
  startupError = normalizeError(error, isFatal);
  listeners.forEach((listener) => listener());
}

export function installStartupErrorHandler(): void {
  const globalScope = globalThis as typeof globalThis & {
    ErrorUtils?: {
      getGlobalHandler?: () => (error: unknown, isFatal?: boolean) => void;
      setGlobalHandler?: (handler: (error: unknown, isFatal?: boolean) => void) => void;
    };
    __modoMamadoStartupErrorHandlerInstalled?: boolean;
  };

  if (globalScope.__modoMamadoStartupErrorHandlerInstalled) return;
  const errorUtils = globalScope.ErrorUtils;
  const previousHandler = errorUtils?.getGlobalHandler?.();

  errorUtils?.setGlobalHandler?.((error, isFatal = false) => {
    if (isFatal) publishError(error, true);
    else previousHandler?.(error, false);
  });

  globalScope.__modoMamadoStartupErrorHandlerInstalled = true;
}

export function useStartupError(): StartupErrorSnapshot {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => startupError,
    () => startupError,
  );
}

installStartupErrorHandler();
import { useSyncExternalStore } from 'react';

type DiagnosticState = {
  events: string[];
  error: string | null;
};

type ErrorListener = () => void;

const listeners = new Set<ErrorListener>();
let state: DiagnosticState = { events: [], error: null };

function notify(): void {
  listeners.forEach((listener) => listener());
}

export function recordRouterDiagnostic(message: string): void {
  state = {
    ...state,
    events: [...state.events, `${new Date().toISOString()} ${message}`].slice(-30),
  };
  notify();
}

function formatError(error: unknown, componentStack?: string | null): string {
  const details = error instanceof Error
    ? `${error.name}: ${error.message}\n${error.stack ?? ''}`
    : String(error);
  return componentStack ? `${details}\n${componentStack}` : details;
}

export function recordRouterError(label: string, error: unknown, componentStack?: string | null): void {
  const detail = `${label}\n${formatError(error, componentStack)}`;
  state = {
    ...state,
    error: detail,
    events: [...state.events, `${new Date().toISOString()} ${label}`].slice(-30),
  };
  notify();
}

export function installRouterDiagnosticHooks(): void {
  const globalScope = globalThis as typeof globalThis & {
    ErrorUtils?: {
      getGlobalHandler?: () => (error: unknown, isFatal?: boolean) => void;
      setGlobalHandler?: (handler: (error: unknown, isFatal?: boolean) => void) => void;
    };
  };

  const errorUtils = globalScope.ErrorUtils;
  const previousHandler = errorUtils?.getGlobalHandler?.();
  errorUtils?.setGlobalHandler?.((error, isFatal = false) => {
    if (isFatal) {
      recordRouterError('Error JS fatal', error);
    } else {
      previousHandler?.(error, false);
    }
  });

  const originalConsoleError = console.error.bind(console);
  console.error = (...args: unknown[]) => {
    recordRouterDiagnostic(`console.error ${args.map(String).join(' ')}`);
    originalConsoleError(...args);
  };
}

export function useRouterDiagnosticState(): DiagnosticState {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => state,
    () => state,
  );
}
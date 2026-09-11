import type { WatchSessionPayload } from './watch';
import { parseWatchSessionPayload, serializeWatchSessionPayload } from './watch-sync.ts';

export interface SessionSyncAdapter {
  publishSessionSnapshot(payload: WatchSessionPayload): void;
}

export type InMemorySessionSyncAdapter = SessionSyncAdapter & {
  getLatestPayload(): WatchSessionPayload | null;
  getLatestMessage(): string | null;
};

export function createInMemorySessionSyncAdapter(): InMemorySessionSyncAdapter {
  let latestMessage: string | null = null;

  return {
    publishSessionSnapshot(payload) {
      latestMessage = serializeWatchSessionPayload(payload);
    },
    getLatestPayload() {
      return latestMessage === null ? null : parseWatchSessionPayload(latestMessage);
    },
    getLatestMessage() {
      return latestMessage;
    },
  };
}
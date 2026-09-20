import { parseWatchSessionPayload, serializeWatchSessionPayload } from './watch-sync.ts';
export const sessionSyncAdapter = createInMemorySessionSyncAdapter();
export function createInMemorySessionSyncAdapter() {
    let latestMessage = null;
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

const isMinimalNativeEntry =
  process.env.EXPO_PUBLIC_MINIMAL_DIAGNOSTIC === '1' ||
  process.env.EXPO_PUBLIC_STARTUP_MINIMAL_ENTRY === '1';
const isRouterRootMinimal = process.env.EXPO_PUBLIC_ROUTER_ROOT_MINIMAL === '1';

if (isMinimalNativeEntry) {
  require('./minimal-entry');
} else if (isRouterRootMinimal) {
  require('./router-direct-entry');
} else {
  require('./utils/startupErrors');
  require('expo-router/entry');
}

if (process.env.EXPO_PUBLIC_MINIMAL_DIAGNOSTIC === '1') {
  require('./minimal-entry');
} else {
  require('expo-router/entry');
}

if (process.env.EXPO_PUBLIC_MINIMAL_DIAGNOSTIC === '1') {
  require('./minimal-entry');
} else {
  require('./utils/startupErrors');
  require('expo-router/entry');
}

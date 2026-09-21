const { expo: baseConfig } = require('./app.json');

const isDiagnosticBuild = process.env.EXPO_PUBLIC_MINIMAL_DIAGNOSTIC === '1';
const iosConfig = baseConfig.ios ?? {};
const androidConfig = baseConfig.android;

module.exports = {
  ...baseConfig,
  name: isDiagnosticBuild ? 'Modo Mamado Diag' : baseConfig.name,
  ios: {
    ...iosConfig,
    buildNumber: isDiagnosticBuild ? '11' : iosConfig.buildNumber,
    bundleIdentifier: isDiagnosticBuild ? `${iosConfig.bundleIdentifier}.diag` : iosConfig.bundleIdentifier,
  },
  ...(androidConfig ? {
    android: {
      ...androidConfig,
      versionCode: isDiagnosticBuild ? 11 : androidConfig.versionCode,
      package: isDiagnosticBuild ? `${androidConfig.package}.diag` : androidConfig.package,
    },
  } : {}),
};

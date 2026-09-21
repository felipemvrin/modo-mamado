const { expo: baseConfig } = require('./app.json');

const isDiagnosticBuild = process.env.EXPO_PUBLIC_MINIMAL_DIAGNOSTIC === '1';

module.exports = {
  ...baseConfig,
  name: isDiagnosticBuild ? 'Modo Mamado Diag' : baseConfig.name,
  ios: {
    ...baseConfig.ios,
    buildNumber: isDiagnosticBuild ? '11' : baseConfig.ios.buildNumber,
    bundleIdentifier: isDiagnosticBuild ? `${baseConfig.ios.bundleIdentifier}.diag` : baseConfig.ios.bundleIdentifier,
  },
  android: {
    ...baseConfig.android,
    versionCode: isDiagnosticBuild ? 11 : baseConfig.android.versionCode,
    package: isDiagnosticBuild ? `${baseConfig.android.package}.diag` : baseConfig.android.package,
  },
};

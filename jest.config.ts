export default {
  preset: 'ts-jest/presets/js-with-ts-esm',// TypeScript を ESM 構文に変換する preset
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy"
  },
  reporters: [
    "default",
    ['jest-junit', { outputDirectory: 'reports/jest', outputName: 'jest-report.xml' }],
  ]
}
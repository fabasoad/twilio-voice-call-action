import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    clearMocks: true,
    coverage: {
      include: ['src/**/*.ts'],
      exclude: ['**/*.d.ts'],
      reporter: ['lcov', 'text', 'text-summary'],
      thresholds: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100,
      },
    },
    environment: 'node',
    include: ['**/*.spec.ts'],
    testTimeout: 20000,
  },
});

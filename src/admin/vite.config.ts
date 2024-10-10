import { defineConfig, mergeConfig, type UserConfig } from 'vite';

export default defineConfig((config: UserConfig) => {
  // Important: always return the modified config
  return mergeConfig(config, {
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  });
});
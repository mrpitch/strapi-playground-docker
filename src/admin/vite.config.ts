
import { defineConfig, mergeConfig, type UserConfig } from 'vite';
import commonjs from '@rollup/plugin-commonjs';

export default (config: UserConfig) => {
  config = defineConfig({
    plugins: [
      commonjs({
        ignoreDynamicRequires: true,  // Ignore dynamic require calls
        dynamicRequireTargets: [
          'node_modules/sharp/**/*.node'  // Include sharp's .node files for bundling
        ]
      }),
    ],
    optimizeDeps: {
      include: ['sharp'],  // Include sharp in pre-bundling
    },
    ssr: {
      external: ['sharp'],  // Exclude sharp from SSR bundling (if you're doing SSR)
      noExternal: ['sharp'],  // Don't externalize sharp's .node files
    },
  });

  // Important: always return the modified config
  return mergeConfig(config, {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  });
};


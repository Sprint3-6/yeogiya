import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import { loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      react(),
      viteTsconfigPaths({ root: '.' }),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            kakaoApiKey: env.VITE_KAKAO_MAP_KEY,
          },
        },
      }),
    ],
  };
});

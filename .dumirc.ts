import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  outputPath: 'dist',
  publicPath: '/ebaorc/',
  base: '/ebaorc/',
  title: 'ebaorc',
  apiParser: {},
  resolve: {
    atomDirs: [
      { type: 'hooks', dir: 'packages/hooks/src' },
      { type: 'components', dir: 'packages/components/src' },
      { type: 'utils', dir: 'packages/utils/src/' },
      // { type: 'utils', dir: 'packages/utils/src/format' },
    ],
    entryFile: './.dumi/resolve-entry.ts',
  },
  alias: {
    '@ebaorc/hooks': path.join(__dirname, 'packages/hooks/src'),
    '@ebaorc/components': path.join(__dirname, 'packages/components/src'),
    '@ebaorc/utils': path.join(__dirname, 'packages/utils/src'),
  },
  themeConfig: {
    name: 'ebaorc',
    footer: 'Copyright © 2024-present',
  },
  // monorepoRedirect: {
  //   srcDir: ['src'],
  //   peerDeps: true,
  // },
});
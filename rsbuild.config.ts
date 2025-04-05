import { defineConfig } from '@rsbuild/core';
import { pluginVue } from '@rsbuild/plugin-vue';

export default defineConfig({
  plugins: [pluginVue()],
  output : {
    minify : true,
    sourceMap : {
      js : 'cheap-module-source-map'
    },
    filename : {
      js : "[name]_[hash].js"
    }
  },
  performance : {
    chunkSplit : {
      override : {
        chunks: 'async',
        minChunks: 1,
        minSize : 100,
        maxSize : 25000000000,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      }
    }
  }
});

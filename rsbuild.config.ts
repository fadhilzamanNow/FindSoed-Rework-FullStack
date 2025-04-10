import { defineConfig } from '@rsbuild/core';
import { pluginVue } from '@rsbuild/plugin-vue';

export default defineConfig({
  plugins: [pluginVue()],
  output : {
    minify : true,
    sourceMap : false,
  },

  performance : {
    /* preload : {
      type : 'async-chunks'
    }, */
   chunkSplit : {
    override : {
      minChunks : 1,
      maxAsyncSize : 25000000
     /*  cacheGroups : {
        default : false,
        defaultVendors : false
      } */
    }
   }
  },
});

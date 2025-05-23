import type { Config } from 'tailwindcss'

export default {
  content: [],
  theme: {
    extend: {
        animation : {
            blob : "blob 4s infinite"
        },
        keyframe : {
            blob : {
                "0%" : {
                    transform : "scale(1)"
                },
                "33%" : {
                    transform : "scale(1.2)"
                },
                "66%" : {
                    transform : "scale(0.8)"
                },
                "100%" : {
                    transform : "scale(1)"
                }

            }
        }
    },
  },
  plugins: [],
} satisfies Config
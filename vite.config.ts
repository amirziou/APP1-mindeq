import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({ 
      manifest:{
        name: 'Mindeq',
        short_name: 'Mindeq app',
        description: 'Mindeq app version 1',
        background_color: '#000000',

        icons:[
          {
            src:"./iconApp.png",
            sizes:"512x512",
            type:"image/png",
            purpose:"any maskable"
          }
        ]
      },
  
     })
  ],
})

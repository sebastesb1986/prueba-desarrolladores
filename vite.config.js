import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [
        vue(),
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true, // Recarga la página en tiempo real cuando se actualiza un archivo en el directorio de entrada
        }),
    ],
    build: {
        assetsDir: 'assets',
        outDir: 'public/build/', // Asegúrate de que esta ruta coincida con la configuración de Laravel
        manifest: 'manifest.json',
        // Otros ajustes de construcción según tus necesidades
    },
});

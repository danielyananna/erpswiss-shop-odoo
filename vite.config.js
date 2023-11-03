import { defineConfig } from 'vite';

export default defineConfig({
    // Other Vite configuration options...

    build: {
        // ... other build options
        rollupOptions: {
            // Include your custom JavaScript entry point
            input: {
                main: 'main.js',
                custom: 'src/index.js', // Provide the correct path to your index.js file
            },
        },
    },
    // Add CSS and JS assets to be included in the final build
    optimizeDeps: {
        entries: [
            './style.css', // Provide the correct path to your style.css file
        ],
    },
});
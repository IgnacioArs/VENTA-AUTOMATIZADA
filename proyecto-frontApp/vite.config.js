import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
  // Cargar variables de entorno
  const env = loadEnv(mode, process.cwd());

  // Determinar el puerto en base al entorno
  const isDevelopment = env.VITE_ENTORNO === 'desarrollo';
  const port = isDevelopment
    ? parseInt(env.VITE_PUERTO_DESARROLLO, 10)
    : parseInt(env.VITE_PUERTO_PRODUCCION, 10);

  return defineConfig({
    plugins: [react()],
    server: {
      port, // Asignar el puerto dinámicamente
    },
  });
};



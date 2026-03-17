import fastifyStatic from '@fastify/static';
import fastify from 'fastify';
import path from 'node:path';
import { appRoutes } from './routes.js';

const app = fastify({ logger: true });

app.register(fastifyStatic, {
  root: path.join(process.cwd(), 'src', 'public'),
  prefix: '/', // Isso faz com que a raiz do site seja o seu index.html,
  wildcard: false,
});

app.register(appRoutes);

const start = async () => {
  try {
    // Escuta na porta 3000
    await app.listen({ port: 3000, host: '0.0.0.0' });
    console.log("🐾 Sistema Veterinário Online em http://localhost:3000");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
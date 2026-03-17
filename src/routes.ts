import type { FastifyInstance } from 'fastify';
import { ClienteService } from './services/ClienteService.js';
import { TratamentoService } from './services/TratamentoService.js';
import { ConsultaService } from './services/ConsultaService.js';

// Instanciamos os serviços
const clienteService = new ClienteService();
const tratamentoService = new TratamentoService();
const consultaService = new ConsultaService();

export async function appRoutes(app: FastifyInstance) {
  
  // --- ROTAS DE CLIENTE & ANIMAL ---
  
  app.post('/clientes', async (request, reply) => {
    const id = await clienteService.Registrar_cliente(request.body as any);
    return reply.status(201).send({ id });
  });

  app.get('/clientes/:id/animais', async (request) => {
    const { id } = request.params as { id: string };
    return await clienteService.Vis_animal(id);
  });

  // Rota robusta: Cria animal já iniciando um tratamento (Regra de Negócio)
  app.post('/animais', async (request, reply) => {
    const { dadosAnimal, dataInicioTrat } = request.body as any;
    const animal = await clienteService.Registrar_animal_com_tratamento(
      dadosAnimal, 
      new Date(dataInicioTrat)
    );
    return reply.status(201).send(animal);
  });

  // --- ROTAS DE TRATAMENTO ---

  app.post('/tratamentos', async (request, reply) => {
    const { animalId, dataIni, histInicial } = request.body as any;
    const id = await tratamentoService.Reg_trat(animalId, new Date(dataIni), histInicial);
    return reply.status(201).send({ id });
  });

  app.get('/animais/:id/tratamentos', async (request) => {
    const { id } = request.params as { id: string };
    return await tratamentoService.Vis_trat(id);
  });

  // --- ROTAS DE CONSULTA & EXAME ---

  app.post('/consultas', async (request, reply) => {
    const id = await consultaService.Registrar_consulta(request.body as any);
    return reply.status(201).send({ id });
  });

  app.get('/tratamentos/:id/consultas', async (request) => {
    const { id } = request.params as { id: string };
    return await consultaService.Listar_consultas(id);
  });

  app.post('/consultas/:id/exames', async (request, reply) => {
    const { id } = request.params as { id: string };
    const { descricao } = request.body as { descricao: string };
    const exame = await consultaService.Marcar_exame(id, descricao);
    return reply.status(201).send(exame);
  });

  /* app.get('/', async () => {
    return { 
      message: "🐾 Clínica Veterinária MVP Online!",
      status: "running"
    };
  }); */
}
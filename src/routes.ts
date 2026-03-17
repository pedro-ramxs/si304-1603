import type { FastifyInstance } from 'fastify';
import { ClienteService } from './services/ClienteService.js';
import { TratamentoService } from './services/TratamentoService.js';
import { ConsultaService } from './services/ConsultaService.js';
import { VeterinarioService } from './services/VeterinarioService.js';

// Instanciamos os serviços
const clienteService = new ClienteService();
const tratamentoService = new TratamentoService();
const consultaService = new ConsultaService();
const veterinarioService = new VeterinarioService();

export async function appRoutes(app: FastifyInstance) {
  
  // ===== ROTAS DE CLIENTE =====
  
  // CREATE
  app.post('/clientes', async (request, reply) => {
    const id = await clienteService.Registrar_cliente(request.body as any);
    return reply.status(201).send({ id });
  });

  // READ - Listar todos
  app.get('/clientes', async () => {
    return await clienteService.Listar_clientes();
  });

  // READ - Buscar por ID
  app.get('/clientes/:id', async (request) => {
    const { id } = request.params as { id: string };
    return await clienteService.Buscar_cliente_por_id(id);
  });

  // UPDATE
  app.put('/clientes/:id', async (request) => {
    const { id } = request.params as { id: string };
    return await clienteService.Atualizar_cliente(id, request.body as any);
  });

  // DELETE
  app.delete('/clientes/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    await clienteService.Deletar_cliente(id);
    return reply.status(204).send();
  });

  // ===== ROTAS DE ANIMAL =====

  // CREATE - Criar animal com tratamento
  app.post('/animais', async (request, reply) => {
    const { dadosAnimal, dataInicioTrat } = request.body as any;
    const animal = await clienteService.Registrar_animal_com_tratamento(
      dadosAnimal, 
      new Date(dataInicioTrat)
    );
    return reply.status(201).send(animal);
  });

  // READ - Listar animais do cliente
  app.get('/clientes/:id/animais', async (request) => {
    const { id } = request.params as { id: string };
    return await clienteService.Vis_animal(id);
  });

  // READ - Buscar animal por ID
  app.get('/animais/:id', async (request) => {
    const { id } = request.params as { id: string };
    return await clienteService.Buscar_animal_por_id(id);
  });

  // UPDATE
  app.put('/animais/:id', async (request) => {
    const { id } = request.params as { id: string };
    return await clienteService.Atualizar_animal(id, request.body as any);
  });

  // DELETE
  app.delete('/animais/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    await clienteService.Deletar_animal(id);
    return reply.status(204).send();
  });

  // ===== ROTAS DE TRATAMENTO =====

  // CREATE
  app.post('/tratamentos', async (request, reply) => {
    const { animalId, dataIni, histInicial } = request.body as any;
    const id = await tratamentoService.Reg_trat(animalId, new Date(dataIni), histInicial);
    return reply.status(201).send({ id });
  });

  // READ - Listar por animal
  app.get('/animais/:id/tratamentos', async (request) => {
    const { id } = request.params as { id: string };
    return await tratamentoService.Vis_trat(id);
  });

  // READ - Listar todos
  app.get('/tratamentos', async () => {
    return await tratamentoService.Listar_todos_tratamentos();
  });

  // READ - Buscar por ID
  app.get('/tratamentos/:id', async (request) => {
    const { id } = request.params as { id: string };
    return await tratamentoService.Con_trat(id);
  });

  // UPDATE
  app.put('/tratamentos/:id', async (request) => {
    const { id } = request.params as { id: string };
    return await tratamentoService.Atualizar_tratamento(id, request.body as any);
  });

  // DELETE
  app.delete('/tratamentos/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    await tratamentoService.Deletar_tratamento(id);
    return reply.status(204).send();
  });

  // ===== ROTAS DE CONSULTA =====

  // CREATE
  app.post('/consultas', async (request, reply) => {
    const id = await consultaService.Registrar_consulta(request.body as any);
    return reply.status(201).send({ id });
  });

  // READ - Listar por tratamento
  app.get('/tratamentos/:id/consultas', async (request) => {
    const { id } = request.params as { id: string };
    return await consultaService.Listar_consultas(id);
  });

  // READ - Listar todas
  app.get('/consultas', async () => {
    return await consultaService.Listar_todas_consultas();
  });

  // READ - Buscar por ID
  app.get('/consultas/:id', async (request) => {
    const { id } = request.params as { id: string };
    return await consultaService.Verificar_consulta(id);
  });

  // UPDATE
  app.put('/consultas/:id', async (request) => {
    const { id } = request.params as { id: string };
    return await consultaService.Atualizar_consulta(id, request.body as any);
  });

  // DELETE
  app.delete('/consultas/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    await consultaService.Deletar_consulta(id);
    return reply.status(204).send();
  });

  // ===== ROTAS DE EXAME =====

  // CREATE
  app.post('/consultas/:id/exames', async (request, reply) => {
    const { id } = request.params as { id: string };
    const { descricao } = request.body as { descricao: string };
    const exame = await consultaService.Marcar_exame(id, descricao);
    return reply.status(201).send(exame);
  });

  // READ - Listar exames da consulta
  app.get('/consultas/:id/exames', async (request) => {
    const { id } = request.params as { id: string };
    return await consultaService.Listar_exames_consulta(id);
  });

  // READ - Buscar exame por ID
  app.get('/exames/:id', async (request) => {
    const { id } = request.params as { id: string };
    return await consultaService.Buscar_exame(id);
  });

  // DELETE
  app.delete('/exames/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    await consultaService.Deletar_exame(id);
    return reply.status(204).send();
  });

  // ===== ROTAS DE VETERINÁRIO =====

  // CREATE
  app.post('/veterinarios', async (request, reply) => {
    const veterinario = await veterinarioService.Registrar_veterinario(request.body as any);
    return reply.status(201).send(veterinario);
  });

  // READ - Listar todos
  app.get('/veterinarios', async () => {
    return await veterinarioService.Listar_veterinarios();
  });

  // READ - Buscar por ID
  app.get('/veterinarios/:id', async (request) => {
    const { id } = request.params as { id: string };
    return await veterinarioService.Buscar_veterinario(id);
  });

  // UPDATE
  app.put('/veterinarios/:id', async (request) => {
    const { id } = request.params as { id: string };
    return await veterinarioService.Atualizar_veterinario(id, request.body as any);
  });

  // DELETE
  app.delete('/veterinarios/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    await veterinarioService.Deletar_veterinario(id);
    return reply.status(204).send();
  });
}
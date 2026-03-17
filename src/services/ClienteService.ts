import { prisma } from '../lib/prisma.js';
import type { Cliente, Animal } from '@prisma/client';

export class ClienteService {
  async Registrar_cliente(dados: Omit<Cliente, 'id'>): Promise<string> {
    const cliente = await prisma.cliente.create({ data: dados });
    return cliente.id; // Retorna o ID (int/uuid conforme schema)
  }

  async Consultar_cliente(email: string): Promise<Cliente | null> {
    return await prisma.cliente.findUnique({ where: { email } });
  }

  async Vis_animal(clienteId: string): Promise<Animal[]> {
    return await prisma.animal.findMany({ where: { clienteId } });
  }

  // RN: Registro de animal vinculado obrigatoriamente a um tratamento inicial
  async Registrar_animal_com_tratamento(
    dadosAnimal: Omit<Animal, 'id'>, 
    dataInicioTrat: Date
  ) {
    return await prisma.$transaction(async (tx) => {
      const animal = await tx.animal.create({ data: dadosAnimal });
      
      await tx.tratamento.create({
        data: {
          data_inicial: dataInicioTrat,
          animalId: animal.id,
          nome_tratamento: "Tratamento Inicial"
        }
      });
      
      return animal;
    });
  }
}
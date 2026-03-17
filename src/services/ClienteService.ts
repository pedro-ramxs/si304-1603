import { prisma } from '../lib/prisma.js';
import type { Cliente, Animal } from '@prisma/client';

export class ClienteService {
  async Registrar_cliente(dados: Omit<Cliente, 'id'>): Promise<string> {
    const cliente = await prisma.cliente.create({ data: dados });
    return cliente.id;
  }

  async Consultar_cliente(email: string): Promise<Cliente | null> {
    return await prisma.cliente.findUnique({ where: { email } });
  }

  async Buscar_cliente_por_id(id: string): Promise<Cliente | null> {
    return await prisma.cliente.findUnique({ 
      where: { id },
      include: { animais: true }
    });
  }

  async Listar_clientes(): Promise<Cliente[]> {
    return await prisma.cliente.findMany({
      include: { animais: true }
    });
  }

  async Atualizar_cliente(id: string, dados: Partial<Omit<Cliente, 'id'>>): Promise<Cliente> {
    return await prisma.cliente.update({
      where: { id },
      data: dados,
      include: { animais: true }
    });
  }

  async Deletar_cliente(id: string): Promise<void> {
    await prisma.cliente.delete({ where: { id } });
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

  async Buscar_animal_por_id(id: string): Promise<Animal | null> {
    return await prisma.animal.findUnique({
      where: { id },
      include: { tratamentos: true }
    });
  }

  async Atualizar_animal(id: string, dados: Partial<Omit<Animal, 'id' | 'clienteId'>>): Promise<Animal> {
    return await prisma.animal.update({
      where: { id },
      data: dados,
      include: { tratamentos: true }
    });
  }

  async Deletar_animal(id: string): Promise<void> {
    await prisma.animal.delete({ where: { id } });
  }
}
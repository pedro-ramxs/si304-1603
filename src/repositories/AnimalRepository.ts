// 1. IMPORTANTE: Importe a instância centralizada!
import { prisma } from '../lib/prisma.js'; 
import type { Animal } from '@prisma/client';

export class AnimalRepository {
  // ❌ Removido: const prisma = new PrismaClient();

  async vincularAoCliente(dados: { 
    nome: string, 
    idade: number,    // Ajustado conforme sua Migration
    sexo: number,     // Ajustado conforme sua Migration
    clienteId: string 
  }): Promise<Animal> {
    return await prisma.animal.create({
      data: dados,
    });
  }

  async listarPorCliente(clienteId: string): Promise<Animal[]> {
    return await prisma.animal.findMany({
      where: { clienteId },
      include: { tratamentos: true }
    });
  }

  async buscarPorId(id: string): Promise<Animal | null> {
    return await prisma.animal.findUnique({
      where: { id },
      include: { tratamentos: true }
    });
  }

  async atualizar(id: string, dados: Partial<Omit<Animal, 'id' | 'clienteId'>>): Promise<Animal> {
    return await prisma.animal.update({
      where: { id },
      data: dados,
      include: { tratamentos: true }
    });
  }

  async deletar(id: string): Promise<void> {
    await prisma.animal.delete({ where: { id } });
  }

  async listarTodos(): Promise<Animal[]> {
    return await prisma.animal.findMany({
      include: { tratamentos: true }
    });
  }
}
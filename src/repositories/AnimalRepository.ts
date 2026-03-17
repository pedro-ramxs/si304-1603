// 1. IMPORTANTE: Importe a instância centralizada!
import { prisma } from '../lib/prisma.js'; 

export class AnimalRepository {
  // ❌ Removido: const prisma = new PrismaClient();

  async vincularAoCliente(dados: { 
    nome: string, 
    idade: number,    // Ajustado conforme sua Migration
    sexo: number,     // Ajustado conforme sua Migration
    clienteId: string 
  }) {
    return await prisma.animal.create({
      data: dados,
    });
  }

  async listarPorCliente(clienteId: string) {
    return await prisma.animal.findMany({
      where: { clienteId }
    });
  }
}
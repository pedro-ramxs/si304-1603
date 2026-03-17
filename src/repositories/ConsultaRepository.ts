// 1. IMPORTANTE: Importe a instância que já tem o adaptador, NÃO crie uma nova!
import { prisma } from '../lib/prisma.js'; 
import type { Exame } from '@prisma/client';

export class ConsultaRepository {
  // Removido o "const prisma = new PrismaClient()" daqui de dentro!

  async agendar(data_consulta: Date, tratamentoId: string, veterinarioId: string, historico: string) {
    // Nota: No seu Schema, Consulta pertence a um Tratamento
    return await prisma.consulta.create({
      data: {
        data_consulta,
        historico,
        tratamentoId, // Ajustado de animalId para tratamentoId conforme sua migration
        veterinarioId,
      },
      include: { exames: true, veterinario: true }
    });
  }

  async buscarAgendaDoDia(dataInicio: Date, dataFim: Date) {
    return await prisma.consulta.findMany({
      where: {
        data_consulta: {
          gte: dataInicio,
          lte: dataFim
        }
      },
      include: {
        tratamento: {
            include: {
                animal: true // Para chegar no animal, passamos pelo tratamento
            }
        },
        veterinario: true,
        exames: true
      }
    });
  }

  // Se você não definiu um Enum no Prisma, o status deve ser uma String 
  // ou você deve ajustar o Schema primeiro.
  async atualizarStatus(id: string, historicoNovo: string) {
    return await prisma.consulta.update({
      where: { id },
      data: { historico: historicoNovo },
      include: { exames: true, veterinario: true }
    });
  }

  async buscarPorId(id: string) {
    return await prisma.consulta.findUnique({
      where: { id },
      include: { exames: true, veterinario: true }
    });
  }

  async listarPorTratamento(tratamentoId: string) {
    return await prisma.consulta.findMany({
      where: { tratamentoId },
      include: { exames: true, veterinario: true },
      orderBy: { data_consulta: 'desc' }
    });
  }

  async listarTodas() {
    return await prisma.consulta.findMany({
      include: { exames: true, veterinario: true },
      orderBy: { data_consulta: 'desc' }
    });
  }

  async atualizar(id: string, dados: any) {
    return await prisma.consulta.update({
      where: { id },
      data: dados,
      include: { exames: true, veterinario: true }
    });
  }

  async deletar(id: string) {
    await prisma.consulta.delete({ where: { id } });
  }

  async criarExame(consultaId: string, descricao: string): Promise<Exame> {
    return await prisma.exame.create({
      data: {
        desc_exame: descricao,
        consultaId: consultaId
      }
    });
  }

  async buscarExame(id: string) {
    return await prisma.exame.findUnique({ where: { id } });
  }

  async listarExames(consultaId: string) {
    return await prisma.exame.findMany({ where: { consultaId } });
  }

  async deletarExame(id: string) {
    await prisma.exame.delete({ where: { id } });
  }
}
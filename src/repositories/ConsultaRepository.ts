// 1. IMPORTANTE: Importe a instância que já tem o adaptador, NÃO crie uma nova!
import { prisma } from '../lib/prisma.js'; 

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
      }
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
        veterinario: true
      }
    });
  }

  // Se você não definiu um Enum no Prisma, o status deve ser uma String 
  // ou você deve ajustar o Schema primeiro.
  async atualizarStatus(id: string, historicoNovo: string) {
    return await prisma.consulta.update({
      where: { id },
      data: { historico: historicoNovo }
    });
  }
}
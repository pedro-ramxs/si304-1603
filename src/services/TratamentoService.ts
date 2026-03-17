import type { Tratamento } from '@prisma/client';
import { prisma } from '../lib/prisma.js';

export class TratamentoService {
  // Reg_trat: Registra tratamento e já vincula a primeira consulta obrigatória
  async Reg_trat(animalId: string, dataIni: Date, histInicial: string): Promise<string> {
    const novoTratamento = await prisma.$transaction(async (tx) => {
      const trat = await tx.tratamento.create({
        data: {
          data_inicial: dataIni,
          animalId: animalId
        }
      });

      await tx.consulta.create({
        data: {
          data_consulta: dataIni,
          historico: histInicial,
          tratamentoId: trat.id
        }
      });

      return trat;
    });
    return novoTratamento.id;
  }

  async Vis_trat(animalId: string): Promise<Tratamento[]> {
    return await prisma.tratamento.findMany({ where: { animalId } });
  }

  async Con_trat(tratamentoId: string): Promise<Tratamento | null> {
    return await prisma.tratamento.findUnique({ 
      where: { id: tratamentoId },
      include: { consultas: true } 
    });
  }

  async Atualizar_tratamento(id: string, dados: Partial<Omit<Tratamento, 'id' | 'animalId'>>): Promise<Tratamento> {
    return await prisma.tratamento.update({
      where: { id },
      data: dados,
      include: { consultas: true }
    });
  }

  async Deletar_tratamento(id: string): Promise<void> {
    await prisma.tratamento.delete({ where: { id } });
  }

  async Listar_todos_tratamentos(): Promise<Tratamento[]> {
    return await prisma.tratamento.findMany({
      include: { consultas: true }
    });
  }
}
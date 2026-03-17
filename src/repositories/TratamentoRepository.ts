import { prisma } from '../lib/prisma.js';
import type { Tratamento } from '@prisma/client';

export class TratamentoRepository {
    async criar(dados: Omit<Tratamento, 'id'>): Promise<Tratamento> {
        return await prisma.tratamento.create({
            data: dados,
            include: { consultas: true }
        });
    }

    async buscarPorId(id: string): Promise<Tratamento | null> {
        return await prisma.tratamento.findUnique({
            where: { id },
            include: { consultas: true }
        });
    }

    async listarPorAnimal(animalId: string): Promise<Tratamento[]> {
        return await prisma.tratamento.findMany({
            where: { animalId },
            include: { consultas: true },
            orderBy: { data_inicial: 'desc' }
        });
    }

    async listarTodos(): Promise<Tratamento[]> {
        return await prisma.tratamento.findMany({
            include: { consultas: true },
            orderBy: { data_inicial: 'desc' }
        });
    }

    async atualizar(id: string, dados: Partial<Omit<Tratamento, 'id' | 'animalId'>>): Promise<Tratamento> {
        return await prisma.tratamento.update({
            where: { id },
            data: dados,
            include: { consultas: true }
        });
    }

    async deletar(id: string): Promise<void> {
        await prisma.tratamento.delete({ where: { id } });
    }
}

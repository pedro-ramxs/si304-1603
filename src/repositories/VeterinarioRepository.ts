import { prisma } from '../lib/prisma.js';
import type { Veterinario } from '@prisma/client';

export class VeterinarioRepository {
    async cadastrar(dados: Omit<Veterinario, 'id'>): Promise<Veterinario> {
        return await prisma.veterinario.create({
            data: dados
        });
    }

    async listarTodos(): Promise<Veterinario[]> {
        return await prisma.veterinario.findMany({
            orderBy: { nome_vet: 'asc' },
            include: { consultas: true }
        });
    }

    async buscarPorId(id: string): Promise<Veterinario | null> {
        return await prisma.veterinario.findUnique({
            where: { id },
            include: { consultas: true }
        });
    }

    async atualizar(id: string, dados: Partial<Omit<Veterinario, 'id'>>): Promise<Veterinario> {
        return await prisma.veterinario.update({
            where: { id },
            data: dados,
            include: { consultas: true }
        });
    }

    async deletar(id: string): Promise<void> {
        await prisma.veterinario.delete({ where: { id } });
    }
}
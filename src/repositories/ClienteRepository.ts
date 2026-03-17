import { prisma } from '../lib/prisma.js';
import type { Cliente } from '@prisma/client';

export class ClienteRepository {
    async criar(dados: Omit<Cliente, 'id'>): Promise<Cliente> {
        return await prisma.cliente.create({
            data: dados,
        });
    }

    async buscarPorId(id: string): Promise<Cliente | null> {
        return await prisma.cliente.findUnique({
            where: { id },
            include: { animais: true }
        });
    }

    async buscarPorEmail(email: string): Promise<Cliente | null> {
        return await prisma.cliente.findUnique({
            where: { email },
            include: { animais: true }
        });
    }

    async listarTodos(): Promise<Cliente[]> {
        return await prisma.cliente.findMany({
            include: { animais: true },
            orderBy: { nome: 'asc' }
        });
    }

    async atualizar(id: string, dados: Partial<Omit<Cliente, 'id'>>): Promise<Cliente> {
        return await prisma.cliente.update({
            where: { id },
            data: dados,
            include: { animais: true }
        });
    }

    async deletar(id: string): Promise<void> {
        await prisma.cliente.delete({ where: { id } });
    }
}


import { PrismaClient } from '@prisma/client';
import type { Cliente } from '@prisma/client';

const prisma = new PrismaClient();

export class ClienteRepository {
    async criar(dados: Omit<Cliente, 'id' | 'createdAt'>) {
        return await prisma.cliente.create({
            data: dados,
        });
    }

    async buscarPorId(id: string) {
        return await prisma.cliente.findUnique({
            where: { id },
            include: { animais: true } // Eager loading dos pets do cliente
        });
    }
}


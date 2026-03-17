import { PrismaClient } from '@prisma/client';
import type { Veterinario } from '@prisma/client';

const prisma = new PrismaClient();

export class VeterinarioRepository {
    async cadastrar(dados: Omit<Veterinario, 'id'>) {
        return await prisma.veterinario.create({
            data: dados
        });
    }

    async listarTodos() {
        return await prisma.veterinario.findMany({
            orderBy: { nome_vet: 'asc' }
        });
    }
}
import type { Consulta, Exame } from '@prisma/client';
import { prisma } from '../lib/prisma.js';

export class ConsultaService {
    async Registrar_consulta(dados: Omit<Consulta, 'id'>): Promise<string> {
        const consulta = await prisma.consulta.create({ data: dados });
        return consulta.id;
    }

    async Listar_consultas(tratamentoId: string): Promise<Consulta[]> {
        return await prisma.consulta.findMany({ 
            where: { tratamentoId },
            include: { exames: true, veterinario: true }
        });
    }

    async Verificar_consulta(consultaId: string) {
        return await prisma.consulta.findUnique({
            where: { id: consultaId },
            include: { exames: true, veterinario: true }
        });
    }

    async Atualizar_consulta(id: string, dados: Partial<Omit<Consulta, 'id' | 'tratamentoId'>>): Promise<Consulta> {
        return await prisma.consulta.update({
            where: { id },
            data: dados,
            include: { exames: true, veterinario: true }
        });
    }

    async Deletar_consulta(id: string): Promise<void> {
        await prisma.consulta.delete({ where: { id } });
    }

    async Marcar_exame(consultaId: string, descricao: string): Promise<Exame> {
        return await prisma.exame.create({
            data: {
                desc_exame: descricao,
                consultaId: consultaId
            }
        });
    }

    async Buscar_exame(exameId: string): Promise<Exame | null> {
        return await prisma.exame.findUnique({ where: { id: exameId } });
    }

    async Listar_exames_consulta(consultaId: string): Promise<Exame[]> {
        return await prisma.exame.findMany({ where: { consultaId } });
    }

    async Deletar_exame(id: string): Promise<void> {
        await prisma.exame.delete({ where: { id } });
    }

    async Listar_todas_consultas(): Promise<Consulta[]> {
        return await prisma.consulta.findMany({
            include: { exames: true, veterinario: true }
        });
    }
}
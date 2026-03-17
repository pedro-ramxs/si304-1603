import type { Consulta, Exame } from '@prisma/client';
import { prisma } from '../lib/prisma.js';

export class ConsultaService {
    async Registrar_consulta(dados: Omit<Consulta, 'id'>): Promise<string> {
        const consulta = await prisma.consulta.create({ data: dados });
        return consulta.id;
    }

    async Listar_consultas(tratamentoId: string): Promise<Consulta[]> {
        return await prisma.consulta.findMany({ where: { tratamentoId } });
    }

    async Verificar_consulta(consultaId: string) {
        return await prisma.consulta.findUnique({
            where: { id: consultaId },
            include: { exames: true, veterinario: true }
        });
    }

    async Marcar_exame(consultaId: string, descricao: string): Promise<Exame> {
        return await prisma.exame.create({
            data: {
                desc_exame: descricao,
                consultaId: consultaId
            }
        });
    }
}
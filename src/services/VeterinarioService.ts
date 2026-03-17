import { VeterinarioRepository } from '../repositories/VeterinarioRepository.js';
import type { Veterinario } from '@prisma/client';

export class VeterinarioService {
  private veterinarioRepository: VeterinarioRepository;

  constructor() {
    this.veterinarioRepository = new VeterinarioRepository();
  }

  async Registrar_veterinario(dados: Omit<Veterinario, 'id'>): Promise<Veterinario> {
    return await this.veterinarioRepository.cadastrar(dados);
  }

  async Listar_veterinarios(): Promise<Veterinario[]> {
    return await this.veterinarioRepository.listarTodos();
  }

  async Buscar_veterinario(id: string): Promise<Veterinario | null> {
    return await this.veterinarioRepository.buscarPorId(id);
  }

  async Atualizar_veterinario(id: string, dados: Partial<Omit<Veterinario, 'id'>>): Promise<Veterinario> {
    return await this.veterinarioRepository.atualizar(id, dados);
  }

  async Deletar_veterinario(id: string): Promise<void> {
    return await this.veterinarioRepository.deletar(id);
  }
}

import { prisma } from '../src/lib/prisma.js';
import dotenv from 'dotenv'
dotenv.config()

async function main() {
  console.log('🌱 Começando o semeio de dados...');

  // 1. Criar um Veterinário
  const vet = await prisma.veterinario.upsert({
    where: { id: 'vet-1' }, // Evita duplicar se rodar o comando 2 vezes
    update: {},
    create: {
      id: 'vet-1',
      nome_vet: 'Dr. Rodrigo Augusto',
      endereco_vet: 'Av. das Clínicas, 500',
      telefone_vet: '19988887777'
    }
  });

  // 2. Criar um Cliente com um Animal e um Tratamento (Respeitando suas Regras)
  const cliente = await prisma.cliente.create({
    data: {
      nome: 'Mariana Lima',
      email: 'mariana@email.com',
      telefone: '19977776666',
      endereco: 'Rua das Flores, 123',
      cep: '13480-000',
      animais: {
        create: {
          nome: 'Thor',
          idade: 3,
          sexo: 1, // Macho
          tratamentos: {
            create: {
              data_inicial: new Date(),
              nome_tratamento: 'Check-up Geral',
              consultas: {
                create: {
                  data_consulta: new Date(),
                  historico: 'Primeira consulta de rotina.',
                  veterinarioId: vet.id
                }
              }
            }
          }
        }
      }
    }
  });

  console.log('✅ Dados semeados com sucesso!');
  console.log(`👤 Cliente: ${cliente.nome}`);
  console.log(`🐾 Animal: Thor`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
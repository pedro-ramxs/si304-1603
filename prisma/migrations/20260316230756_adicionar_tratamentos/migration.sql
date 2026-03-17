-- CreateTable
CREATE TABLE "Cliente" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Animal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "sexo" INTEGER NOT NULL,
    "clienteId" TEXT NOT NULL,
    CONSTRAINT "Animal_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tratamento" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "data_inicial" DATETIME NOT NULL,
    "data_final" DATETIME,
    "nome_tratamento" TEXT,
    "animalId" TEXT NOT NULL,
    CONSTRAINT "Tratamento_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Consulta" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "data_consulta" DATETIME NOT NULL,
    "historico" TEXT NOT NULL,
    "tratamentoId" TEXT NOT NULL,
    "veterinarioId" TEXT,
    CONSTRAINT "Consulta_tratamentoId_fkey" FOREIGN KEY ("tratamentoId") REFERENCES "Tratamento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Consulta_veterinarioId_fkey" FOREIGN KEY ("veterinarioId") REFERENCES "Veterinario" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Veterinario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome_vet" TEXT NOT NULL,
    "endereco_vet" TEXT NOT NULL,
    "telefone_vet" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Exame" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "desc_exame" TEXT NOT NULL,
    "consultaId" TEXT NOT NULL,
    CONSTRAINT "Exame_consultaId_fkey" FOREIGN KEY ("consultaId") REFERENCES "Consulta" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_email_key" ON "Cliente"("email");

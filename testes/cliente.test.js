const Cliente = require('../cliente');

const novoCliente = new Cliente(
    "Cesar Berberino",
    "2000-01-24",
    "Não sabe ainda",
    24,
    "Rua Alvorada, 666",
    "(77) 9999-1020",
    "904.948.400-05", // CPF válido
    "unifg@gmail.com",
    "1234567890",
    "2010-01-01",
    "2030-01-01",
    "americano",
    "casado",
    "Mariana Santos"
);

console.log("Dados do Cliente:");
console.log("Nome:", novoCliente.nome);
console.log("Data de Nascimento:", novoCliente.dataNascimento);
console.log("Gênero:", novoCliente.genero);
console.log("Idade:", novoCliente.idade);
console.log("Endereço:", novoCliente.endereco);
console.log("Telefone:", novoCliente.telefone);
console.log("CPF:", novoCliente.cpf);
console.log("Email:", novoCliente.email);
console.log("Carteira de Motorista:", novoCliente.carteiraMotorista);
//console.log("Emissão da CNH:", novoCliente.emissaoCNH);
//console.log("Validade da CNH:", novoCliente.validadeCNH);
console.log("Nacionalidade:", novoCliente.nacionalidade);
console.log("Estado Civil:", novoCliente.estadoCivil);
console.log("Nome do Cônjuge:", novoCliente.nomeConjude);
const cliente = require('./cliente');
const cadastros = require('./cadastros');

const cadastroCliente = new cadastros();

cadastroCliente.adicionaClientes(new cliente(
    "Cesar Berberino", // Nome
    "20000124", // Data de nascimento
    "Outro", // Genero
    24, // Idade
    "Rua Alvorada, 666", // Endereço
    "77981037688", // telefone
    "904.948.400-05", // CPF válido
    "unifg@gmail.com", // Email
    "1234567890", // CNH
    "2010-01-01",
    "2030-01-01",
    "brasileiro", //Nacionalidade
    "Casado", // Estado civil
    "Maria" // Nome conjude
))

console.log(cadastroCliente);

//Visualizando o cliente cadastrado
cadastroCliente.visualizarClienteCadastrado();

//Finalizado o cadastro
cadastroCliente.finalizarCadastro();


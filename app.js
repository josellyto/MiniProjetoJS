const cliente = require('./cliente');
const cadastros = require('./cadastros');

const cadastroCliente = new cadastros();

cadastroCliente.adicionaClientes(new cliente("João da Silva",
    "01/01/1990",
    "Masculino",
    31,
    "Rua ABC, 123",
    "(00) 1234-5678",
    "123.456.789-00",
    "joao@example.com",
    "123456789",
    "01/01/2010",
    "01/01/2030",
    "Brasileiro",
    "Casado",
    "Mariana Santos"
))

console.log(cadastroCliente);

//Visualizando o cliente cadastrado
cadastroCliente.visualizarClienteCadastrado();

//Finalizado o cadastro
cadastroCliente.finalizarCadastro();
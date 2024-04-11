const cliente = require('./cliente');
const cadastros = require('./cadastros');

const cadastroCliente = new cadastros();

cadastroCliente.adicionaClientes(new cliente("Joao da Silva",
    "01/01/1990",
    "Masculino",
    31,
    "Rua ABC, 123",
    "77981037688",
    "922.904.570-51",
    "joao@example.com",
    "123456789",
    "01/01/2010",
    "01/01/2030",
    "brasileiro",
    "Viúvo",
    "Mariana Santos"
))

console.log(cadastroCliente);

//Visualizando o cliente cadastrado
cadastroCliente.visualizarClienteCadastrado();

//Finalizado o cadastro
cadastroCliente.finalizarCadastro();


const cliente = require("./cliente");

class cadastros {
    constructor() {
        this.clientes = [];
    }


    //metodos adicionar cliente

    adicionaClientes(cliente) {
        this.clientes.push(cliente);

    }

    // Método para visualizar clientes cadastrados
    visualizarClienteCadastrado() {
        console.log("Clientes cadastrados:");
        this.clientes.forEach(cliente => {
            console.log(cliente.nome);
        });
    }

    //metodo de verificação se o usuario foi cadastrado
    finalizarCadastro() {
        if (this.clientes.length === 0) {
            throw new Error('Não foi possível finalizar o cadastro, pois não há clientes cadastrados.');
        } else {
            console.log('Cadastro finalizado com sucesso!');
        }
    }
    
}

module.exports = cadastros;
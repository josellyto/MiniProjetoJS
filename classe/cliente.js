class cliente {
    constructor(id, nome, sobrenome, cpf, telefone) {

        this.id = id;
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.cpf = cpf;
        this.telefone = telefone;

    }

    static retornaCliente(cliente) {
        return {
            id: cliente.id,
            nome: cliente.nome,
            sobrenome: cliente.sobrenome,
            cpf: cliente.cpf,
            telefone: cliente.telefone
        }
    }
// vai cadastrar cliente
    static addCliente(clientes, data) {
        const newCliente = new cliente(clientes.length + 1, data.nome, data.sobrenome, data.cpf, data.telefone);
        clientes.push(newCliente);
        return this.retornaCliente(newCliente);

    }

// vai listar todos os Clientes.
    static listarTodosClientes(clientes){
        return clientes.map(cliente => this.retornaCliente(cliente));

    }

// Vai listar os clientes por ID.
    static listarCliente(cliente, id){
        const buscaCliente = this.encontraIdCliente(cliente, id);
        if (buscaCliente) {
            return this.retornaCliente(buscaCliente);
        }
        return null;
    }

    static encontraIdCliente(cliente, id) {
        return cliente.find(cliente => cliente.id === id);
    }

    // Vai atualizar/Modificar o cadastro do Cliente.
    static atualizarCliente(cliente, id, data) {
        const buscaCliente = this.encontraIdCliente(cliente, id);
        if (buscaCliente && data) {
            buscaCliente.nome = data.nome || buscaCliente.nome ;
            buscaCliente.sobrenome = data.sobrenome || buscaCliente.sobrenome ;
            buscaCliente.cpf = data.cpf || buscaCliente.cpf ;
            buscaCliente.telefone = data.telefone || buscaCliente.telefone ;
            
        }
        return buscaCliente;
    }

// Vai deletar/apagagar o cadastro
    static deletarCliente(cliente, id) {
        const dellCliente = this.encontraIdCliente(cliente, id);
        if (dellCliente) {
            const indice = cliente.indexOf(dellCliente);
            cliente.splice(indice, 1);
            return true;
        }
        return false;
    }

}
module.exports = cliente;
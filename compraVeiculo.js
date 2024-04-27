const Cliente = require("./cliente");
const Veiculo = require("./veiculos");

class ComprasDeVeiculos {
    constructor() {
        this.veiculos = [];
        this.clientes = []; // changed from 'cliente' to 'clientes' to reflect plural form
        this.formaPagamento = null; // initialize the formaPagamento property
    }

    adicionarCliente(cliente) {
        if (cliente instanceof Cliente) {
            this.clientes.push(cliente);
        } else {
            throw new Error("O parâmetro deve ser uma instância da classe Cliente.");
        }
    }

    adicionarVeiculo(veiculo) {
        if (veiculo instanceof Veiculo) {
            this.veiculos.push(veiculo);
        } else {
            throw new Error("O parâmetro deve ser uma instância da classe Veiculo.");
        }
    }

    // Add a new method to get the total number of vehicles in the veiculos array
    getTotalVeiculos() {
        return this.veiculos.length;
    }

    removerVeiculo(veiculo) {
        const index = this.veiculos.indexOf(veiculo);
        if (index !== -1) {
            this.veiculos.splice(index, 1);
        }
    }

    //teste

    listarClientes() {
        return this.clientes.map((cliente, index) => {
            console.log(`Cliente ${index + []}:`);
            console.log(`Nome: ${cliente.nome}`);
            console.log(`CPF: ${cliente.cpf}`);
            console.log(`Endereço: ${cliente.endereco}`);
            console.log("------");
        });
    }

    listarVeiculos() {
        return this.veiculos;
    }

    calcularValorTotal() {
        let total = 0;
        this.veiculos.forEach((veiculo) => {
            total += veiculo.obterPreco();
        });
        return total;
    }

    // Add a method to set the formaPagamento property
    setFormaPagamento(formaPagamento) {
        this.formaPagamento = formaPagamento;
    }

    // Add a method to get the formaPagamento property
    getFormaPagamento() {
        return this.reconhecerFormaPagamento(this.formaPagamento);
    }

    reconhecerFormaPagamento(formaPagamento) {
        // Verifica a forma de pagamento e retorna uma mensagem correspondente
        switch (formaPagamento.toLowerCase()) {
            case "dinheiro":
                return "Forma de pagamento: Dinheiro, Aprovado com sucesso!";
            case "cartão":
                return "Forma de pagamento: Cartão de crédito/débito, Aprovado com sucesso!";
            case "transferência":
                return "Forma de pagamento: Transferência bancária, Aprovado com sucesso!";
            case "pix":
                return "Forma de pagamento: PIX, Aprovado com sucesso!";
            case "boleto":
                return "Forma de pagamento: Boleto bancário, Aprovado com sucesso!";
            default:
                return "Forma de pagamento não reconhecida";
        }
    }
}

module.exports = ComprasDeVeiculos;
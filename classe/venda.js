const Carro = require('./carro');
const Cliente = require('./cliente');

class Venda {
    constructor(id, cliente) {
        this.id = id;
        this.cliente = cliente || null;
        this.veiculos = [];
        this.valorTotal = 0;
    }
    
    static gerarId() {
        // Gera um ID único utilizando timestamp atual
        return Date.now();
    }

    static adicionarVenda(vendas, cliente, veiculos) {
        // Gerar o ID da venda utilizando timestamp atual
        const vendaId = this.gerarId();

        // Criar uma nova instância de Venda
        const novaVenda = new Venda(vendaId, cliente);

        // Adicionar os veículos à venda
        novaVenda.veiculos = veiculos;

        // Calcular o valor total da venda
        novaVenda.calcularValorTotal();

        // Adicionar a nova venda à lista de vendas
        vendas.push(novaVenda);

        // Retornar os detalhes da nova venda
        return this.retornaVenda(novaVenda);
    }

    static criarVenda(cliente) {
        // Cria uma nova venda com um ID gerado automaticamente
        const novaVenda = new Venda(Venda.gerarId(), cliente);
        return novaVenda;
    }

    static retornaVenda(venda) {
        return {
            id: venda.id,
            cliente: venda.cliente,
            veiculos: venda.veiculos,
            valorTotal: venda.valorTotal,
        };
    }

    adicionarClientePorId(clienteId, clientes) {
        const cliente = clientes.find(c => c.id === clienteId);
        if (cliente) {
            this.cliente = cliente;
            return true;
        } else {
            return false; // Retorna falso se o cliente não for encontrado
        }
    }

    adicionarVeiculoPorId(veiculoId, carros) {
        const veiculo = carros.find(carro => carro.id === veiculoId);
        if (veiculo) {
            this.veiculos.push(veiculo);
            this.calcularValorTotal();
            return true;
        } else {
            return false; // Retorna falso se o veículo não for encontrado
        }
    }

    static encontrarVendaPorId(vendas, id) {
        return vendas.find(venda => venda.id === id);
    }

    calcularValorTotal() {
        this.valorTotal = this.veiculos.reduce((total, veiculo) => total + veiculo.preco, 0);
    }

    
}

module.exports = Venda;
export class ModeloVenda {
    constructor(cliente_cpf, veiculo_placa, forma_de_pagamento) {
        this._id = null; // O ID será atribuído pelo banco de dados
        this._cliente_cpf = cliente_cpf;
        this._veiculo_placa = veiculo_placa;
        this._data_venda = null; // Será atribuído automaticamente a data atual no banco de dados
        this._forma_de_pagamento = forma_de_pagamento;
    }

    // Getters e setters para acessar e modificar os atributos privados
    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get cliente_cpf() {
        return this._cliente_cpf;
    }

    set cliente_cpf(value) {
        this._cliente_cpf = value;
    }

    get veiculo_placa() {
        return this._veiculo_placa;
    }

    set veiculo_placa(value) {
        this._veiculo_placa = value;
    }

    get data_venda() {
        return this._data_venda;
    }

    set data_venda(value) {
        this._data_venda = value;
    }

    get forma_de_pagamento() {
        return this._forma_de_pagamento;
    }

    set forma_de_pagamento(value) {
        this._forma_de_pagamento = value;
    }

    async processarPagamento() {
        try {
            switch (this._forma_de_pagamento.toLowerCase()) {
                case 'dinheiro':
                    // Lógica para processar pagamento em dinheiro (à vista)
                    console.log('Pagamento em dinheiro processado.');
                    break;
                case 'pix':
                    // Lógica para processar pagamento via Pix (à vista)
                    console.log('Pagamento via Pix processado.');
                    break;
                case 'cartão crédito':
                    // Lógica para processar pagamento via cartão de crédito (máximo de 48 parcelas)
                    console.log('Pagamento via cartão de crédito processado.');
                    break;
                case 'cartão débito':
                    // Lógica para processar pagamento via cartão de débito (à vista)
                    console.log('Pagamento via cartão de débito processado.');
                    break;
                default:
                    throw new Error('Forma de pagamento inválida.');
            }
        } catch (error) {
            console.error('Erro ao processar pagamento:', error.message);
            throw error;
        }
    }
}

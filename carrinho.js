class Carrinho {
  constructor() {
    this.itens = [];
    this.subtotal = null;
    this.frete = null;
    this.total = null;
    this.clientes = [];
    this.confirmacaoCadastro = [];
  }

  //metodos adicionar cliente

  adicionaClientes(cliente) {
    this.clientes.push(cliente);
  }

  //metodos de cofirmação de cadastro

  confirmacaoCadastro(cliente) {
    // Verifique se o cliente já está na lista de clientes
    return this.clientes.includes(cliente);
  }


  adiciona(item) {
    this.itens.push(item);
  }

  adicionaFrete(valor) {
    this.frete = valor;
  }

  calculaTotal() {
    this.subtotal = this.itens.reduce((acum, item) => acum + item.somaTotalItens(), 0);
    return this.subtotal + this.frete;
  }

  finalizaCompra() {
    if (this.itens.length === 0) {
      throw new Error('Carrinho de compras vazio');
    }

    this.total = this.calculaTotal();

    return {
      subtotal: this.subtotal,
      frete: this.frete,
      total: this.total,
    };
  }
}

module.exports = Carrinho;

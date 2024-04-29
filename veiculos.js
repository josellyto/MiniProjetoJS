class Veiculos {
  constructor(modelo, ano, preco, quantidade) {
    this.modelo = modelo;
    this.ano = ano;
    this.preco = preco;
    this.quantidade = quantidade;
  }

  obterModelo() {
    return this.modelo;
  }

  obterAno() {
    return this.ano;
  }

  obterPreco() {
    return this.preco;
  }

  obterQuantidade() {
    return this.quantidade;
  }

  atualizarModelo(novoModelo) {
    this.modelo = novoModelo;
  }

  atualizarAno(novoAno) {
    this.ano = novoAno;
  }

  atualizarPreco(novoPreco) {
    this.preco = novoPreco;
  }

  atualizarQuantidade(novaQuantidade) {
    this.quantidade = novaQuantidade;
  }

  imprimirInformacoes() {
    console.log(`Modelo: ${this.obterModelo()}`);
    console.log(`Ano: ${this.obterAno()}`);
    console.log(`Preço: ${this.obterPreco()}`);
    console.log(`Quantidade: ${this.obterQuantidade()}`);
  }
}

module.exports = Veiculos;
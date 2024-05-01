class Veiculos {
  constructor(modelo, ano, preco, placa) {
    this.modelo = modelo;
    this.ano = ano;
    this.preco = preco;
    this.placa = placa;
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

  obterPlaca() {
    return this.placa;
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

  atualizarPlaca(novaPlaca) {
    this.placa = novaPlaca;
  }

  // Add a new method to validate the placa format
  validarPlaca() {
    // Check if the placa is a string and has exactly 7 characters
    if (typeof this.placa!== 'string' || this.placa.length!== 7) {
      return false;
    }

    // Check if the placa only contains alphanumeric characters
    const regex = /^[a-zA-Z0-9]+$/;
    if (!regex.test(this.placa)) {
      return false;
    }

    return true;
  }

  // Add a new method to update the price with validation
  atualizarPrecoComValidacao(novoPreco) {
    // Check if the new price is a number and has a minimum value of 5 digits and a maximum value of 9 digits
    if (typeof novoPreco!== 'number' || novoPreco <= 10000 || novoPreco > 999999999) {
      return false;
    }

    this.preco = novoPreco;
    return true;
  }


  imprimirInformacoes() {
    console.log(`Modelo: ${this.obterModelo()}`);
    console.log(`Ano: ${this.obterAno()}`);
    console.log(`Preço: ${this.obterPreco()}`);
    console.log(`Placa: ${this.obterPlaca()}`);
  }
}

module.exports = Veiculos;
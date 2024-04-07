// veiculo.js
class Veiculo {
    constructor(marca, modelo, cor, ano, placa, quilometragem, condicao, tipoDaCarroceria, preco) {
      this.marca = marca;
      this.modelo = modelo;
      this.cor = cor;
      this.ano = ano;
      this.placa = placa;
      this.quilometragem = quilometragem;
      this.condicao = condicao;
      this.tipoDaCarroceria = tipoDaCarroceria;
      this.preco = preco;
    }
  }
  
  module.exports = Veiculo;
// veiculo.js
class Veiculo {
    constructor(marca, modelo, cor, ano, placa, quilometragem, condicao, tipoDaCarroceria, preco) {
      this.marca = marca;
      this.modelo = modelo;
      this.cor = cor; // validar somenete string
      this.ano = ano; // validar somente number
      this.placa = placa; 
      this.quilometragem = quilometragem; //validar somente number
      this.condicao = condicao;
      this.tipoDaCarroceria = tipoDaCarroceria;
      this.preco = preco; // validar somente number
    }
  }
  
  module.exports = Veiculo;
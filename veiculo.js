class Veiculo {
  constructor(marca, modelo, cor, ano, placa, quilometragem, condicao, tipoDaCarroceria, preco) {
    this.marca = this.validarMarca(marca);
    this.modelo = this.validarModelo(modelo);
    this.cor = this.validarCor(cor);
    this.ano = this.validarAno(ano);
    this.placa = this.validarPlaca(placa);
    this.quilometragem = this.validarQuilometragem(quilometragem);
    this.condicao = this.validarCondicao(condicao);
    this.tipoDaCarroceria = this.validarTipoDaCarroceria(tipoDaCarroceria);
    this.preco = this.validarPreco(preco);
  }

  validarMarca(marca) {
    if (!marca || typeof marca !== "string") {
      throw new Error("A marca não pode estar vazia.");
    }
    return marca;
  }

  validarModelo(modelo) {
    if (!modelo || typeof modelo !== "string") {
      throw new Error("O modelo não pode estar vazio.");
    }
    return modelo;
  }

  validarCor(cor) {
    if (!cor || typeof cor !== "string") {
      throw new Error("A cor não pode estar vazia.");
    }
    return cor;
  }

  validarAno(ano) {
    if (!ano || typeof ano !== "number" || ano.toString().length !== 4) {
      throw new Error("O ano não pode estar vazio e deve ser um número de 4 dígitos.");
    }
    return ano;
  }

  validarPlaca(placa) {
    if (!placa || typeof placa !== "string" || placa.length !== 7) {
      throw new Error("A placa não pode estar vazia e deve possuir 7 caracteres.");
    }
    return placa;
  }

  validarQuilometragem(quilometragem) {
    if (!quilometragem || typeof quilometragem !== "number") {
      throw new Error("A quilometragem não pode estar vazia, deve ser um numero zero ou maior que zero.");
    }
    return quilometragem;
  }

  validarCondicao(condicao) {
    if (!condicao || !["Novo", "Usado", "Seminovo"].includes(condicao)) {
      throw new Error("A condição não pode estar vazia e deve ser 'Novo', 'Usado' ou 'Seminovo'.");
    }
    return condicao;
  }

  validarTipoDaCarroceria(tipoDaCarroceria) {
    if (!tipoDaCarroceria || typeof tipoDaCarroceria !== "string") {
      throw new Error("O tipo da carroceria não pode estar vazio, sedan, hacth, pick-up ou SUV.");
    }
    return tipoDaCarroceria;
  }

  validarPreco(preco) {
    if (!preco || typeof preco !== "number" || isNaN(preco)) {
      throw new Error("O campo do preço deve possuir algum valor, obrigatório, e deve ser um número.");
    }
    return preco;
  }

}
module.exports = Veiculo;
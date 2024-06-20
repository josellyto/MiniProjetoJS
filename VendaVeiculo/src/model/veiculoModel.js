export class Veiculo {
    constructor(marca, modelo, ano, cor, placa, status = 'disponível', valor) {
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
        this.cor = cor;
        this.placa = placa;
        this.status = status;
        this.valor = valor;
    }

    static insValida(veiculo) {
        if (!veiculo.marca || !veiculo.modelo || !veiculo.ano || !veiculo.cor || !veiculo.placa || veiculo.valor == null) {
            return false;
        }

        if (isNaN(veiculo.ano)) {
            return false;
        }

        if (isNaN(veiculo.valor)) {
            return false;
        }

        const anoAtual = new Date().getFullYear();
        if (veiculo.ano < 1886 || veiculo.ano > anoAtual) {
            return false;
        }

        if (veiculo.valor <= 0) {
            return false;
        }

        if (!Veiculo.validarPlaca(veiculo.placa)) {
            return false;
        }

        return true;
    }

    static validarPlaca(placa) {
        var regex = /^[A-Z]{3}[0-9]{4}$/;
        return regex.test(placa);
    }
}

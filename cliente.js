//Classe construtora para cliente cadastro de cliente e seu dados pessoais
//Aqui no caso  seria a interface de formulário de cadastro de cliente onde sao coletado dados pessoais do cliente para esta realizand o cadastro do cliente 

class cliente {
    constructor(nome, dataNascimento, genero, idade, endereco, telefone, cpf, email, carteiraMotorista, emissaoCNH, validadeCNH, nacionalidade, estadoCivil, nomeConjude) {
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.genero = genero;
        this.idade = idade;
        this.endereco = endereco;
        this.telefone = telefone;
        this.cpf = cpf;
        this.email = email;
        this.carteiraMotorista = carteiraMotorista;
        this.emissaoCNH = emissaoCNH;
        this.validadeCNH = validadeCNH;
        this.nacionalidade = nacionalidade;
        this.estadoCivil = estadoCivil;
        this.nomeConjude = nomeConjude;
    }

}

module.exports = cliente;
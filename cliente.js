//Classe construtora para cliente, cadastro de cliente e seus dados pessoais.
//Aqui, no caso, seria a interface de formulário de cadastro de cliente, onde são coletados dados pessoais do cliente para esta realizando o cadastro do cliente. 

class cliente {
    constructor(nome, dataNascimento, genero, idade, endereco, telefone, cpf, email, carteiraMotorista, emissaoCNH, validadeCNH, nacionalidade, estadoCivil, nomeConjude) {
    //constructor(nome, dataNascimento, genero, idade, endereco, telefone, cpf, email, carteiraMotorista, nacionalidade, estadoCivil, nomeConjude) {
        this.nome = this.validarNome(nome);
        this.dataNascimento = dataNascimento;
        this.genero = genero;
        this.idade = idade;
        this.endereco = endereco;
        this.telefone = telefone;
        this.cpf = this.validarCPF(cpf);
        this.email = email;
        this.carteiraMotorista = carteiraMotorista;
//        this.emissaoCNH = emissaoCNH;
//        this.validadeCNH = validadeCNH;
        this.nacionalidade = nacionalidade;
        this.estadoCivil = estadoCivil;
        this.nomeConjude = nomeConjude;
    }

    validarNome(nome) {
        // Expressão regular para verificar se o nome contém apenas letras e espaços
        if (/^[a-zA-Z\s]+$/.test(nome)) {
            return nome;
        } else {
            throw new Error("O nome não pode conter caracteres especiais.");
        }
    }

    validarCPF(cpf) {
        // Expressão regular para validar o formato de um CPF (dígitos e pontos opcionais)
        const cpfRegex = /^(\d{3}\.?\d{3}\.?\d{3}-?\d{2})$/;
        if (cpfRegex.test(cpf)) {
            // Remove pontos e traços do CPF para fazer a verificação de dígitos
            cpf = cpf.replace(/\D/g, '');
            // Verifica se todos os dígitos são iguais
            if (/^(\d)\1{10}$/.test(cpf)) {
                throw new Error("CPF inválido.");
            }
            // Calcula os dígitos verificadores
            let soma = 0;
            let resto;
            for (let i = 1; i <= 9; i++) {
                soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
            }
            resto = (soma * 10) % 11;
            if ((resto == 10) || (resto == 11)) {
                resto = 0;
            }
            if (resto != parseInt(cpf.substring(9, 10))) {
                throw new Error("CPF inválido.");
            }
            soma = 0;
            for (let i = 1; i <= 10; i++) {
                soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
            }
            resto = (soma * 10) % 11;
            if ((resto == 10) || (resto == 11)) {
                resto = 0;
            }
            if (resto != parseInt(cpf.substring(10, 11))) {
                throw new Error("CPF inválido.");
            }
            // Se chegou até aqui, o CPF é válido
            return cpf;
        } else {
            throw new Error("O CPF fornecido não é válido.");
        }
    }
}

module.exports = cliente;
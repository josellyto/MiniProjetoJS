class cliente {
    constructor(nome, dataNascimento, genero, idade, endereco, telefone, cpf, email, carteiraMotorista, emissaoCNH, validadeCNH, nacionalidade, estadoCivil, nomeConjude) {
        this.nome = this.validarNome(nome);
        this.dataNascimento = this.validarDataNascimento(dataNascimento);
        this.genero = this.validarGenero(genero);
        this.idade = this.validarIdade(idade);
        this.endereco = endereco;
        this.telefone = this.validarTelefone(telefone);
        this.cpf = this.validarCPF(cpf);
        this.email = this.validarEmail(email);
        this.carteiraMotorista = this.validarCarteiraMotorista(carteiraMotorista);
        this.nacionalidade = this.validarNacionalidade(nacionalidade);
        this.estadoCivil = this.validarEstadoCivil(estadoCivil);
        this.nomeConjude = this.validarNomeConjude(nomeConjude, estadoCivil);
    }

    validarNome(nome) {
        // Verificar Nome
        if (/^[a-zA-Z\s]+$/.test(nome)) {
            return nome;
        } else {
            throw new Error("O nome não pode conter caracteres especiais.");
        }
    }


    validarCPF(cpf) {
        // Verificar CPF (dígitos e pontos opcionais)
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

    validarEmail(email) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!regex.test(email)) {
            throw new Error("O e-mail fornecido não é válido.");
        }
        return email;
    }

    validarCarteiraMotorista(carteiraMotorista) {
        if (!carteiraMotorista) {
            throw new Error("O número da Carteira de Motorista não pode estar vazio.");
        }
        return carteiraMotorista;
    }

    validarGenero(genero) {
        // Verificar Genero
        genero = genero.toLowerCase();
        // Verificar se o gênero fornecido é válido
        if (["masculino", "feminino", "outro"].includes(genero)) {
            return genero;
        } else {
            throw new Error("O gênero fornecido não é válido. Deve ser 'Masculino', 'Feminino' ou 'Outro'.");
        }
    }

    validarTelefone(telefone) {
        const telefoneRegex = /^\d{11}$/;
        if (!telefoneRegex.test(telefone)) {
            throw new Error("O número de telefone fornecido não é válido. Deve conter exatamente 11 dígitos.");
        }
        if (/^(\d)\1+$/.test(telefone)) {
            throw new Error("O número de telefone fornecido não é válido. Todos os dígitos são iguais.");
        }
        return telefone;
    }

    validarNacionalidade(nacionalidade) {
        // Verificar se o campo de nacionalidade não está vazio
        if (!nacionalidade) {
            throw new Error("O campo de nacionalidade não pode estar vazio.");
        }
        // Lista de nacionalidades válidas
        const nacionalidadesValidas = ["brasileiro", "americano", "francês", "italiano", "espanhol", "português", "argentino"];
        // Converter a nacionalidade fornecida para minúsculas
        nacionalidade = nacionalidade.toLowerCase();
        // Verificar se a nacionalidade fornecida é válida
        if (nacionalidadesValidas.includes(nacionalidade)) {
            return nacionalidade;
        } else {
            throw new Error("A nacionalidade fornecida não é válida.");
        }
    }

    validarEstadoCivil(estadoCivil) {
        // Verificar estado civil
        if (!estadoCivil) {
            throw new Error("O campo de estado civil não pode estar vazio.");
        }
        // Lista de estados civis válidos
        const estadosCivisValidos = ["solteiro", "casado", "divorciado", "viúvo"];
        // Converter o estado civil fornecido para minúsculas
        estadoCivil = estadoCivil.toLowerCase();
        // Verificar se o estado civil fornecido é válido
        if (estadosCivisValidos.includes(estadoCivil)) {
            return estadoCivil;
        } else {
            throw new Error("O estado civil fornecido não é válido.");
        }
    }

    validarNomeConjude(nomeConjude, estadoCivil) {
        // Se o estado civil for "casado", o campo de nome do cônjuge não pode estar vazio
        if (estadoCivil === "casado" && !nomeConjude) {
            throw new Error("O campo do nome do cônjuge não pode estar vazio quando o estado civil é 'casado'.");
        }
        // Se o estado civil for "solteiro", "divorciado" ou "viúvo", o campo de nome do cônjuge deve estar vazio
        if (["solteiro", "divorciado", "viúvo"].includes(estadoCivil) && nomeConjude) {
            throw new Error("O campo do nome do cônjuge deve estar vazio quando o estado civil é 'solteiro', 'divorciado' ou 'viúvo'.");
        }
        return nomeConjude;
    }

    validarIdade(idade) {
        const idadeNumber = /^\d{1,3}$/;
        if (!idadeNumber.test(idade)) {
            throw new Error("O campo de Idade fornecido não é válido. Deve conter até 3 dígitos.");
        }
        const idadeNumero = parseInt(idade);
        if (idadeNumero < 18 || idadeNumero > 80) {
            throw new Error("A idade fornecida está fora do intervalo permitido (18 a 80 anos).");
        }
        return idade;
    }
// Verificar data de nascimento
    validarDataNascimento(dataNascimento) {
        const dataNacNumber = /^\d{8}$/;
        if (!dataNacNumber.test(dataNascimento)) {
            throw new Error("O campo de Data de Nascimento fornecido não é válido. Deve conter exatamente 8 dígitos.");
        }
        return dataNascimento;
    }
}

module.exports = cliente;
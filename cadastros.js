const cliente = require("./cliente");

class cadastros {
    constructor() {
        this.clientes = [];
    }


    //metodos adicionar cliente

    adicionaClientes(cliente) {
        this.clientes.push(cliente);

    }

    // Método para visualizar clientes cadastrados
    visualizarClienteCadastrado() {
        console.log("Clientes cadastrados:");
        this.clientes.forEach(cliente => {
            console.log(cliente.nome);
        });
    }

    //metodo de verificação se o usuario foi cadastrado
    finalizarCadastro() {
        if (this.clientes.length === 0) {
            throw new Error('Não foi possível finalizar o cadastro, pois não há clientes cadastrados.');
        } else {
            for (let cliente of this.clientes) {
                const camposFaltando = [];
                if (!cliente.nome) {
                    camposFaltando.push('Faltando preenche o campo Nome!')
                }
                if (!cliente.dataNascimento) {
                    camposFaltando.push('Está faltando preencher o campo Data de Nascimento!')
                }
                if (!cliente.genero) {
                    camposFaltando.push('Está faltando preenche o campo Gênero!')
                }
                if (!cliente.idade) {
                    camposFaltando.push('Está faltando preenche o campo Idade!')
                }
                if (!cliente.endereco) {
                    camposFaltando.push('Está faltando preenche o campo Endereço!')
                }
                if (!cliente.telefone) {
                    camposFaltando.push('Está faltando preenche o campo Telefone!')
                }

                function validarCPF(cpf) {
                    cpf = cpf.replace(/[^\d]/g, ''); // Remove caracteres não numéricos

                    if (
                        cpf.length !== 11 ||
                        cpf === "00000000000" ||
                        cpf === "11111111111" ||
                        cpf === "22222222222" ||
                        cpf === "33333333333" ||
                        cpf === "44444444444" ||
                        cpf === "55555555555" ||
                        cpf === "66666666666" ||
                        cpf === "77777777777" ||
                        cpf === "88888888888" ||
                        cpf === "99999999999"
                    ) {
                        return false;
                    }

                    let soma = 0;
                    for (let i = 0; i < 9; i++) {
                        soma += parseInt(cpf.charAt(i)) * (10 - i);
                    }

                    let resto = 11 - (soma % 11);
                    if (resto === 10 || resto === 11) {
                        resto = 0;
                    }

                    if (resto !== parseInt(cpf.charAt(9))) {
                        return false;
                    }

                    soma = 0;
                    for (let i = 0; i < 10; i++) {
                        soma += parseInt(cpf.charAt(i)) * (11 - i);
                    }

                    resto = 11 - (soma % 11);
                    if (resto === 10 || resto === 11) {
                        resto = 0;
                    }

                    if (resto !== parseInt(cpf.charAt(10))) {
                        return false;
                    }

                    return true;
                }

                // Verificar se o CPF do cliente está preenchido e válido
                if (!cliente.cpf) {
                    camposFaltando.push('Está faltando preencher o campo CPF!');
                } else {
                    if (!validarCPF(cliente.cpf)) {
                        camposFaltando.push('CPF inválido, por favor verificar!');
                    }
                }

                //lembra de cria veficador de e-mail e cnh os que falta para fazer teste para nosso codigo!

                if (!cliente.email) {
                    camposFaltando.push('Está faltando preenche o campo E-mail!')
                }
                if (!cliente.carteiraMotorista) {
                    camposFaltando.push('Está faltando preenche o campo Carteira de Motorista!')
                }
                if (!cliente.emissaoCNH) {
                    camposFaltando.push('Está faltando preenche o campo Emissão do CNH!')
                }
                if (!cliente.validadeCNH) {
                    camposFaltando.push('Está faltando preenche o campo Válidade do CNH!')
                }
                if (!cliente.nacionalidade) {
                    camposFaltando.push('Está faltando preenche o campo Nacíonalidade!')
                }
                if (!cliente.estadoCivil) {
                    camposFaltando.push('Está faltando preencher o campo Estado Civil');
                } else if (
                    cliente.estadoCivil.toLowerCase() !== 'solteiro' &&
                    cliente.estadoCivil.toLowerCase() !== 'solteira' &&
                    cliente.estadoCivil.toLowerCase() !== 'viúvo' &&
                    cliente.estadoCivil.toLowerCase() !== 'viúva' &&
                    cliente.estadoCivil.toLowerCase() !== 'casado' &&
                    cliente.estadoCivil.toLowerCase() !== 'casada' &&
                    cliente.estadoCivil.toLowerCase() !== 'divorciado' &&
                    cliente.estadoCivil.toLowerCase() !== 'divorciada'
                ) {
                    camposFaltando.push('Estado Civil inválido');
                } else if (
                    (cliente.estadoCivil.toLowerCase() === 'casado' || cliente.estadoCivil.toLowerCase() === 'casada') &&
                    !cliente.nomeConjude
                ) {
                    camposFaltando.push('Está faltando preencher o campo Nome do Cônjuge');
                }

                if (camposFaltando.length === 0) {
                    console.log('Cadastro confirmado!');
                } else {
                    console.log('Cadastro não pode ser confirmado devido aos seguintes erros:');
                    camposFaltando.forEach((campo) => {
                        console.log(campo);
                    });
                }
                if (camposFaltando.length > 0) {
                    throw new Error(`Ocorreu os seguintes erro campos são Obrigatório para o cliente ${cliente.nome}: ${camposFaltando.join(', ')}.`);
                }
            }
            console.log('Cadastro finalizado com sucessor!')
        }
    }
}

module.exports = cadastros;
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

                if (!cliente.idade) {
                    camposFaltando.push('Está faltando preenche o campo Idade!')
                }
                if (!cliente.endereco) {
                    camposFaltando.push('Está faltando preenche o campo Endereço!')
                }
                if (!cliente.telefone) {
                    camposFaltando.push('Está faltando preenche o campo Telefone!')
                } else {

                    const telefone = cliente.telefone;
                    //Criando variavel onde nao receber variaveis que não seija numeros
                    const telefoneFormantado = telefone.replace(/\D/g, '');

                    if (telefoneFormantado.length !== telefone.length) {
                        camposFaltando.push('O campo Telefone contém caracteres inválidos!');
                    } if (
                        telefoneFormantado.length !== 11 ||
                        telefoneFormantado === "00000000000" ||
                        telefoneFormantado === "11111111111" ||
                        telefoneFormantado === "22222222222" ||
                        telefoneFormantado === "33333333333" ||
                        telefoneFormantado === "44444444444" ||
                        telefoneFormantado === "55555555555" ||
                        telefoneFormantado === "66666666666" ||
                        telefoneFormantado === "77777777777" ||
                        telefoneFormantado === "88888888888" ||
                        telefoneFormantado === "99999999999"
                    ) {
                        camposFaltando.push('O número de telefone deve conter exatamente 11 dígitos!');
                    } else {
                        console.log("Confirmado número de Telefone!")
                    }
                }


                //lembra de cria veficador de e-mail e cnh os que falta para fazer teste para nosso codigo!

                if (!cliente.email) {
                    camposFaltando.push('Está faltando preenche o campo E-mail!')
                }
                if (!cliente.carteiraMotorista) {
                    camposFaltando.push('Está faltando preenche o campo Carteira de Motorista!')
                }

                if (!cliente.nacionalidade) {
                    camposFaltando.push('Está faltando preenche o campo Nacíonalidade!')
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
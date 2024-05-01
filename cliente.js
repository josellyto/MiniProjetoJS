class Cliente {
    constructor(nome, cpf, telefone, endereco) {
      this.nome = this._validarNome(nome);
      this.cpf = this._validarCPF(cpf);
      this.telefone = this._validarTelefone(telefone);
      this.endereco = this._validarEndereco(endereco);
    }
  
    _validarNome(nome) {
      if (!nome || typeof nome !== 'string') {
        throw new Error('Nome é obrigatório e deve ser uma preenchido');
      }
      return nome.trim();
    }
  
    _validarCPF(cpf) {
      if (!cpf || typeof cpf !== 'string') {
        throw new Error('CPF é obrigatório e deve ser uma string');
      }
      const cpfRegex = /^\d{11}$/;
      if (!cpfRegex.test(cpf)) {
        throw new Error('CPF inválido');
      }
      return cpf;
    }

    _validarTelefone(telefone){
      // Remover todos os caracteres que não são dígitos
    const numeroLimpo = telefone.replace(/\D/g, '');

    // Verificar se o número tem o tamanho correto
    if (numeroLimpo.length !== 11) { // Aqui, consideramos um número com código de área (DD) e 9 dígitos
        throw new Error('Numero de telefone não foi inserido ou invalido, digite novamente!  ');
    }

    // Se passou pela validação, retorna verdadeiro
    return true;
}
    _validarEndereco(endereco) {
      if (!endereco || typeof endereco !== 'string') {
        throw new Error('Endereço é obrigatório e deve ser preenchido');
      }
      return endereco.trim();
    }
  
    obterNome() {
      return this.nome;
    }
  
    obterCPF() {
      return this.cpf;
    }

    obterTelefone(){
      return this.telefone;
    }
  
    obterEndereco() {
      return this.endereco;
    }
  
    atualizarEndereco(novoEndereco) {
      this.endereco = this._validarEndereco(novoEndereco);
    }
  }
  
  module.exports = Cliente;

  //const Cliente1 = new Cliente('rafael','12945625492','77998609981','asdasdafrga')
  //console.log(Cliente1.obterNome())
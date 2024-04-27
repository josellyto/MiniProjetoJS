class Cliente {
    constructor(nome, cpf, endereco) {
      this.nome = this._validarNome(nome);
      this.cpf = this._validarCPF(cpf);
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
  
    obterEndereco() {
      return this.endereco;
    }
  
    atualizarEndereco(novoEndereco) {
      this.endereco = this._validarEndereco(novoEndereco);
    }
  }
  
  module.exports = Cliente;
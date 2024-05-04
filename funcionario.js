class funcionario {
    constructor(nome, sobrenome, cargo, departamento) {
        this._nome = this._validarNome(nome);
        this._sobrenome = this._validarSobrenome(sobrenome);
        this._cargo = this._validarCargo(cargo);
        this._departamento = this._validarDepartamento(departamento);
        this._NumeberID = funcionario._NumeberID++;
    }

    static _NumeberID = 0;// Váriavel estática para rastrear ID
    

    _validarNome(nome) {
        if (!nome || typeof nome !== 'string') {
            throw new Error('Nome é obrigatório e deve ser uma preenchido!');
        }
        return nome.trim();
    }
    _validarSobrenome(sobrenome) {
        if (!sobrenome || typeof sobrenome !== 'string') {
            throw new Error('Sobrenome é obrigatorio e deve ser preenchido!')
        }
        return sobrenome.trim()
    }
    _validarCargo(cargo) {
        if (!cargo || typeof cargo !== 'string') {
            throw new Error('Cargo é obrigatorio e deve ser preenchido!')
        }
        return cargo.trim()
    }
    _validarDepartamento(departamento) {
        if (!departamento || typeof departamento !== 'string') {
            throw new Error('Departamento é obrigatorio e deve ser preenchido!')
        }
        return departamento.trim()
    }
    obterNome() {
        return this._nome;
    }
    obterSobrenome() {
        return this._sobrenome;
    }
    obterCargo() {
        return this._cargo;
    }
    obterDepartamento() {
        return this._departamento;
    }

    obterNumeberID() {
        return this._NumeberID;
    }

}
module.exports = funcionario;

//const funcionario2 = new funcionario('Rafael','Matos','estoque','TI');
//console.log(funcionario);
class Carro{
    constructor( id, marca, modelo, ano, preco, cor, placa){

        this.id = id;
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
        this.preco = preco;
        this.cor = cor;
        this.placa = placa;

    }

    // Vai retornar o Carro
    static retornaVeiculo(carro) {
        return {
            id: carro.id,
            marca: carro.marca,
            modelo: carro.modelo,
            ano: carro.ano,
            preco: carro.preco,
            cor: carro.cor,
            placa: carro.placa

        }
}


// vai cadastrar o Carro
static cadastrarVeiculo(carro, data){
    const newVeiculo = new Carro(carro.length+1, data.marca, data.modelo, data.ano, data.preco,
        data.cor, data.placa);
        carro.push(newVeiculo);
        return this.retornaVeiculo(newVeiculo);
}

// Vai listar todos os carros
static listarTodosVeiculos(carro){
    return carro.map((carro) => this.retornaVeiculo(carro));

}

static encontraIdCarro(carro, id){
    return carro.find((carro) => carro.id == id);
}

// Vai atualizar/modificar o cadastro do carro
static atualizarVeiculo(carro, id, data){
    const buscarVeiculo = this.encontraIdCarro(carro, id)
    if(buscarVeiculo && data){
        buscarVeiculo.marca = data.marca || buscarVeiculo.marca;
        buscarVeiculo.modelo = data.modelo || buscarVeiculo.modelo;
        buscarVeiculo.ano = data.ano || buscarVeiculo.ano;
        buscarVeiculo.preco = data.preco || buscarVeiculo.preco;
        buscarVeiculo.cor = data.cor || buscarVeiculo.cor;
        buscarVeiculo.placa = data.placa || buscarVeiculo.placa;
    }
    return buscarVeiculo;
 }

 // Vai deletar/apagar o cadastro do Carro
 static deletarVeiculo(carro, id){
    const buscarVeiculo = this.encontraIdCarro(carro, id);
    if(buscarVeiculo){
        const index = carro.indexOf(buscarVeiculo);
        carro.splice(index, 1);
        return true;
    }
    return false;
 }


}

module.exports = Carro ;
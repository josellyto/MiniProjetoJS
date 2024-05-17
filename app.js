const express = require('express');
const Clientes = require('./classe/cliente');
const carro = require('./classe/carro');
const venda = require('./classe/venda')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send("Hello word")
});

// CLIENTES :

let clientes = [];

// vai cadastrar um cliente
app.post('/cliente', (req, res) => {
    const clienteN = Clientes.addCliente(clientes, req.body);
    res.status(201).json(Clientes.retornaCliente(clienteN))
})

// vai listar todos os clientes
app.get('/cliente', (req, res) => {
    const listaDeCliente = Clientes.listarTodosClientes(clientes);
    res.json(listaDeCliente);

})

// vai atualizar cadastro de Cliente
app.put('/cliente/:id', (req, res) => {

    const idCliente = parseInt(req.params.id);
    const dataCliente = req.body;

    const clienteAtualizado = Clientes.atualizarCliente(clientes, idCliente, dataCliente);

    if (clienteAtualizado) {
        res.json(Clientes.retornaCliente(clienteAtualizado));
    } else {
        res.status(404).send('Cliente não encontrado!');
    }
});

// vai deletar o cadastro do cliente.
app.delete('/cliente/:id', (req, res) => {
    const deletar = Clientes.deletarCliente(clientes, parseInt(req.params.id));
    if (deletar) {
        res.status(204).send("Cliente deletado com sucesso!")
    } else {
        res.status(404).send("Não foi possivel deletar Cliente!")
    }
})

// CARROS:

let carrosN = [];

// vai cadastrar um Veiculo
app.post('/carro', (req, res) => {
    const carross = carro.cadastrarVeiculo(carrosN, req.body);
    res.status(201).json(carro.retornaVeiculo(carross))
})

// vai listar todos os veiculos
app.get('/carro', (req, res) => {
    const listaDeCarro = carro.listarTodosVeiculos(carrosN);
    res.json(listaDeCarro);
})

// vai atualizar cadastro do carro:
app.put('/carro/:id', (req, res) => {
    const idCarro = parseInt(req.params.id);
    const dataCarro = req.body;
    const carroAtualizado = carro.atualizarVeiculo(carrosN, idCarro, dataCarro);
    if (carroAtualizado) {
        res.json(carro.retornaVeiculo(carroAtualizado));
    } else {
        res.status(404).send('Veiculo não encontrado!');
    }
})

// vai deletar o cadastro do carro;
app.delete('/carro/:id', (req, res) => {
    const deletar = carro.deletarVeiculo(carrosN, parseInt(req.params.id));
    if (deletar) {
        res.status(204).send("Veiculo deletado com sucesso!")
    } else {
        res.status(404).send("Não foi possivel deletar Veiculo!")
    }
})

// Venda
let vendas = [];

app.post('/venda', (req, res) => {
    const { clienteId, veiculoIds } = req.body;

    // Verifica se o cliente existe
    const cliente = clientes.find(cliente => cliente.id === clienteId);
    if (!cliente) {
        return res.status(404).send('Cliente não encontrado');
    }

    // Calcula o valor total somando os preços dos veículos
    let valorTotal = 0;
    const veiculosVenda = [];

    for (const veiculoId of veiculoIds) {
        const veiculo = carrosN.find(veiculo => veiculo.id === veiculoId);
        if (!veiculo) {
            return res.status(404).send(`Veículo com ID ${veiculoId} não encontrado`);
        }
        valorTotal += veiculo.preco; // Adiciona o preço do veículo ao valor total
        veiculosVenda.push(veiculo);
    }

    // Gerar o ID da venda utilizando timestamp atual
    const vendaId = Date.now();

    // Aqui você pode continuar com o processamento da venda
    // ...


    // Cria a venda
    const novaVenda = {
        cliente,
        veiculos: veiculosVenda,
        valorTotal

    };
    // Endpoint para atualizar uma venda
    app.put('/venda/:id', (req, res) => {
        const { id } = req.params;
        const { clienteId, veiculoIds } = req.body;

        try {
            const vendaAtualizada = Venda.atualizarVenda(vendas, parseInt(id), { clienteId, veiculoIds }, carros, clientes);
            res.json({ message: 'Venda atualizada com sucesso', venda: Venda.retornaVenda(vendaAtualizada) });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });

    res.status(201).json(novaVenda);
});


app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})

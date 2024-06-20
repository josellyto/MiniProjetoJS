import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import { openDb } from '../configDB.js'; // Importa a função openDb do módulo configDB.js
import {
    createTableVenda,
    inserirVenda,
    buscarVendaPorId,
    updateVenda,
    buscarVendas,
    deletarVenda
} from '../controllers/vendaController.js'; // Importa as funções do controller de venda

const app = express();
app.use(bodyParser.json());

// Rotas da API para Venda
app.post('/InserirVenda', inserirVenda);
app.post('/BuscarVendaID', buscarVendaPorId);
app.put('/AtualizarVenda', updateVenda);
app.get('/BuscarVendas', buscarVendas);
app.delete('/DeletarVenda', deletarVenda);

beforeAll(async () => {
    await createTableVenda(); // Cria a tabela de venda antes de todos os testes
});

afterEach(async () => {
    const db = await openDb();
    await db.run('DELETE FROM Venda'); // Limpa a tabela de venda após cada teste
});

afterAll(async () => {
    const db = await openDb();
    await db.exec('DROP TABLE Venda'); // Remove a tabela de venda após todos os testes
    await db.close(); // Fecha a conexão com o banco de dados
});

describe('Venda Controller', () => {
    test('inserirVenda deve inserir uma nova venda', async () => {
        const novaVenda = {
            cliente_cpf: '456.234.430-01',
            veiculo_placa: 'JDK7588',
            forma_de_pagamento: 'cartao'
        };

        const response = await request(app)
            .post('/InserirVenda')
            .send(novaVenda);

        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe("Venda inserida com sucesso.");
    });

    test('buscarVendaPorId deve retornar os detalhes da venda', async () => {
        const novaVenda = {
            cliente_cpf: '456.234.430-01',
            veiculo_placa: 'JDK7588',
            forma_de_pagamento: 'cartao'
        };

        const insertResponse = await request(app)
            .post('/InserirVenda')
            .send(novaVenda);

        const vendaId = insertResponse.body.vendaId;

        const response = await request(app)
            .post('/BuscarVendaID')
            .send({ id: vendaId });

        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(vendaId);
        expect(response.body.cliente_cpf).toBe('456.234.430-01');
    });

    test('updateVenda deve atualizar os detalhes da venda', async () => {
        const novaVenda = {
            cliente_cpf: '456.234.430-01',
            veiculo_placa: 'JDK7588',
            forma_de_pagamento: 'cartao'
        };

        const insertResponse = await request(app)
            .post('/InserirVenda')
            .send(novaVenda);

        const vendaId = insertResponse.body.vendaId;

        const updateData = {
            id: vendaId,
            forma_de_pagamento: 'pix'
        };

        const response = await request(app)
            .put('/AtualizarVenda')
            .send(updateData);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Venda atualizada com sucesso.");
    });

    test('buscarVendas deve retornar uma lista de vendas', async () => {
        const novaVenda1 = {
            cliente_cpf: '456.234.430-01',
            veiculo_placa: 'JDK7588',
            forma_de_pagamento: 'cartao'
        };

        const novaVenda2 = {
            cliente_cpf: '519.269.260-13',
            veiculo_placa: 'DEF5678',
            forma_de_pagamento: 'dinheiro'
        };

        await request(app)
            .post('/InserirVenda')
            .send(novaVenda1);

        await request(app)
            .post('/InserirVenda')
            .send(novaVenda2);

        const response = await request(app)
            .get('/BuscarVendas');

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThanOrEqual(2); // Pelo menos 2 vendas devem ser retornadas
    });

    test('deletarVenda deve deletar uma venda e atualizar o status do veículo', async () => {
        const novaVenda = {
            cliente_cpf: '519.269.260-13',
            veiculo_placa: 'JDK7588',
            forma_de_pagamento: 'cartao'
        };

        const insertResponse = await request(app)
            .post('/InserirVenda')
            .send(novaVenda);

        const vendaId = insertResponse.body.vendaId;

        const response = await request(app)
            .delete('/DeletarVenda')
            .send({ id: vendaId });

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Venda excluída com sucesso e status do veículo atualizado para disponível.");
    });
});

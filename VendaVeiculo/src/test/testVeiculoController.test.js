import request from 'supertest';
import { openDb } from '../configDB.js';
import express from 'express';
import bodyParser from 'body-parser';
import { createTabelaVeiculo, buscarVeiculos, buscarVeiculoID, insertVeiculo, updateVeiculo, deleteVeiculo } from '../controllers/veiculoController.js';
import { Veiculo } from '../model/veiculoModel.js';

const app = express();
app.use(bodyParser.json());

app.get('/BuscarVeiculos', buscarVeiculos);
app.get('/BuscarVeiculo', buscarVeiculoID);
app.post('/InserirVeiculo', insertVeiculo);
app.put('/AtualizarVeiculo', updateVeiculo);
app.delete('/DeletarVeiculo', deleteVeiculo);

beforeAll(async () => {
    await createTabelaVeiculo();
});

describe('Veiculo Controller', () => {
    it('Deve inserir o veiculo ', async () => {
        const response = await request(app)
            .post('/InserirVeiculo')
            .send({
                marca: 'Toyota',
                modelo: 'Corolla',
                ano: 2020,
                cor: 'Prata',
                placa: 'JDK7588',
                valor: 50000
            });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Veículo inserido com sucesso.');
    });

    it('Deve volta todos veiculos', async () => {
        const response = await request(app).get('/BuscarVeiculos');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('Deve mosta veiculo por placa', async () => {
        const response = await request(app)
            .get('/BuscarVeiculo')
            .send({ placa: 'JDK7588' });

        expect(response.status).toBe(200);
        expect(response.body.placa).toBe('JDK7588');
    });

    it('Deve atualizar o veiculo', async () => {
        const response = await request(app)
            .put('/AtualizarVeiculo')
            .send({
                marca: 'Toyota',
                modelo: 'Corolla',
                ano: 2021,
                cor: 'Branco',
                placa: 'JDK7588',
                valor: 55000
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Veículo atualizado com sucesso.');
    });

    it('Deve deletar o veiculo por placa', async () => {
        const response = await request(app)
            .delete('/DeletarVeiculo')
            .send({ placa: 'JDK7588' });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Veículo excluído com sucesso.');
    });

    it('Deve retornar um erro 404 onde o veículo não foi encontrado', async () => {
        const response = await request(app)
            .get('/BuscarVeiculo')
            .send({ placa: 'XYZ9999' });

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Veículo não encontrado.');
    });
});

afterAll(async () => {
    const db = await openDb();
    await db.exec('DROP TABLE IF EXISTS Veiculo');
});

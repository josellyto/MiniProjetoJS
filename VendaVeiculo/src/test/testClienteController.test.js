import request from 'supertest';
import express from 'express';
import { openDb } from '../configDB'; // Utilize o mapeamento @ para importar o configDB.js
import {
    createTableCliente,
    buscarClientes,
    buscarClienteCPF,
    insertCliente,
    updateCliente,
    deleteCliente
} from '../controllers/clienteController'; // Utilize o mapeamento @ para importar o clienteController.js

const app = express();
app.use(express.json());

// Define suas rotas aqui, da mesma forma que você fez no clienteController.js

// Exemplo de rota para criar cliente
app.post('/CriarCliente', insertCliente);

// Exemplo de rota para buscar clientes
app.get('/BuscarClientes', buscarClientes);

// Exemplo de rota para buscar cliente por CPF
app.get('/BuscarCliente', buscarClienteCPF);

// Exemplo de rota para atualizar cliente
app.put('/AtualizarCliente', updateCliente);

// Exemplo de rota para deletar cliente
app.delete('/DeletarCliente', deleteCliente);

describe('Cliente Controller', () => {
    let db;

    beforeAll(async () => {
        db = await openDb();
        await createTableCliente();
    });

    beforeEach(async () => {
        await db.run('DELETE FROM Cliente');
    });

    afterAll(async () => {
        await db.close();
    });

    test('Deve criar um novo cliente', async () => {
        const newCliente = {
            nome: 'João',
            sobrenome: 'Silva',
            idade: 30,
            cpf: '456.234.430-01',
            telefone: '24 3424-6329',
            email: 'joao@exemplo.com'
        };

        const response = await request(app).post('/CriarCliente').send(newCliente);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Cliente criado com sucesso!');
    });

    test('Deve retornar erro ao criar cliente com CPF duplicado', async () => {
        const newCliente = {
            nome: 'João',
            sobrenome: 'Silva',
            idade: 30,
            cpf: '456.234.430-01',
            telefone: '24 3424-6329',
            email: 'joao@exemplo.com'
        };

        await request(app).post('/CriarCliente').send(newCliente);
        const response = await request(app).post('/CriarCliente').send(newCliente);
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Já existe um cliente com este CPF.');
    });

    test('Deve buscar todos os clientes', async () => {
        const cliente1 = {
            nome: 'João',
            sobrenome: 'Silva',
            idade: 30,
            cpf: '456.234.430-01',
            telefone: '24 3424-6329',
            email: 'joao@exemplo.com'
        };

        const cliente2 = {
            nome: 'Maria',
            sobrenome: 'Oliveira',
            idade: 25,
            cpf: '797.355.170-00',
            telefone: '888888888',
            email: 'maria@exemplo.com'
        };

        // Criar clientes no banco antes de buscar
        await request(app).post('/CriarCliente').send(cliente1);
        await request(app).post('/CriarCliente').send(cliente2);

        // Buscar clientes
        const response = await request(app).get('/BuscarClientes');

        // Verificar se a resposta está correta
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(2);

        // Verificar se os clientes retornados correspondem aos criados
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining(cliente1),
                expect.objectContaining(cliente2)
            ])
        );
    });

    test('Deve buscar cliente por CPF', async () => {
        const newCliente = {
            nome: 'João',
            sobrenome: 'Silva',
            idade: 30,
            cpf: '456.234.430-01',
            telefone: '999999999',
            email: 'joao@exemplo.com'
        };

        await request(app).post('/CriarCliente').send(newCliente);
        const response = await request(app).get('/BuscarCliente').send({ cpf: '456.234.430-01' });
        expect(response.statusCode).toBe(200);
        expect(response.body.nome).toBe('João');
    });

    test('Deve retornar erro ao buscar cliente com CPF não existente', async () => {
        const response = await request(app).get('/BuscarCliente').send({ cpf: '12345678901' });
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('Cliente não encontrado.');
    });

    test('Deve atualizar um cliente existente', async () => {
        const newCliente = {
            nome: 'João',
            sobrenome: 'Silva',
            idade: 30,
            cpf: '456.234.430-01',
            telefone: '999999999',
            email: 'joao@exemplo.com'
        };

        await request(app).post('/CriarCliente').send(newCliente);

        const updatedCliente = {
            nome: 'João',
            sobrenome: 'Souza',
            idade: 31,
            cpf: '456.234.430-01',
            telefone: '999999998',
            email: 'joao@novoexemplo.com'
        };

        const response = await request(app).put('/AtualizarCliente').send(updatedCliente);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Cliente atualizado com sucesso!');
    });

    test('Deve deletar um cliente existente', async () => {
        const newCliente = {
            nome: 'João',
            sobrenome: 'Silva',
            idade: 30,
            cpf: '456.234.430-01',
            telefone: '999999999',
            email: 'joao@exemplo.com'
        };

        await request(app).post('/CriarCliente').send(newCliente);

        const response = await request(app).delete('/DeletarCliente').send({ cpf: '456.234.430-01' });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Cliente deletado com sucesso!');
    });

    test('Deve retornar erro ao deletar cliente com CPF não existente', async () => {
        const response = await request(app).delete('/DeletarCliente').send({ cpf: '797.355.170-00' });
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('Cliente não encontrado.');
    });
});
import { openDb } from "../configDB.js";

// Função para criar a tabela Venda no banco de dados
export async function createTableVenda() {
    try {
        const db = await openDb();
        await db.exec(`
            CREATE TABLE IF NOT EXISTS Venda (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                cliente_cpf TEXT NOT NULL,
                veiculo_placa TEXT NOT NULL,
                forma_de_pagamento TEXT NOT NULL,
                data_venda TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                valor_total DECIMAL(10, 2) NOT NULL,
                FOREIGN KEY (cliente_cpf) REFERENCES Users(cpf),
                FOREIGN KEY (veiculo_placa) REFERENCES Veiculo(placa)
            ); 
        `);
    } catch (err) {
        console.error("Erro ao criar tabela Venda: ", err);
    }
}

// Função para buscar todas as vendas no banco de dados
export async function buscarVendas(req, res) {
    try {
        const db = await openDb();
        const vendas = await db.all('SELECT * FROM Venda');
        res.json(vendas);
    } catch (error) {
        console.error("Erro ao buscar todas as vendas:", error);
        res.status(500).json({
            statusCode: 500,
            message: "Erro ao buscar todas as vendas."
        });
    }
}

// Função para buscar uma venda por ID no banco de dados
export async function buscarVendaID(req, res) {
    let id = req.body.id;

    try {
        const db = await openDb();
        const venda = await db.get('SELECT * FROM Venda WHERE id = ?', [id]);

        if (venda) {
            res.json(venda); // Retorna a venda encontrada
        } else {
            res.status(404).json({
                statusCode: 404,
                message: "Venda não encontrada."
            });
        }
    } catch (error) {
        console.error("Erro ao buscar venda por ID:", error);
        res.status(500).json({
            statusCode: 500,
            message: "Erro ao buscar venda por ID."
        });
    }
}

// Função para inserir uma venda no banco de dados

export async function inserirVenda(req, res) {
    const { cliente_cpf, veiculo_placa, forma_de_pagamento, valor_total } = req.body;

    try {
        const db = await openDb();
        const result = await db.run(`
            INSERT INTO Venda (cliente_cpf, veiculo_placa, forma_de_pagamento, valor_total)
            VALUES (?, ?, ?, ?);
        `, [cliente_cpf, veiculo_placa, forma_de_pagamento, valor_total]);

        res.status(201).json({
            statusCode: 201,
            message: "Venda inserida com sucesso.",
            vendaId: result.lastID  // ID da venda inserida
        });
    } catch (error) {
        console.error("Erro ao inserir venda:", error);
        res.status(500).json({
            statusCode: 500,
            message: "Erro ao inserir venda."
        });
    }
}

// Delete Venda do data base

export async function deletarVenda(req, res) {
    const id = req.body.id; // Obtem o ID da venda a partir do corpo da requisição

    try {
        const db = await openDb();

        // Inicia uma transação
        await db.exec('BEGIN TRANSACTION');

        // Primeiro, obtemos a placa do veículo relacionado à venda
        const venda = await db.get('SELECT veiculo_placa FROM Venda WHERE id = ?', [id]);

        if (!venda) {
            await db.exec('ROLLBACK'); // Reverte a transação em caso de erro
            return res.status(404).json({
                statusCode: 404,
                message: "Venda não encontrada."
            });
        }

        // Deletar a venda da tabela Venda
        const result = await db.run('DELETE FROM Venda WHERE id = ?', [id]);

        if (result.changes === 0) {
            await db.exec('ROLLBACK'); // Reverte a transação em caso de erro
            return res.status(404).json({
                statusCode: 404,
                message: "Venda não encontrada ou já foi deletada."
            });
        }

        // Atualizar o status do veículo para "disponível"
        await db.run('UPDATE Veiculo SET status = "disponível" WHERE placa = ?', [venda.veiculo_placa]);

        // Confirma a transação
        await db.exec('COMMIT');

        res.status(200).json({
            statusCode: 200,
            message: "Venda excluída com sucesso e status do veículo atualizado para disponível."
        });
    } catch (error) {
        await db.exec('ROLLBACK'); // Reverte a transação em caso de erro
        console.error("Erro ao deletar venda:", error);
        res.status(500).json({
            statusCode: 500,
            message: "Erro ao deletar venda."
        });
    }
}
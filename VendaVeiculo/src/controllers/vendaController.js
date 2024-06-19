import { openDb } from '../configDB.js';

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
                FOREIGN KEY (cliente_cpf) REFERENCES Cliente(cpf),
                FOREIGN KEY (veiculo_placa) REFERENCES Veiculo(placa)
            ); 
        `);
    } catch (err) {
        console.error("Erro ao criar tabela Venda: ", err);
    }
}

//Busca Venda por ID data base
export async function buscarVendaPorId(req, res) {
    const id = req.body.id; // Obtém o ID da venda a partir do corpo da requisição

    try {
        const db = await openDb();
        const venda = await db.get(`
            SELECT Venda.*, Cliente.nome AS nome_cliente, Veiculo.modelo AS modelo_veiculo
            FROM Venda
            JOIN Cliente ON Venda.cliente_cpf = Cliente.cpf
            JOIN Veiculo ON Venda.veiculo_placa = Veiculo.placa
            WHERE Venda.id = ?
        `, [id]);

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

//Inseria venda no banco de dados de VENDA

export async function inserirVenda(req, res) {
    const { cliente_cpf, veiculo_placa, forma_de_pagamento } = req.body;

    try {
        console.log('Dados da venda recebidos:', req.body);

        // Verificar se há dados inválidos ou faltando antes de prosseguir
        if (!cliente_cpf || !veiculo_placa || !forma_de_pagamento) {
            return res.status(400).json({
                statusCode: 400,
                message: "Dados da venda incompletos."
            });
        }

        // Buscar o cliente pelo CPF
        const cliente = await buscarClienteCPF(cliente_cpf);
        if (!cliente) {
            console.error('Cliente não encontrado:', cliente_cpf);
            return res.status(404).json({
                statusCode: 404,
                message: "Cliente não encontrado."
            });
        }

        // Verificar se o veículo existe no banco de dados e está disponível
        const veiculo = await buscarVeiculoPorPlaca(veiculo_placa);
        if (!veiculo) {
            console.error('Veículo não encontrado:', veiculo_placa);
            return res.status(404).json({
                statusCode: 404,
                message: "Veículo não encontrado."
            });
        }

        const veiculos = await buscarStatusVeiculoPlaca(veiculo_placa);
        if (!veiculos) {
            console.error('Veículo não encontrado:', veiculo_placa);
            return res.status(404).json({
                statusCode: 404,
                message: "Veículo não está disponível para venda."
            });
        }

        // Calcular o valor total da venda com base no valor do veículo
        const valor_total = veiculo.valor; // Supondo que veiculo.valor seja o valor unitário do veículo

        const db = await openDb();
        await db.run('BEGIN TRANSACTION;');

        // Inserir a venda na tabela Venda
        const resultVenda = await db.run(`
            INSERT INTO Venda (cliente_cpf, veiculo_placa, forma_de_pagamento, valor_total)
            VALUES (?, ?, ?, ?);
        `, [cliente_cpf, veiculo_placa, forma_de_pagamento, valor_total]);

        const vendaId = resultVenda.lastID;

        // Atualizar o status do veículo para indisponível
        await db.run(`
            UPDATE Veiculo SET status = 'indisponível' WHERE placa = ?;
        `, [veiculo_placa]);

        await db.run('COMMIT;');

        console.log('Venda inserida com sucesso e status do veículo atualizado.');

        res.status(201).json({
            statusCode: 201,
            message: "Venda inserida com sucesso.",
            vendaId: vendaId,
            valor_total: valor_total
        });
    } catch (error) {
        console.error("Erro ao inserir venda:", error);
        res.status(500).json({
            statusCode: 500,
            message: "Erro ao inserir venda."
        });
    }
}

//Updada dos dados do VENDA no data base

export async function updateVenda(req, res) {
    const vendaId = req.body.id; // Obtém o ID da venda a partir dos parâmetros da rota
    const { forma_de_pagamento } = req.body; // Obtém os dados a serem atualizados da requisição

    try {
        // Verifica se a forma de pagamento foi fornecida
        if (!forma_de_pagamento) {
            return res.status(400).json({
                statusCode: 400,
                message: "Dados de atualização da venda incompletos."
            });
        }

        const db = await openDb();
        await db.run('BEGIN TRANSACTION;');

        // Verifica se a venda existe antes de atualizar
        const vendaExistente = await db.get('SELECT * FROM Venda WHERE id = ?', [vendaId]);
        if (!vendaExistente) {
            await db.run('ROLLBACK;');
            return res.status(404).json({
                statusCode: 404,
                message: "Venda não encontrada."
            });
        }

        // Atualiza os dados da venda na tabela Venda
        await db.run(`
            UPDATE Venda SET forma_de_pagamento = ? WHERE id = ?;
        `, [forma_de_pagamento, vendaId]);

        await db.run('COMMIT;');

        res.status(200).json({
            statusCode: 200,
            message: "Venda atualizada com sucesso.",
            vendaId: vendaId
        });

    } catch (error) {
        console.error("Erro ao atualizar venda:", error);
        await db.run('ROLLBACK;');
        res.status(500).json({
            statusCode: 500,
            message: "Erro ao atualizar venda."
        });
    }
}


//Busca o CLIENTE no venda controller pelo cpf

async function buscarClienteCPF(cpf) {
    try {
        const db = await openDb();
        const cliente = await db.get('SELECT * FROM Cliente WHERE cpf = ?', [cpf]);
        console.log('Cliente encontrado:', cliente); // Adicionando log detalhado
        return cliente;
    } catch (error) {
        console.error("Erro ao buscar cliente por CPF:", error);
        return null;
    }
}

//Busca o Veiculos do veiculo controlle pela placa

async function buscarVeiculoPorPlaca(placa) {
    try {
        const db = await openDb();
        const veiculo = await db.get('SELECT * FROM Veiculo WHERE placa = ?', [placa]);

        if (!veiculo) {
            console.error('Veículo não encontrado:', placa);
            return null; // Retorna null se o veículo não for encontrado
        }

        console.log('Veículo encontrado:', veiculo);

        return veiculo; // Retorna o veículo se estiver encontrado e disponível
    } catch (error) {
        console.error("Erro ao buscar veículo por placa:", error);
        return null;
    }
}

//Buscar a venda do estutos do veiculos pela placa no veiculo controller

async function buscarStatusVeiculoPlaca(placa) {
    try {
        const db = await openDb();
        const veiculo = await db.get('SELECT * FROM Veiculo WHERE placa = ?', [placa]);

        if (!veiculo) {
            console.error('Veículo não encontrado:', placa);
            return null; // Retorna null se o veículo não for encontrado
        }

        console.log('Veículo encontrado:', veiculo);

        if (veiculo.status !== 'disponível') {
            console.error('Veículo não disponível para venda:', placa);
            return null; // Retorna null se o veículo não estiver disponível para venda
        }

        return veiculo; // Retorna o veículo se estiver encontrado e disponível
    } catch (error) {
        console.error("Erro ao buscar veículo por placa:", error);
        return null;
    }
}


//Busca todas as Vendas

export async function buscarVendas(req, res) {
    try {
        const db = await openDb();
        const vendas = await db.all('SELECT Venda.*, Cliente.nome AS nome_cliente, Veiculo.modelo AS modelo_veiculo FROM Venda JOIN Cliente ON Venda.cliente_cpf = Cliente.cpf JOIN Veiculo ON Venda.veiculo_placa = Veiculo.placa');
        res.json(vendas);
    } catch (error) {
        console.error("Erro ao buscar todas as vendas:", error);
        res.status(500).json({
            statusCode: 500,
            message: "Erro ao buscar todas as vendas."
        });
    }
}

//Deletar a Venda

export async function buscarVendaID(req, res) {
    let id = req.bory.id; // Obtém o ID da venda a partir dos parâmetros da rota

    try {
        const db = await openDb();
        const venda = await db.get('SELECT Venda.*, Cliente.nome AS nome_cliente, Veiculo.modelo AS modelo_veiculo FROM Venda JOIN Cliente ON Venda.cliente_cpf = Cliente.cpf JOIN Veiculo ON Venda.veiculo_placa = Veiculo.placa WHERE Venda.id = ?', [id]);

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
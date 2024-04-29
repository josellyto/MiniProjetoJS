// Import the 'pg' module's Client class and the Veiculos class from the 'veiculos' module
const { Client } = require('pg');
const Veiculos = require('../veiculos');

// Create a new Client instance with the provided connection details
const client = new Client({
    user: 'postgres',
    password: 'E53F',
    host: 'localhost',
    port: 5432,
    database: 'sellvehicles'
});

// Connect to the database using the client instance
client.connect();

/**
 * Query all vehicles from the database and print their information
 * using the Veiculos class to create instances and print details
 */
client.query('SELECT * FROM public.veiculos ORDER BY id ASC', (err, res) => {
    if (err) {
        console.log(err);
    } else {
        res.rows.forEach(row => {
            const veiculo = new Veiculos(row.modelo, row.ano, row.preco, row.quantidade);
            console.table('Veiculo criado:');
            veiculo.imprimirInformacoes(); // Print the vehicle information
        });
    }
    // Keep the connection open for further queries
});

/**
 * Create a new instance of the Veiculos class with the desired properties
 * and save it to the database
 */
const novoVeiculo = new Veiculos('', '', '', '', '');

client.query('INSERT INTO public.veiculos (modelo, ano, preco, quantidade) VALUES ($1, $2, $3, $4)', [novoVeiculo.obterModelo(), novoVeiculo.obterAno(), novoVeiculo.obterPreco(), novoVeiculo.obterQuantidade()], (err, res) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Veiculo salvo com sucesso!');
    }
    // Keep the connection open for further queries
});

/**
 * Delete a vehicle from the database using its ID
 */
const idVeiculoDelete = 1;
client.query(`DELETE FROM public.veiculos WHERE id = ${idVeiculoDelete}`, (err, res) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Veiculo deletado com sucesso!');
    }
    // Keep the connection open for further queries
});

/**
 * Search for a vehicle in the database using its model name
 */
client.query('SELECT * FROM public.veiculos WHERE modelo = $1', [], (err, res) => {
    if (err) {
        console.log(err);
    } else {
        res.rows.forEach(row => {
            const veiculo = new Veiculos(row.modelo, row.ano, row.preco, row.quantidade);
            console.table('Veiculo encontrado:');
            veiculo.imprimirInformacoes(); // Print the vehicle information
        });
    }
    // Keep the connection open for further queries
});

/**
 * Update a vehicle in the database using its ID and a new model name
 */
const idVeiculoupdate = 1;
const novoModelo = [];
client.query(`UPDATE public.veiculos SET modelo = $1 WHERE id = ${idVeiculoupdate}`, [novoModelo], (err, res) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Veiculo atualizado com sucesso!');
    }
    // End the connection after all queries have been executed
    client.end();
});
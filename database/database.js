const { gold } = require('color-name'); // Import the 'gold' color from the 'color-name' package
const { Client } = require('pg'); // Import the 'Client' class from the 'pg' package (PostgreSQL client)

const client = new Client({ // Create a new instance of the 'Client' class with the following configuration:
    user: 'postgres', // The PostgreSQL username
    password: 'E53F', // The PostgreSQL password
    host: 'localhost', // The host address of the PostgreSQL server
    port: 5432, // The port number of the PostgreSQL server
    database: 'sellvehicles', // The name of the database to connect to
    connectionTimeoutMillis: 5000, // The maximum time in milliseconds to wait for a connection to be established
    idleTimeoutMillis: 30000, // The maximum time in milliseconds that a client will remain idle in the connection pool
    max: 20 // The maximum number of clients the pool should contain
});


//getVeiculos(); // 
//insVeiculo("Gol",2010,10000,10);
deleteVeiculos("Gol");

/**
 * Query all vehicles from the database and print their information
 * using the Veiculos class to create instances and print details
 */
async function getVeiculos() {
    try {
        console.log("Iniciando a conexão.");
        await client.connect();
        console.log("Conexão bem-sucedida!");
        const resultado = await client.query(`SELECT id, modelo, ano, preco, quantidade FROM public.veiculos;`);
        console.table(resultado.rows);
    } catch (ex) {
        console.log("Ocorreu erro getVeiculos. Erro: " + ex.message);
    } finally {
        await client.end();
        console.log("Conexão encerrada");
    }
}

/**
 * Insert a new vehicle into the database
 * @param {string} modelo - The model of the vehicle
 * @param {number} ano - The year of the vehicle
 * @param {number} preco - The price of the vehicle
 * @param {number} quantidade - The quantity of the vehicle
 */
async function insVeiculo(modelo, ano, preco, quantidade) {
    try {
        console.log("Iniciando a conexão.");
        await client.connect();//Iniciar a conexao 
        console.log("Conexão bem-sucedida!");
        await client.query(`INSERT INTO public.veiculos(modelo, ano, preco, quantidade) VALUES ('${modelo}','${ano}','${preco}','${quantidade}');`);
        console.log("Valor inserido na tabela");
        const resultado = await client.query(`SELECT id, modelo, ano, preco, quantidade FROM public.veiculos;`);
        console.table(resultado.rows);
    } catch (ex) {
        console.log("Ocorreu erro insVeiculos. Erro: " + ex.message);
    } finally {
        await client.end();
        console.log("Conexão encerrada");
    }
}

/**
 * Delete a vehicle from the database
 * @param {string} modelo - The model of the vehicle to be deleted
 */
async function deleteVeiculos(modelo) {
    try {
        console.log("Iniciando a conexão.");
        await client.connect();//Iniciar a conexao 
        console.log("Conexão bem-sucedida!");
        await client.query("delete from veiculos where modelo = '" + modelo + "'; ");
        console.log("Valor removido na tabela");
        const resultado = await client.query(`SELECT id, modelo, ano, preco, quantidade FROM public.veiculos;`);
        console.table(resultado.rows);
    } catch (ex) {
        console.log("Ocorreu erro insVeiculos. Erro: " + ex.message);
    } finally {
        await client.end();
        console.log("Conexão encerrada");
    }
}
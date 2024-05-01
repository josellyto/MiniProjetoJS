const { cp } = require('graceful-fs');
const { Client } = require('pg');
const { id } = require('prelude-ls');

// Create a new instance of the 'Client' class with the following configuration:
const client = new Client({
    // The PostgreSQL username
    user: 'postgres',
    // The PostgreSQL password
    password: 'E53F',
    // The host address of the PostgreSQL server
    host: 'localhost',
    // The port number of the PostgreSQL server
    port: 5432,
    // The name of the database to connect to
    database: 'sellvehicles',
    // The maximum time in milliseconds to wait for a connection to be established
    connectionTimeoutMillis: 5000,
    // The maximum time in milliseconds that a client will remain idle in the connection pool
    idleTimeoutMillis: 30000,
    // The maximum number of clients the pool should contain
    max: 20
});



//getCliente();
//insCliente('César Dos Santos','25251515151','77981037688','Guanambi-BA, Albino Gonçalves Dantas N= 252');
//deleteCliente('06627715597');
//updateCliente('2', 'Cesar ', '06627715597', '77981037688', 'Guanambi-BA, Albino Gonçalves Dantas, Lagoinha, N= 252');

// Query all vehicles from the database and print their information
// using the Veiculos class to create instances and print details
async function getCliente() {
    try {
        console.log("Iniciando a conexão.");
        // Establish a connection to the PostgreSQL database
        await client.connect();
        console.log("Conexão bem-sucedida!");
        // Execute a SQL query to retrieve all clients from the 'cliente' table
        const resultado = await client.query(`SELECT id_cliente, nome, cpf, telefone, endereco
        FROM public.cliente;`);
        // Print the query results in a table format
        console.table(resultado.rows);
    } catch (ex) {
        console.log("Ocorreu erro getVeiculos. Erro: " + ex.message);
    } finally {
        // Close the database connection
        await client.end();
        console.log("Conexão encerrada");
    }
}


/**
 * Insert a new cliente into the database
 * @param {string} nome - The model of the cliente
 * @param {number} cpf - The year of the cliente
 * @param {number} telefone - The price of the cliente
 * @param {string}endereco - The plate of the cliente
 */
async function insCliente(nome, cpf, telefone, endereco) {
    try {
        console.log("Iniciando a conexão.");
        // Establish a connection to the PostgreSQL database
        await client.connect();//Iniciar a conexao 
        console.log("Conexão bem-sucedida!");
        // Execute a SQL query to insert a new client into the 'cliente' table
        await client.query(`INSERT INTO Cliente (nome, cpf, telefone, endereco) VALUES ('${nome}','${cpf}','${telefone}','${endereco}');`);
        console.log("Valor inserido na tabela");
        // Execute a SQL query to retrieve all clients from the 'cliente' table
        const resultado = await client.query(`SELECT id_cliente, nome, cpf, telefone, endereco FROM public.cliente;`);
        // Print the query results in a table format
        console.table(resultado.rows);
    } catch (ex) {
        console.log("Ocorreu erro insVeiculos. Erro: " + ex.message);
        console.log("Valor incorreto por favor verifique novamente!")
    } finally {
        // Close the database connection
        await client.end();
        console.log("Conexão encerrada");
    }
}


/**
 * Delete a cliente from the database
 * @param {number} cpf - The plate of the cliente to be deleted
 */
async function deleteCliente(cpf) {
    try {
        console.log("Iniciando a conexão.");
        // Establish a connection to the PostgreSQL database
        await client.connect();//Iniciar a conexao 
        console.log("Conexão bem-sucedida!");
        // Execute a SQL query to delete a client from the 'cliente' table based on the provided CPF
        await client.query("delete from cliente where cpf = '" + cpf + "'; ");
        console.log("Valor removido na tabela");
        // Execute a SQL query to retrieve all clients from the 'cliente' table
        const resultado = await client.query(`SELECT id_cliente, nome, cpf, telefone, endereco FROM public.cliente;`);
        // Print the query results in a table format
        console.table(resultado.rows);
    } catch (ex) {
        console.log("Ocorreu erro insCliente. Erro: " + ex.message);
    } finally {
        // Close the database connection
        await client.end();
        console.log("Conexão encerrada");
    }
}


/**
 * Update a cliente in the database
 * @param {number} cpf - The plate of the cliente to be updated
 * @param {string} nome - The new model of the cliente
 * @param {number} telefone - The new year of the cliente
 * @param {string} endereco - The new price of the cliente
 */
async function updateCliente(cpf, nome, telefone, endereco) {
    try {
        console.log("Iniciando a conexão.");
        // Establish a connection to the PostgreSQL database
        await client.connect();//Iniciar a conexao 
        console.log("Conexão bem-sucedida!");
        // Execute a SQL query to update a client in the 'cliente' table based on the provided CPF
        await client.query("update cliente set nome = '" + nome + "', telefone = '" + telefone + "', endereco = '" + endereco + "' where cpf = '" + cpf + "'; ");
        console.log("Valor atualizado na tabela");
        // Execute a SQL query to retrieve all clients from the 'cliente' table
        const resultado = await client.query(`SELECT id_cliente, nome, cpf, telefone, endereco FROM public.cliente;`);
        // Print the query results in a table format
        console.table(resultado.rows);
    } catch (ex) {
        console.log("Ocorreu erro insCliente. Erro: " + ex.message);
    } finally {
        // Close the database connection
        await client.end();
        console.log("Conexão encerrada");
    }
}


// Export the 'getCliente', 'insCliente', 'deleteCliente', and 'updateCliente' functions
module.exports = {
    getCliente,
    insCliente,
    deleteCliente,
    updateCliente
};
const { gold } = require('color-name'); // Import the 'gold' color from the 'color-name' package
const modulo = require('es-abstract/5/modulo');
const { Client } = require('pg'); // Import the 'Client' class from the 'pg' package (PostgreSQL client)
//const Funcionario = require('../funcionario');
const { deprecateOption } = require('yargs');

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


//getFuncionario();//Função(Metodo) de buscar todos os Objetos Funcionario no dataBase;
//addFuncionario("Josellyto", "Amaral", "Desenvolvidor", "TI", '');// Função(Metodo) de adicionar um Objeto Funcionario no dataBase com atributos (Nome, Sobrenome, Cargo, Departamento);
//updFuncionario("Carlos", "Santos", "Desenvolvidor", "Vendedor", '3');
//delFuncionario('1');

/**
 * Query all Funcionario from the database and print their information
 * using the Veiculos class to create instances and print details
 */

async function getFuncionario() {
    try {
        console.log("Iniciando a conexão.");
        //**Imprimir que está sendo inciada uma conexão com o data base
        await client.connect();
        //**Inicializando um conexão com o data base
        console.log("Conexão bem-sucedida!");
        //**Imprimindo uma conexão estavel no data base
        const resultado = await client.query(`SELECT id_funcionario, nome, sobrenome, cargo, departamento, numberid
        FROM public.funcionario;`);
        //**Query para buscar todos os objetos Funcionario no data base
        console.table(resultado.rows);
    } catch (ex) {
        console.log("Ocorreu erro getfuncionario. Erro: " + ex.message);
        //**Caso a conexão não seja bem sucedida, imprimir o erro
    } finally {
        await client.end();
        //**Finalizando um conexão com o data base
        console.log("Conexão encerrada");
        //**Imprimindo que a conexão foi encerrada
    }
}
/**
 * Uma Query que vai ser adicionada um funcionário na tabela funcionário
 * onde vai ser impressa um tabela que usuário foi criado e existe 
 * no data base da nossa  tabela Funcionario com seguintes atributos
 * addFuncionario(Nome, Sobrenome, Cargo, Departamento, NumberID)
 * O NumberID seria um numéro incremetal de nosso usuário para nosso database
 * que vai futuramente um busca para fazer outros metodos
 * @param {string} nome 
 * @param {string} sobrenome 
 * @param {string} cargo 
 * @param {string} departamento 
 * @param {number} numberid 
 */

async function addFuncionario(nome, sobrenome, cargo, departamento, numberid) {
    try {
        console.log("Iniciando a conexão.");
        //**Imprimir que está sendo inciada uma conexão com o data base
        await client.connect();
        //**Incializando um conexão com data base
        console.log("Conexão bem-sucedida!");
        //**Imprimir uma conexão estavel com data base
        if (numberid === "") {//Metodo de verificar se existir algum funcionario no data base
            await client.query(`INSERT INTO public.funcionario(
                nome, sobrenome, cargo, departamento ) VALUES ('${nome}','${sobrenome}','${cargo}','${departamento}');`);
            //**Query que será inserido os Funcionário no data base caso que não exista
        } else {//
            await client.query(`INSERT INTO public.funcionario(
                nome, sobrenome, cargo, departamento, numberid ) VALUES ('${nome}','${sobrenome}','${cargo}','${departamento}','${numberid}');`);

            //**Caso não exista, será criado um usuário no nosso data base usando um Query
        }
        console.log("Valor inserido na tabela");
        //**O valor vai ser impresso no cosole de uma tabela usuário
        const resultado = await client.query(`SELECT id_funcionario, nome, sobrenome, cargo, departamento, numberid
        FROM public.funcionario;`);
        //**O console vai imprimir para o funcionário quais funcionário que foi criado
        console.table(resultado.rows);
    } catch (ex) {
        console.log("Ocorreu erro insVeiculos. Erro: " + ex.message);
        //Vai ser impresso no cosole que está com erro para ser atribuido um funcionário no data base
        console.log("Valor incorreto por favor verifique novamente!")
        //**Messagem que vai ser impressa 
    } finally {
        await client.end();
        //**Finalizando um conexão com o data base
        console.log("Conexão encerrada");
        //**Messagem que vai ser impressa
    }
}

/**
 * Query onde vai realizar algumas alterações no funcionário que está
 * inserido no nosso data base onde vai fazer um busca, atravez do
 * NumberID (Numero de indentificação) que  criado quando é inserido
 * o nosso funcionário que atraves dele podemos buscar e fazer as demais
 * alteração caso se nao obter o numero de Indentificação não será possível
 * @param {string} nome - Alteração de um novo nome no objeto funcionario
 * @param {string} sobrenome Alteração de um novo  sobrenome no objeto funcionario
 * @param {string} cargo - Alteração de um novo cargo no objeto Funcionario 
 ** @param {string} departamento - Alteração de um novo departamento no objeto Funcionario 
 */

async function updFuncionario(nome, sobrenome, cargo, departamento, numberid) {
    try {
        console.log("Iniciando a conexão.");
        await client.connect();
        console.log("Conexão bem-sucedida!");

        const query = {
            text: `UPDATE public.funcionario SET nome = $1, sobrenome = $2, cargo = $3, departamento = $4 WHERE numberid = $5`,
            values: [nome, sobrenome, cargo, departamento, numberid]
        };

        await client.query(query);
        console.log("Valor atualizado na tabela");

        const resultado = await client.query(`SELECT id_funcionario, nome, sobrenome, cargo, departamento, numberid FROM public.funcionario WHERE numberid = $1`, [numberid]);
        console.table(resultado.rows);

        if (resultado.rows.length === 0) {
            console.log("Usuário não encontrado");
        }
    } catch (ex) {
        console.log("Ocorreu erro updFuncionario. Erro: " + ex.message);
    } finally {
        await client.end();
        console.log("Conexão encerrada");
    }
}

async function delFuncionario(numberid) {
    try {
        console.log("Iniciando a conexão.");
        await client.connect();
        console.log("Conexão bem-sucedida!");
        const query = {
            text: `DELETE FROM public.funcionario WHERE numberid = $1`,
            values: [numberid]
        };
        await client.query(query);
        console.log("Valor deletado na tabela");
        const resultado = await client.query(`SELECT id_funcionario, nome, sobrenome, cargo, departamento, numberid
        FROM public.funcionario;`);
        console.table(resultado.rows);
    } catch (ex) {
        console.log("Ocorreu erro delFuncionario. Erro: " + ex.message);
    } finally {
        await client.end();
        console.log("Conexão encerrada");
    }
}

module.exports = {
    addFuncionario,
    getFuncionario,
    updFuncionario,
    delFuncionario
}
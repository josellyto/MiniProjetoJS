const { drop } = require('prelude-ls');
const db = require('./database');

async function dropTables() {

    await db.connect(),
        await db.query('DROP TABLE evento'),
        await db.query(`DROP TABLE IF EXISTS users;`),
        await db.end(),

        console.log("TABELAS  removidas")

};

dropTables()
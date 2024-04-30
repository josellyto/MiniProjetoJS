const DataBase = require('./database');
const Application = require('../app')

class VeiculoDAO {

    constructor() {
        this.db = new DataBase();
    }

}

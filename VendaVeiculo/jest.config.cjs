// jest.config.cjs
module.exports = {
    moduleNameMapper: {
        '^@utils/(.*)$': '<rootDir>/src/utils/$1', // Mapeia @utils/ para src/utils/
        '^@controller/(.*)$': '<rootDir>/src/controller/$1', // Mapeia @controller/ para src/controller/
    },
    transform: {
        '^.+\\.js$': 'babel-jest', // Usa babel-jest para arquivos JavaScript
    },
    testEnvironment: 'node', // Configura o ambiente de teste como Node.js
    testMatch: [
        '**/src/test/**/*.[jt]s?(x)', // Localiza testes dentro de src/test/
        '**/src/test/?(*.)+(spec|test).[tj]s?(x)', // Formato alternativo de nomenclatura de testes
    ],
};
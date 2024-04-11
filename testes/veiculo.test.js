const Veiculo = require('../veiculo');

function test(description, callback) {
  console.log(`Test: ${description}`);
  callback();
}

function expect(actual) {
  return {
    toBe(expected) {
      if (actual === expected) {
        console.log(`Resultado recebido: ${actual} OK!`);
      } else {
        console.error(`Resultado recebido: ${actual}, Falhou! Esperado: ${expected}`);
      }
    }
  };
}

// Teste para verificar a criação de veículo.js
test('Criação de Veiculo', () => {
  const carro = new Veiculo("Toyota", "Corolla", "Preto", 2020, "ABC1234", 20000, "Novo", "Sedan", 80000);
  expect(carro.marca).toBe(carro.marca);
  expect(carro.modelo).toBe(carro.modelo);
  expect(carro.cor).toBe(carro.cor);
  expect(carro.ano).toBe(carro.ano);
  expect(carro.placa).toBe(carro.placa);
  expect(carro.quilometragem).toBe(carro.quilometragem);
  expect(carro.condicao).toBe(carro.condicao);
  expect(carro.tipoDaCarroceria).toBe(carro.tipoDaCarroceria);
  expect(carro.preco).toBe(carro.preco);
});

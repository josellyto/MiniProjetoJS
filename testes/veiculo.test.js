const Veiculo = require('../veiculo');

function test(description, callback) {
  console.log(`Test: ${description}`);
  callback();
}

function expect(actual) {
  return {
    toBe(expected) {
      if (actual === expected) {
        console.log("Passou no teste!");
      } else {
        console.error(`Falhou! Esperado: ${expected}, Recebido: ${actual}`);
      }
    }
  };
}

// Teste para verificar a criação de veículo.js
test('Criação de Veiculo', () => {
  const carro = new Veiculo("Toyota", "Corolla", "Preto", 2020, "ABC1234", 20000, "Novo", "Sedan", 80000);
  expect(carro.marca).toBe("Toyota");
  expect(carro.modelo).toBe("Corolla");
  expect(carro.cor).toBe("Preto");
  expect(carro.ano).toBe(2020);
  expect(carro.placa).toBe("ABC1234");
  expect(carro.quilometragem).toBe(20000);
  expect(carro.condicao).toBe("Novo");
  expect(carro.tipoDaCarroceria).toBe("Sedan");
  expect(carro.preco).toBe(80000);
});

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
  const carro = new Veiculo("Toyota", "Corolla", "Preto", 2020, "ABC1234", 20000, "Novo", "Sedan",3434);
  expect(carro.marca).toBe("Toyota"); //só pode receber string
  expect(carro.modelo).toBe("Corolla"); // só pode receber string
  expect(carro.cor).toBe("Preto"); // só pode receber string
  expect(carro.ano).toBe(2020); // só pode receber numero 4 digitos
  expect(carro.placa).toBe("ABC1234"); //só pode receber 7 digitos
  expect(carro.quilometragem).toBe(20000); //só pode receber numero
  expect(carro.condicao).toBe("Novo"); // só pode receber string, novo, usado ou seminovo
  expect(carro.tipoDaCarroceria).toBe("Sedan"); // só pode receber string
  expect(carro.preco).toBe(80000); // só pode receber numero float
});

const carro = new Veiculo("Toyota", "hb20", "Preto", 2020, "ABC1234", 20000, "Novo", "Sedan", 80000);
console.log(carro.marca); // Toyota
console.log(carro.modelo); // Corolla
console.log(carro.cor); // Preto
console.log(carro.ano); // 2020
console.log(carro.placa); // ABC1234
console.log(carro.quilometragem); // 20000
console.log(carro.condicao); // Novo
console.log(carro.tipoDaCarroceria); // Sedan
console.log(carro.preco); // 80000
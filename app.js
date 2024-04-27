const Cliente = require('./cliente');
const Veiculo = require('./veiculos');
const ComprasDeVeiculos = require('./compraVeiculo');

// Create instances of Veiculo class
let veiculo1 = new Veiculo('Vectra', 1997, 25000, 1);
let veiculo2 = new Veiculo('Corsa', 1994, 10000, 1);

// Create an instance of Cliente class
let cliente1 = new Cliente('Cesar', '06627715597', 'Rua, Albino Goncalves, N= 252');

// Create an instance of ComprasDeVeiculos class
let compra1 = new ComprasDeVeiculos();

// Add cliente1 to the clientes array of compra1
compra1.adicionarCliente(cliente1);

// Add veiculo1 and veiculo2 to the veiculos array of compra1
compra1.adicionarVeiculo(veiculo1);
compra1.adicionarVeiculo(veiculo2);
compra1.adicionarVeiculo(veiculo2);

// Set the formaPagamento property of compra1
compra1.setFormaPagamento('dinheiro');

// Calculate the total value of the purchase
const totalCompra = compra1.calcularValorTotal();

// Get the formaPagamento property of compra1
const mensagem = compra1.getFormaPagamento();

// Log the compra1 object, totalCompra, and mensagem to the console
//console.log(compra1);

console.log("Veículos cadastrados na compra1:");
const veiculosCadastrados = compra1.listarVeiculos();
veiculosCadastrados.forEach((veiculo, index) => {
    console.log(`Veículo ${index + 1}:`);
    console.log(`Modelo: ${veiculo.modelo}`);
    console.log(`Ano: ${veiculo.ano}`);
    console.log(`Preço: ${veiculo.preco}`);
    console.log(`Quantidade: ${veiculo.quantidade}`);
    console.log("------");
});

console.log("Clientes cadastrados na compra1:");
compra1.listarClientes();

console.log(`Total da compra: ${totalCompra}`);
console.log(`Forma de pagamento em : ${mensagem}, Confirmado com sucesso!`);
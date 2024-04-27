var xhr = new XMLHttpRequest();

//Informação do meu bando de dados
//Porta:5432 UserName:SellVehicle Nome:MysqlSellVehicle nome/usuario:postgres

//Definir a URL do banco de dados 
var url = "https://";

// Definir o métodos de requisição (GET, POST, PUT, DELETE, etc.)
var method = "GET";

//Abrir a conexão com o banco de dados 
xhr.open(method, url, true);

//Defenir o tipo de dados que você espera receber 
xhr.responseType = "json";

//Envir a requição 
xhr.send();

//tratar a resposta do banco de dados 
xhr.onload = function () {
    if (xhr.status = 200) {
        // tratar os dodos recebidos 
        var dados = xhr.response;
        console.log(dados);
    } else {
        console.log("Erro ao fazer a requisição: ", xhr.statusText);
    }
}

$.ajax({
    type: "GET",
    url: "https://seu-banco-de-dados.com/api/dados",
    dataType: "json",
    success: function (dados) {
        console.log(dados);
    },
    error: function (xhr, status, error) {
        console.error("Erro ao fazer a requisição:", error);
    }
});
import { Router } from "express";
import { createTableVenda, buscarVendas, buscarVendaPorId, inserirVenda, updateVenda, deletarVenda } from "../controllers/vendaController.js";

const routerVenda = Router();

routerVenda.get('/shell', (req, res) => {
    res.json({
        statusCode: 200,
        message: "API Vendas funcionando bem!"
    })
});

//Rota para buscar todas VENDAS
routerVenda.get('/BuscarVendas', buscarVendas);
//Rota para buscar VENDA por ID
routerVenda.get('/BuscarVendaID', buscarVendaPorId);
//Rota para inserir VENDA no data base
routerVenda.post('/InserirVenda', inserirVenda);
//Rota para Atualizar a venda da data base
routerVenda.put('/UpdateVenda', updateVenda)
//Rota para deletar VENDA no data base
routerVenda.delete('/DeletarVenda', deletarVenda)

export default routerVenda;
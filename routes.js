const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/ProdutosController');
const fornecedoresController = require('../controllers/fornecedoresController');


// Rota produtos verbo POST (INCOMPLETA)
router.post('/produtos', produtosController.insertProdutosData);

// Rota fornecedores método POST
router.post('/fornecedores', fornecedoresController.insertFornecedoresData);

// Rota para buscar todos os fornecedores método GET
router.get('/fornecedores', fornecedoresController.getAllFornecedoresData);

// Rota para atualizar fornecedor método POST
router.post('/fornecedores/:id', fornecedoresController.updateFornecedoresData);

// Rota para deletar fornecedor método GET
router.get('/fornecedores/:id', fornecedoresController.deleteFornecedoresData);

module.exports = router;
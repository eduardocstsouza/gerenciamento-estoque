const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const produtosController = require('../controllers/produtosController');

router.get('/produtos', authMiddleware, produtosController.getProdutos);
router.post('/produtos', authMiddleware, produtosController.addProduto);

router.put('/produtos/:id', authMiddleware, produtosController.updateProduto);
router.delete('/produtos/:id', authMiddleware, produtosController.deleteProduto);

module.exports = router;
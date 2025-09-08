const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const fornecedoresController = require('../controllers/fornecedoresController');

router.get('/fornecedores', authMiddleware, fornecedoresController.getFornecedores);
router.post('/fornecedores', authMiddleware, fornecedoresController.addFornecedor);
router.put('/fornecedores/:id', authMiddleware, fornecedoresController.updateFornecedor);
router.delete('/fornecedores/:id', authMiddleware, fornecedoresController.deleteFornecedor);

module.exports = router;
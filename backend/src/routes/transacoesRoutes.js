const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const transacoesController = require('../controllers/transacoesController');

router.post('/transacoes', authMiddleware, transacoesController.registrarTransacao);
router.get('/transacoes', authMiddleware, transacoesController.getTransacoes);

module.exports = router;
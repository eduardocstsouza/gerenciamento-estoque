const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const usuariosController = require('../controllers/usuariosController');

router.get('/usuarios', authMiddleware, usuariosController.getUsuarios);
router.put('/usuarios/:id', authMiddleware, usuariosController.updateUsuario);
router.delete('/usuarios/:id', authMiddleware, usuariosController.deleteUsuario);

module.exports = router;
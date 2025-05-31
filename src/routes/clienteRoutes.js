const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.post('/clientes', clienteController.criarCliente);
router.get('/clientes/:codigo', clienteController.buscarCliente);
router.get('/clientes', clienteController.listarClientes);
router.put('/clientes/:codigo', clienteController.atualizarCliente);
router.delete('/clientes/:codigo', clienteController.deletarCliente);

module.exports = router;

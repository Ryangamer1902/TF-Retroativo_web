const express = require('express');
const clienteRoutes = require('./routes/clienteRoutes');
const sequelize = require('./database');

const app = express();

app.use(express.json());
app.use(clienteRoutes);

// Middleware de tratamento de erro genérico
app.use((err, req, res, next) => {
  res.status(500).json({ mensagem: 'Erro interno do servidor.' });
});

// Sincroniza o banco de dados (não força drop)
sequelize.sync();

module.exports = app;

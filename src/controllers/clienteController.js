const Cliente = require('../models/cliente');
const { Op } = require('sequelize');

// Função para validar CPF (formato simples)
function validarCPF(cpf) {
  return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf) || /^\d{11}$/.test(cpf);
}

// Função para validar CEP
function validarCEP(cep) {
  return /^\d{5}-?\d{3}$/.test(cep);
}

// Função para validar telefone
function validarTelefone(telefone) {
  return /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(telefone) || /^\d{10,11}$/.test(telefone);
}

// Função para validar data (YYYY-MM-DD)
function validarData(data) {
  return /^\d{4}-\d{2}-\d{2}$/.test(data);
}

module.exports = {
  // CREATE
  async criarCliente(req, res) {
    try {
      const { nome, data_nascimento, rg, cpf, telefone, endereco, numero, cidade, uf, cep } = req.body;
      if (!nome || nome.trim() === '') {
        return res.status(400).json({ mensagem: 'O campo nome é obrigatório.' });
      }
      if (!cpf || !validarCPF(cpf)) {
        return res.status(400).json({ mensagem: 'CPF inválido.' });
      }
      if (cep && !validarCEP(cep)) {
        return res.status(400).json({ mensagem: 'CEP inválido.' });
      }
      if (telefone && !validarTelefone(telefone)) {
        return res.status(400).json({ mensagem: 'Telefone inválido.' });
      }
      if (data_nascimento && !validarData(data_nascimento)) {
        return res.status(400).json({ mensagem: 'Data de nascimento inválida.' });
      }
      // Verifica duplicidade de CPF
      const existe = await Cliente.findOne({ where: { cpf } });
      if (existe) {
        return res.status(400).json({ mensagem: 'CPF já cadastrado.' });
      }
      const cliente = await Cliente.create({ nome, data_nascimento, rg, cpf, telefone, endereco, numero, cidade, uf, cep });
      return res.status(201).json(cliente);
    } catch (err) {
      return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
  },

  // READ (individual)
  async buscarCliente(req, res) {
    try {
      const { codigo } = req.params;
      const cliente = await Cliente.findByPk(codigo);
      if (!cliente) {
        return res.status(404).json({ mensagem: 'Cliente não encontrado.' });
      }
      return res.status(200).json(cliente);
    } catch (err) {
      return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
  },

  // READ (all)
  async listarClientes(req, res) {
    try {
      const { nome, cidade, uf } = req.query;
      const where = {};
      if (nome) where.nome = { [Op.iLike]: `%${nome}%` };
      if (cidade) where.cidade = { [Op.iLike]: `%${cidade}%` };
      if (uf) where.uf = uf;
      const clientes = await Cliente.findAll({ where });
      return res.status(200).json(clientes);
    } catch (err) {
      return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
  },

  // UPDATE
  async atualizarCliente(req, res) {
    try {
      const { codigo } = req.params;
      const dados = req.body;
      const cliente = await Cliente.findByPk(codigo);
      if (!cliente) {
        return res.status(404).json({ mensagem: 'Cliente não encontrado.' });
      }
      if (dados.nome !== undefined && dados.nome.trim() === '') {
        return res.status(400).json({ mensagem: 'O campo nome não pode ser vazio.' });
      }
      if (dados.cpf) {
        if (!validarCPF(dados.cpf)) {
          return res.status(400).json({ mensagem: 'CPF inválido.' });
        }
        // Verifica duplicidade de CPF
        const existe = await Cliente.findOne({ where: { cpf: dados.cpf, codigo: { [Op.ne]: codigo } } });
        if (existe) {
          return res.status(400).json({ mensagem: 'CPF já cadastrado para outro cliente.' });
        }
      }
      if (dados.cep && !validarCEP(dados.cep)) {
        return res.status(400).json({ mensagem: 'CEP inválido.' });
      }
      if (dados.telefone && !validarTelefone(dados.telefone)) {
        return res.status(400).json({ mensagem: 'Telefone inválido.' });
      }
      if (dados.data_nascimento && !validarData(dados.data_nascimento)) {
        return res.status(400).json({ mensagem: 'Data de nascimento inválida.' });
      }
      await cliente.update(dados);
      return res.status(200).json(cliente);
    } catch (err) {
      return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
  },

  // DELETE
  async deletarCliente(req, res) {
    try {
      const { codigo } = req.params;
      const cliente = await Cliente.findByPk(codigo);
      if (!cliente) {
        return res.status(404).json({ mensagem: 'Cliente não encontrado.' });
      }
      await cliente.destroy();
      return res.status(204).send();
    } catch (err) {
      return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
  },
};

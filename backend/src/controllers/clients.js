const db = require('../config/db');

exports.getAll = async (req, res, next) => {
  try {
    const clients = await db('clients').select('*');
    res.json(clients);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const client = await db('clients').where({ id: req.params.id }).first();
    if (!client) return res.status(404).json({ message: 'Client not found' });
    res.json(client);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const [clientId] = await db('clients').insert(req.body).returning('id');
    const newClient = await db('clients').where({ id: clientId }).first();
    res.status(201).json(newClient);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const updated = await db('clients').where({ id: req.params.id }).update(req.body);
    if (!updated) return res.status(404).json({ message: 'Client not found' });
    const client = await db('clients').where({ id: req.params.id }).first();
    res.json(client);
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const deleted = await db('clients').where({ id: req.params.id }).del();
    if (!deleted) return res.status(404).json({ message: 'Client not found' });
    res.json({ message: 'Client deleted' });
  } catch (err) {
    next(err);
  }
};

const db = require('../config/db');

exports.getInvoices = async (req, res, next) => {
  try {
    const invoices = await db('invoices')
      .join('clients', 'invoices.client_id', 'clients.id')
      .select('invoices.*', 'clients.name as client_name');
    res.json(invoices);
  } catch (err) {
    next(err);
  }
};

exports.createInvoice = async (req, res, next) => {
  try {
    const [id] = await db('invoices').insert(req.body).returning('id');
    res.status(201).json({ id });
  } catch (err) {
    next(err);
  }
};

exports.updateInvoice = async (req, res, next) => {
  try {
    const { id } = req.params;
    await db('invoices').where({ id }).update(req.body);
    res.json({ message: 'Invoice updated' });
  } catch (err) {
    next(err);
  }
};

exports.deleteInvoice = async (req, res, next) => {
  try {
    const { id } = req.params;
    await db('invoices').where({ id }).delete();
    res.json({ message: 'Invoice deleted' });
  } catch (err) {
    next(err);
  }
};

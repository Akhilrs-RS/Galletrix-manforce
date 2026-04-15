const db = require('../config/db');

exports.getAll = async (req, res, next) => {
  try {
    const payroll = await db('payroll').select('*');
    res.json(payroll);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const record = await db('payroll').where({ id: req.params.id }).first();
    if (!record) return res.status(404).json({ message: 'Payroll record not found' });
    res.json(record);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const [id] = await db('payroll').insert(req.body).returning('id');
    const newRecord = await db('payroll').where({ id }).first();
    res.status(201).json(newRecord);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const updated = await db('payroll').where({ id: req.params.id }).update(req.body);
    if (!updated) return res.status(404).json({ message: 'Payroll record not found' });
    const record = await db('payroll').where({ id: req.params.id }).first();
    res.json(record);
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const deleted = await db('payroll').where({ id: req.params.id }).del();
    if (!deleted) return res.status(404).json({ message: 'Payroll record not found' });
    res.json({ message: 'Payroll record deleted' });
  } catch (err) {
    next(err);
  }
};

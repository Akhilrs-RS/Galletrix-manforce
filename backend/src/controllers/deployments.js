const db = require('../config/db');

exports.getAll = async (req, res, next) => {
  try {
    const deployments = await db('deployments').select('*');
    res.json(deployments);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const deployment = await db('deployments').where({ id: req.params.id }).first();
    if (!deployment) return res.status(404).json({ message: 'Deployment not found' });
    res.json(deployment);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const [id] = await db('deployments').insert(req.body).returning('id');
    const newRecord = await db('deployments').where({ id }).first();
    res.status(201).json(newRecord);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const updated = await db('deployments').where({ id: req.params.id }).update(req.body);
    if (!updated) return res.status(404).json({ message: 'Deployment not found' });
    const record = await db('deployments').where({ id: req.params.id }).first();
    res.json(record);
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const deleted = await db('deployments').where({ id: req.params.id }).del();
    if (!deleted) return res.status(404).json({ message: 'Deployment not found' });
    res.json({ message: 'Deployment deleted' });
  } catch (err) {
    next(err);
  }
};

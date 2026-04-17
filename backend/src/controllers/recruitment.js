const db = require('../config/db');

exports.getAll = async (req, res, next) => {
  try {
    const candidates = await db('recruitment').select('*');
    res.json(candidates);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const [id] = await db('recruitment').insert(req.body).returning('id');
    res.status(201).json({ id });
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const updated = await db('recruitment').where({ id: req.params.id }).update(req.body);
    res.json({ success: !!updated });
  } catch (err) { next(err); }
};

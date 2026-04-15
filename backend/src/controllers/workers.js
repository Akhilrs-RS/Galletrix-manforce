const db = require('../config/db');

exports.getWorkers = async (req, res, next) => {
  try {
    const { type, status } = req.query;
    let query = db('workers');

    if (type) query = query.where({ type });
    if (status) query = query.where({ status });

    const workers = await query.select('*');
    res.json(workers);
  } catch (err) {
    next(err);
  }
};

exports.getWorkerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const worker = await db('workers').where({ id }).first();

    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }

    res.json(worker);
  } catch (err) {
    next(err);
  }
};

exports.createWorker = async (req, res, next) => {
  try {
    const workerData = req.body;
    const [id] = await db('workers').insert(workerData).returning('id');
    res.status(201).json({ message: 'Worker created', id });
  } catch (err) {
    next(err);
  }
};

exports.updateWorker = async (req, res, next) => {
  try {
    const { id } = req.params;
    const workerData = req.body;
    const updated = await db('workers').where({ id }).update(workerData);

    if (!updated) {
      return res.status(404).json({ message: 'Worker not found' });
    }

    res.json({ message: 'Worker updated' });
  } catch (err) {
    next(err);
  }
};

exports.deleteWorker = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await db('workers').where({ id }).delete();

    if (!deleted) {
      return res.status(404).json({ message: 'Worker not found' });
    }

    res.json({ message: 'Worker deleted' });
  } catch (err) {
    next(err);
  }
};

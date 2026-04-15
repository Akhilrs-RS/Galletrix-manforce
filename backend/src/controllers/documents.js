const db = require('../config/db');

exports.getDocuments = async (req, res, next) => {
  try {
    const documents = await db('documents')
      .join('workers', 'documents.worker_id', 'workers.id')
      .select('documents.*', 'workers.name as worker_name');
    res.json(documents);
  } catch (err) {
    next(err);
  }
};

exports.createDocument = async (req, res, next) => {
  try {
    const [id] = await db('documents').insert(req.body).returning('id');
    res.status(201).json({ id });
  } catch (err) {
    next(err);
  }
};

exports.updateDocument = async (req, res, next) => {
  try {
    const { id } = req.params;
    await db('documents').where({ id }).update(req.body);
    res.json({ message: 'Document updated' });
  } catch (err) {
    next(err);
  }
};

exports.deleteDocument = async (req, res, next) => {
  try {
    const { id } = req.params;
    await db('documents').where({ id }).delete();
    res.json({ message: 'Document deleted' });
  } catch (err) {
    next(err);
  }
};

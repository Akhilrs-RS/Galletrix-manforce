const db = require('../config/db');
const fs = require('fs');
const path = require('path');

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
    const data = { ...req.body };
    if (data.worker_id) {
      data.worker_id = parseInt(data.worker_id, 10);
    }
    // Set a default status based on expiry
    if (data.expiry) {
      const expiry = new Date(data.expiry);
      data.status = expiry < new Date() ? 'Expired' : 'Valid';
    }

    const [id] = await db('documents').insert(data).returning('id');
    res.status(201).json({ id });
  } catch (err) {
    console.error("Database Error in createDocument:", err);
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
    const doc = await db('documents').where({ id }).first();
    
    if (doc && doc.file_url) {
      const filePath = path.join(__dirname, '../../', doc.file_url);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    
    await db('documents').where({ id }).delete();
    res.json({ message: 'Document deleted' });
  } catch (err) {
    next(err);
  }
};

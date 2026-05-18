const express = require('express');
const router = express.Router();
const db = require('../config/db');

const auth = require('../middleware/auth');

/**
 * @openapi
 * /api/clients:
 *   get:
 *     summary: Get all clients
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: List of clients
 */
router.get('/', auth, async (req, res, next) => {
  try {
    const clients = await db('clients').select('*');
    res.json(clients);
  } catch (err) {
    next(err);
  }
});

router.post('/', auth, async (req, res, next) => {
  try {
    const { name, contact, phone, type, rate, till, status, revenue, workers } = req.body;
    const [id] = await db('clients')
      .insert({
        name,
        contact: contact || null,
        phone: phone || null,
        type: type || null,
        rate: parseFloat(rate) || 0,
        till: till || null,
        status: status || 'Active',
        revenue: parseFloat(revenue) || 0,
        workers: parseInt(workers) || 0
      })
      .returning('id');
    res.status(201).json({ id, message: 'Client created successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

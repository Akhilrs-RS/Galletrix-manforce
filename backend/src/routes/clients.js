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

module.exports = router;

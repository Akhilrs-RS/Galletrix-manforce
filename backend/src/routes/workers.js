const express = require('express');
const router = express.Router();
const workerController = require('../controllers/workers');

/**
 * @openapi
 * tags:
 *   name: Workers
 *   description: Worker management API
 */

/**
 * @openapi
 * /api/workers:
 *   get:
 *     summary: Get all workers
 *     tags: [Workers]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema: { type: string, enum: [Own, Outsourced] }
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: [Deployed, Available, On Leave] }
 *     responses:
 *       200:
 *         description: List of workers
 */
router.get('/', workerController.getWorkers);

/**
 * @openapi
 * /api/workers/{id}:
 *   get:
 *     summary: Get worker by ID
 *     tags: [Workers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Worker details
 *       404:
 *         description: Worker not found
 */
router.get('/:id', workerController.getWorkerById);

/**
 * @openapi
 * /api/workers:
 *   post:
 *     summary: Create a new worker
 *     tags: [Workers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, worker_id]
 *             properties:
 *               name: { type: string }
 *               worker_id: { type: string }
 *               category: { type: string }
 *               type: { type: string }
 *               nationality: { type: string }
 *               salary: { type: number }
 *               status: { type: string }
 *               expiry: { type: string, format: date }
 *               emirates_id: { type: string }
 *     responses:
 *       201:
 *         description: Worker created
 */
router.post('/', workerController.createWorker);

/**
 * @openapi
 * /api/workers/{id}:
 *   put:
 *     summary: Update a worker
 *     tags: [Workers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Worker updated
 */
router.put('/:id', workerController.updateWorker);

/**
 * @openapi
 * /api/workers/{id}:
 *   delete:
 *     summary: Delete a worker
 *     tags: [Workers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Worker deleted
 */
router.delete('/:id', workerController.deleteWorker);

module.exports = router;

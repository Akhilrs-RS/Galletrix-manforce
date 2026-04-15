const express = require('express');
const router = express.Router();
const deploymentsController = require('../controllers/deployments');
const auth = require('../middleware/auth');

/**
 * @openapi
 * /api/deployments:
 *   get:
 *     summary: Get all deployments
 *     tags: [Deployments]
 *     responses:
 *       200:
 *         description: List of deployments
 */
router.get('/', auth, deploymentsController.getAll);

/**
 * @openapi
 * /api/deployments:
 *   post:
 *     summary: Create a new deployment
 *     tags: [Deployments]
 *     responses:
 *       201:
 *         description: Deployment created
 */
router.post('/', auth, deploymentsController.create);

/**
 * @openapi
 * /api/deployments/{id}:
 *   put:
 *     summary: Update a deployment
 *     tags: [Deployments]
 *     responses:
 *       200:
 *         description: Deployment updated
 */
router.put('/:id', auth, deploymentsController.update);

/**
 * @openapi
 * /api/deployments/{id}:
 *   delete:
 *     summary: Delete a deployment
 *     tags: [Deployments]
 *     responses:
 *       200:
 *         description: Deployment deleted
 */
router.delete('/:id', auth, deploymentsController.delete);

module.exports = router;

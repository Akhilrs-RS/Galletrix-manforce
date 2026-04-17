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
 */
router.get('/', auth, deploymentsController.getDeployments);

/**
 * @openapi
 * /api/deployments/assign:
 *   post:
 *     summary: Assign a worker to a deployment
 *     tags: [Deployments]
 */
router.post('/assign', auth, deploymentsController.assignWorker);

module.exports = router;

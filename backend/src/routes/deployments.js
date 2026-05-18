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
router.post('/assign', auth, deploymentsController.assignWorker);
router.post('/assign-multiple', auth, deploymentsController.assignMultipleWorkers);
router.post('/complete-worker', auth, deploymentsController.completeWorkerDeployment);

module.exports = router;

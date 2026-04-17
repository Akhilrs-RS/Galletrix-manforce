const express = require('express');
const router = express.Router();
const recruitmentController = require('../controllers/recruitment');
const auth = require('../middleware/auth');

/**
 * @openapi
 * /api/recruitment:
 *   get:
 *     summary: Get all recruitment candidates
 *     tags: [Recruitment]
 *     responses:
 *       200:
 *         description: List of candidates
 */
router.get('/', auth, recruitmentController.getAll);

/**
 * @openapi
 * /api/recruitment:
 *   post:
 *     summary: Create a new candidate
 *     tags: [Recruitment]
 *     responses:
 *       201:
 *         description: Candidate created
 */
router.post('/', auth, recruitmentController.create);

/**
 * @openapi
 * /api/recruitment/{id}:
 *   patch:
 *     summary: Update candidate stage
 *     tags: [Recruitment]
 *     responses:
 *       200:
 *         description: Candidate updated
 */
router.patch('/:id', auth, recruitmentController.update);

module.exports = router;

const express = require('express');
const router = express.Router();
const recruitmentController = require('../controllers/recruitment');
const auth = require('../middleware/auth');

/**
 * @openapi
 * /api/recruitment:
 *   get:
 *     summary: Get all recruitment records
 *     tags: [Recruitment]
 *     responses:
 *       200:
 *         description: List of recruitment records
 */
router.get('/', auth, recruitmentController.getRecruitment);

/**
 * @openapi
 * /api/recruitment:
 *   post:
 *     summary: Create a new recruitment record
 *     tags: [Recruitment]
 *     responses:
 *       201:
 *         description: Recruitment record created
 */
router.post('/', auth, recruitmentController.createRecruitment);

/**
 * @openapi
 * /api/recruitment/{id}:
 *   put:
 *     summary: Update a recruitment record
 *     tags: [Recruitment]
 *     responses:
 *       200:
 *         description: Recruitment record updated
 */
router.put('/:id', auth, recruitmentController.updateRecruitment);

/**
 * @openapi
 * /api/recruitment/{id}:
 *   delete:
 *     summary: Delete a recruitment record
 *     tags: [Recruitment]
 *     responses:
 *       200:
 *         description: Recruitment record deleted
 */
router.delete('/:id', auth, recruitmentController.deleteRecruitment);

module.exports = router;

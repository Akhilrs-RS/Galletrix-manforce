const express = require('express');
const router = express.Router();
const workOrdersController = require('../controllers/work_orders');
const auth = require('../middleware/auth');

router.get('/', auth, workOrdersController.getWorkOrders);
router.post('/', auth, workOrdersController.createWorkOrder);

module.exports = router;

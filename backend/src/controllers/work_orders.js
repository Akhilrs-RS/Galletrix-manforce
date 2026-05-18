const db = require('../config/db');

// Get all work orders
exports.getWorkOrders = async (req, res, next) => {
  try {
    const workOrders = await db('work_orders').select('*').orderBy('created_at', 'desc');
    res.json(workOrders);
  } catch (err) {
    next(err);
  }
};

// Create a new work order
exports.createWorkOrder = async (req, res, next) => {
  try {
    const { site_name, client_name, assigned_name, site_address, status, start_date, est_budget, description } = req.body;
    
    const [id] = await db('work_orders')
      .insert({
        site_name,
        client_name,
        assigned_name,
        site_address,
        status: status || 'Pending',
        start_date: start_date || null,
        est_budget: parseFloat(est_budget) || 0,
        description: description || ''
      })
      .returning('id');
      
    res.status(201).json({ id, message: 'Work Order created successfully' });
  } catch (err) {
    next(err);
  }
};

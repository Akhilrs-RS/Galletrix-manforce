const db = require('../config/db');

exports.getDeployments = async (req, res, next) => {
  try {
    const deployments = await db('deployments')
      .leftJoin('clients', 'deployments.client_id', 'clients.id')
      .select('deployments.*', 'clients.name as client_name');
    res.json(deployments);
  } catch (err) { next(err); }
};

exports.assignWorker = async (req, res, next) => {
  try {
    const { worker_id, deployment_id } = req.body;
    // Simple logic: update worker's client/site to match deployment
    const deployment = await db('deployments').where({ id: deployment_id }).first();
    if (!deployment) return res.status(404).json({ message: 'Deployment not found' });

    await db('workers').where({ id: worker_id }).update({
      client_id: deployment.client_id,
      site: deployment.site,
      status: 'Deployed'
    });

    res.json({ message: 'Worker assigned' });
  } catch (err) { next(err); }
};

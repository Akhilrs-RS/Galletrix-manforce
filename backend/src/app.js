const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const app = express();

// Middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disable CSP for local development to allow Swagger UI
}));
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ManForce ERP API',
      version: '1.0.0',
      description: 'API documentation for ManForce ERP system',
      contact: {
        name: 'API Support'
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5001}`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  // Ensure the glob path is absolute and uses forward slashes for cross-platform compatibility
  apis: [path.join(__dirname, 'routes', '*.js').replace(/\\/g, '/')],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Check if swaggerSpec is generated
if (!swaggerSpec || !swaggerSpec.paths || Object.keys(swaggerSpec.paths).length === 0) {
  console.warn('⚠️ Swagger documentation was not generated correctly or no paths were found.');
  // Force add health endpoint if it's missing from routes to ensure something displays
  if (swaggerSpec) {
    swaggerSpec.paths = swaggerSpec.paths || {};
    swaggerSpec.paths['/health'] = {
      get: {
        summary: 'Health check endpoint',
        responses: { 200: { description: 'Server is healthy' } }
      }
    };
  }
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, {
  swaggerOptions: {
    url: '/swagger.json',
  },
}));

// Swagger JSON endpoint for debugging
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Basic Health Check Route
/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     responses:
 *       200:
 *         description: Server is healthy
 */
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'ManForce ERP Backend is running' });
});

// Import Routes
const workerRoutes = require('./routes/workers');
const clientRoutes = require('./routes/clients');
const attendanceRoutes = require('./routes/attendance');
const authRoutes = require('./routes/auth');
const deploymentRoutes = require('./routes/deployments');
const payrollRoutes = require('./routes/payroll');
const invoiceRoutes = require('./routes/invoices');
const leaveRequestRoutes = require('./routes/leave_requests');
const documentRoutes = require('./routes/documents');
const recruitmentRoutes = require('./routes/recruitment');
const crmRoutes = require('./routes/crm');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/workers', workerRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/deployments', deploymentRoutes);
app.use('/api/payroll', payrollRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/leave-requests', leaveRequestRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/recruitment', recruitmentRoutes);
app.use('/api/crm', crmRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
    },
  });
});

module.exports = app;

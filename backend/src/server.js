require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'development'}` });
const app = require('./app');

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () => {
  console.log(`🚀 ManForce ERP Backend running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  console.log(`📄 API Documentation: http://localhost:${PORT}/api-docs`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

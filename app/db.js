const sql = require('mssql');

// Connection string from Azure App Service settings
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER, // e.g. kansure-sql-server.database.windows.net
  database: process.env.DB_NAME,
  options: {
    encrypt: true, // Required for Azure SQL
    trustServerCertificate: false
  }
};

async function getPool() {
  try {
    return await sql.connect(config);
  } catch (err) {
    console.error("Database connection failed:", err);
    throw err;
  }
}

module.exports = { getPool };

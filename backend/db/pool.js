const mysql2 = require("mysql2");

const pool = mysql2.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "manager",
  database: process.env.DB_NAME || "project_db",
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 3,
  queueLimit: 0,
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ DB Connection Failed:", err.message);
  } else {
    console.log("✅ DB Connected Successfully");
    connection.release();
  }
});

module.exports = pool;

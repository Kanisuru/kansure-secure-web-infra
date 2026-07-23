const express = require('express');
const router = express.Router();
const { getPool } = require('../db');

// GET all users
router.get('/', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query('SELECT TOP 10 * FROM Users');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching users");
  }
});

module.exports = router;

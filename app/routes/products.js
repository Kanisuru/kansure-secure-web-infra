const express = require('express');
const router = express.Router();
const { getPool } = require('../db');

// GET all products
router.get('/', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query('SELECT TOP 10 * FROM Products');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching products");
  }
});

module.exports = router;

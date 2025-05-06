// routes/questions.js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM questions');
    res.json(result.rows);
  } catch (error) {
    console.error('DB 오류:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const db = require('../db');

// 전체 final_results 반환
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM final_results ORDER BY timestamp DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('❌ final_results 조회 실패:', err);
    res.status(500).json({ error: '데이터 조회 실패' });
  }
});

module.exports = router;

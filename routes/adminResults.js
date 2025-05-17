const express = require('express');
const router = express.Router();
const db = require('../db');

// 관리자용 전체 결과 조회
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM final_results ORDER BY timestamp DESC');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('❌ 관리자 결과 조회 실패:', error);
    res.status(500).json({ error: '결과 조회 오류' });
  }
});

module.exports = router;

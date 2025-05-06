const express = require('express');
const router = express.Router();
const db = require('../db');

// 인증된 기기 목록 전체 조회
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM certified_devices');
    res.json(result.rows);
  } catch (error) {
    console.error('DB 오류:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

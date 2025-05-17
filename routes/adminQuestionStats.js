const express = require('express');
const router = express.Router();
const db = require('../db');

// 문항별 정답률 통계 API
router.get('/', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
        r.question,
        q.section,
        q.source,
        q.answer AS correct_answer,
        COUNT(*) AS total_responses,
        SUM(CASE WHEN r.answer = q.answer THEN 1 ELSE 0 END) AS correct_count
      FROM responses r
      LEFT JOIN questions q ON r.question = q.question
      GROUP BY r.question, q.section, q.source, q.answer
      ORDER BY total_responses DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('❌ 문항 통계 조회 실패:', err);
    res.status(500).json({ error: '문항 통계를 불러오는 데 실패했습니다.' });
  }
});

module.exports = router;

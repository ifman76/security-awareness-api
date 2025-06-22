const express = require('express');
const router = express.Router();
const db = require('../db');

// 사용자 응답 저장 (복수 처리용)
router.post('/', async (req, res) => {
  console.log('📥 응답 요청 바디:', req.body);
  const { responses } = req.body;

  if (!responses || !Array.isArray(responses)) {
    return res.status(400).json({ error: 'responses 배열이 필요합니다' });
  }

  try {
    const inserted = [];

    for (const r of responses) {
      const { participant_id, section, question, answer, answer_index, timestamp } = r;

      if (!participant_id || !question || answer_index === undefined) continue;

      const result = await db.query(
        `INSERT INTO responses (participant_id, section, question, answer, answer_index, timestamp)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
        [participant_id, section, question, answer, answer_index, timestamp || new Date().toISOString()]
      );

      inserted.push(result.rows[0]);
    }

    res.status(201).json({ inserted_count: inserted.length });
  } catch (error) {
    console.error('응답 저장 실패:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const db = require('../db');

// 사용자 응답 저장
router.post('/', async (req, res) => {
  const responses = req.body.responses;

  if (!Array.isArray(responses) || responses.length === 0) {
    return res.status(400).json({ error: 'responses array is required' });
  }

  try {
    const results = [];

    for (const r of responses) {
      const { participant_id, section, no, answer, answer_index } = r;

      if (!no || answer === undefined) {
        console.warn(`❌ 응답 누락: no: ${no}, answer: ${answer}`);
        continue; // 필수값 없는 항목은 건너뜀
      }

      const result = await db.query(
        `INSERT INTO responses (participant_id, section, question, answer, answer_index)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [participant_id, section, no, answer, answer_index]
      );

      results.push(result.rows[0]);
    }

    res.status(201).json({ saved: results.length, data: results });
  } catch (error) {
    console.error('응답 저장 실패:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

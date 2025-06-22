const express = require('express');
const router = express.Router();
const db = require('../db');

// 사용자 응답 저장 (단건 + 복수 처리 지원)
router.post('/', async (req, res) => {
  console.log('📥 응답 요청 바디:', req.body);

  let responses = [];

  // ✅ 단건: responses 배열이 없고 객체 필드만 있는 경우
  if (Array.isArray(req.body.responses)) {
    responses = req.body.responses;
  } else if (req.body.participant_id && req.body.question) {
    responses = [req.body]; // 단건을 배열로 변환
  } else {
    return res.status(400).json({ error: 'responses 배열 또는 단일 응답 데이터가 필요합니다' });
  }

  try {
    const inserted = [];

    for (const r of responses) {
      const { participant_id, section, question, answer, answer_index, timestamp } = r;

      if (!participant_id || !question || answer_index === undefined) {
        console.warn('❌ 누락된 응답 필드:', r);
        continue;
      }

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
    console.error('❌ 응답 저장 실패:', error);
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;

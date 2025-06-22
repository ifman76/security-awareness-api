const express = require('express');
const router = express.Router();
const db = require('../db');

console.log(req.body);

// 사용자 응답 저장
router.post('/', async (req, res) => {
  const { participant_id, section, no, answer, answer_index } = req.body;

  if (!no || answer === undefined) {
    return res.status(400).json({ error: 'no and answer are required' });
  }

  try {
    const result = await db.query(
      `INSERT INTO responses (participant_id, section, question, answer, answer_index)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [participant_id, section, no, answer, answer_index]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('응답 저장 실패:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

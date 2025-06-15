const express = require('express');
const router = express.Router();
const db = require('../db'); // PostgreSQL 연결 모듈

router.post('/pilot-feedback', async (req, res) => {
  const { difficult_question_ids, additional_feedback, timestamp } = req.body;

  if (!Array.isArray(difficult_question_ids)) {
    return res.status(400).json({ error: 'difficult_question_ids must be an array' });
  }

  try {
    await db.query(
      `INSERT INTO pilot_feedback (difficult_question_ids, additional_feedback, submitted_at)
       VALUES ($1, $2, $3)`,
      [difficult_question_ids, additional_feedback, timestamp]
    );

    res.status(200).json({ message: 'Feedback submitted successfully' });
  } catch (err) {
    console.error('❌ DB insert error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

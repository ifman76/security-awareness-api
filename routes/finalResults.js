const express = require('express');
const router = express.Router();
const db = require('../db');

// 점수 저장
router.post('/', async (req, res) => {
  try {
    const {
      participant_id, ageGroup, gender, occupation,
      aiExperience, selfAssessment,
      knowledgeScore, deviceScore, behaviorScore, totalScore,
      ownedDevices, timestamp
    } = req.body;

    const result = await db.query(
      `INSERT INTO final_results (
        participant_id, age_group, gender, occupation,
        ai_experience, self_assessment,
        knowledge_score, device_score, behavior_score, total_score,
        owned_devices, timestamp
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
       RETURNING *`,
      [
        participant_id, ageGroup, gender, occupation,
        aiExperience, selfAssessment,
        knowledgeScore, deviceScore, behaviorScore, totalScore,
        JSON.stringify(ownedDevices), timestamp
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('❌ 점수 저장 실패:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

const allowedOrigins = ['https://security-awareness-frontend.vercel.app'];
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true
}));

app.use(express.json());  // 반드시 필요


const adminResponsesRoute = require('./routes/adminResponses'); // ✅ 새 파일 import
const adminQuestionStatsRoute = require('./routes/adminQuestionStats');
const adminFinalResultsRoute = require('./routes/adminFinalResults');
const pilotFeedbackRoute = require('./routes/pilotFeedback');

app.use('/admin/responses', adminResponsesRoute); // ✅ 경로 설정
app.use('/admin/question-stats', adminQuestionStatsRoute);
app.use('/admin/final-results', adminFinalResultsRoute);
app.use('/api', pilotFeedbackRoute); // ✅ 라우터 연결






// 라우터 등록
const questionsRoute = require('./routes/questions');
const devicesRoute = require('./routes/devices');
const finalResultsRoute = require('./routes/finalResults');
const responsesRoute = require('./routes/responses');

const adminResultsRoute = require('./routes/adminResults');  // ✅ 추가
app.use('/admin/results', adminResultsRoute);                // ✅ 경로 연결


app.use('/questions', questionsRoute);
app.use('/certified-devices', devicesRoute);
app.use('/final-results', finalResultsRoute);
app.use('/responses', responsesRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ API 서버 실행 중: http://localhost:${PORT}`));

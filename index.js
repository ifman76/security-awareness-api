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

// 라우터 등록
const questionsRoute = require('./routes/questions');
const devicesRoute = require('./routes/devices');
const finalResultsRoute = require('./routes/finalResults');
const responsesRoute = require('./routes/responses');

app.use('/questions', questionsRoute);
app.use('/certified-devices', devicesRoute);
app.use('/final-results', finalResultsRoute);
app.use('/responses', responsesRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ API 서버 실행 중: http://localhost:${PORT}`));

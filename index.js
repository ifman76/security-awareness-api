const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const questionsRoute = require('./routes/questions');
const devicesRoute = require('./routes/devices'); // ✅ 추가

const finalResultsRoute = require('./routes/finalResults');
app.use('/final-results', finalResultsRoute);


app.use(cors());
app.use(express.json());
app.use('/questions', questionsRoute);
app.use('/certified-devices', devicesRoute); // ✅ 추가

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ API 서버 실행 중: http://localhost:${PORT}`));

const responsesRoute = require('./routes/responses'); // ✅ 추가
app.use('/responses', responsesRoute); // ✅ 추가

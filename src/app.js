const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes'); 

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
//app.use('/api/scan', scanRoutes);
const HOST = 0.0.0.0;
const PORT = 8000;
app.listen(PORT,HOST, () => {
  console.log(`Server running on port ${PORT}`);
});

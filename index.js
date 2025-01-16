const express = require('express');
const axios = require('axios');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'))

const BACKEND_BASE_URL = 'http://python-backend:8000/api';

// Обработчик для всех запросов, начинающихся с /auth/
app.post('/auth/*', async (req, res) => {
    const endpoint = req.originalUrl; // Получаем полный URL запроса
    console.log(`POST ${endpoint}`);
    console.log('Request body:', req.body);

    try {
        const response = await axios.post(`${BACKEND_BASE_URL}${endpoint}`, req.body);
        console.log('Backend response:', response.data);
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error(`Error in ${endpoint}:`, error.response?.data || error.message);
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ error: 'Server error' });
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

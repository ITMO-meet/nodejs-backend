const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();
const PORT = 3000;

// Настройки CORS для фронтенда
app.use(cors({ origin: 'http://185.178.47.42' }));

// Парсинг JSON-запросов
app.use(bodyParser.json());
app.use(morgan('dev'))

// Базовый URL бекенда
const BACKEND_BASE_URL = 'http://185.178.47.42:8000';

// Прокси для маршрута авторизации
app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;

    // Логирование входящего запроса
    console.log('POST /api/auth/login');
    console.log('Request body:', req.body);

    try {
        const response = await axios.get(`${BACKEND_BASE_URL}/auth/login_with_password`, {
            params: { username, password },
        });

        // Логирование ответа от бекенда
        console.log('Backend response:', response.data);

        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error in /api/auth/login:', error.response?.data || error.message);
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ error: 'Server error' });
        }
    }
});

app.post('/api/auth/register', async (req, res) => {
    console.log('POST /api/auth/register');
    console.log('Request body:', req.body);

    try {
        const response = await axios.post(`${BACKEND_BASE_URL}/auth/register/select_username`, req.body);

        console.log('Backend response:', response.data);

        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error in /api/auth/register:', error.response?.data || error.message);
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

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'))

const BACKEND_BASE_URL = 'http://185.178.47.42:8000';

app.post('/auth/login_with_password', async (req, res) => {

    console.log('POST /auth/login_with_password');
    console.log('Request body:', req.body);

    try {
        const response = await axios.post(`${BACKEND_BASE_URL}/auth/login_with_password`, req.body);

        console.log('Backend response:', response.data);

        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error in /auth/login_with_password:', error.response?.data || error.message);
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ error: 'Server error' });
        }
    }
});

// app.post('/auth/register/select_username', async (req, res) => {
//     console.log('POST /auth/register/select_username');
//     console.log('Request body:', req.body);

//     try {
//         const response = await axios.post(`${BACKEND_BASE_URL}/auth/register/select_username`, req.body);

//         console.log('Backend response:', response.data);

//         res.status(response.status).json(response.data);
//     } catch (error) {
//         console.error('Error in /auth/register/select_username:', error.response?.data || error.message);
//         if (error.response) {
//             res.status(error.response.status).json(error.response.data);
//         } else {
//             res.status(500).json({ error: 'Server error' });
//         }
//     }
// });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

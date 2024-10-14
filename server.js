const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files

const WINSTON_API_KEY = '<INSERT API KEY HERE>';

app.post('/check-plagiarism', async (req, res) => {
    const text = req.body.text;

    try {
        const response = await axios.post('https://api.gowinston.ai/v2/plagiarism', {
            text: text
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${WINSTON_API_KEY}`
            }
        });
        
        const plagiarismReport = response.data;
        res.json(plagiarismReport);
    } catch (error) {
        console.error('Error while checking plagiarism:', error.response ? error.response.data : error.message);
        res.status(500).send('Error while checking plagiarism');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

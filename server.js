const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.json({ message: 'Hello from Pxxl!' }));
app.get('/health', (req, res) => res.status(200).json({ status: 'OK' }));

app.listen(PORT, '0.0.0.0', () => console.log('Server running on port ' + PORT));

const express = require('express');
const app = express();
const port = 3000;

const cors = require('cors');

const api = require('./routes/api');

const corsOptions = {
    origin: ['http://localhost:5000'],
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', api);

app.listen(port, () => {
    console.log(`office queue management backend server successfully started, listening on port ${port}`);
});
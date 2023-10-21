const express = require('express');
const app = express();
const port = 5000;

const cors = require('cors');
const db = require("./dao/db");

const api = require('./routes/api');
const { getAvailableServices } = require('./controllers/services');
const { getTicketDetails } = require('./controllers/tickets');

const corsOptions = {
    origin: ['http://localhost:3000'],
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', api);


// testing db connection done by Magliari Elio
getAvailableServices();
getTicketDetails();




app.listen(port, () => {
    console.log(`office queue management backend server successfully started, listening on port ${port}`);
});

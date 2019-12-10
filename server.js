const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//body parser setup
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//CORS
const cors = require('cors');
app.use(cors());

app.use(express.static('website'));

const port = 3000;

const server = app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

// the main endpoint
let projectData = {};

app.get('/all', (req, res) => {
    res.send(projectData);
});

app.post('/add', (req, res) => {
    projectData.temperature = req.body.temperature;
    projectData.date = req.body.date;
    projectData.userResponse = req.body.userResponse;
});
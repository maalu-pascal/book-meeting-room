const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5030;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/hello', (req, res) => {
    res.send({ express: 'Hello From Expressss' });
});
app.post('/world', (req, res) => {
    console.log(req.body);
    res.send(
        `I received your POST request. This is what you sent me: ${req.body.post}`,
    );
});

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(express.static('./../../public'));

// var express = require('express');
// var app = express();

// app.use(express.static(__dirname +'./../../')); //serves the index.html
// var server = app.listen(3020, function () {
//    console.log("app running on port.", server.address().port);
// });
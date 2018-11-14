const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5030;

app.use(express.static(__dirname + './../../')); //serves the index.html
app.get('/', (req, res) => {
    res.send({ test: 'Hello' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));



// 

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.post('/newUser', function (req, res) {
    let name = req.body.Name,
    color = req.body.Colour;
    res.send("User Added" + name + ' ' + color);
});




// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));


// app.post('/world', (req, res) => {
//     console.log(req.body);
//     res.send(
//         `I received your POST request. This is what you sent me: ${req.body.post}`,
//     );
// });

// app.get('/', (req, res) => {
//     const customers = [
//         { id: 1, firstName: 'John', lastName: 'Doe' },
//         { id: 2, firstName: 'Brad', lastName: 'Traversy' },
//         { id: 3, firstName: 'Mary', lastName: 'Swanson' },
//     ];
//     res.json(customers);
// });

// var express = require('express');
// var app = express();

// app.use(express.static(__dirname +'./../../')); //serves the index.html
// var server = app.listen(3020, function () {
//    console.log("app running on port.", server.address().port);
// });
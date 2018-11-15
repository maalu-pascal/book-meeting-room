const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5030;

const PATH_root = "/var/www/html/book-room";
const entries = [];

app.use(express.static(__dirname + './../../')); //serves the index.html
app.use(express.static('src/client'))
app.use(express.static('src/client/components'))

app.get('/', function (req, res) {
    // res.sendFile(PATH_root + '/index.html')
    res.sendFile(__dirname + './../../')
})


app.get('/getRoomList', function (req, res) {
    res.send(roomDetails);
})

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.post('/new-booking-test', function (req, res) {
    const newEntry = {
        name: req.body.userName,
        from: req.body.from,
        to: req.body.to,
        room : req.body.room
    }
    entries.push(newEntry);
    console.log(entries);
    // console.log(PATH_root +"/index.html");
    
    res.redirect('/');
    // res.sendFile(PATH_root + "/index.html");
});




app.post('/success', (req, res) => {
    const customers = [
        { id: 1, firstName: 'John', lastName: 'Doe' },
        { id: 2, firstName: 'Brad', lastName: 'Traversy' },
        { id: 3, firstName: 'Mary', lastName: 'Swanson' },
    ];
    // res.json(customers);
});


const roomDetails = [
    {
        'name': 'Ada',
        'booked': [],
    },
    {
        'name': 'Babage',
        'booked': []
    },
    {
        'name': 'Neuman',
        'booked': []
    },
    {
        'name': 'Pascal',
        'booked': []
    },
    {
        'name': 'Turing',
        'booked': []
    }
]

const userDetails = [];

// app.get('/')

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(PATH_root + '/index.html'));
// });


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
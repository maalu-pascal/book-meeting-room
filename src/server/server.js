const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5020;

const PATH_root = "/var/www/html/book-room";

app.use(express.static(__dirname + './../../')); //serves the index.html
app.use(express.static('src/client'))
app.use(express.static('src/client/components'))

app.get('/', function (req, res) {
    // res.sendFile(PATH_root + '/index.html')
    res.sendFile(__dirname + './../../')
})


app.get('/getData', function (req, res) {
    res.send(data);
})

app.get('/getRoomDetails', function (req, res) {
    res.send([data.roomDetails, data.roomBookings ]);
})

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(bodyParser.json());       
app.use(bodyParser.urlencoded({     
    extended: true
}));

app.use(express.json());      
app.use(express.urlencoded()); 

app.post('/new-booking-test', function (req, res) {

    const user = data.users.find((user)=>{ return(user.name.toUpperCase() === req.body.userName.toUpperCase())});
    
    const room = data.roomDetails.find((room) => { return (room.name === req.body.room); });
    let newEntry = {};

    if (room && user) {
        newEntry = {
            "id": `id-${new Date().getTime()}`,
            "userId": user.id,
            "roomId": room.id,
            "from": req.body.from,
            "to": req.body.to,
            "date":`${new Date()}`
        };
        data.roomBookings.push(newEntry);
        room.booked.push(newEntry.id);
        user.bookings.push(newEntry.id);
    }
    console.log("data : ",data);
    res.redirect('/');
});

const data = {
    "roomDetails": [
        {
            'id': '00201',
            'name': 'Ada',
            'booked': [],
        },
        {
            'id': '00202',
            'name': 'Babage',
            'booked': []
        },
        {
            'id': '00203',
            'name': 'Neuman',
            'booked': []
        },
        {
            'id': '00204',
            'name': 'Pascal',
            'booked': []
        },
        {
            'id': '00205',
            'name': 'Turing',
            'booked': []
        }
    ],
    "roomBookings": [],
    "users": [
        {
            "id": "0101",
            "name": "Maalu",
            "bookings":[]
        },
        {
            "id": "0102",
            "name": "Lida",
            "bookings":[]
        },
        {
            "id": "0103",
            "name": "Alan",
            "bookings":[]
        },
        {
            "id": "0104",
            "name": "Akshay",
            "bookings":[]
        },
    
    ]
};
// app.get('*', (req, res) => {
//     res.sendFile(path.join(PATH_root + '/index.html'));
// });

// var server = app.listen(3020, function () {
//    console.log("app running on port.", server.address().port);
// });
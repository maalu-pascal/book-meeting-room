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
    res.send([data.roomDetails, data.roomBookings]);
})

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.json());
app.use(express.urlencoded());

//WIP
//rendered when the new booking form is submitted.
app.post('/new-booking', function (req, res) {

    const user = data.users.find((user) => { return (user.name.toUpperCase() === req.body.userName.toUpperCase()) });
    const room = data.roomDetails.find((room) => { return (room.name === req.body.room); });

    let newBooking = {};

    if (room && user) {
        newBooking = {
            "id": `id-${new Date().getTime()}`,
            "userId": user.id,
            "roomId": room.id,
            "from": req.body.from,
            "to": req.body.to,
            "date": `${new Date()}`
        };
        data.roomBookings.push(newBooking);


        let bookings = data.roomBookings.filter((roomBooking) => {
            let found = room.booked.find((booking) => {
                return (booking === roomBooking.id)
            });

            if (found) { return roomBooking };
        });
        console.log("all bookings of this room:", bookings);

        let index = -1;
        if (room.booked.length > 0) {
            let bookingIndex;
            console.log("room.booked : ", room.booked);

            index = room.booked.findIndex((previousBooked) => {
                if (bookings.length > 0) {
                    bookingIndex = bookings.find((booking) => {
                        console.log("booking :", booking);
                        console.log("newBooking.from , booking.from : ", newBooking.from, booking.from);

                        return newBooking.from < booking.from;

                    });

                }
                console.log("previousBooked", previousBooked);
                if (bookingIndex >= 0) {
                    return previousBooked;
                }
            })
        }

        console.log(index);

        // if (index < 0) { index = roomDetail.booked.length; }
        // roomDetail.booked.splice(index, 0, newBooking);


        
        room.booked.push(newBooking.id);

        user.bookings.push(newBooking.id);
    }
    console.log("data : ", data);
    res.redirect('/');
});

//To delete a booking.
app.delete('/booking', (req, res) => {
    console.log("delete: ", req.body);

    let id = req.body.id;
    let bookingIndex = data.roomBookings.findIndex((roomBooking) => {
        return (roomBooking.id === id)
    });

    data.users.map((user) => {
        if(user.id === data.roomBookings[bookingIndex].userId) {
            let userBookingIndex = user.bookings.indexOf(id);
            user.bookings.splice(userBookingIndex, 1);
        }
    });

    data.roomDetails.map((roomBooked) => {
        if(roomBooked.id === data.roomBookings[bookingIndex].roomId) {
            let roomBookingIndex = roomBooked.booked.indexOf(id);
            roomBooked.booked.splice(roomBookingIndex, 1);
        }
    });

    if (bookingIndex >= 0) {
        data.roomBookings.splice(bookingIndex, 1);        
        res.send({ status: "Deleted" });
    } else {
        res.send({ status: "Booking not found" });
    }
});

//All datas stored in a JSON variable.
const data = {
    "roomDetails": [
        {
            'id': '00201',
            'name': 'Ada',
            'booked': ['id-1542709745054'],
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
    "roomBookings": [{
        id: 'id-1542709745054',
        userId: '0101',
        roomId: '00201',
        from: '09:00',
        to: '09:30',
        date: 'Tue Nov 20 2018 15:59:05 GMT+0530 (IST)'
    }],
    "users": [
        {
            "id": "0101",
            "name": "Maalu",
            "bookings": ['id-1542709745054']
        },
        {
            "id": "0102",
            "name": "Lida",
            "bookings": []
        },
        {
            "id": "0103",
            "name": "Alan",
            "bookings": []
        },
        {
            "id": "0104",
            "name": "Akshay",
            "bookings": []
        },

    ]
};

// app.get('*', (req, res) => {
//     res.sendFile(path.join(PATH_root + '/index.html'));
// });
const express = require('express');
const cors = require('cors');
const events = require('events');
const PORT = 5001;

const emmiter = new events.EventEmitter();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/get-messages', ((req, res) => {
    emmiter.once('newMessage', (message) => {
        res.json(message)
    })
}))

app.post('/new-messages', ((req, res) => {
    const message = req.body;
    emmiter.emit('newMessage', message)
    res.status(200);

}))



app.listen(PORT, () => console.log(`server started oon Port ${PORT}`));
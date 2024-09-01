const ws = require('ws');

const wss = new ws.Server({
    port: 5001,
}, () => console.log('Server started on 5001'));


wss.on('connection', function connection(ws){
    // ws.id = Date.now()
    ws.on('message', function (message){
        message = JSON.parse(message);
        switch (message.event){
            case 'message':
                broadcastMessage(message)
                break;
            case 'connection':
                broadcastMessage(message)
                break;
        }

    })
})

function broadcastMessage(message, id){
    // if(client.id === id){
        // client.send(JSON.stringify(message))
    // }
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message))
    })
}

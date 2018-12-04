
module.exports = function(server) {

    var io = require('socket.io')(server, {
        transports: ['websocket'],
    });

    io.on('connection', function(socket) {
        console.log('Connected: ' + socket.id);

        socket.on('disconnect', function(reson) {
            console.log('Disconnected: ' + socket.id);
        });

        socket.on('message', function(msg) {
            console.dir(msg);
            socket.broadcast.emit('chat', msg);
        });
    });
};

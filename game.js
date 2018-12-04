
module.exports = function(server) {

    var io = require('socket.io')(server, {
        transports: ['websocket'],
    });

    io.on('connection', function(socket) {
        console.log('Connected: ' + socket.id);

        socket.on('disconnect', function(reson) {
            console.log('Disconnected: ' + socket.id);
        });

        socket.on('hi', function() {
            console.log('Hi~~');
            socket.emit('hello');
        });
    });
};

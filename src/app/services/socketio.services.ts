import { Server } from 'socket.io';
import { formatMessage } from '../utils/messages';
import { userJoin, getCurrentUser, userLeave, getRoomUsers } from '../utils/users';

// initialize and instantiate socketio
export const io = new Server();
const botName = 'ChatCord Bot';

io.on('connection', (socket) => {

    socket.on('joinRoom', ({ username, room }) => {
        const user = userJoin(socket.id, username, room);
        socket.join(user.room);

        //welcomes current user
        socket.emit('message', formatMessage(botName, 'Welcome to chatCord!'));

        //Broadcast when a user connects
        socket.broadcast
            .to(user.room)
            .emit('message', formatMessage(botName, `${user.username} has join the chat`));

        //sends user and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
    });

    //listen for chat message
    socket.on('chatMessage', (msg) => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message', formatMessage(user.username, msg));
    });

    //runs when a user disconnect
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        if (user) {
            io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`));
            
            //sends user and room info
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }
    });
})
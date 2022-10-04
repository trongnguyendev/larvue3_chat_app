import { io } from "socket.io-client";

const BACKEND_SERVER = 'http://192.168.1.86:6002';
const socket = io(BACKEND_SERVER);

function createWebSocketServer(socket) {
    return (store) => {
        store.$socket = socket;

        // events
        // typing
        socket.on('typing', async (data) => {
            store.commit('messageUser/SET_TYPING', data);

            setTimeout(() => {
                data.type = false
                store.commit('messageUser/SET_TYPING', data);
              }, 2000);
            
        });

        // stop typing
        socket.on('stopTyping', (msg) => {
        });

        socket.on('initial_room', () => {

        });

        // initial join room with list friend 
        store.subscribe((mutation, state) => {
            if(mutation.type === 'user/SET_FRIEND') {
                let auth = state.user.user;
                let friends = state.user.friends_current;
                let rooms = [];

                friends.forEach((friend, index) => {
                    let friend_id = friend.user_id;
                    let room = (auth.id > friend_id) ? (auth.id + "_" + friend_id + "_room") :  (friend_id + "_" + auth.id + "_room");
                    rooms.push(room);
                })
                rooms.push(auth.id + "_room");
                socket.emit('initial_join_room', rooms);
            }
        })

        // on request friend
        socket.on('request friend', (data) => {
            store.commit('relationFriend/PUSH_REQUEST_FRIEND', data);
            store.dispatch('user/getFriendsByStatus', {'status': 2})
            store.dispatch('user/getLastMessageByGroupName')
        });

        socket.on('accept friend', (data) => {
            store.dispatch('user/getFriendsByStatus', {'status': 2})
            store.dispatch('user/getLastMessageByGroupName')
        })

        socket.on('connectToRoom', (data) => {
            console.log("connect to room: " + data);
        })
    }
}

export const webSocketServer = createWebSocketServer(socket);

export default socket;
import IO from 'socket.io-client'

const config = {
  server: process.env.NODE_ENV === 'development' ? '//localhost:3000' : '',
}

const options = {
  reconnectionDelay: 3000,
};
const socket = new IO(config.server, options);
export default socket;
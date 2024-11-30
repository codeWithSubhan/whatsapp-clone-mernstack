const { Server } = require("socket.io");

const socketSetup = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  let users = [];

  const addUser = (userData, socketId) => {
    !users.some((user) => user.sub === userData.sub) &&
      users.push({ ...userData, socketId });
  };

  const getUser = (userId) => {
    return users.find((user) => user.sub === userId);
  };

  io.on("connection", (socket) => {
    console.log("New WebSocket connection");

    // store all online users
    socket.on("addUser", (userData) => {
      addUser(userData, socket.id);
      io.emit("getUsers", users);
    });

    //send message
    socket.on("sendMessage", (data) => {
      const user = getUser(data.receiverId);
      io.to(user.socketId).emit("getMessage", data);
    });
  });
};

module.exports = socketSetup;

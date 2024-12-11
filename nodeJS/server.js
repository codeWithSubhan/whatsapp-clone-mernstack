const mongoose = require("mongoose");
const dotenv = require("dotenv");
const http = require("http");

dotenv.config({ path: "./config.env" });
const toJSONPlugin = require("./utils/toJSONPlugin");
mongoose.plugin(toJSONPlugin);

// handle uncaughtException (synchronous code)
// console.log(x);
process.on("uncaughtException", (err) => {
  console.log("Error:", err.name, err.message);
  console.log("Full Error:", err);
  process.exit(1);
});

const app = require("./app");

const server = http.createServer(app);

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(console.log("DB connected successfully"))
  .catch((err) => console.log("err:", err));

const port = process.env.PORT || 4000;

server.listen(port, () =>
  console.log(`App is running on http://localhost:${port}`)
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    // origin: "http://localhost:3000",
    origin: "whatsapp-clone-mernstack-q7li.vercel.app",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});

// handle unhandledRejection (assynchronous code)
process.on("unhandledRejection", (err) => {
  console.log("Error:", err.name, err.message);
  console.log("Full Error:", err);
  server.close(() => process.exit(1));
});

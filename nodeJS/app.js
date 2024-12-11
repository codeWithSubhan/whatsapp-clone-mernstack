const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/userRoutes");
const chatRouter = require("./routes/chatRoutes");
const messageRouter = require("./routes/messageRoutes");
const globalError = require("./controllers/errorController");

const app = express();

app.use(
  cors({
    origin: "https://whatsapp-clone-mernstack-d5bt.vercel.app",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/chats", chatRouter);
app.use("/api/v1/messages", messageRouter);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.all("*", (req, res) => {
  res.status(404).json({ message: `Can't Find ${req.originalUrl} URL!` });
});

app.use(globalError);

module.exports = app;

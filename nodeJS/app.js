const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const userRouter = require("./routes/userRoutes");
const conversationRouter = require("./routes/conversationRoutes");
const messageRouter = require("./routes/messageRoutes");

const app = express();

app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use("/api/users", userRouter);
app.use("/api/conversation", conversationRouter);
app.use("/api/message", messageRouter);

app.all("*", (req, res) => {
  res.status(404).json({ message: `Can't Find ${req.originalUrl} URL!` });
});

module.exports = app;

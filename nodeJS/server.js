const mongoose = require("mongoose");
const dotenv = require("dotenv");
const http = require("http");
const socketSetup = require("./socket");

dotenv.config({ path: "./config.env" });

const app = require("./app");

const server = http.createServer(app);

socketSetup(server);

// handle uncaughtException (synchronous code)
// console.log(x);
process.on("uncaughtException", (err) => {
  console.log("Error:", err.name, err.message);
  console.log("Full Error:", err);
  process.exit(1);
});

// handle unhandledRejection (assynchronous code)
process.on("unhandledRejection", (err) => {
  console.log("Error:", err.name, err.message);
  console.log("Full Error:", err);
  server.close(() => process.exit(1));
});

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

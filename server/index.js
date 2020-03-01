import express from "express";
// import path from "path";
import logger from "morgan";
import mongoose from "mongoose";
import cors from "cors";

import dbConfig from "./config/db";
import commonConfig from "./config/common";
import musicRoutes from "./routes/music";

const app = express();
const PORT = commonConfig.PORT;

mongoose.Promise = global.Promise;
// mongoose.set("useCreateIndex", true);
mongoose.connect(dbConfig.dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true, // http://bit.ly/2D8WfT6
  // reconnectTries: Number.MAX_VALUE // deprecated
  useCreateIndex: true
});

const db = mongoose.connection;
/* eslint-disable */
db.on("error", (err) => console.log("Mongoose connection error: ", err));
db.on("connected", () => console.log("Mongoose connected"));
db.on("reconnected", () => console.log("Mongoose reconnected"));
db.on("disconnected", () => console.log("Mongoose disconnected"));

process.on("SIGINT", () => {
  console.log("Received SIGINT");
  db.close(() => {
    console.log("Mongoose default connection disconnected through app termination");
    process.exit(0);
  });
});

process.on("SIGTERM", () => {
  console.log("Received SIGTERM");
  db.close(() => {
    console.log("Mongoose default connection disconnected through app termination");
    process.exit(0);
  });
});

process.on("unhandledRejection", (error, promise) => {
  const stack = new Error().stack;
  console.error("unhandledRejection", error, promise, stack); // eslint-disable-line no-console
});

process.on("uncaughtException", (error) => {
  const stack = new Error().stack;
  console.error("uncaughtException", error, stack); // eslint-disable-line no-console
});
/* eslint-enable */

app.use(cors());
app.use(logger("dev"));
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: false }));

app.use("/uploads", express.static("uploads"));
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.json("Hello world");
});

app.use("/api/music", musicRoutes);

app.listen(PORT, () => console.log(`App is running on ${PORT} -> http://localhost:${PORT}`)); // eslint-disable-line no-console

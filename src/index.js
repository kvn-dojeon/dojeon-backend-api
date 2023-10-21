import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import db from "./models/index.js";
import apiRoute from "./routes/index.js";

dotenv.config();

const app = express();

db.sequelize.sync();

var corsOptions = {
  origin: process.env.BASE_URL ?? "http://localhost:8080",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to DOJEON application." });
});

app.use("/api", apiRoute);

app.use("/api/uploads", express.static("uploads"));

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

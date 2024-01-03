import dotenv from "dotenv";
dotenv.config();
import express, { urlencoded, json } from "express";
const app = express();

// Connect db
import connect from "./db/connect.js";
import urlRouter from "./routes/url.js";

//middleware
app.use(urlencoded({ extended: true }));
app.use(json());

app.use("/api/v1", urlRouter);
app.get("/", (req, res) => {
  res.send("<h1>WELCOME</h1>");
});

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () => {
      connect(process.env.MONGO_URI);
      console.log(`Server is listenning on port: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

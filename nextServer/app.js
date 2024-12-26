const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
const orderRouter = require("./routes/order");
const errorMiddleWare = require("./middleware/errors");
const authentication = require("./middleware/auth");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileupload = require("express-fileupload");
const bodyParser = require("body-parser");
//MiddleWares
app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // Allow cookies to be sent with cross-origin requests
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileupload());

app.use("/products", productRouter.router);
app.use("/users", userRouter.router);
app.use("/orders", orderRouter.router);

//Databse Connection
async function connectDatabase() {
  await mongoose.connect(process.env.DB_URL);
  console.log("MongoDB Connected");
}
//Middleware for Error
app.use(errorMiddleWare);

module.exports = { app, connectDatabase };

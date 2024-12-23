const { app, connectDatabase } = require("./app");
const env = require("dotenv");
const cloudinary = require("cloudinary");
env.config("./.env");
//uncaught Error Handling

process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log("Server Shutting Down due to Invalid String in DB");
  process.exit(1);
});

connectDatabase();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log("Server Running");
});

//Unhandled Promis Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log("Server Shutting Down due to INvalid String in DB");

  server.close(() => {
    process.exit(1);
  });
});

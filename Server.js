const express = require("express");
const app = express();
const UserRoute = require("./Routes/User.Route");
const PlayerRoute = require("./Routes/Player.Route");
const AdminRoute = require("./Routes/Admin.Route");
const OrgRoute = require("./Routes/Organization.Route");
const VideoRoute = require("./Routes/Videos.Route");
const NewsRoute = require("./Routes/News.Route");
const colors = require("colors");
const HomeRoute = require("./Routes/Home.Route");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const conectDataBase = require("./DataBase/Connection.DB");
const ErrorMiddleware = require("./Middleware/Error");
const cookieParser = require("cookie-parser");
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`.red);
  console.log(`Shutting down the server due to Unhandled Promise Exeption`.red);
});
app.use(express.static(path.resolve(path.join(__dirname, "../FrontEnd"))));
app.use(bodyParser.json());
app.use(cors({ origin: "*", credentials: true }));
app.use(cookieParser());
conectDataBase();
app.use("/api/v1", UserRoute);
app.use("/api/v2", PlayerRoute);
app.use("/api/v3", OrgRoute);
app.use("/api/v4", VideoRoute);
app.use("/api/v5", NewsRoute);
app.use("/", HomeRoute);
app.use("/", AdminRoute);

app.use(ErrorMiddleware);

const server = app.listen(3000, () => {
  console.log(`Server is Listing on Port 3000`.yellow);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});

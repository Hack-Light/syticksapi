if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// import required modules
const createError = require("http-errors"),
  express = require("express"),
  path = require("path"),
  cors = require("cors"),
  expressip = require("express-ip"),
  app = express(),
  mongoose = require("mongoose"),
  port = process.env.PORT || 3000;
// socket = require("socket.io");

// import routes
let registerRoute = require("./routes/register");
let loginRoute = require("./routes/login");
let indexRoute = require("./routes/index");
let eventRoute = require("./routes/events");

// connect to database
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch(err => console.log(err));

// register required modules
app.enable("trust proxy");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressip().getIpInfoMiddleware);

// app.use(express.static(path.join(__dirname, "assets")));

// register routes
app.use(registerRoute);
app.use(loginRoute);
app.use(indexRoute);
app.use(eventRoute);
// app.use(otpRoute);
// app.use(postsRoute);
// app.use(crimeRoute);
// app.use(userRoute);
// app.use(dashboardRoute);
// app.use(emergencyRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  console.log(err);
});

// listen to the server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

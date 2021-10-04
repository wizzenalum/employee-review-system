const express = require("express");
const db = require("./configs/mongoose");
const expressLayout = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const localStrategy = require('./configs/passport')
const MongoStore = require('connect-mongo')

const port = process.env.PORT||8000;
// creating express app instance
const app = express();

// to parse the body of the req.
app.use(express.urlencoded({ extended: false }));

// to encodeand decode cookies
app.use(cookieParser());

// before all routes this middleware should be called to use layout feature
app.use(expressLayout);

// setting these to layout so that script and style file can move to head and bottom in layout.
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

app.use(express.static("assets")); // setup the

// my own scss middleware to write the files to css folder if any.
const dartScssMiddleware = require("./configs/sass-middleware");
app.use(dartScssMiddleware("assets/scss", "assets/styles"));

// configure the express-session library to read and write to cookies.
// adding middle ware for the sessions
app.use(session({
  name:'employee-review-runinig',
  //TODO change the secreat before deployment in production
  secret:'blahblahblah',
  saveUninitialized:false, // when user is not logged in then should i save extra data.
  resave:false,  // when user is login if session data is not changed it will prevent to resaving again and again
  cookie:{
      maxAge:(1000*60*100)
  },
  store: MongoStore.create(
      {
          mongoUrl:'mongodb://localhost/employee-review',
          autoRemove:'disabled'
      },
      function(err){
          console.log(err||'connect to the mongo connect');
      }
  ),
}));

// initilizing the passport.js
app.use(passport.initialize());
app.use(passport.session());
// this middle ware add user to responce of which can be used to creating the UI.
app.use(passport.setAuthenticatedUser)


// used to see the requests comming to the server TODO: remove in production
app.use((req, res, next) => {
  // this following line will help me to change the color of navigation
  res.locals.urlPath = req.url;
  console.log("Request for: ", `\x1b[36m"${req.url}"\x1b[0m`);
  next();
});
app.use("/", require("./routers"));

// here i set the ejs view engine which inshort converts ejs files to html file
app.set("view engine", "ejs");
app.set("views", "./views");

// server is starts listening
app.listen(port, (error) => {
  if (error) console.log("server connection ERROR", error);
  else console.log("visit application by",'\x1b[36m"CTL+Click"\x1b[0m');
  // Second argument is inserted in place of %s
  console.log('\x1b[33m%s\x1b[0m', `http://localhost:${port}`);  //yellow
});
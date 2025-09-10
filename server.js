const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const db = require("./db/connection.js");
const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require("express-session");
const path = require("path");

const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');

const authController = require('./controllers/auth.js');
const foodsController = require('./controllers/foods.js');

const port = process.env.PORT ? process.env.PORT : '3000';


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passUserToView);

app.get('/', (req, res) => {
  if (req.session.user) {
    res.redirect("/foods");
  } else {
    res.render("index.ejs")
  }
});

app.use('/auth', authController);

app.use(isSignedIn);

app.use('/foods', foodsController);

// app.get('/vip-lounge', (req, res) => {
//   if (req.session.user) {
//     res.send(`Welcome to the party ${req.session.user.username}.`);
//   } else {
//     res.send('Sorry, no guests allowed.');
//   }
// });


app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});

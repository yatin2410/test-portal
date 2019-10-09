const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const groups = require("./routes/api/groups");
const questions = require("./routes/api/questions");
const app = express();
const path = require("path");

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
      extended: true,
      limit:'10mb',
    })
  );
app.use(bodyParser.text({ limit: '10mb' }));
app.use(bodyParser.json({limit:'10mb'}));

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
.connect(
    db,
    { useNewUrlParser: true }
)
.then(() => console.log("MongoDB successfully connected"))
.catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

//render static files

app.use(express.static('public'));

// Routes
app.use("/api/users", users);
app.use("/api/groups", groups);
app.use("/api/questions",questions);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


const port = process.env.PORT || 2121;
app.listen(port,
    () => console.log(`Server up and running on port ${port} !`)
);
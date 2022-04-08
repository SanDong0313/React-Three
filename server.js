const express = require('express');
const passport = require('passport');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const fileupload = require('express-fileupload');
const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoute');
const projectRoutes = require("./routes/projectRoute");
const templateRoute = require('./routes/templateRoute');
const renderRoute = require('./routes/renderRoute');

connectDB();

// dotenv.config({ path: __dirname + '.env' });
dotenv.config();

const app = express();

app.use(cors());


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(fileupload());

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/template', templateRoute);
app.use('/upload', projectRoutes);
app.use('/template', renderRoute);

app.use(express.static("upload"));
app.use(express.static("template"));
// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
  console.log("running production")
}

// const PORT = process.env.PORT || 5000;
const PORT = 5000;

app.listen(PORT, console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`));

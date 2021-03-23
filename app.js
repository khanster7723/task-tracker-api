const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");

const postsRoute = require("./routes/posts");
const tasksRoute = require("./routes/tasks");
const usersRoute = require("./routes/users");

//Middlewares
// app.use('/posts', () => {
//     console.log('This is a middleware running');
// })
app.use(bodyParser.json());

app.use(cors());

app.use("/posts", postsRoute);
app.use("/tasks", tasksRoute);
app.use("/users", usersRoute);

//Routes
app.get("/", (req, res) => {
  res.send("Health Check: We are on home");
});

//Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("DB is connected");
  }
);

//Start Listening
app.listen(process.env.PORT || 5000);

//username - admin
//password - UiILhvioiM4yrojv

//connection string - mongodb+srv://admin:<password>@cluster0.ug6vz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

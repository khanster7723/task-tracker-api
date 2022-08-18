const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const router = express.Router();
require("dotenv/config");

const postsRoute = require("./routes/posts");
const tasksRoute = require("./routes/tasks");
const gadgetsRoute = require("./routes/gadgets");
const usersRoute = require("./routes/users");
const collaboratorsRoute = require("./routes/collaborators");
const notificationsRoute = require("./routes/notifications");

var imgModel = require("./models/Image");

var fs = require("fs");
var path = require("path");
const { route } = require("./routes/posts");

//Middlewares
// app.use('/posts', () => {
//     console.log('This is a middleware running');
// })
app.use(bodyParser.json());

app.use(cors());

app.use("/posts", postsRoute);
app.use("/tasks", tasksRoute);
app.use("/gadgets", gadgetsRoute);
app.use("/users", usersRoute);
app.use("/collaborators", collaboratorsRoute);
app.use("/notifications", notificationsRoute);

app.use(fileUpload());

app.use("/public", express.static(path.join(__dirname, "public")));

//Routes
app.get("/", (req, res) => {
  res.send("Health Check: We are on home");
});

app.post("/imageUpload", (req, res) => {
  console.log(req.files);
  if (req.files === null) {
    return res.status(400).json({ mesg: "No file uploaded" });
  }
  const file = req.files.file;
  file.mv(`${__dirname}/public/uploads/${req.body.username}.jpg`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    console.log(req.body.username);
    var obj = {
      ofusername: req.body.username,
      //name: req.files.file.name,
      name: req.body.username + ".jpg",
      desc: "image for profile",
      img: {
        data: fs.readFileSync(
          path.join(__dirname + "/public/uploads/" + req.body.username + ".jpg")
        ),
        contentType: "image/*",
      },
    };
    console.log(obj);
    imgModel.create(obj, (err, item) => {
      if (err) {
        console.log(err);
      } else {
        item.save();
        res.json({ message: "Image Uploaded Successfully" });
        //res.redirect('/');
      }
    });
  });
});

app.get("/image/:username", (req, res) => {
  imgModel.find({ ofusername: req.params.username }, (err, items) => {
    if (err) {
      console.log(err);
      res.status(500).send("An error occurred", err);
    } else {
      res.json({ items: items });
    }
  });
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

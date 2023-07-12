const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const UserModel = require("./models/users");
const AuthenticationModel = require("./models/authentication");
const path = require("path");
const multer = require("multer");
const bodyParser = require("body-parser");
const cookieparser = require("cookie-parser");
const session = require("express-session");
const { check, validationResult } = require("express-validator");

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "DELETE", "PUT"],
  })
);
app.use(express.json());
app.use(cookieparser());
app.use(bodyParser.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: "false",
      expires: 60 * 60 * 60,
    },
  })
);

mongoose.connect("mongodb://localhost:27017/Crud");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/public/Images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

app.get("/lists", (req, res) => {
  AuthenticationModel.find({})
    .then((authentication) => res.json(authentication))
    .catch((err) => console.log(err));
});

app.post("/signup", (req, res) => {
  AuthenticationModel.create({
    name: req.body.name[0],
    email: req.body.email[0],
    password: req.body.password[0],
  })
    .then((usauthenticationers) => res.json(authentication))
    .catch((err) => res.json(err));
});

app.post(
  "/login",
  [
    check("email", "Emaill length error")
      .isEmail()
      .isLength({ min: 10, max: 30 }),
    check("password", "password length 8-14").isLength({ min: 8, max: 14 }),
  ],
  (req, res) => {
    const email = req.body.email[0];
    const password = req.body.password[0];
    AuthenticationModel.findOne({ email: email }).then((user) => {
      if (user) {
        if (user.password === password) {
          res.json({ Login: true, username: user.name });
        } else {
          res.json({ Login: false });
        }
      } else {
        res.json("No record existed");
      }
    });
  }
);

app.get("/getUsers", (req, res) => {
  UserModel.find({})
    .then(function (users) {
      res.json(users);
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.get("/list", (req, res) => {
  UserModel.find({})
    .then((users) => res.json(users))
    .catch((err) => console.log(err));
});

app.post("/createUser", upload.single("file"), (req, res) => {
  UserModel.create({
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    image: req.file.filename,
  })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.get("/getUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findById({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.put("/updateUser/:id", upload.single("file"), (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate(
    {
      _id: id,
    },
    {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      image: req.file.filename,
    }
  )
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

const port = 4000; // Choose the port you want to use

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

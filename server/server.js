import express from "express";
import cors from "cors";
import axios from "axios";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import session from "express-session";
import "dotenv/config";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(express.json());
app.use(cookieParser());
const saltRounds = 10;

app.use(
  session({
    secret: "iamabinarybard",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

mongoose.connect("mongodb://0.0.0.0:27017/NewsIdDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const savedArticleSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
  urlToImage: String,
});

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const SavedArticle = mongoose.model("SavedArticle", savedArticleSchema);

const User = mongoose.model("User", userSchema);

app.get("/articles", async (req, res) => {
  const api_key = process.env.API_KEY;
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://newsapi.org/v2/top-headlines?country=in&apiKey=" + api_key,
    headers: {},
  };

  axios
    .request(config)
    .then((response) => {
      res.json(response.data.articles);
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching articles." });
    });
});

app.get("/articles/latest", async (req, res) => {
  const api_key = process.env.API_KEY;
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://newsapi.org/v2/top-headlines?country=in&apiKey=" + api_key,
    headers: {},
  };

  axios
    .request(config)
    .then((response) => {
      res.json(response.data.articles);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/get-article/:name", async (req, res) => {
  const api_key = process.env.API_KEY;
  const name = req.params.name;
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://newsapi.org/v2/everything?q=" + name + "&apiKey=" + api_key,
    headers: {},
  };

  axios
    .request(config)
    .then((response) => {
      res.json(response.data.articles);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/save-article", async (req, res) => {
  const articleData = req.body;

  try {
    const existingArticle = await SavedArticle.findOne({
      url: articleData.url,
    });

    if (existingArticle) {
      return res.json({ message: "Article already saved." });
    }

    const savedArticle = new SavedArticle(articleData);
    await savedArticle.save();
    res.json(savedArticle);
  } catch (error) {
    console.error("Error saving article:", error);
    res
      .status(500)
      .json({ error: "An error occurred while saving the article." });
  }
});

app.get("/get-saved-articles", async (req, res) => {
  try {
    const savedArticles = await SavedArticle.find();
    res.json(savedArticles);
  } catch (error) {
    console.error("Error fetching saved articles:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching saved articles." });
  }
});

app.post("/register", (req, res) => {
  const { registerEmail, registerPassword } = req.body;
  bcrypt.hash(registerPassword, saltRounds, function (err, hash) {
    const user = new User({
      email: registerEmail,
      password: hash,
    });
    user
      .save()
      .then((result) => {
        req.session.userId = result._id;
        console.log(result);
        res.status(200).json({ message: "Registration successful" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "An error occurred" });
      });
  });
});

app.post("/login", (req, res) => {
  const { loginEmail, loginPassword } = req.body;
  User.findOne({ email: loginEmail }).then((user) => {
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    bcrypt.compare(loginPassword, user.password, function (err, result) {
      if (err) {
        console.error("Error during password comparison:", err);
        return res.status(500).json({ error: "An error occurred" });
      }

      if (result) {
        console.log("User logged in:", user.email);
        req.session.userId = user._id;
        res.status(200).json({ message: "Login successful" });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    });
  });
});

const isLoggedIn = (req, res, next) => {
  if (req.session && req.session.userId) {
    next();
  } else {
    res.status(401).json({ message: "You are not logged in" });
  }
};

app.get("/protected-route", isLoggedIn, (req, res) => {
  const sessionId = req.session.userId;
  res.json({ message: "Login successful", sessionId });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000!");
});

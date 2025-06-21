import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/index.html", (req, res) => {
  res.render("index.ejs");
});

app.get("/blog.html", (req, res) => {
  res.render("blog.ejs");
});

app.get("/about.html", (req, res) => {
  res.render("about.ejs");
});

app.get("/contact.html", (req, res) => {
  res.render("contact.ejs");
});

app.get("/welcome", (req, res) => {
  res.render("welcome.ejs");
});

app.post("/signup", (req, res) => {
  const { firstName, lastName, email, password } = req.body;  // Destructure the request body to get user details
  const user = { firstName, lastName, email, password }; // Create a user object with the provided details

  // Read existing users or start with an empty array
  let users = [];
  if (fs.existsSync("users.json")) { // Check if the file exists
    users = JSON.parse(fs.readFileSync("users.json")); // Read existing users from file // JSON.parse converts JSON string to JavaScript object
    if (users.some(u => u.email === email || (u.firstName === firstName && u.lastName === lastName))) { // Check if user with the same email already exists
      return res.render("welcome.ejs", {validate: "invalid"}); // Render welcome page with exists message
    }
  }

  // Add new user
  users.push(user);

  // Save back to file
  fs.writeFileSync("users.json", JSON.stringify(users, null, 2)); // JSON.stringify converts JavaScript object to JSON string
  // null, 2 formats the JSON with 2 spaces for readability

  res.render("welcome.ejs", { firstName: user.firstName, validate: "success" }); // Render welcome page
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body; // Destructure the request body to get email and password
  const users = JSON.parse(fs.readFileSync("users.json"));  // Read existing users from file
  const user = users.find((u) => u.email === email && u.password === password); // Find user by email and password
  if (user) {
    res.render("welcome.ejs", { firstName: user.firstName, validate: "valid"}); // If user found, render welcome page with user's first name`);
  } else {
    res.render("welcome.ejs", {validate: "invalid"}); // If user not found, render welcome page with invalid message
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
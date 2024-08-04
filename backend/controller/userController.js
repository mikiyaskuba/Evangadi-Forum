const dbConnection = require("../db/config");
// const { StatusCodes } = require("http-status-codes");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
async function register(req, res) {
  const { username, firstname, lastname, email, password } = req.body;
  if (!username || !email || !firstname || !lastname || !password) {
    return res.status(400).json({ message: "Please fill in all fields." });
  }

  try {
    const [user] = await dbConnection.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (user.length > 0) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await dbConnection.query(
      "INSERT INTO users (username, firstname, lastname,email, password) VALUES (?, ?, ?, ?,?)",
      [username, firstname, lastname, email, hashedPassword]
    );

    return res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ message: "An error occurred. Please try again." });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill in all fields." });
  }
  try {
    const [user] = await dbConnection.query(
      "SELECT username, userid, password FROM users WHERE email = ?",
      [email]
    );
    if (user.length === 0) {
      return res.status(400).json({ message: "Email not found" });
    }

    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const username = user[0].username;
    const userid = user[0].userid;
    const token = jwt.sign({userid, username}, "secret", { expiresIn: "7d" });

    return res
      .status(200)
      .json({ message: "User login successful", token,  username });
  } catch (error) {
    console.error("Error during login:", error.message);
    return res.status(500).json({ message: "Something went wrong" });
  }
}

async function checkUser(req, res) {
  const username = req.user.username;
  const userid = req.user.userid;

  res.status(200).json ({
    msg: "user is logged in",

    username,
    userid,
  });
  // res.send("check user");
}

module.exports = { register, login, checkUser };

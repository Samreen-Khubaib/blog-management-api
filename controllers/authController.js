const bcrypt = require("bcrypt");
const pool = require("../models/db");

let loggedInUserId = null;

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  // Simple input validation
  if (!username || !email || !password) {
    return res.status(400).json({ error: "Username, email, and password are required" });
  }

  try {
    const hashed = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email",
      [username, email, hashed]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    // Handle duplicate username or email error
    if (err.code === "23505") {
      if (err.detail.includes("username")) {
        return res.status(400).json({ error: "Username already exists" });
      }
      if (err.detail.includes("email")) {
        return res.status(400).json({ error: "Email already registered" });
      }
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (!user.rows.length) return res.status(404).json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.rows[0].password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    loggedInUserId = user.rows[0].id;
    res.json({ message: "Login successful", user: { id: user.rows[0].id, username: user.rows[0].username, email: user.rows[0].email } });
  } catch (err) {
    next(err);
  }
};

exports.getLoggedInUserId = () => loggedInUserId;

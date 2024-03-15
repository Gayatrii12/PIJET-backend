const pool = require("../config/db");
const bcrypt = require("bcrypt");
const { generateAdminToken } = require("../utils/generateAdminToken");
require("dotenv").config();

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (!user.rows.length) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.rows[0].password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = await generateAdminToken(user.rows[0].id);
    res.status(200).json({ message: "Login successful", token: token });
  } catch (error) {
    console.error("Error while logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const adminSignUp = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }

  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length) {
      return res.status(400).json({ error: "User already exists" });
    }

  
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT)
    );

    await pool.query(
      "INSERT INTO users (email, password, country, organization) VALUES ($1, $2, $3, $4)",
      [email, hashedPassword, "India", "PICT"]
    );

    res.status(200).json({ message: "Admin registered successfully" });
  } catch (error) {

    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { adminLogin, adminSignUp };

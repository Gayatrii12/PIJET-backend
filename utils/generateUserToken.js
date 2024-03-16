require("dotenv").config();
const pool = require("../config/db");
const jwt = require("jsonwebtoken");

const generateUserToken = async (userId) => {
  try {
    const timestamp = new Date();
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET);
    const query = `INSERT INTO AUTHOR_TOKEN (author_token_value, fk_author_id, created_at) VALUES ($1, $2, $3)`;
    const queryParams = [token, userId, timestamp];

    await pool.query(query, queryParams);
    return token;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { generateUserToken };

require("dotenv").config();
const pool = require("../config/db");
const jwt = require("jsonwebtoken");

const generateAdminToken = async (adminID) => {
  try {
    console.log(adminID);
    const timestamp = new Date();

    const token = jwt.sign({ adminID, timestamp }, process.env.JWT_SECRET);
    const query = `INSERT INTO admin_token (fk_admin_id, admin_token_value, created_at) VALUES ($1, $2, $3)`;
    const queryData = [adminID, token, timestamp];
    await pool.query(query, queryData);
    return token;
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = { generateAdminToken };

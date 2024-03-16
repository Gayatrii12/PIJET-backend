require("dotenv").config();

const pool = require("../config/db");
const jwt = require("jsonwebtoken");

const generateAdminToken = async (adminId) => {
  try {
    const timestamp = new Date();
    const token = jwt.sign({ id: adminId });
    const query = `INSERT INTO ADMIN_TOKEN (admin_token_value, fk_admin_id, created_at) VALUES ($1, $2, $3)`;
    const queryParams = [token, adminId, timestamp];

    await pool.query(query, queryParams);

    return token;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = generateAdminToken;

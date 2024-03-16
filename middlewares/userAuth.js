const pool = require("../config/db.js");

const validateEmail = (email) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
};

const validatePassword = (password) => {
  if (password.length >= 8) {
    return true;
  }
  return false;
};

const validateUserData = (req, res, next) => {
  const { email, country, organization, password } = req.body;

  if (!email || !country || !organization || !password) {
    return res
      .status(400)
      .json({ error: true, message: "All fields are required!" });
  }

  if (validateEmail(email) && validatePassword(password)) {
    next();
  } else {
    res.status(400).json({ error: true, message: "Invalid Data!" });
  }
};

const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        error: true,
        message: "You must be logged in to perform this action.",
      });
    }

    const token = authHeader.replace("Bearer ", "");
    const tokenQueryParams = [token];
    const tokenQuery = `SELECT * FROM AUTHOR_TOKEN WHERE author_token_value = $1`;
    const tokenQueryData = await pool.query(tokenQuery, tokenQueryParams);

    if (tokenQueryData.rowCount < 1) {
      return res.status(401).json({ error: true, message: "Invalid Token!" });
    }

    const userId = tokenQueryData.rows[0].fk_user;

    req.user = userId;
    req.token = token;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error!" });
  }
};

module.exports = {
  validateUserData,
  isAuthenticated,
};

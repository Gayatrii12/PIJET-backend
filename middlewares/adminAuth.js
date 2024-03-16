const pool = require("../config/db");

const isAdminAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        error: true,
        message: "You must be logged in to perform this action.",
      });
    }

    const token = authHeader.replace("Bearer ", "");
    const tokenQuery = `SELECT * FROM ADMIN_TOKEN WHERE token = $1`;
    const tokenQueryParams = [token];
    const tokenQueryData = await pool.query(tokenQuery, tokenQueryParams);

    if (tokenQueryData.rowCount < 1) {
      return res.status(401).json({ error: true, message: "Invalid Token!" });
    }

    const adminId = tokenQueryData.rows[0].fk_admin_id;
    const adminQuery = `SELECT USERNAME FROM ADMIN_TOKEN WHERE fk_admin_id = $1`;
    const adminQueryParams = [adminId];
    const adminQueryData = await pool.query(adminQuery, adminQueryParams);

    req.admin = adminQuery.rowa[0];
    req.token = token;
    next;
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error!" });
  }
};

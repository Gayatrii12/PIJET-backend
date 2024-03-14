const { error } = require("console");
const pool = require("../config/db");

const getSub = async (req, res, next) => {
  try {
    const query = `SELECT registration_id, title_main, paper_domain, status FROM paper_register`;
    const queryData = await pool.query(query);

    res.status(200).json({
      error: false,
      message: "Success",
      data: queryData.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal server error!" });
  }
};

module.exports = {getSub};

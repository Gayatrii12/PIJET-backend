const pool = require("../config/db");

const getAllSubmissions = async (req, res) => {
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

const getPaperById = async (req, res) => {
    const { paperId } = req.body;
  
    // Retrieve paper details from database
    const paper = await pool.query('SELECT paper_url FROM VERSION WHERE fk_registration_id = $1', [paperId]);
  
    if (!paper.rows.length) {
      return res.status(404).send('Paper not found');
    }
  
    const filePath = path.join(__dirname, '..', paper.rows[0].paper_url);  // Construct full path
  
    try {
      // Check if file exists on server
      if (!fs.existsSync(filePath)) {
        return res.status(404).send('File not found');
      }
  
      // Set content type header and other relevant headers (e.g., Content-Disposition for download)
      res.setHeader('Content-Type', 'application/mp4'); // Adjust content type based on file extension
      res.setHeader('Content-Disposition', 'attachment; filename="' + paper.rows[0].paper_url + '"');
  
      // Stream the file content to the client
      fs.createReadStream(filePath).pipe(res);
    } catch (error) {
      console.error('Error fetching paper:', error);
      res.status(500).send('Internal server error');
    }
};
module.exports = { getAllSubmissions, getPaperById };


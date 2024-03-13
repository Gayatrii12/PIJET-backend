const pool = require('../config/db');

const uploadPaper = async (req, res, next) => {
    console.log(req.body, req.file);
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded!' });
    }
    if (!req.body.user_id || !req.body.title_main || !req.body.abstract || !req.body.no_of_authors || !req.body.keywords || !req.body.paper_domain) {
      return res.status(400).json({ error: 'Please fill all the fields' });
    }

    const { user_id, title_main, abstract, no_of_authors, keywords, paper_domain } = req.body;
    
    try {
      const uploadedFile = req.file;
      const paperPath = uploadedFile ? `uploads/${uploadedFile.filename}` : null;
  
      const registrationInsertResult = await pool.query(
        `INSERT INTO PAPER_REGISTER (fk_user_id, title_main, abstract, no_of_authors, status, current_version, paper_domain, keywords)
          VALUES ($1, $2, $3, $4, $5, $6, $7 ,$8) RETURNING registration_id`,
        [ user_id, title_main, abstract, no_of_authors, 'submitted', 1, paper_domain, keywords] // Adjust status and current_version logic
      );
  
      const registrationId = registrationInsertResult.rows[0].registration_id;
  
      await pool.query(
        `INSERT INTO VERSION (fk_registration_id, title, paper_url, comments)
          VALUES ($1, $2, $3, $4)`,
        [registrationId, title_main, paperPath, 'Initial Submission']
      );
      // Respond with success message
      res.status(200).json({ message: 'Paper Submitted successfully.' });
    } catch (error) {
      console.error('Error while uploading paper:', error);
      // Send appropriate error response
      res.status(500).json({ error: 'Internal server error' });
    }
  };

module.exports = { uploadPaper };

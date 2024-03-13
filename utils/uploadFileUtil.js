const upload = require('../middlewares/multer');

upload = (req, res, next) => { // Notice 'next' parameter for error handling
  if (!req.file) {
    return res.status(400).send('No file uploaded!');
  }
  res.status(200).send('File uploaded successfully!');
  // File uploaded successfully!
  // You can optionally modify the response here (e.g., set a success message)
   // Pass control to the next middleware or route handler
    next();
};

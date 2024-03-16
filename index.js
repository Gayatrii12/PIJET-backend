// Hello Gala (consider removing unnecessary comments)
require("dotenv").config();
const express = require("express");
const app = express();
const cron = require('node-cron'); // Import node-cron

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/", (req, res) => {
  res.send("Hello your server is running");
});

app.use("/submit", require("./routes/submit"));
app.use("/user", require("./routes/userRoutes"));
app.use("/admin", require("./routes/adminRoutes"));

const PORT = process.env.PORT || 5000;

// Schedule a cron job to hit the `/get` route every 5 minutes
const task = cron.schedule('*/1 * * * *', () => {
  console.log('Hitting /get route every 1 minutes');
  fetch('https://pijet-backend.onrender.com:' + PORT + '/') 
    .then(response => response.text())
    .then(data => console.log('Response from /:', data))
    .catch(error => console.error('Error hitting /:', error));
});

task.start(); // Start the cron job

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

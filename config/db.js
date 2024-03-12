require("dotenv").config();
const Pool = require("pg").Pool;

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  port: process.env.POSTGRES_PORT,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  ssl: {
    // You can either provide a path to your certificate file
    // or you can use the rejectUnauthorized option as shown below
    rejectUnauthorized: false
  }
});

if (pool) {
  console.log("Database Connection Successful");
}
// console.log(pool);
module.exports = pool;

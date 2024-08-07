// const express = require('express');
// const bodyParser = require('body-parser');
// const productRoutes = require('./routes/productRoutes');

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Parse JSON request bodies
// app.use(bodyParser.json());

// // Define routes
// app.use(productRoutes);

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
const express = require('express');
// const bodyParser = require('body-parser');
 const cors = require('cors');
const sql = require('mssql');
 
const app = express();
// const port = 3000;
 
// Middleware
// app.use(bodyParser.json());
 app.use(cors());
 
// SQL Server configuration
var dbConfig = {
  user: 'mysqlserver16',
  password: 'Suman@16',
  server: 'my-sql-server16.database.windows.net',
  database: 'my_SQL_Database',
  options: {
    //instanceName: 'SQLEXPRESS',
    trustServerCertificate: true,
    encrypt: true,
  }
};
 
// Connect to the database and create an endpoint
sql.connect(dbConfig, err => {
  if (err){
    console.log (err);
  }else{
    console.log("Connection Successful!");
 
  }
 
});
 
// Define route for fetching data from SQL Server
app.get("/", (request, response) => {
  // Execute a SELECT query
  new sql.Request().query("SELECT * FROM Books", (err, result) => {
      if (err) {
          console.error("Error executing query:", err);
      } else {
          response.send(result.recordset); // Send query result as response
          console.dir(result.recordset);
      }
  });
});
 
// Start the server on port 3000
app.listen(3306, () => {
  console.log("Listening on port 3306...");
});
 
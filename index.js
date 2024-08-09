const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mssql');

const app = express();

// Middleware
app.use(bodyParser.json());
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
  if (err) {
    console.log(err);
  } else {
    console.log("Connection Successful!");

  }

});

// Define route for fetching data from SQL Server
app.get("/", (request, response) => {
  // Execute a SELECT query
  new sql.Request().query("SELECT * FROM Employee", (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
    } else {
      response.send(result.recordset); // Send query result as response
      console.dir(result.recordset);
    }
  });
});


 // Insert data into your database
app.post("/add-Employee", async (req, res) => {
  // Insert data into your database
  const result =
    await sql.query`INSERT INTO Employee (EmployeeID, FirstName, LastName, City) VALUES (${req.body.EmployeeID}, ${req.body.FirstName}, ${req.body.LastName}, ${req.body.City})`;
 
  // Send a response back to the client
  res.status(200).json({ message: "Data inserted successfully", result });
});

//Edit data into your data base 

app.put("/edit-Employee/:EmployeeID", async (req, res) => {
  try {
    // Update data in your database
    const result = await sql.query`
      UPDATE Employee
      SET FirstName = ${req.body.FirstName}, 
          LastName = ${req.body.LastName}, 
          City = ${req.body.City}
      WHERE EmployeeID = ${req.params.EmployeeID}`;

    // Check if the update was successful
    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ message: "Data updated successfully", result });
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    // Handle any errors
    res.status(500).json({ message: "An error occurred", error });
  }
  
});





// Start the server on port 3000
app.listen(3306, () => {
  console.log("Listening on port 3306...");
});

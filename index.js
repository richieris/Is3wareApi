var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql2");
// const mysql = require("promise-mysql");
const app = express();

// Use the body-parser middleware to parse the request body
app.use(bodyParser.json());

// Create a MySQL connection pool
const connection = mysql.createConnection({
  // socketPath: "/cloudsql/my-project-12345:us-central1:mydatabase",
  host: "34.132.212.142",
  user: "root",
  password: "Ashwini129#",
  database: "dmp_kamet",
});




connection.connect((error) => {
  if (error) {
    console.error(error);
  } else {
    console.log("MySQL connection successful");
  }
});
//add user
app.post("/Addusers", async (req, res) => {
  // Get the values to be inserted from the request body

  const { firstName, middleName, lastName, ssn, gender,email, password, street_address, city, state, country,type } = req.body; //, street_address, city, state, country
    console.log("POST Request Called for /api endpoint");
   
    // Insert the values into the users table in the database

    connection.query(
      "INSERT INTO user (firstName, middleName, lastName, ssn, gender,email, password,street_address,city,state,country,type) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", //,street_address,city,state,country
      [
        firstName,
        middleName,
        lastName,
        ssn,
        gender,
        email,
        password,
        street_address,
        city,
        state,
        country,type,
      ],
      (error, results) => {
        if (error) throw error;
        console.log(`Inserted data into MySQL table: `);
        res.send("Data saved successfully");
      }
    );
  
});

//get user data

app.get("/Getusers", async (req, res) => {
  // Get the values to be inserted from the request body
   //, street_address, city, state, country
  console.log("POST Request Called for /api endpoint");
 const email = req.query.email;

  connection.query(
    'SELECT firstName, middleName,lastName,ssn,gender,street_address,city,state,country FROM user WHERE email = ? ', //,street_address,city,state,country
    [email],
    (error, results) => {
      if (error) throw error;
      console.log(`Inserted data into MySQL table: `);
      res.send(results);
    }
  );
});

app.get("/search", (req, res) => {
  
  const searchTerm = req.query.q;
  //  const sanitizedQuery = mysql.escape(searchTerm);
  connection.query(
    // `SELECT * FROM persons WHERE email LIKE '%${searchTerm}%' OR firstName LIKE '%${searchTerm}%' OR person_id LIKE'%${searchTerm}%'`,
    `SELECT * FROM people WHERE first_name LIKE '%${searchTerm}%' OR id LIKE'%${searchTerm}%'`,
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send({ error: "An error occurred" });
        return;
      }
      res.send(results);
    }
  );

});


app.get("/address", (req, res) => {
  const searchTerm = req.query.q;
  
  connection.query( 
    
    `SELECT * FROM addresses WHERE person_id LIKE '%${searchTerm}%'`,
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send({ error: "An error occurred" });
        return;
      }
      res.send(results);
    }
  );
});
app.get("/EyeColor", (req, res) => {
  const searchTerm = req.query.q;

  connection.query(
    `SELECT * FROM eye_colors WHERE id LIKE '%${searchTerm}%'`,
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send({ error: "An error occurred" });
        return;
      }
      res.send(results);
    }
  );
});

app.get("/gender", (req, res) => {
  const searchTerm = req.query.q;

  connection.query(
    `SELECT * FROM genders WHERE id LIKE '%${searchTerm}%'`,
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send({ error: "An error occurred" });
        return;
      }
      res.send(results);
    }
  );
});

app.get("/hair", (req, res) => {
  const searchTerm = req.query.q;

  connection.query(
    `SELECT * FROM hair_colors WHERE id LIKE '%${searchTerm}%'`,
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send({ error: "An error occurred" });
        return;
      }
      res.send(results);
    }
  );
});

app.get("/race", (req, res) => {
  const searchTerm = req.query.q;

  connection.query(
    `SELECT * FROM races WHERE id LIKE '%${searchTerm}%'`,
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send({ error: "An error occurred" });
        return;
      }
      res.send(results);
    }
  );
});




// Start the server on port 3000
var server= app.listen(3000, () => {
  var host = server.address().address;
  console.log("Server listening on port 3000"+host);
});

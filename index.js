var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql2");
const app = express();
const cors = require("cors");
// Use the body-parser middleware to parse the request body
app.use(bodyParser.json());
app.use(cors());
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
app.get("/affiliation", (req, res) => {
  const searchTerm = req.query.q;

  connection.query(
    `SELECT * FROM affiliations WHERE person_id LIKE '%${searchTerm}%'`,
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

app.get("/contacts", (req, res) => {
  const searchTerm = req.query.q;

  connection.query(
    `SELECT * FROM contacts WHERE person_id LIKE '%${searchTerm}%'`,
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

app.get("/education", (req, res) => {
  const searchTerm = req.query.q;

  connection.query(
    `SELECT * FROM educations WHERE person_id LIKE '%${searchTerm}%'`,
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

app.get("/identification", (req, res) => {
  const searchTerm = req.query.q;

  connection.query(
    `SELECT * FROM identifications WHERE person_id LIKE '%${searchTerm}%'`,
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
//put requests

//firstname
app.put("/editFn", async (req, res) => {
  // Get the values to be inserted from the request body

  const {id,first_name} = req.body; //, street_address, city, state, country
  console.log("POST Request Called for /api endpoint");

  // Insert the values into the users table in the database

  connection.query(
    "UPDATE people SET first_name = ? WHERE id = ?", //,street_address,city,state,country
    [
    first_name,
     id
    ],
    (error, results) => {
      if (error) throw error;
      console.log(`Inserted data into MySQL table: `);
      res.send("Data saved successfully");
    }
  );
});

//Mn
app.put("/editMn", async (req, res) => {
  // Get the values to be inserted from the request body

  const {id,middle_name} = req.body; 
  console.log("POST Request Called for /api endpoint");

  // Insert the values into the users table in the database

  connection.query(
    "UPDATE people SET middle_name = ? WHERE id = ?", //,street_address,city,state,country
    [middle_name, id],
    (error, results) => {
      if (error) throw error;
      console.log(`Inserted data into MySQL table: `);
      res.send("Data saved successfully");
    }
  );
});

//Ln
app.put("/editLn", async (req, res) => {
  // Get the values to be inserted from the request body

  const { id, last_name } = req.body;
  console.log("POST Request Called for /api endpoint");

  // Insert the values into the users table in the database

  connection.query(
    "UPDATE people SET last_name = ? WHERE id = ?", //,street_address,city,state,country
    [last_name, id],
    (error, results) => {
      if (error) throw error;
      console.log(`Inserted data into MySQL table: `);
      res.send("Data saved successfully");
    }
  );
});
//Moniker
app.put("/editMoniker", async (req, res) => {
  // Get the values to be inserted from the request body

  const { id, moniker } = req.body;
  console.log("POST Request Called for /api endpoint");

  // Insert the values into the users table in the database

  connection.query(
    "UPDATE people SET moniker = ? WHERE id = ?", //,street_address,city,state,country
    [moniker, id],
    (error, results) => {
      if (error) throw error;
      console.log(`Inserted data into MySQL table: `);
      res.send("Data saved successfully");
    }
  );
});
//sa1
app.put("/editstreet1", async (req, res) => {
  // Get the values to be inserted from the request body

  const { id, street_address1 } = req.body;
  console.log("POST Request Called for /api endpoint");

  // Insert the values into the users table in the database

  connection.query(
    "UPDATE addresses SET street_address1 = ? WHERE id = ?", //,street_address,city,state,country
    [street_address1, id],
    (error, results) => {
      if (error) throw error;
      console.log(`Inserted data into MySQL table: `);
      res.send("Data saved successfully");
    }
  );
});
//sa2
app.put("/editstreet2", async (req, res) => {
  // Get the values to be inserted from the request body

  const { id, street_address2 } = req.body;
  console.log("POST Request Called for /api endpoint");

  // Insert the values into the users table in the database

  connection.query(
    "UPDATE addresses SET street_address2 = ? WHERE id = ?", //,street_address,city,state,country
    [street_address2, id],
    (error, results) => {
      if (error) throw error;
      console.log(`Inserted data into MySQL table: `);
      res.send("Data saved successfully");
    }
  );
});
//city
app.put("/editcity", async (req, res) => {
  // Get the values to be inserted from the request body

  const { id, city } = req.body;
  console.log("POST Request Called for /api endpoint");

  // Insert the values into the users table in the database

  connection.query(
    "UPDATE addresses SET city = ? WHERE id = ?", //,street_address,city,state,country
    [city, id],
    (error, results) => {
      if (error) throw error;
      console.log(`Inserted data into MySQL table: `);
      res.send("Data saved successfully");
    }
  );
});

//state
app.put("/editstate", async (req, res) => {
  // Get the values to be inserted from the request body

  const { id, state } = req.body;
  console.log("POST Request Called for /api endpoint");

  // Insert the values into the users table in the database

  connection.query(
    "UPDATE addresses SET state = ? WHERE id = ?", //,street_address,city,state,country
    [state, id],
    (error, results) => {
      if (error) throw error;
      console.log(`Inserted data into MySQL table: `);
      res.send("Data saved successfully");
    }
  );
});
//zip
app.put("/editzip", async (req, res) => {
  // Get the values to be inserted from the request body

  const { id, zip } = req.body;
  console.log("POST Request Called for /api endpoint");

  // Insert the values into the users table in the database

  connection.query(
    "UPDATE addresses SET zip = ? WHERE id = ?", //,street_address,city,state,country
    [zip, id],
    (error, results) => {
      if (error) throw error;
      console.log(`Inserted data into MySQL table: `);
      res.send("Data saved successfully");
    }
  );
});
//geo
app.put("/editgeo", async (req, res) => {
  // Get the values to be inserted from the request body

  const { id, geo_coordinates } = req.body;
  console.log("POST Request Called for /api endpoint");

  // Insert the values into the users table in the database

  connection.query(
    "UPDATE addresses SET geo_coordinates = ? WHERE id = ?", //,street_address,city,state,country
    [geo_coordinates, id],
    (error, results) => {
      if (error) throw error;
      console.log(`Inserted data into MySQL table: `);
      res.send("Data saved successfully");
    }
  );
});
//personid
app.put("/editpersonid", async (req, res) => {
  // Get the values to be inserted from the request body

  const { firstName, id } = req.body;
  console.log("POST Request Called for /api endpoint");

  // Insert the values into the users table in the database

  connection.query(
    "UPDATE people SET id = ? WHERE firstName = ?", //,street_address,city,state,country
    [id, firstName],
    (error, results) => {
      if (error) throw error;
      console.log(`Inserted data into MySQL table: `);
      res.send("Data saved successfully");
    }
  );
});
//addressid
app.put("/editaddressid", async (req, res) => {
  // Get the values to be inserted from the request body

  const { id, address_type_id } = req.body;
  console.log("POST Request Called for /api endpoint");

  // Insert the values into the users table in the database

  connection.query(
    "UPDATE addresses SET address_type_id = ? WHERE id = ?", //,street_address,city,state,country
    [address_type_id, id],
    (error, results) => {
      if (error) throw error;
      console.log(`Inserted data into MySQL table: `);
      res.send("Data saved successfully");
    }
  );
});
//eyecolorid
app.put("/editeyecolorid", async (req, res) => {
  // Get the values to be inserted from the request body

  const { id, eye_color_id } = req.body;
  console.log("POST Request Called for /api endpoint");

  // Insert the values into the users table in the database

  connection.query(
    "UPDATE people SET eye_color_id = ? WHERE id = ?", //,street_address,city,state,country
    [eye_color_id, id],
    (error, results) => {
      if (error) throw error;
      console.log(`Inserted data into MySQL table: `);
      res.send("Data saved successfully");
    }
  );
});

//raceid
app.put("/editraceid", async (req, res) => {
  // Get the values to be inserted from the request body

  const { id, race_id } = req.body;
  console.log("POST Request Called for /api endpoint");

  // Insert the values into the users table in the database

  connection.query(
    "UPDATE people SET race_id = ? WHERE id = ?", //,street_address,city,state,country
    [race_id, id],
    (error, results) => {
      if (error) throw error;
      console.log(`Inserted data into MySQL table: `);
      res.send("Data saved successfully");
    }
  );
});
//genderid
app.put("/editgenderid", async (req, res) => {
  // Get the values to be inserted from the request body

  const { id, gender_id } = req.body;
  console.log("POST Request Called for /api endpoint");

  // Insert the values into the users table in the database

  connection.query(
    "UPDATE people SET gender_id = ? WHERE id = ?", //,street_address,city,state,country
    [gender_id, id],
    (error, results) => {
      if (error) throw error;
      console.log(`Inserted data into MySQL table: `);
      res.send("Data saved successfully");
    }
  );
});


//number
app.put("/editnumber", async (req, res) => {
  // Get the values to be inserted from the request body

  const { person_id, number } = req.body;
  console.log("POST Request Called for /api endpoint");

  // Insert the values into the users table in the database

  connection.query(
    "UPDATE identifications SET number = ? WHERE person_id = ?", //,street_address,city,state,country
    [number, person_id],
    (error, results) => {
      if (error) throw error;
      console.log(`Inserted data into MySQL table: `);
      res.send("Data saved successfully");
    }
  );
});


//identification id
app.put("/editidentificationid", async (req, res) => {
  // Get the values to be inserted from the request body

  const { person_id, identification_id } = req.body;
  console.log("POST Request Called for /api endpoint");

  // Insert the values into the users table in the database

  connection.query(
    "UPDATE identifications SET id = ? WHERE person_id = ?", //,street_address,city,state,country
    [identification_id, person_id],
    (error, results) => {
      if (error) throw error;
      console.log(`Inserted data into MySQL table: `);
      res.send("Data saved successfully");
    }
  );
});


//issued on
app.put("/editissuedby", async (req, res) => {
  // Get the values to be inserted from the request body

  const { person_id, issued_by } = req.body;
  console.log("POST Request Called for /api endpoint");

  // Insert the values into the users table in the database

  connection.query(
    "UPDATE identifications SET issued_by = ? WHERE person_id = ?", //,street_address,city,state,country
    [issued_by, person_id],
    (error, results) => {
      if (error) throw error;
      console.log(`Inserted data into MySQL table: `);
      res.send("Data saved successfully");
    }
  );
});
//issued On
app.put("/editissuedon", async (req, res) => {
  // Get the values to be inserted from the request body

  const { person_id, issued_on } = req.body;
  console.log("POST Request Called for /api endpoint");

  // Insert the values into the users table in the database

  connection.query(
    "UPDATE identifications SET issued_on = ? WHERE person_id = ?", //,street_address,city,state,country
    [issued_on, person_id],
    (error, results) => {
      if (error) throw error;
      console.log(`Inserted data into MySQL table: `);
      res.send("Data saved successfully");
    }
  );
});


//expires on
app.put("/editexpireson", async (req, res) => {
  // Get the values to be inserted from the request body

  const { expires_on, person_id } = req.body;
  console.log("POST Request Called for /api endpoint");

  // Insert the values into the users table in the database

  connection.query(
    "UPDATE identifications SET expires_on = ? WHERE person_id = ?", //,street_address,city,state,country
    [expires_on, person_id],
    (error, results) => {
      if (error) throw error;
      console.log(`Inserted data into MySQL table: `);
      res.send("Data saved successfully");
    }
  );
});

app.put("/editRestrictionType", async (req, res) => {
  // Get the values to be inserted from the request body

  const { restriction_type, person_id } = req.body;
  console.log("POST Request Called for /api endpoint");

  // Insert the values into the users table in the database

  connection.query(
    "UPDATE identifications SET restriction_type = ? WHERE person_id = ?", //,street_address,city,state,country
    [restriction_type, person_id],
    (error, results) => {
      if (error) throw error;
      console.log(`Inserted data into MySQL table: `);
      res.send("Data saved successfully");
    }
  );
});


app.put("/editRestrictionTypedetails", async (req, res) => {
  // Get the values to be inserted from the request body

  const { restriction_type_details, person_id } = req.body;
  console.log("POST Request Called for /api endpoint");

  // Insert the values into the users table in the database

  connection.query(
    "UPDATE identifications SET restriction_type_details = ? WHERE person_id = ?", //,street_address,city,state,country
    [restriction_type_details, person_id],
    (error, results) => {
      if (error) throw error;
      console.log(`Inserted data into MySQL table: `);
      res.send("Data saved successfully");
    }
  );
});

app.put("/editstateid", async (req, res) => {
  // Get the values to be inserted from the request body

  const { state_id, person_id } = req.body;
  console.log("POST Request Called for /api endpoint");

  // Insert the values into the users table in the database

  connection.query(
    "UPDATE identifications SET state_id = ? WHERE person_id = ?", //,street_address,city,state,country
    [state_id, person_id],
    (error, results) => {
      if (error) throw error;
      console.log(`Inserted data into MySQL table: `);
      res.send("Data saved successfully");
    }
  );
});
//affiliation id
app.put("/editaffiliationid", async (req, res) => {
  // Get the values to be inserted from the request body

  const { id, person_id } = req.body;
  console.log("POST Request Called for /api endpoint");

  // Insert the values into the users table in the database

  connection.query(
    "UPDATE affiliations SET id = ? WHERE person_id = ?", //,street_address,city,state,country
    [id, person_id],
    (error, results) => {
      if (error) throw error;
      console.log(`Inserted data into MySQL table: `);
      res.send("Data saved successfully");
    }
  );
});

//rank
app.put("/editrank", async (req, res) => {
  // Get the values to be inserted from the request body

  const { rank, person_id } = req.body;
  console.log("POST Request Called for /api endpoint");

  // Insert the values into the users table in the database

  connection.query(
    "UPDATE affiliations SET rank = ? WHERE person_id = ?", //,street_address,city,state,country
    [rank, person_id],
    (error, results) => {
      if (error) throw error;
      console.log(`Inserted data into MySQL table: `);
      res.send("Data saved successfully");
    }
  );
});
//affiliation type id
app.put("/editaffiliationtypeid", async (req, res) => {
  // Get the values to be inserted from the request body

  const { affiliation_type_id, person_id } = req.body;
  console.log("POST Request Called for /api endpoint");

  // Insert the values into the users table in the database

  connection.query(
    "UPDATE affiliations SET affiliation_type_id = ? WHERE person_id = ?", //,street_address,city,state,country
    [affiliation_type_id, person_id],
    (error, results) => {
      if (error) throw error;
      console.log(`Inserted data into MySQL table: `);
      res.send("Data saved successfully");
    }
  );
});
//affiliation gang id
app.put("/editaffiliationgangid", async (req, res) => {
  // Get the values to be inserted from the request body

  const { affiliationsetgang_id, person_id } = req.body;
  console.log("POST Request Called for /api endpoint");

  // Insert the values into the users table in the database

  connection.query(
    "UPDATE affiliations SET affiliationsetgang_id = ? WHERE person_id = ?", //,street_address,city,state,country
    [affiliationsetgang_id, person_id],
    (error, results) => {
      if (error) throw error;
      console.log(`Inserted data into MySQL table: `);
      res.send("Data saved successfully");
    }
  );
});
//affiliationsubsetgangid
app.put("/editaffiliationsubsetgangid", async (req, res) => {
  // Get the values to be inserted from the request body

  const { affiliationsubsetgang_id, person_id } = req.body;
  console.log("POST Request Called for /api endpoint");

  // Insert the values into the users table in the database

  connection.query(
    "UPDATE affiliations SET affiliationsubsetgang_id = ? WHERE person_id = ?", //,street_address,city,state,country
    [affiliationsubsetgang_id, person_id],
    (error, results) => {
      if (error) throw error;
      console.log(`Inserted data into MySQL table: `);
      res.send("Data saved successfully");
    }
  );
});
//orgid
app.put("/editorgid", async (req, res) => {
  // Get the values to be inserted from the request body

  const { org_id, person_id } = req.body;
  console.log("POST Request Called for /api endpoint");

  // Insert the values into the users table in the database

  connection.query(
    "UPDATE contacts SET org_id = ? WHERE person_id = ?", //,street_address,city,state,country
    [org_id, person_id],
    (error, results) => {
      if (error) throw error;
      console.log(`Inserted data into MySQL table: `);
      res.send("Data saved successfully");
    }
  );
});

//workph
app.put("/editworkph", async (req, res) => {
  // Get the values to be inserted from the request body

  const { work_phone_number, person_id } = req.body;
  console.log("POST Request Called for /api endpoint");

  // Insert the values into the users table in the database

  connection.query(
    "UPDATE contacts SET work_phone_number = ? WHERE person_id = ?", //,street_address,city,state,country
    [work_phone_number, person_id],
    (error, results) => {
      if (error) throw error;
      console.log(`Inserted data into MySQL table: `);
      res.send("Data saved successfully");
    }
  );
});

//cellno
app.put("/editcell", async (req, res) => {
  // Get the values to be inserted from the request body

  const { cell_number_number, person_id } = req.body;
  console.log("POST Request Called for /api endpoint");

  // Insert the values into the users table in the database

  connection.query(
    "UPDATE contacts SET work_phone_number = ? WHERE person_id = ?", //,street_address,city,state,country
    [cell_number_number, person_id],
    (error, results) => {
      if (error) throw error;
      console.log(`Inserted data into MySQL table: `);
      res.send("Data saved successfully");
    }
  );
});
//primaryph flag
app.put("/editprimephflag", async (req, res) => {
  // Get the values to be inserted from the request body

  const { primary_phone_flag, person_id } = req.body;
  console.log("POST Request Called for /api endpoint");

  // Insert the values into the users table in the database

  connection.query(
    "UPDATE contacts SET primary_phone_flag = ? WHERE person_id = ?", //,street_address,city,state,country
    [primary_phone_flag, person_id],
    (error, results) => {
      if (error) throw error;
      console.log(`Inserted data into MySQL table: `);
      res.send("Data saved successfully");
    }
  );
});
//email

app.put("/editemail", async (req, res) => {
  // Get the values to be inserted from the request body

  const { email, person_id } = req.body;
  console.log("POST Request Called for /api endpoint");

  // Insert the values into the users table in the database

  connection.query(
    "UPDATE contacts SET email = ? WHERE person_id = ?", //,street_address,city,state,country
    [email, person_id],
    (error, results) => {
      if (error) throw error;
      console.log(`Inserted data into MySQL table: `);
      res.send("Data saved successfully");
    }
  );
});

//fax

app.put("/editfax", async (req, res) => {
  // Get the values to be inserted from the request body

  const { fax, person_id } = req.body;
  console.log("POST Request Called for /api endpoint");

  // Insert the values into the users table in the database

  connection.query(
    "UPDATE contacts SET fax = ? WHERE person_id = ?", //,street_address,city,state,country
    [fax, person_id],
    (error, results) => {
      if (error) throw error;
      console.log(`Inserted data into MySQL table: `);
      res.send("Data saved successfully");
    }
  );
});

//fb
app.put("/editfax", async (req, res) => {
  // Get the values to be inserted from the request body

  const { facebook_id, person_id } = req.body;
  console.log("POST Request Called for /api endpoint");

  // Insert the values into the users table in the database

  connection.query(
    "UPDATE contacts SET facebook_id = ? WHERE person_id = ?", //,street_address,city,state,country
    [facebook_id, person_id],
    (error, results) => {
      if (error) throw error;
      console.log(`Inserted data into MySQL table: `);
      res.send("Data saved successfully");
    }
  );
});
//twitter
app.put("/edittwitter", async (req, res) => {
  // Get the values to be inserted from the request body

  const { twitter_id, person_id } = req.body;
  console.log("POST Request Called for /api endpoint");

  // Insert the values into the users table in the database

  connection.query(
    "UPDATE contacts SET twitter_id = ? WHERE person_id = ?", //,street_address,city,state,country
    [twitter_id, person_id],
    (error, results) => {
      if (error) throw error;
      console.log(`Inserted data into MySQL table: `);
      res.send("Data saved successfully");
    }
  );
});

//skype
app.put("/editskype", async (req, res) => {
  // Get the values to be inserted from the request body

  const { skype_id, person_id } = req.body;
  console.log("POST Request Called for /api endpoint");

  // Insert the values into the users table in the database

  connection.query(
    "UPDATE contacts SET skype_id = ? WHERE person_id = ?", //,street_address,city,state,country
    [skype_id, person_id],
    (error, results) => {
      if (error) throw error;
      console.log(`Inserted data into MySQL table: `);
      res.send("Data saved successfully");
    }
  );
});


//educationid
app.put("/editeducationid", async (req, res) => {
  // Get the values to be inserted from the request body

  const { id, person_id } = req.body;
  console.log("POST Request Called for /api endpoint");

  // Insert the values into the users table in the database

  connection.query(
    "UPDATE educations SET id = ? WHERE person_id = ?", //,street_address,city,state,country
    [id, person_id],
    (error, results) => {
      if (error) throw error;
      console.log(`Inserted data into MySQL table: `);
      res.send("Data saved successfully");
    }
  );
});

//educationlvl
app.put("/editeducationid", async (req, res) => {
  // Get the values to be inserted from the request body

  const { level, person_id } = req.body;
  console.log("POST Request Called for /api endpoint");

  // Insert the values into the users table in the database

  connection.query(
    "UPDATE educations SET level = ? WHERE person_id = ?", //,street_address,city,state,country
    [level, person_id],
    (error, results) => {
      if (error) throw error;
      console.log(`Inserted data into MySQL table: `);
      res.send("Data saved successfully");
    }
  );
});

//acquiredon
app.put("/editacquiredon", async (req, res) => {
  // Get the values to be inserted from the request body

  const { acquired_on, person_id } = req.body;
  console.log("POST Request Called for /api endpoint");

  // Insert the values into the users table in the database

  connection.query(
    "UPDATE educations SET acquired_on = ? WHERE person_id = ?", //,street_address,city,state,country
    [acquired_on, person_id],
    (error, results) => {
      if (error) throw error;
      console.log(`Inserted data into MySQL table: `);
      res.send("Data saved successfully");
    }
  );
});
//degreeid

app.put("/editdegreeid", async (req, res) => {
  // Get the values to be inserted from the request body

  const { degree_id, person_id } = req.body;
  console.log("POST Request Called for /api endpoint");

  // Insert the values into the users table in the database

  connection.query(
    "UPDATE educations SET degree_id = ? WHERE person_id = ?", //,street_address,city,state,country
    [degree_id, person_id],
    (error, results) => {
      if (error) throw error;
      console.log(`Inserted data into MySQL table: `);
      res.send("Data saved successfully");
    }
  );
});



// Start the server on port 3000
var server= app.listen(3000, () => {
  var host = server.address().address;
  console.log("Server listening on port 3000"+host);
});

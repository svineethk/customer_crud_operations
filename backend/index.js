const  express = require('express');
const  app = express();
const cors = require('cors');
const bodyParser = require("body-parser")
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const dbPath = path.join(__dirname, "contacts.db");
app.use(bodyParser.json());
app.use(cors());

const Port = 5000 || process.env.PORT

let db = null;

const initializeDBAndServer = async () => {
    try {
      db = await open({
        filename: dbPath,
        driver: sqlite3.Database,
      });
      app.listen(Port, () => {
        console.log(`Server is Running on Port ${Port}`);
      });
    } catch (e) {
      console.log(`DB Error: ${e.message}`);
      process.exit(1);
    }
};

initializeDBAndServer()



app.get('/',(req,res) => {
    res.send("Hello World Database is connected to the server successfully")
})


// API 1: Get all the contacts
app.get("/contacts/", async (request, response) => {
    const {id} = request.query;

    let contactsQuery = "SELECT * FROM CONTACTS";

    if (id) {
        if (isNaN(id)) {
            return response.status(400).send({ message: "Invalid ID format" });
        }
        contactsQuery += " WHERE ID = ?";
    }

    try {
        const contactsArray = await db.all(contactsQuery, [id]);
        if(contactsArray === 0){
            return response.status(404).send({message:"Contact not found"});
        }
        response.json(contactsArray);
    }
    catch(error){
        console.error("Error fetching contacts", error);
        response.status(500).send({message: error.message});
    }
  });
  
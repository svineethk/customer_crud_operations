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


app.get("/contacts/:id", async (request, response) => {
  const { id } = request.params;

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


  app.get("/allcontacts/", async (request, response) => {
    const { id } = request.params;
  
      let contactsQuery = "SELECT * FROM CONTACTS";
  
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




  app.post('/contacts/', async(request,response) => {
    const {name,email,address} = request.body;
    const createContactQuery = `INSERT INTO contacts(name,email,address) VALUES(?,?,?)`
    try{
        let result = await db.run(createContactQuery,[name,email,address]);
        let newContactId = result.lastID;
        response.send({message:'Contact Added Successfully',contactId:newContactId})
    } catch (error) {
        console.error("Error adding contact", error);
        response.status(500).send({message: error.message});
    }
  })
  


  app.put('/contacts/:id/', async(request,response) => {
    const {id} = request.params;
    const { name, email, address } = request.body; 
    console.log(id,name,email,address);
    const updateContactQuery = `UPDATE CONTACTS SET name = ?, email = ?, address = ? WHERE id = ?`;

    try{
      let updateContact = await db.run(updateContactQuery,[name,email,address,id]);
      if(updateContact === undefined){
        response.send({message:"Invalid Id"})
      }
      response.send({message:"Contact Updated Successfully"})
    }
    catch(error){
      console.error("Error updating contact", error);
      response.status(500).send({message:error.message});
    }
  })


  app.delete('/contacts/:id/',async(request,response) => {
    const {id} = request.params;
    const deleteContactQuery = `DELETE FROM CONTACTS WHERE id = ?`;
    try{
      let deleteContact = await db.run(deleteContactQuery,[id]);
      if(deleteContact ===undefined){
        response.send({message: "Invalid ID"});
      }
      response.send({message: "Contact Deleted Successfully"});
    }
    catch(error){
      console.error("Error Deleting Contact:", error);
      response.status(500).send({message:error.message});
    }
  })


  app.delete('/deletecontacts/:id/', async (request, response) => {
    const { id } = request.params;
    console.log(id)
  
    const checkContactQuery = `SELECT * FROM CONTACTS WHERE id = ?`;
    const contact = await db.get(checkContactQuery, [id]);
  
    if (!contact) {
      return response.status(404).send({ message: "Contact not found" });
    }
  
    const deleteContactQuery = `DELETE FROM CONTACTS WHERE id = ?`;
    try {
      const result = await db.run(deleteContactQuery, [id]);
  
      if (result.changes === 0) {
        return response.status(404).send({ message: "No contact found with this ID" });
      }
  
      response.send({ message: "Contact Deleted Successfully" });
    } catch (error) {
      console.error("Error Deleting Contact:", error);
      response.status(500).send({ message: error.message });
    }
  });
  
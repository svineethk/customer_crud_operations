const  express = require('express');
const  app = express();
const cors = require('cors');
const bodyParser = require("body-parser")
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const dbPath = path.join(__dirname, "users.db");
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



 app.get('/',async (req,res) => {
     res.send("Hello Vineeth Database is connected to the server successfully")})


app.get("/users/:id", async (request, response) => {
  const { id } = request.params;

    let contactsQuery = "SELECT * FROM USERS";

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


  app.get("/allusers/", async (request, response) => {
  
      let contactsQuery = "SELECT * FROM USERS";
  
      try {
          const contactsArray = await db.all(contactsQuery);
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




  app.post('/users/', async(request,response) => {
    const {name, phoneNumber, address,borrowedMoney,borrowedType,typeOfRepayment,modeOfRepayment,installments,deadTime } = request.body;
    console.log(request.body)
    const createContactQuery = `INSERT INTO users (name, phoneNumber, address, borrowedMoney, borrowedType, typeOfRepayment, modeOfRepayment, installments, deadTime) VALUES (?,?,?,?,?,?,?,?,?);`
    try{
        let result = await db.run(createContactQuery,[name, phoneNumber, address,borrowedMoney,borrowedType,typeOfRepayment,modeOfRepayment,installments,deadTime ]);
        let newContactId = await result.lastID;
        response.send({message:'Contact Added Successfully',contactId:newContactId})
    } catch (error) {
        console.error("Error adding contact", error);
        response.status(500).send({message: error.message});
    }
  })
  


  app.put('/users/:id/', async(request,response) => {
    const {id} = request.params;
    const {name, phoneNumber, address,borrowedMoney,borrowedType,typeOfRepayment,modeOfRepayment,installments,deadTime} = request.body;
    const updateContactQuery = `UPDATE USERS SET name = ?, phoneNumber = ?, address = ?,borrowedMoney=?,borrowedType=?,
    typeOfRepayment=?, modeOfRepayment=?, installments=?, deadTime=? WHERE id = ?`;

    try{
      let updateContact = await db.run(updateContactQuery,[name, phoneNumber, address,borrowedMoney,borrowedType,typeOfRepayment,modeOfRepayment,installments,deadTime,id]);
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


  app.delete('/users/:id/',async(request,response) => {
    const {id} = request.params;
    const deleteContactQuery = `DELETE FROM USERS WHERE id = ?`;
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


  app.delete('/deleteUser/:id/', async (request, response) => {
    const { id } = request.params;

  
    const checkContactQuery = `SELECT * FROM USERS WHERE id = ?`;
    const contact = await db.get(checkContactQuery, [id]);
  
    if (!contact) {
      return response.status(404).send({ message: "Contact not found" });
    }
  
    const deleteContactQuery = `DELETE FROM USERS WHERE id = ?`;
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
  
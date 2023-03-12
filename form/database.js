const { ObjectId, MongoClient } = require('mongodb');

const mongo = require('mongodb').MongoClient;
const url = "mongodb://0.0.0.0:27017/mydb";

function createEmptyCollection() {
   mongo.connect(url, (err, db) => {
      if (err)
         throw err;
      const dbo = db.db("mydb");
      {
         console.log(err, names);
         if(names.length==0){
            dbo.createCollection("users", (err, res) => {
               if (err)
                  throw err;
               console.log("collection created!");
               db.close();
            }
            )
         }
      }
   }
   )
}

function createUser(userdata) {
   mongo.connect(url, (err, db) => {
      if (err)
         throw err;
      const dbo = db.db("mydb");
      dbo.collection("users").insertOne(userdata, (err, res) => {
         if (err)
            throw err;
         console.log("1 document added!");
         db.close();
      }
      )
   })
}

async function getId(userdata) {
   let client = await MongoClient.connect(url);
   let db = client.db("mydb");
   let result = {}
   try{
      result = await db.collection("users").findOne(userdata)
   }finally{
      client.close();
      return result._id;
   }
}

async function getUser(id) {
   let client = await MongoClient.connect(url);
   let db = client.db("mydb");
   let result = {}
   try{
      result = await db.collection("users").findOne({"_id":ObjectId(id)})
   }finally{
      client.close();
      return result;
   }
}

module.exports = { createEmptyCollection, createUser, getId, getUser }
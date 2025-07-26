import express from 'express'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'

dotenv.config()

const app = express()
const port = 3000
app.use(cors())
app.use(bodyParser.json())

// Connection URL
const url = process.env.MONGO_URI
const client = new MongoClient(url);

// Database Name
const dbName = 'PassMG';

client.connect();
console.log('Connected successfully to server');


//get request
app.get('/', async(req, res) => {
  const db = client.db(dbName);
  const collection =  db.collection('Passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

//Post request
app.post('/', async(req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection =  db.collection('Passwords');
  const findResult = await collection.insertOne(password);
  res.send({"message":"Password added successfully" , data : findResult})
})

//Delete request
app.delete('/', async(req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection =  db.collection('Passwords');
  const findResult = await collection.deleteOne(password);
  res.send({"message":"Password deleted successfully" , data : findResult})
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
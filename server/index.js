const express = require("express");
const cors = require('cors');

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

require('dotenv').config();

const port = process.env.PORT || 9000;

const app = express();


// here origin will be the website , which will send and recive data using cors 

const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5173',],
    credentials: true,
    optionSuccessStatus: 200,
}
// cors connect server and browser , for data passing 
app.use(cors(corsOptions))

// convert file from client side 
app.use(express.json());
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.hy9u5fr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
 


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  async function run() {
    try {

    // geting data form a collection 
    const jobCollection = client.db('Solospeher').collection('jobs');
    const bidsCollection = client.db('Solospeher').collection('bids');


      // Connect the client to the server	(optional starting in v4.7)
      //   await client.connect();{"_id":{"$oid":"666aff1fc5f190c3a5cec627"}}
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
    // ----------------------------------------------------------------------------------------

    // getting data 
    app.get('/jobs', async (req,res)=>{
        const result = await jobCollection.find().toArray();
        res.send(result);
    })
    
    
    // getting jobs data from mongodb collection
    // using dynamic id 
    
    app.get('/job/:id', async(req,res)=>{
      //code
      //use params for take id variable from ui or font end
      const id = req.params.id;

      //making a query for searching object in collection 
      const query = {_id: new ObjectId(id)}
      const result = await jobCollection.findOne(query);
      
      //sending result to fontend 
      res.send(result);
    })


    //recive data and save bid data in db 
    app.post('/bid',async (req,res)=>{
      const bidData = req.body
      const result = await bidsCollection.insertOne(bidData);
      res.send(result);
    })

    
    } finally {
      // Ensures that the client will close when you finish/error
     //   await client.close();
    }
  }
  run().catch(console.dir);
  
  


app.get('/',(req,res)=>{
    res.send(`hello from the server`)
})
app.listen(port, ()=>{
    console.log(`server is runnig bro ${port}`);
})

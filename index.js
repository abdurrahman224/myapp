const express = require('express')
const cors = require('cors')
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000
app.use(cors())
app.use(express.json())
//abdurrahman21266057_db_user
//JmLLOK0IaL7JBw0l
const uri = "mongodb+srv://abdurrahman21266057_db_user:JmLLOK0IaL7JBw0l@cluster0.ywfnves.mongodb.net/?appName=Cluster0";
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
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();   
    // Send a ping to confirm a successful connection

// const database = client.db('userDB');
// const usercillection = database.collection('user');


const usercillection = client.db('userDB').collection('user');


app.get('/user',async(res,req)=>{
  const cursor = usercillection.find();
  const result = await cursor.toArray();
  req.send(result)
})



app.delete('/user/:id',async(req,res)=>{
const id = req.params.id;
console.log("Delete", id);
const query = {_id :new ObjectId(id)}
const result = await usercillection.deleteOne(query)


res.send(result)

if(result.deletedCount===1){
   console.log("Successfully deleted one document.");
}else{

    console.log("No documents matched the query. Deleted 0 documents.");
}


})

app.post('/user', async(req,res)=>{

  const user = req.body
  console.log(user);
const result = await usercillection.insertOne(user);
res.send(result)

  
})


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/',(req,res)=>{

    res.send('Abdur Rahman is learning express js')
})

app.listen(port,()=>{
    console.log(`My express app is running on port ${port}`);
})
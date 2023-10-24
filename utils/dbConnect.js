import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

function dbConnect() {
  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ddpko0x.mongodb.net/?retryWrites=true&w=majority`;
  return (client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  }));
}

export default dbConnect;

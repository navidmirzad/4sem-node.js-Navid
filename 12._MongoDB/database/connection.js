import { MongoClient } from "mongodb";

const URL = "mongodb://localhost:27017";
const client = new MongoClient(URL);

const dbName = "ice_creams";

await client.connect(dbName);

const db = client.db(dbName);

export default {
  types: db.collection("types"),
  brands: db.collection("brands"),
};

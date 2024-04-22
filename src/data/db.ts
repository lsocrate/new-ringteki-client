import { MongoClient } from "mongodb";

export { ObjectId } from "mongodb";

export const db = new MongoClient("mongodb://localhost:27017").db("ringteki");

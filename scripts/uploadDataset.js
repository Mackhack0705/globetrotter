import { MongoClient } from "mongodb";
import fs from "fs";
import * as dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

const uploadDataset = async () => {
    try {
        await client.connect();
        const database = client.db("globetrotter");
        const collection = database.collection("destinations");

        const dataset = JSON.parse(fs.readFileSync("valid_destinations.json"));
        await collection.insertMany(dataset);
        console.log("Dataset uploaded to MongoDB");
    } finally {
        await client.close();
    }
};

uploadDataset();
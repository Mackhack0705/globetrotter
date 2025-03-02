import { fs } from 'fs';
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const uri = process.env.MONGODB_URI as string;

const client = new MongoClient(uri);

export async function GET() {
    try {
        
        await client.connect();
        const database = client.db("globetrotter");
        console.log(database);
        
        const collection = database.collection("destinations");
        console.log(collection);
        

        const count = await collection.countDocuments();
        const randomIndex = Math.floor(Math.random() * count);
        const destination = await collection.findOne({}, { skip: randomIndex });
        console.log(destination);
        

        return NextResponse.json(destination);
    } finally {
        await client.close();
    }
}
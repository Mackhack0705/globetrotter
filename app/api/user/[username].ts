import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

const uri = process.env.MONGODB_URI as string;
const client = new MongoClient(uri);

export default async function handler(req: NextRequest) {
    try {
      await client.connect();
      const database = client.db("globetrotter");
      const collection = database.collection("users");

      const url = req.url;
      const username = url.search('username');

      // Fetch user details
      const user = await collection.findOne({ username });
      if (!user) {
        return NextResponse.json({ error: "User not found" });
      }

      NextResponse.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      NextResponse.json({ error: "Internal Server Error" });
    } finally {
      await client.close();
    }
}
import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

const uri = process.env.MONGODB_URI as string;
const client = new MongoClient(uri);

export async function POST(req: NextRequest) {
    try {
      await client.connect();
      const database = client.db("globetrotter");
      const collection = database.collection("users");

      const { username } = await req.json();

      // Check if the username already exists
      const existingUser = await collection.findOne({ username });
      if (existingUser) {
        return NextResponse.json({ error: "Username already exists" });
      }

      // Create a new user profile
      const user = { username, score: { correct: 0, incorrect: 0 } };
      await collection.insertOne(user);

      return NextResponse.json({ message: "User registered successfully", user });
    } catch (error) {
      console.error("Error registering user:", error);
      return NextResponse.json({ error: "Internal Server Error" });
    } finally {
      await client.close();
    }
}
import fs from "fs";
import * as dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });
import { ChatGroq } from "@langchain/groq";

const llm = new ChatGroq({
  model: "llama-3.3-70b-versatile",
  temperature: 0,
  apiKey: process.env.CHATGROQ_API_KEY
});
const stripMarkdown = (text) => {
  // Remove the ```json and ``` markers
  return text.replace(/```json/g, "").replace(/```/g, "").trim();
};

const generateDestinations = async (numDestinations) => {
  const prompt = `
    Generate a list of ${numDestinations} famous travel destinations with the following details for each:
    - City
    - Country
    - 2 cryptic clues
    - 2 fun facts
    - 2 trivia

    Format the output as a JSON array.
    `;

  const response = await llm.invoke(prompt);
  const data = stripMarkdown(response.content);
  try {
    const dataset = JSON.parse(data);
    return dataset;
  } catch (error) {
    console.error("Error parsing dataset:", error);
    return []; // Return an empty array if parsing fails
  }
};

const validateDataset = (dataset) => {
  if (!Array.isArray(dataset)) {
    console.error("Dataset is not an array:", dataset);
    return []; // Return an empty array if the dataset is invalid
  } 
  console.log("valid dataset");

  const valid_destinations = dataset.filter((entry) => {
    
    return (
        entry.City &&
        entry.Country &&
        entry['Cryptic Clues']?.length === 2 &&
        entry['Fun Facts']?.length === 2 &&
        entry.Trivia?.length === 2
    );
  });
  
  return valid_destinations
};

const main = async () => {
  const destinations = await generateDestinations(10);
  const validDestinations = validateDataset(destinations);
  
  fs.writeFileSync("valid_destinations.json", JSON.stringify(validDestinations, null, 2));
  console.log("Dataset generated and saved to valid_destinations.json");
};

main();

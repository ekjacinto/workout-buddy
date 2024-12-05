import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5000;
const API_KEY = process.env.OPENAI_API_KEY;

app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: API_KEY,
});

app.post("/api", async (req, res) => {
  const { generativeInput } = req.body;

  if (!generativeInput) {
    return res.status(400).json({ error: "Generative input is required." });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful exercise assistant recommending workout splits.",
        },
        {
          role: "user",
          content: `
          Create a workout plan based on the following input: ${JSON.stringify(
            generativeInput
          )}.
          
          Example Format 1 With Bodybuilding Program and Monday as Days Chosen:
          Monday - Full Body:
          1. Leg Press - 4 sets, 8-10 reps 
          2. Incline Bench Press - 3 sets, 8 reps
          4. Lateral Raise - 3 sets, 10 reps
          3. Pull-Downs - 3 sets, 8 reps
          4. Reverse Pec Deck - 3 sets, 10 reps
          5. Push Downs - 3 sets, 10 reps
          6. Barbell Curl - 3 sets, 10 reps

          Example Format 2 With Powerlifing Program and Tuesday / Thursday as Days Chosen:
          Tuesday - Lower Body:
          1. Barbell Squats - 5 sets, 5 reps
          2. Deadlifts - 5 sets, 5 reps

          Thursday - Upper Body:
          1. Bench Press - 5 sets, 5 reps
          2. Military Press - 5 sets, 5 reps
          3. Barbell Rows - 5 sets, 5 reps
          
          Example Format 3 With Bodybuilding Program and Monday / Wednesday / Friday as Days Chosen:
          Monday - Chest & Triceps:
          1. Bench Press - 4 sets, 8-10 reps
          2. Incline Bench Press - 3 sets, 8 reps
          3. Chest Flyes - 3 sets, 10 reps
          4. Tricep Dips - 3 sets, 8 reps
          5. Tricep Pushdowns - 3 sets, 10 reps
          6. Skull Crushers - 3 sets, 10 reps'

          Wednesday - Back & Biceps:
          1. Deadlifts - 4 sets, 8-10 reps
          2. Pull-Ups - 3 sets, 8 reps
          3. Barbell Rows - 3 sets, 10 reps
          4. Dumbbell Curls - 3 sets, 8 reps
          5. Hammer Curls - 3 sets, 10 reps

          Friday - Legs & Shoulders:
          1. Barbell - 4 sets, 8-10 reps
          2. Leg Press - 3 sets, 8 reps
          3. Hamstring Curls - 3 sets, 10 reps
          4. Leg Extensions - 3 sets, 8 reps

          Do not include any additional details such as an overview or summary. Just list the exercises for each day following the example format above.
        `,
        },
      ],
      temperature: 1,
      max_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    res.status(200).json({ plan: response.choices[0].message.content });
  } catch (error) {
    console.error("Error generating workout plan:", error);
    res.status(500).json({ error: "Failed to generate workout plan." });
  }
});

app.get("/api", (req, res) => {
  res.send("Welcome to the Workout Plan API. Please use POST to send data.");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

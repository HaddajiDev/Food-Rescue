const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const multer = require('multer');
const cloudinary = require('../lib/cloudinary');
const streamifier = require("streamifier");

const storage = multer.memoryStorage();
const upload = multer({
    storage,
});

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: process.env.GOOGLE_MODEL || "gemini-1.5-flash" });

router.post('/data', upload.single('file'), async (req, res) => {
    try {
        // Updated to allow both production and local development origins
        const origin = req.headers.origin;
        if (origin === 'https://foodrescue-1.vercel.app' || origin === 'http://localhost:3000') {
            res.header('Access-Control-Allow-Origin', origin);
        }
        res.header('Access-Control-Allow-Credentials', 'true');

        const file = req.file;
        const fileCloud = await uploadToCloudinary(file);

        const response = await GetData(fileCloud.secure_url);

        res.send(response);

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while processing your request' });
    }
});

router.get('/over', async (req, res) => {
    try {
        const response = await GetDataLeftOvers("https://images.unsplash.com/photo-1590779033100-9f60a05a013d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while processing your request' });
    }
});

async function GetDataLeftOvers(url) {
    const prompt = process.env.PROMPT_2 || "Analyze this image for leftovers.";

    try {
        const imageResponse = await fetch(url);
        if (!imageResponse.ok) {
            console.error('[AI] Failed to fetch image:', imageResponse.status);
            return "Failed to fetch image from Cloudinary.";
        }

        const blob = await imageResponse.blob();
        const mimeType = blob.type || 'image/jpeg';
        const arrayBuffer = await blob.arrayBuffer();
        const base64Data = Buffer.from(arrayBuffer).toString('base64');

        const result = await model.generateContent([
            { text: prompt },
            {
                inlineData: {
                    data: base64Data,
                    mimeType: mimeType,
                },
            },
        ]);

        const response = await result.response;
        let text = response.text();

        // Clean up potential markdown formatting
        text = text.replace(/```json|```/g, '').trim();
        try {
            return JSON.parse(text);
        } catch (e) {
            return text;
        }
    } catch (error) {
        console.error("Error in GetDataLeftOvers:", error);
        throw error;
    }
}

const PROMPT = `
Based on the detected ingredients from the images (only return the ingredients that you detected on the image):  
detectedIngredients: [list of ingredients]

Generate a JSON response with the following structure:

{
  "detectedIngredients": [],
  "recipes": [
    {
      "id": 1,
      "title": "",
      "time": "", 
      "servings": "", 
      "difficulty": "", 
      "calories": "", 
      "tags": [],
      "description": "",
      "ingredients": [],
      "instructions": []
    },
    {
      "id": 2,
      "title": "",
      "time": "", 
      "servings": "", 
      "difficulty": "", 
      "calories": "", 
      "tags": [],
      "description": "",
      "ingredients": [],
      "instructions": []
    }
  ],
  "advice": {
    "title": "",
    "content": []
  }
}


Rules:
- "detectedIngredients" must repeat the list of input ingredients.
- Create 3 - 5 recipes using the detected ingredients creatively.
- "difficulty" must be one of: Easy, Medium, Hard.
- "tags" can be like "Vegetarian", "Quick", "Healthy", "Low Waste", etc.
- "description" should be a short appetizing summary of the dish.
- "ingredients" is a list of items with optional measurements.
- "instructions" should be a step-by-step breakdown.
- "advice" Create 3 advices with 3 - 5 contents should give helpful tips about how to store, reuse, or preserve the detected ingredients.
- Output only the JSON, without extra text.`

async function GetData(url) {
    console.log("Processing URL:", url);
    const prompt = PROMPT;

    try {
        const imageResponse = await fetch(url);
        if (!imageResponse.ok) {
            console.error('[AI] Failed to fetch image:', imageResponse.status);
            throw new Error('Failed to fetch image for recipe generation');
        }

        const blob = await imageResponse.blob();
        const mimeType = blob.type || 'image/jpeg';
        const arrayBuffer = await blob.arrayBuffer();
        const base64Data = Buffer.from(arrayBuffer).toString('base64');

        const result = await model.generateContent([
            { text: prompt },
            {
                inlineData: {
                    data: base64Data,
                    mimeType: mimeType,
                },
            },
        ]);

        const response = await result.response;
        let text = response.text();

        console.log("AI Response:", text);

        const finalResponse = text.replace(/```json|```/g, '').trim();
        try {
            return JSON.parse(finalResponse);
        } catch (e) {
            console.error("Failed to parse AI response as JSON:", finalResponse);
            throw new Error("Invalid JSON response from AI");
        }
    } catch (error) {
        console.error("Error in GetData:", error);
        throw error;
    }
}

async function uploadToCloudinary(file) {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
            { upload_preset: process.env.CLOUDINARY_PRESET },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary upload error:", error);
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );
        streamifier.createReadStream(file.buffer).pipe(stream);
    });
}

module.exports = router;
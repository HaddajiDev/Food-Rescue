const express = require('express');
const router = express.Router();
const OpenAI = require('openai');
const multer = require('multer');
const cloudinary = require('../lib/cloudinary');
const streamifier = require("streamifier");

const storage = multer.memoryStorage();
const upload = multer({
    storage,
});

const client = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENAI_API_KEY,
});

router.post('/data', upload.single('file'), async(req, res) => {
    try {
        const file = req.file;
        const mode = req.query.mode;
        const ingredients = req.body.ingredients;
        const fileCloud = await uploadToCloudinary(file);
        
        const response = null;
        if(mode === "ingredients"){
            response = await GetData(fileCloud.secure_url);
        }
        else{
            response = await GetDataLeftOvers(ingredients);
        }
        res.send(response);
    } catch (error) {
        console.log(error)
    }
});

async function GetDataLeftOvers(ingredients) {    
    const user = {role: "user", content: ingredients};

    const messages = [
        {role: 'system', content: process.env.PROMPT},
        user
    ];

    const completion = await client.chat.completions.create({
        model: "google/gemini-2.0-flash-exp:free",
        messages: messages,
        response_format: { type: "json_object" }
    });

    const aiResponse = completion.choices[0].message.content;
    return aiResponse;
}



async function GetData(url){
    const content = [{type : 'text', text: ""}, {type : 'image_url', image_url: url}];

    const user = {
        role: "user",
        content: content
    }

    const messages = [
        {role: 'system', content: process.env.PROMPT},
        user
    ]

    const completion = await client.chat.completions.create({
        model: "google/gemini-2.0-flash-exp:free",
        messages: messages,
        response_format: { type: "json_object" }
    });

    const aiResponse = completion.choices[0].message.content;
    return aiResponse;
}


async function uploadToCloudinary(file){
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
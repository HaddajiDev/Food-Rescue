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

        res.header('Access-Control-Allow-Origin', 'https://foodrescue-1.vercel.app');
        res.header('Access-Control-Allow-Credentials', 'true');

        const file = req.file;
        const fileCloud = await uploadToCloudinary(file);
        
        const response = await GetData(fileCloud.secure_url);

        res.send(response);
        
    } catch (error) {
        console.log(error)
    }
});

router.get('/over', async(req, res) =>{
    try {
        const response = await GetDataLeftOvers("https://images.unsplash.com/photo-1590779033100-9f60a05a013d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
        res.send(response);
    } catch (error) {
        
    }
})

async function GetDataLeftOvers(url) {    
    const content = [{type : 'text', text: ""}, {type : 'image_url', image_url: url}];

    const user = {
        role: "user",
        content: content
    }

    const messages = [
        {role: 'system', content: process.env.PROMPT_2},
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



async function GetData(url){
    console.log(url);
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
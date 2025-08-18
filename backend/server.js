// import express from "express";
// import "dotenv/config";
// import cors from "cors";
// import mongoose from "mongoose";
// import chatRoutes from "./routes/chat.js";

// const app = express();
// const PORT = 8080;

// app.use(express.json());
// app.use(cors());

// app.use("/api", chatRoutes);

// app.listen(PORT, () => {
//     console.log(`server running on ${PORT}`);
//     connectDB();
// });

// const connectDB = async() => {
//     try {
//         await mongoose.connect(process.env.MONGODB_URI);
//         console.log("Connected with Database!");
//     } catch(err) {
//         console.log("Failed to connect with Db", err);
//     }
// }


// app.post("/test", async (req, res) => {
//     const options = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
//         },
//         body: JSON.stringify({
//             model: "gpt-4o-mini",
//             messages: [{
//                 role: "user",
//                 content: req.body.message
//             }]
//         })
//     };

//     try {
//         const response = await fetch("https://api.openai.com/v1/chat/completions", options);
//         const data = await response.json();
//         //console.log(data.choices[0].message.content); //reply
//         res.send(data.choices[0].message.content);
//     } catch(err) {
//         console.log(err);
//     }
// });














import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import fetch from "node-fetch";
import chatRoutes from "./routes/chat.js";
//import fetch from "node-fetch";



const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", chatRoutes);

// AI Chat Route (using OpenRouter)
app.post("/api/ask", async (req, res) => {
    const userMessage = req.body.message;

    if (!userMessage) {
        return res.status(400).json({ error: "Message is required" });
    }

    try {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "HTTP-Referer": "http://localhost:5173", // Change to your site URL in production
                "X-Title": "Voice AI Chatbot"
            },
            body: JSON.stringify({
                model: "openai/gpt-4o-mini",
                messages: [
                    { role: "system", content: "You are a helpful voice-enabled AI chatbot." },
                    { role: "user", content: userMessage }
                ]
            })
        };

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", options);
        const data = await response.json();

        res.json({ reply: data.choices[0]?.message?.content || "No response" });
    } catch (err) {
        console.error("Error fetching AI reply:", err);
        res.status(500).json({ error: "Failed to fetch AI reply" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});

// Database connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(" Connected to Database!");
    } catch (err) {
        console.error(" Failed to connect  DB", err);
    }
};

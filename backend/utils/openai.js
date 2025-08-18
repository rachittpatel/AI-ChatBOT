// import "dotenv/config";

// const getOpenAIAPIResponse = async(message) => {
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
//                 content: message
//             }]
//         })
//     };

//     try {
//         const response = await fetch("https://api.openai.com/v1/chat/completions", options);
//         const data = await response.json();
//         return data.choices[0].message.content; //reply
//     } catch(err) {
//         console.log(err);
//     }
// }

// export default getOpenAIAPIResponse;






// utils/openai.js


// import "dotenv/config";

// const getOpenAIAPIResponse = async (message) => {
//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//     },
//     body: JSON.stringify({
//       model: "gpt-4o",
//       messages: [{ role: "user", content: message }],
//     }),
//   };

//   try {
//     const response = await fetch("https://api.openai.com/v1/chat/completions", options);
//     const data = await response.json();

//     const reply = data?.choices?.[0]?.message?.content?.trim();
//     if (!reply) {
//       console.error("⚠️ Empty response from OpenAI:", data);
//       return null;
//     }

//     return reply;
//   } catch (err) {
//     console.error("❌ OpenAI fetch error:", err);
//     return null;
//   }
// };

// export default getOpenAIAPIResponse;



import "dotenv/config";

const getOpenAIAPIResponse = async (message) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "HTTP-Referer": "http://localhost:5173", // important for some OpenRouter keys
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo", // or try "mistralai/mistral-7b-instruct"
      messages: [{ role: "user", content: message }],
    }),
  };

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", options);
    const data = await response.json();

    const reply = data?.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      console.error("Empty response from OpenRouter:", data);
      return null;
    }

    return reply;
  } catch (err) {
    console.error(" OpenRouter fetch error:", err);
    return null;
  }
};

export default getOpenAIAPIResponse;

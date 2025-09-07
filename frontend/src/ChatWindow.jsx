// import "./ChatWindow.css";
// import { MyContext } from "./MyContext.jsx";
// import { useContext, useState, useEffect, useRef } from "react";

// function ChatWindow() {
//     const {
//         prompt,
//         setPrompt,
//         reply,
//         setReply,
//         currThreadId,
//         prevChats,
//         setPrevChats,
//         setNewChat
//     } = useContext(MyContext);

//     const [loading, setLoading] = useState(false);
//     const recognitionRef = useRef(null);
//     const chatEndRef = useRef(null);

//     // Fetch reply from backend
//     const getReply = async () => {
//         if (!prompt.trim()) return;

//         setLoading(true);
//         setNewChat(false);

//         try {
//           const response = await fetch("https://ai-chatbot-ahdz.onrender.com/api/chat", {

//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                     message: prompt,
//                     threadId: currThreadId,
//                 }),
//             });

//             const res = await response.json();
//             setReply(res.reply);

//             // Append to chat history
//             setPrevChats((prev) => [
//                 ...prev,
//                 { role: "user", content: prompt },
//                 { role: "assistant", content: res.reply },
//             ]);
//         } catch (err) {
//             console.error("Error fetching reply:", err);
//         }

//         setPrompt("");
//         setLoading(false);
//     };

//     // Speech recognition setup
//     useEffect(() => {
//         if ("webkitSpeechRecognition" in window) {
//             const SpeechRecognition = window.webkitSpeechRecognition;
//             recognitionRef.current = new SpeechRecognition();
//             recognitionRef.current.continuous = false;
//             recognitionRef.current.interimResults = false;
//             recognitionRef.current.lang = "en-US";

//             recognitionRef.current.onresult = (event) => {
//                 const transcript = event.results[0][0].transcript;
//                 setPrompt(transcript);
//                 getReply(transcript);
//             };
//         } else {
//             console.warn("Speech recognition not supported in this browser.");
//         }
//     }, []);

//     const startListening = () => {
//         if (recognitionRef.current) recognitionRef.current.start();
//     };

//     // Auto scroll down on new chat
//     useEffect(() => {
//         if (chatEndRef.current) {
//             chatEndRef.current.scrollIntoView({ behavior: "smooth" });
//         }
//     }, [prevChats]);

//     return (
//         <div className="chatWindow">
//             <div style={{ width: "85%", fontFamily: "Arial" }}>
//                 <h2>AI Chatbot</h2>

              
//                 <div
//                     style={{
//                         maxHeight: "320px",
//                         overflowY: "auto",
//                         border: "1px solid #ddd",
//                         padding: "10px",
//                         marginBottom: "10px",
//                         display: "flex",
//                         flexDirection: "column",
//                     }}
//                 >
//                     {prevChats.map((chat, idx) => (
//                         <div
//                             key={idx}
//                             style={{
//                                 display: "flex",
//                                 justifyContent:
//                                     chat.role === "user" ? "flex-end" : "flex-start",
//                                 marginBottom: "8px",
//                             }}
//                         >
//                             <div
//                                 style={{
//                                     backgroundColor:
//                                         chat.role === "user" ? "#0078ff" : "#e5e5ea",
//                                     color: chat.role === "user" ? "white" : "black",
//                                     padding: "8px 12px",
//                                     borderRadius: "12px",
//                                     maxWidth: "80%",
//                                     wordWrap: "break-word",
//                                 }}
//                             >
//                                 {chat.content}
//                             </div>
//                         </div>
//                     ))}
//                     <div ref={chatEndRef} />
//                 </div>

              
                
//                 <textarea
//                     value={prompt}
//                     onChange={(e) => setPrompt(e.target.value)}
//                     placeholder="Type your question here..."
//                     style={{ width: "100%", height: "50px" }}
//                 />

//                 <div
//                     style={{
//                         marginTop: "10px",
//                         display: "flex",
//                         justifyContent: "space-between",
//                     }}
//                 >
//                     <button
//                         style={{
//                             border: "#b4b4b4 1px solid",
//                             background: "white",
//                         }}
//                         onClick={getReply}
//                         disabled={loading}
//                     >
//                         {loading ? "Thinking..." : "Send"}
//                     </button>
//                     <button
//                         onClick={startListening}
//                         style={{
//                             marginLeft: "10px",
//                             border: "#b4b4b4 1px solid",
//                             background: "white",
//                         }}
//                     >
//                         🎤 Speak
//                     </button>
//                 </div> 
//             </div>
//               <p className="info">
//                     SigmaGPT can make mistakes. Check important info. See Cookie Preferences.
//                 </p>
//         </div>
//     );
// }

// export default ChatWindow;










// import "./ChatWindow.css";
// import { MyContext } from "./MyContext.jsx";
// import { useContext, useState, useEffect, useRef } from "react";

// //  Use environment variable for backend API
// const API_BASE = import.meta.env.VITE_API_URL;

// function ChatWindow() {
//     const {
//         prompt,
//         setPrompt,
//         reply,
//         setReply,
//         currThreadId,
//         prevChats,
//         setPrevChats,
//         setNewChat
//     } = useContext(MyContext);

//     const [loading, setLoading] = useState(false);
//     const recognitionRef = useRef(null);
//     const chatEndRef = useRef(null);

//     // Fetch reply from backend
//     const getReply = async () => {
//         if (!prompt.trim()) return;

//         setLoading(true);
//         setNewChat(false);

//         try {
//             const response = await fetch(`${API_BASE}/api/chat`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                     message: prompt,
//                     threadId: currThreadId,
//                 }),
//             });

//             const res = await response.json();
//             setReply(res.reply);

//             // Append to chat history
//             setPrevChats((prev) => [
//                 ...prev,
//                 { role: "user", content: prompt },
//                 { role: "assistant", content: res.reply },
//             ]);
//         } catch (err) {
//             console.error("Error fetching reply:", err);
//         }

//         setPrompt("");
//         setLoading(false);
//     };

//     // Speech recognition setup
//     useEffect(() => {
//         if ("webkitSpeechRecognition" in window) {
//             const SpeechRecognition = window.webkitSpeechRecognition;
//             recognitionRef.current = new SpeechRecognition();
//             recognitionRef.current.continuous = false;
//             recognitionRef.current.interimResults = false;
//             recognitionRef.current.lang = "en-US";

//             recognitionRef.current.onresult = (event) => {
//                 const transcript = event.results[0][0].transcript;
//                 setPrompt(transcript);
//                 getReply(transcript);
//             };
//         } else {
//             console.warn("Speech recognition not supported in this browser.");
//         }
//     }, []);

//     const startListening = () => {
//         if (recognitionRef.current) recognitionRef.current.start();
//     };

//     // Auto scroll down on new chat
//     useEffect(() => {
//         if (chatEndRef.current) {
//             chatEndRef.current.scrollIntoView({ behavior: "smooth" });
//         }
//     }, [prevChats]);

//     return (
//         <div className="chatWindow">
//             <div style={{ width: "85%", fontFamily: "Arial" }}>
//                 <h2>AI Chatbot</h2>

//                 <div
//                     style={{
//                         maxHeight: "320px",
//                         overflowY: "auto",
//                         border: "1px solid #ddd",
//                         padding: "10px",
//                         marginBottom: "10px",
//                         display: "flex",
//                         flexDirection: "column",
//                     }}
//                 >
//                     {prevChats.map((chat, idx) => (
//                         <div
//                             key={idx}
//                             style={{
//                                 display: "flex",
//                                 justifyContent:
//                                     chat.role === "user" ? "flex-end" : "flex-start",
//                                 marginBottom: "8px",
//                             }}
//                         >
//                             <div
//                                 style={{
//                                     backgroundColor:
//                                         chat.role === "user" ? "#0078ff" : "#e5e5ea",
//                                     color: chat.role === "user" ? "white" : "black",
//                                     padding: "8px 12px",
//                                     borderRadius: "12px",
//                                     maxWidth: "80%",
//                                     wordWrap: "break-word",
//                                 }}
//                             >
//                                 {chat.content}
//                             </div>
//                         </div>
//                     ))}
//                     <div ref={chatEndRef} />
//                 </div>

//                 <textarea
//                     value={prompt}
//                     onChange={(e) => setPrompt(e.target.value)}
//                     placeholder="Type your question here..."
//                     style={{ width: "100%", height: "50px" }}
//                 />

//                 <div
//                     style={{
//                         marginTop: "10px",
//                         display: "flex",
//                         justifyContent: "space-between",
//                     }}
//                 >
//                     <button
//                         style={{
//                             border: "#b4b4b4 1px solid",
//                             background: "white",
//                         }}
//                         onClick={getReply}
//                         disabled={loading}
//                     >
//                         {loading ? "Thinking..." : "Send"}
//                     </button>
//                     <button
//                         onClick={startListening}
//                         style={{
//                             marginLeft: "10px",
//                             border: "#b4b4b4 1px solid",
//                             background: "white",
//                         }}
//                     >
//                         🎤 Speak
//                     </button>
//                 </div>
//             </div>
//             <p className="info">
//                 SigmaGPT can make mistakes. Check important info. See Cookie Preferences.
//             </p>
//         </div>
//     );
// }

// export default ChatWindow;












import "./ChatWindow.css";
import { MyContext } from "./MyContext.jsx";
import { useContext, useState, useEffect, useRef } from "react";

// Use environment variable for backend API (fallback to localhost for dev)
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";

function ChatWindow() {
  const {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    prevChats,
    setPrevChats,
    setNewChat,
  } = useContext(MyContext);

  const [loading, setLoading] = useState(false);
  const recognitionRef = useRef(null);
  const chatEndRef = useRef(null);

  // Fetch reply from backend
  const getReply = async (message) => {
    const userMessage = message || prompt;
    if (!userMessage.trim()) return;

    setLoading(true);
    setNewChat(false);

    try {
      const response = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          threadId: currThreadId,
        }),
      });

      const res = await response.json();
      setReply(res.reply);

      // Append to chat history
      setPrevChats((prev) => [
        ...prev,
        { role: "user", content: userMessage },
        { role: "assistant", content: res.reply },
      ]);
    } catch (err) {
      console.error("Error fetching reply:", err);
    }

    setPrompt("");
    setLoading(false);
  };

  // Speech recognition setup
  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setPrompt(transcript);
        getReply(transcript); // pass transcript correctly
      };
    } else {
      console.warn("Speech recognition not supported in this browser.");
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current) recognitionRef.current.start();
  };

  // Auto scroll down on new chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [prevChats]);

  return (
    <div className="chatWindow">
      <div style={{ width: "85%", fontFamily: "Arial" }}>
        <h2>AI Chatbot</h2>

        <div
          style={{
            maxHeight: "320px",
            overflowY: "auto",
            border: "1px solid #ddd",
            padding: "10px",
            marginBottom: "10px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {prevChats.map((chat, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                justifyContent: chat.role === "user" ? "flex-end" : "flex-start",
                marginBottom: "8px",
              }}
            >
              <div
                style={{
                  backgroundColor: chat.role === "user" ? "#0078ff" : "#e5e5ea",
                  color: chat.role === "user" ? "white" : "black",
                  padding: "8px 12px",
                  borderRadius: "12px",
                  maxWidth: "80%",
                  wordWrap: "break-word",
                }}
              >
                {chat.content}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your question here..."
          style={{ width: "100%", height: "50px" }}
        />

        <div
          style={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <button
            style={{
              border: "#b4b4b4 1px solid",
              background: "white",
            }}
            onClick={() => getReply()}
            disabled={loading}
          >
            {loading ? "Thinking..." : "Send"}
          </button>
          <button
            onClick={startListening}
            style={{
              marginLeft: "10px",
              border: "#b4b4b4 1px solid",
              background: "white",
            }}
          >
            🎤 Speak
          </button>
        </div>
      </div>
      <p className="info">
        SigmaGPT can make mistakes. Check important info. See Cookie Preferences.
      </p>
    </div>
  );
}

export default ChatWindow;

 // === CONFIGURAZIONE ===
 const API_KEY = "YOUR ID DEEPSEEK"; 
 const MODEL = "deepseek-chat";

 const chatEl = document.getElementById("chat");
 const promptEl = document.getElementById("prompt");
 const sendBtn = document.getElementById("send");
 const clearBtn = document.getElementById("clear");

 let chatHistory = JSON.parse(localStorage.getItem("ai_chat_memory")) || [];

const personality = "you are my bestfriend, your name is gonzalita! you love me and you are always super kind and helpful";

function renderChat() {
   chatEl.innerHTML = "";
   for (const m of chatHistory) {
     const div = document.createElement("div");
     div.className = "msg " + m.role;
     div.textContent = (m.role === "user" ? "me: " : "ai: ") + m.content;
     chatEl.appendChild(div);
   }
   chatEl.scrollTop = chatEl.scrollHeight;
 }
 renderChat();

 function saveMemory() {
   localStorage.setItem("ai_chat_memory", JSON.stringify(chatHistory));
 }

 async function callDeepSeekAPI(messages) {
   const res = await fetch("https://api.deepseek.com/v1/chat/completions", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
       Authorization: `Bearer ${API_KEY}`,
     },
     body: JSON.stringify({
       model: MODEL,
       messages: messages,
     }),
   });

   const data = await res.json();

   if (data.error) throw new Error(data.error.message);
   return data.choices?.[0]?.message?.content || "Nessuna risposta.";
 }

 sendBtn.addEventListener("click", async () => {
   const userText = promptEl.value.trim();
   if (!userText) return;
   promptEl.value = "";

   chatHistory.push({ role: "user", content: userText });
   renderChat();
   saveMemory();

   const loadingMsg = { role: "assistant", content: "..." };
   chatHistory.push(loadingMsg);
   renderChat();

   try {
     const context = [
       { role: "system", content: personality },
       ...chatHistory.map((m) => ({ role: m.role, content: m.content })),
     ];

     const replyText = await callDeepSeekAPI(context);
     loadingMsg.content = replyText;
     renderChat();
     saveMemory();
   } catch (err) {
     loadingMsg.content = "Errore: " + (err.message || "sconosciuto");
     renderChat();
   }
 });

 clearBtn.addEventListener("click", () => {
   localStorage.removeItem("ai_chat_memory");
   chatHistory = [];
   renderChat();
 });
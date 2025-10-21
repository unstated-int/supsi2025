// === CONFIGURAZIONE ===
const API_KEY = "YOUR ID DEEPSEEK"; 
const MODEL = "deepseek-chat";

const chatEl = document.getElementById("chat");
const promptEl = document.getElementById("prompt");
const sendBtn = document.getElementById("send");
const clearBtn = document.getElementById("clear");

//  Memoria locale
let chatHistory = JSON.parse(localStorage.getItem("ai_chat_memory")) || [];

const personality =
  "rispondimi solo con il risultato numerico. Sei un matematico e mi devi dare un numero, Mai stringhe";

function renderChat() {
  chatEl.innerHTML = "";
  for (const m of chatHistory) {
    const div = document.createElement("div");
    div.className = "msg " + m.role;
    div.textContent = (m.role === "user" ? "me: " : "ai: ") + m.content;
    //shape
    //if m content is a number
    if (typeof m.content === "number") {
      document.querySelector("#shape").style.left = `${m.content}px`;
    }
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
  console.log("🔍 DeepSeek raw:", data);

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

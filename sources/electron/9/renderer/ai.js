// === CONFIGURAZIONE ===
const API_KEY = "sk-1e10c2a11822459b97a83af72365cf91";
const MODEL = "deepseek-chat";

// === CONFIG ELEVEN LABS ===
const ELEVEN_API_KEY =
  "ce40627a4695871481690f44b60b54aeff521dcf666d8b2e592bcb75d4a97393";
const ELEVEN_VOICE_ID = "Xb7hH8MSUJpSbSDYk0k2";
const ELEVEN_URL = `https://api.elevenlabs.io/v1/text-to-speech/${ELEVEN_VOICE_ID}`;

const chatEl = document.getElementById("chat");
const promptEl = document.getElementById("prompt");
const sendBtn = document.getElementById("send");
const clearBtn = document.getElementById("clear");

//  Memoria locale
let chatHistory = JSON.parse(localStorage.getItem("ai_chat_memory")) || [];

const personality =
  "You are a helpful assistant and a nice friend. Answer all questions with a funny and friendly tone. In english!";

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
  console.log("DeepSeek raw:", data);

  if (data.error) throw new Error(data.error.message);
  return data.choices?.[0]?.message?.content || "Nessuna risposta.";
}

// === FUNZIONE ELEVEN LABS ===
async function speakWithElevenLabs(text) {
  try {
    const response = await fetch(ELEVEN_URL, {
      method: "POST",
      headers: {
        "xi-api-key": ELEVEN_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
        model_id: "eleven_turbo_v2",
        voice_settings: {
          stability: 0.4,
          similarity_boost: 0.8,
        },
      }),
    });

    if (!response.ok) throw new Error("Errore nella richiesta a Eleven Labs");

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
  } catch (err) {
    console.error("🎧 Eleven Labs error:", err);
  }
}

// === EVENTI ===
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

    // 🎧 Legge la risposta con Eleven Labs
    await speakWithElevenLabs(replyText);
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

(function () {
  let yourID = 1;
  let friendID = 2;
  let table = "students";

  // Variabili personali
  let personalBattery = 0;
  let personalCpuLoad = 0;
  let personalRam = 0;
  let personalUptime = 0;
  let personalMouse = { x: 0, y: 0 };

  // Variabili amico
  let friendBattery = 0;
  let friendCpuLoad = 0;
  let friendRam = 0;
  let friendUptime = 0;
  let friendMouse = { x: 0, y: 0 };

  // Event listeners per dati personali
  window.addEventListener("batteryUpdate", (e) => {
    personalBattery = e.detail.percent.toFixed(0);
  });

  window.addEventListener("cpuLoadUpdate", (e) => {
    personalCpuLoad = e.detail.currentLoad.toFixed(1);
  });

  window.addEventListener("ramUpdate", (e) => {
    personalRam = ((e.detail.active / e.detail.total) * 100).toFixed(1);
  });

  window.addEventListener("uptimeUpdate", (e) => {
    personalUptime = e.detail.uptime;
  });

  window.addEventListener("mouseUpdate", (e) => {
    personalMouse = e.detail;
  });

  // Connessione Supabase
  const SUPABASE_URL = "https://ukaxvfohnynqjvgzxtkk.supabase.co";
  const SUPABASE_ANON_KEY =
    "YOUR ID SUPABASE";

  const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  let channel; // 👈 definita qui, visibile ovunque

  // Funzione per inviare i propri dati
  async function saveData() {
    const input = {
      id: yourID,
      data: {
        cpuLoad: personalCpuLoad,
        battery: personalBattery,
        ram: personalRam,
        uptime: personalUptime,
        mouse: personalMouse,
        heartbeat: Date.now(),
      },
      updated_at: new Date(),
    };

    const { error } = await supabase.from(table).upsert([input]);
    if (error) {
      console.error("Insert error:", error.message);
    } else {
      console.log("Insert success");
    }
  }

  // Funzione per gestire il canale Realtime
  function subscribeRealtime() {
    if (channel) {
      console.warn("Removing old channel before re-subscribing...");
      supabase.removeChannel(channel);
    }

    channel = supabase
      .channel("public:" + table)
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: table },
        (payload) => {
          const data = payload.new;
          if (data.id === friendID) {
            friendBattery = data.data.battery;
            friendCpuLoad = data.data.cpuLoad;
            friendRam = data.data.ram;
            friendUptime = data.data.uptime;
            friendMouse = data.data.mouse;
            console.log("Friend data updated:", data.data);
            draw();
          }
        }
      )
      .subscribe((status) => {
        console.log("Realtime channel status:", status);
        if (status === "CLOSED" || status === "CHANNEL_ERROR") {
          console.warn("Realtime disconnected. Reconnecting in 3s...");
          setTimeout(subscribeRealtime, 3000);
        }
      });
  }

  // Inizializza Realtime
  subscribeRealtime();

  // 👇 Ping periodico per tenere vivo il canale
  setInterval(() => {
    if (channel && channel.state === "joined") {
      channel.send({
        type: "broadcast",
        event: "ping",
        payload: { t: Date.now() },
      });
      console.log("Ping sent to keep connection alive");
    }
  }, 20000);

  // Disegno dati sullo schermo
  function draw() {
    if (personalRam && friendRam && friendMouse && personalMouse) {
      document.getElementById("you").style.height = personalRam + "%";
      document.getElementById("friend").style.height = friendCpuLoad + "px";
      document.getElementById("you-coords").innerText =
        personalMouse.x + ", " + personalMouse.y + "; ";
      document.getElementById("friend-coords").innerText =
        friendMouse.x + ", " + friendMouse.y;
    }
  }

  // Salva dati periodicamente
  setInterval(saveData, 250);
})();

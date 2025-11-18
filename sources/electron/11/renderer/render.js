let status = document.getElementById("status");
const videoElement = document.getElementById("video");
const canvasElement = document.getElementById("output");
const canvasCtx = canvasElement.getContext("2d");
const hands = new Hands({
  locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
});

hands.setOptions({
  maxNumHands: 2,
  modelComplexity: 1,
  minDetectionConfidence: 0.7,
  minTrackingConfidence: 0.7,
});

hands.onResults(onResults);

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({ image: videoElement });
  },
  width: 640,
  height: 480,
});

camera.start();

function onResults(results) {
  // Imposta dimensioni del canvas
  canvasElement.width = videoElement.videoWidth;
  canvasElement.height = videoElement.videoHeight;

  // Disegna sul canvas
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(
    results.image,
    0,
    0,
    canvasElement.width,
    canvasElement.height
  );

  if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
    status.textContent = `✋ ${results.multiHandLandmarks.length} hand(s) detected`;

    if (results.multiHandLandmarks.length === 2) {
      showNotification("System Monitor", "2 hands detected");
    }

    for (const landmarks of results.multiHandLandmarks) {
      drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
        color: "#00FFAA",
        lineWidth: 3,
      });
      drawLandmarks(canvasCtx, landmarks, {
        color: "#FF0066",
        radius: 4,
      });
    }
  } else {
    status.textContent = "🖐 No hands detected";
  }

  // due mani
  if (results.multiHandLandmarks.length === 2) {
    const hand1 = results.multiHandLandmarks[0];
    const hand2 = results.multiHandLandmarks[1];

    console.log(results.multiHandLandmarks);
    const index1 = hand1[12]; // index 1
    const index2 = hand2[8]; // index 2

    // Calcola la distanza tr gli indici
    const dx = index1.x - index2.x;
    const dy = index1.y - index2.y;
    const dz = index1.z - index2.z;
    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

    if (distance < 0.05) {
      status.textContent = "Index fingers touching!";
      canvasCtx.fillStyle = "rgba(255,0,100,0.3)";
      canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);
    }
  }

  canvasCtx.restore();
}
function showNotification(title, body) {
  // USA window.API invece di Notification del browser
  if (window.API && window.API.showNotification) {
    window.API.showNotification(title, body);
  } else {
    // Fallback solo se necessario
    console.log("Using browser notification as fallback");
    if (Notification.permission === "granted") {
      new Notification(title, { body: body });
    }
  }
}
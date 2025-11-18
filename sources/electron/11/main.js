const {
  app,
  BrowserWindow,
  ipcMain,
  Tray,
  Menu,
  screen,
  nativeImage,
  Notification,
} = require("electron");
const path = require("path");
const si = require("systeminformation");

let mainWindow;
let tray;
let trayAnimationInterval;

const w = 370;
const h = 500;

const trayFrames = [
  "icon-0.png",
  "icon-1.png",
  "icon-2.png",
  "icon-3.png",
  "icon-4.png",
  "icon-5.png",
];

function createWindow() {
  mainWindow = new BrowserWindow({
    width: w,
    height: h,
    transparent: false,
    frame: false,
    alwaysOnTop: true,
    resizable: false,
    hasShadow: false,
    //here for icon
    icon: path.join(__dirname, "assets", "icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
    },
  });

  mainWindow.loadFile("renderer/index.html");
  return mainWindow;
}

function createSettingsWindow() {
  const win = new BrowserWindow({
    width: 300,
    height: 300,
    title: "Index Settings",
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile("renderer/settings.html");
}

function animateTrayIcon() {
  let frame = 0;

  trayAnimationInterval = setInterval(() => {
    const iconPath = path.join(__dirname, "assets", trayFrames[frame]);
    const image = nativeImage
      .createFromPath(iconPath)
      .resize({ width: 16, height: 16 });
    tray.setImage(image);
    frame = (frame + 1) % trayFrames.length;
  }, 250);
}

function animateWindow(win) {
  const display = screen.getPrimaryDisplay();
  const screenWidth = display.workArea.width;
  const screenHeight = display.workArea.height;

  let x = 0;
  let y = 0;
  let dx = 2;
  let dy = 2;
  const width = w;
  const height = h;

  setInterval(() => {
    x += dx;
    y += dy;

    if (x <= 0 || x + width >= screenWidth) dx *= -1;
    if (y <= 0 || y + height >= screenHeight) dy *= -1;

    win.setBounds({ x, y, width, height });
  }, 16);
}

// Gestore IPC per notifiche - versione senza icona
ipcMain.on("show-notification", (event, title, body) => {
  // Crea notifica senza specificare l'icona
  const notification = new Notification({
    title: title,
    body: body,
    silent: false,
  });

  notification.show();

  // Click sulla notifica
  notification.on("click", () => {
    if (mainWindow) {
      mainWindow.focus();
    }
  });
});

ipcMain.on("show-notification", (event, title, body) => {
  createNotification(title, body); // ← Questo causa l'errore
});

// Aggiungi questa funzione nel main.js
function createNotification(title, body) {
  try {
    const notification = new Notification({
      title: title,
      body: body,
      silent: false,
      timeoutType: "default",
    });

    notification.show();

    notification.on("click", () => {
      if (mainWindow) {
        mainWindow.focus();
      }
    });
  } catch (error) {
    console.error("Errore nella notifica:", error);
  }
}

ipcMain.handle("get-battery", async () => await si.battery());
ipcMain.handle("get-cpu", async () => await si.currentLoad());
ipcMain.handle("get-mem", async () => await si.mem());
ipcMain.handle("get-cpu-info", async () => await si.cpu());
ipcMain.handle("get-processes", async () => await si.processes());
ipcMain.handle("get-time-info", async () => await si.time());
ipcMain.handle("get-mouse-position", () => screen.getCursorScreenPoint());

app.whenReady().then(() => {
  //here for icon
  app.dock.setIcon(path.join(__dirname, "assets", "icon.png"));

  //icon for navbar
  const initialIcon = nativeImage
    .createFromPath(path.join(__dirname, "assets", "icon-0.png"))
    .resize({ width: 16, height: 16 });

  tray = new Tray(initialIcon);
  tray.setToolTip("Is active!");
  tray.setContextMenu(
    Menu.buildFromTemplate([
      { label: "Open Settings", click: () => ipcMain.emit("open-settings") },
      { type: "separator" },
      { label: "Quit", role: "quit" },
    ])
  );

  const win = createWindow();
  // animateWindow(win); // opzionale

  animateTrayIcon();

  ipcMain.on("open-settings", () => {
    createSettingsWindow();
  });

  ipcMain.on("open-mouse-position", () => {
    createMousePositionWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

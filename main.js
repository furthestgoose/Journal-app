const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./db.sqlite');

db.CREATE_TABLE = `CREATE TABLE IF NOT EXISTS entries (
id INTEGER PRIMARY KEY AUTOINCREMENT,
date TEXT,
title TEXT,
content TEXT
)`;
db.run(db.CREATE_TABLE);

ipcMain.handle('get-entries', async () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM entries', (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
});

ipcMain.handle('add-entry', async (event, date, title, content) => {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare('INSERT INTO entries (date, title, content) VALUES (?, ?, ?)');
    stmt.run(date, title, content, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID);
      }
    });
    stmt.finalize();
  });
});

ipcMain.handle('delete-entry', async (event, id) => {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare('DELETE FROM entries WHERE id = ?');
    stmt.run(id, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
    stmt.finalize();
  });
});

ipcMain.handle('update-entry', async (event, id, date, title, content) => {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare('UPDATE entries SET date = ?, title = ?, content = ? WHERE id = ?');
    stmt.run(date, title, content, id, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
    stmt.finalize();
  });
});

function createWindow() {
  const win = new BrowserWindow({
    width: 400,
    height: 680,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    },
    resizable: false,
    frame: true,
    backgroundColor: '#FFDAB9'
  });

  win.loadFile('index.html');
}

ipcMain.on('exit-app', () => {
  app.quit();
});

app.whenReady().then(() => {
  createWindow();
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
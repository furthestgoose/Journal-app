const { contextBridge, ipcRenderer } = require('electron');

const images = [
  'assets/settings frames/Settings.png',
  'assets/settings frames/Settings frame 2.png',
  'assets/settings frames/Settings frame 3.png',
  'assets/settings frames/Settings frame 4.png',
  'assets/settings frames/Settings final frame.png',
  'assets/book frames/Book icon 2.png',
  'assets/book frames/Book frame 2.png',
  'assets/book frames/Book frame 3.png',
  'assets/book frames/Book frame 4.png',
  'assets/book frames/Book frame 5.png',
  'assets/book frames/Book frame 6.png',
  'assets/book frames/Book frame 7.png',
  'assets/book frames/Book frame 8.png',
  'assets/door frames/Door.png',
  'assets/door frames/Door frame 2.png',
  'assets/door frames/Door frame 3.png',
  'assets/door frames/Door frame 4.png',
  'assets/door frames/Door frame 5.png',
  'assets/door frames/Door frame 6.png',
  'assets/view frames/View image.png',
  'assets/view frames/Eye frame 2.png',
  'assets/view frames/Eye frame 3.png',
  'assets/view frames/Eye frame 4.png',
  'assets/view frames/Eye frame 5.png',
  'assets/view frames/Eye frame 6.png',
  'assets/view frames/Eye frame 7.png',
  'assets/view frames/Eye frame 8.png',
  'assets/view frames/Eye frame 9.png',
  'assets/view frames/Eye frame 10.png',
  'assets/view frames/Eye frame 11.png',
  'assets/view frames/Eye frame 12.png',
  'assets/view frames/Eye frame 13.png',
];

images.forEach(src => {
  const img = new Image();
  img.src = src;
});

contextBridge.exposeInMainWorld('electron', {
  exitApp: () => ipcRenderer.send('exit-app'),
});
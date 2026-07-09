const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

if (!isProd) {
  const livereload = require('livereload');
  const connectLivereload = require('connect-livereload');

  const lr = livereload.createServer({ exts: ['html', 'css', 'js'] });
  lr.watch(path.join(__dirname));
  app.use(connectLivereload());
}

app.use(express.static(path.join(__dirname), {
  extensions: ['html'],
  index: 'index.html',
}));

app.listen(PORT, () => {
  console.log(`\n  ◆ http://localhost:${PORT}\n`);
});

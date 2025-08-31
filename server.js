const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files (CSS, images, etc.)
app.use(express.static('public'));

// Main challenge page
app.get('/', (req, res) => {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Waffle Count Mystery</title>
  <style>
    body {
      font-family: 'Courier New', monospace;
      background: linear-gradient(45deg, #e4db7d, #d4cb6d);
      color: #e63c3c;
      text-align: center;
      padding: 50px;
      min-height: 100vh;
      position: relative;
    }
    .main-img {
      width: 300px;
      border-radius: 15px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.3);
      transition: transform 0.3s ease;
    }
    .main-img:hover {
      transform: scale(1.05);
    }
    .invisible-zone {
      position: absolute;
      background: rgba(255, 0, 0, 0.3);
      border: 2px solid red;
      cursor: crosshair;
      z-index: 999;
    }
    .decoy1 { top: 100px; left: 200px; width: 34px; height: 34px; }
    .decoy2 { top: 400px; right: 150px; width: 30px; height: 30px; }
    .decoy3 { bottom: 200px; left: 100px; width: 38px; height: 38px; }
    .target { top: 285px; left: 485px; width: 21px; height: 21px; }
    
    h1 {
      text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
      margin-bottom: 30px;
    }
    
    .hint-text {
      font-size: 14px;
      color: #666;
      margin-top: 20px;
      font-style: italic;
    }
  </style>
</head>
<body>
  <h1>search nutella for eleven to apply in eggosssssss???</h1>
  <img src="https://i.imgflip.com/2fc1yt.jpg" alt="Morning Delicacy" class="main-img" height="400px" width="800px" />
  
  <div class="invisible-zone decoy1" onclick="eval(atob('YWxlcnQoJ05vbyBOdXRlbGxhISBLZWVwIHNlYXJjaGluZy4uLicp'))"></div>
  <div class="invisible-zone decoy2" onclick="alert('Wrong Door! Try again!')"></div>
  <div class="invisible-zone decoy3" onclick="alert('Nope! Look elsewhere...')"></div>
  <div class="invisible-zone target" onclick="window.location.href='/flag'"></div>
  
  <p class="hint-text">do we need nutella in the base?</p>
  
  <script>
    // Configuration constants
    const cfg = {
      opacity: 0,
      delay: 100,
      variance: 20,
      baseX: 485,
      baseY: 285
    };
    
    // Utility functions
    const utils = {
      encode: s => btoa(s.split('').reverse().join('')),
      decode: s => atob(s).split('').reverse().join(''),
      transform: x => String.fromCharCode(...x.map(c => c ^ 0x20 ^ 0x20))
    };

    // UI enhancements (buttons visible for testing)
    /*setTimeout(() => {
      document.querySelectorAll('.invisible-zone').forEach((el, idx) => {
        el.style.opacity = cfg.opacity;
        if(idx === (0x4-0x1)) el.setAttribute('data-key', btoa(Math.random().toString()));
      });
    }, cfg.delay);*/
    
    // Position adjustments
    window.addEventListener('load', () => {
      const targets = document.querySelectorAll('.invisible-zone');
      targets.forEach((t, i) => {
        if(i === (0x2+0x1)) {
          const rX = Math.floor(Math.random() * cfg.variance) - (cfg.variance/0x2);
          const rY = Math.floor(Math.random() * cfg.variance) - (cfg.variance>>0x1);
          t.style.left = (cfg.baseX + rX) + 'px';
          t.style.top = (cfg.baseY + rY) + 'px';
        }
      });
    });
  </script>
</body>
</html>`;
  
  res.send(html);
});

// Flag endpoint (server-side protection)
app.get('/flag', (req, res) => {
  // Add server-side validation if needed
  const userAgent = req.get('User-Agent');
  const referer = req.get('Referer');
  
  // Optional: Add basic anti-automation checks
  if (!referer || !referer.includes(req.get('host'))) {
    return res.status(403).send('Direct access not allowed');
  }
  
  const flagHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>You Found It!</title>
  <style>
    body {
      background: black;
      color: lime;
      font-family: monospace;
      text-align: center;
      padding-top: 100px;
    }
  </style>
</head>
<body>
  <h1>Congratulations!</h1>
  <p>Mom, your Nutella-locating skills are unmatched.........</p>
  <p>Here's your flag:</p>
  <h2>InnovCTF{NZXV6ZJVMM2HAM27MZZG63K7NA2HO2ZRNY2Q====}</h2>
</body>
</html>`;
  
  res.send(flagHtml);
});

// 404 handler
app.use((req, res) => {
  res.status(404).send('Page not found - Keep searching for the nutella!');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 CTF Challenge running on http://localhost:${PORT}`);
  console.log(`📁 Main challenge: http://localhost:${PORT}/`);
  console.log(`🏁 Flag endpoint: http://localhost:${PORT}/flag`);
});

module.exports = app;
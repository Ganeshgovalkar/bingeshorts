const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  await page.goto('https://tv.apple.com/', { waitUntil: 'networkidle2' });
  
  await new Promise(r => setTimeout(r, 5000));
  
  const extractedAssets = await page.evaluate(() => {
    const images = Array.from(document.querySelectorAll('img')).map(img => img.src || img.getAttribute('src')).filter(src => src && src.startsWith('http'));
    const pictures = Array.from(document.querySelectorAll('source')).map(source => source.srcset).filter(src => src && src.startsWith('http'));
    
    return {
      images: Array.from(new Set([...images, ...pictures].map(s => s.split(' ')[0])))
    };
  });
  
  fs.writeFileSync('apple-tv-assets.json', JSON.stringify(extractedAssets, null, 2));
  
  await browser.close();
  console.log('Extracted assets saved to apple-tv-assets.json');
})();

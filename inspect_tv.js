const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Set viewport to a desktop size
  await page.setViewport({ width: 1280, height: 800 });
  
  console.log('Navigating to tv.apple.com...');
  await page.goto('https://tv.apple.com/', { waitUntil: 'networkidle2' });
  
  const layoutStructure = await page.evaluate(() => {
    // Collect the main structural elements
    const sections = Array.from(document.querySelectorAll('section, main > div, .shelf'));
    
    return sections.map(s => {
      let title = s.querySelector('h1, h2, h3, .shelf-title, .header-title');
      let titleText = title ? title.innerText.trim() : 'No Title';
      
      let items = s.querySelectorAll('li, .item, .lockup');
      let itemInfo = [];
      if (items.length > 0) {
         let firstItem = items[0];
         let itemTitle = firstItem.querySelector('h3, .title, .lockup-title');
         itemInfo = {
            count: items.length,
            sampleTitle: itemTitle ? itemTitle.innerText.trim() : 'N/A'
         };
      }
      
      return {
        tag: s.tagName,
        className: s.className,
        title: titleText,
        itemCount: items.length,
        itemSample: itemInfo
      };
    });
  });
  
  console.log(JSON.stringify(layoutStructure, null, 2));
  
  await browser.close();
})();

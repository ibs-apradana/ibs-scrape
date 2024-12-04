import express from 'express';
import puppeteer from 'puppeteer';

const app = express();
const port = 3500;

// Helper function to clean text
function cleanText(text) {
  return text
    .replace(/\s+/g, ' ')           // Replace multiple spaces with single space
    .replace(/\n+/g, ' ')           // Replace newlines with space
    .trim();                        // Remove leading/trailing whitespace
}

// Main scraping endpoint
app.get('/scrape', async (req, res) => {
  const url = req.query.url;
  let browser;

  try {
    // Validate URL parameter
    if (!url) {
      return res.status(400).json({ error: 'URL parameter is required' });
    }

    // Validate URL format
    try {
      new URL(url);
    } catch (err) {
      return res.status(400).json({ error: 'Invalid URL format' });
    }

    // Launch browser
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu'
      ],
      executablePath: '/usr/bin/google-chrome'
    });
    
    const page = await browser.newPage();
    
    // Set timeout to 30 seconds
    await page.setDefaultNavigationTimeout(30000);
    
    // Navigate to URL
    await page.goto(url, {
      waitUntil: 'networkidle0',  // Wait until network is idle
    });

    // Extract text content from the page
    const content = await page.evaluate(() => {
      // Remove unwanted elements
      const selectorsToRemove = [
        'script',
        'style',
        'noscript',
        'iframe',
        'header',
        'footer',
        'nav',
        'ads',
        '.ads',
        '#ads',
        '.advertisement'
      ];
      
      selectorsToRemove.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => el.remove());
      });

      // Get main content (prioritize main content areas)
      const mainContent = document.querySelector('main, article, .content, #content, .main, #main');
      
      if (mainContent) {
        return mainContent.innerText;
      }
      
      // Fallback to body content if no main content area found
      return document.body.innerText;
    });

    // Clean the extracted text
    const cleanedContent = cleanText(content);

    // Send response
    res.json({
      url: url,
      content: cleanedContent
    });

  } catch (error) {
    console.error('Scraping error:', error);
    res.status(500).json({
      error: 'Failed to scrape content',
      message: error.message
    });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
# IBS Scrape

This is a web scraping API built with Node.js, Express, and Puppeteer that extracts clean text content from any URL.

## Features:
- Scrapes text content from any website
- Removes unwanted elements (ads, scripts, etc.)
- Returns clean, formatted text
- Dockerized for easy deployment
- Supports all major character sets

## Before You Begin:

### For Docker Installation:
- Docker Engine (20.10.0 or higher)
- Docker Compose (2.0.0 or higher)

### For Manual Installation:
- Node.js (18 or higher)
- npm (8 or higher)
- Google Chrome browser
- Git

## Installation Instructions:

### Using Docker (Recommended):
1. Clone the repository:
```
git clone https://github.com/ibs-apradana/ibs-scrape.git
cd ibs-scrape
```

2. Build and run with Docker:
```
docker-compose up --build
```

The API will be running at `http://localhost:3500`

### Manual Installation:
1. Clone the repository:
```
git clone https://github.com/ibs-apradana/ibs-scrape.git
cd ibs-scrape
```

2. Install dependencies:
```
npm install
```

3. Start the server:
```
node index.js
```

The API will be running at `http://localhost:3500`

## How to Use:

The API has one endpoint: `/scrape`  
**Method:** GET  
**Required parameter:** `url`

### Example Requests:

Using cURL:
```
curl "http://localhost:3500/scrape?url=https://example.com"
```

Using JavaScript:
```
fetch('http://localhost:3500/scrape?url=https://example.com')
  .then(response => response.json())
  .then(data => console.log(data));
```

Using Python:
```
import requests
response = requests.get('http://localhost:3500/scrape', params={'url': 'https://example.com'})
print(response.json())
```

The API will return a JSON response like this:
```
{
  "url": "https://example.com",
  "content": "Clean text content from the webpage..."
}
```

## Common Issues and Solutions:

1. **Chrome Launch Failed**
   - Check if Chrome is installed
   - Verify you have proper permissions

2. **Docker Problems**
   - Make sure Docker daemon is running
   - Try `docker-compose down` to remove existing containers
   - Use `docker system prune` to clear cache

3. **Port 3500 Already in Use**
   - Change the port in `docker-compose.yml` and `index.js`
   - Check running processes on port 3500

## System Requirements:

**Minimum:**
- 1 CPU core
- 2GB RAM
- 1GB free storage

**Recommended:**
- 2 CPU cores
- 4GB RAM
- 2GB free storage

## Environment Settings:
- `PORT`: 3500 (default)
- `NODE_ENV`: production (default)

For development with hot-reload:
```
docker-compose -f docker-compose.dev.yml up
```

## Need Help?

Open an issue in the GitHub repository.

Licensed under MIT License.

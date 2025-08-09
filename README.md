# ALX Movie App

This project documentation provides a comprehensive guide to using the MoviesDatabase API from RapidAPI, which offers extensive movie, TV show, and actor information.

## API Overview

The MoviesDatabase API is a comprehensive entertainment database that provides detailed information about movies, TV shows, episodes, and actors. This api provides complete and updated data for over 9 million titles (movies, series and episodes) and 11 million actors / crew and cast members. The API includes rich metadata such as YouTube trailer URLs, awards information, full biographies, plot summaries, ratings, and cast details. It's designed for developers building entertainment applications, movie recommendation systems, or any project requiring extensive film and television data.

Key features include:
- Extensive database with 9+ million titles and 11+ million cast/crew members
- Real-time updated information
- YouTube trailer integration
- Awards and nominations data
- Detailed biographical information for actors and crew
- Episode-level data for TV series
- Search capabilities across multiple categories

## Version

**API Version**: v1

The MoviesDatabase API is actively maintained with regular updates to ensure data accuracy and completeness.

## Available Endpoints

### Core Endpoints

- **`/titles/search/title/{query}`**
  - Search for movies and TV shows by title
  - Supports partial matching and fuzzy search

- **`/titles/random`**
  - Retrieve random movie or TV show suggestions
  - Useful for discovery features

- **`/titles/{id}`**
  - Get detailed information about a specific title by ID
  - Returns comprehensive metadata including cast, crew, ratings, and plot

- **`/titles/series/{id}`**
  - Get detailed series information including seasons and episodes
  - Returns episode lists and series-specific metadata

- **`/titles/{id}/ratings`**
  - Get rating information for a specific title
  - Includes ratings from various sources

- **`/actors/search/name/{query}`**
  - Search for actors, directors, and other crew members by name
  - Returns biographical and career information

- **`/actors/{id}`**
  - Get detailed actor information including filmography
  - Returns complete biographical data and career timeline

- **`/titles/utils/genres`**
  - Get list of available movie and TV show genres
  - Useful for category-based filtering

### Advanced Endpoints

- **`/titles/search/keyword/{keyword}`**
  - Search titles by keywords in plot descriptions
  - Advanced content discovery

- **`/titles/search/year/{year}`**
  - Filter titles by release year
  - Supports range queries

- **`/titles/{id}/episodes`**
  - Get episode information for TV series
  - Returns season and episode details

## Request and Response Format

### Authentication Headers
All requests must include the following headers:
```javascript
{
  'x-rapidapi-key': 'YOUR_API_KEY',
  'x-rapidapi-host': 'moviesdatabase.p.rapidapi.com'
}
```

### Example Request (Node.js/Next.js)

#### Using Built-in HTTPS Module
```javascript
const https = require('https');

const options = {
  method: 'GET',
  hostname: 'moviesdatabase.p.rapidapi.com',
  port: null,
  path: '/titles/search/title/inception',
  headers: {
    'x-rapidapi-key': process.env.RAPIDAPI_KEY,
    'x-rapidapi-host': 'moviesdatabase.p.rapidapi.com'
  }
};

const req = https.request(options, function (res) {
  const chunks = [];

  res.on('data', function (chunk) {
    chunks.push(chunk);
  });

  res.on('end', function () {
    const body = Buffer.concat(chunks);
    const data = JSON.parse(body.toString());
    console.log(data);
  });
});

req.on('error', function (error) {
  console.error('Request error:', error);
});

req.end();
```

#### Using Fetch API (Modern Approach)
```javascript
// Client-side or Next.js API route
async function fetchMovieData(titleId) {
  try {
    const response = await fetch(`https://moviesdatabase.p.rapidapi.com/titles/${titleId}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'moviesdatabase.p.rapidapi.com'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
```

#### Next.js API Route Example
```javascript
// pages/api/movies/[id].js
export default async function handler(req, res) {
  const { id } = req.query;

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY,
      'x-rapidapi-host': 'moviesdatabase.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(`https://moviesdatabase.p.rapidapi.com/titles/${id}`, options);
    
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch movie data' });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
```

### Example Response Format

**Title Search Response:**
```json
{
  "page": 1,
  "next": "/titles/search/title/inception?page=2",
  "entries": 50,
  "results": [
    {
      "id": "tt1375666",
      "primaryImage": {
        "url": "https://m.media-amazon.com/images/...",
        "width": 1080,
        "height": 1350
      },
      "titleType": {
        "text": "Movie",
        "id": "movie"
      },
      "titleText": {
        "text": "Inception"
      },
      "originalTitleText": {
        "text": "Inception"
      },
      "releaseYear": {
        "year": 2010
      },
      "releaseDate": {
        "day": 16,
        "month": 7,
        "year": 2010
      }
    }
  ]
}
```

**Detailed Title Response:**
```json
{
  "results": {
    "id": "tt1375666",
    "titleText": {
      "text": "Inception"
    },
    "titleType": {
      "id": "movie",
      "text": "Movie"
    },
    "originalTitleText": {
      "text": "Inception"
    },
    "plot": {
      "plotText": {
        "plainText": "A thief who steals corporate secrets..."
      }
    },
    "releaseYear": {
      "year": 2010
    },
    "runtimeMinutes": {
      "time": 148
    },
    "genres": {
      "genres": [
        {
          "text": "Action",
          "id": "Action"
        },
        {
          "text": "Sci-Fi",
          "id": "Sci-Fi"
        }
      ]
    },
    "primaryImage": {
      "url": "https://m.media-amazon.com/images/...",
      "width": 1080,
      "height": 1350
    }
  }
}
```

## Authentication

The MoviesDatabase API uses RapidAPI's standard authentication mechanism:

### Required Headers
- **`X-RapidAPI-Key`**: Your unique API key from RapidAPI
- **`X-RapidAPI-Host`**: `moviesdatabase.p.rapidapi.com`

### Getting Your API Key
1. Sign up for a free account at [RapidAPI](https://rapidapi.com)
2. Navigate to the MoviesDatabase API page
3. Subscribe to the API (free tier available)
4. Copy your API key from the dashboard
5. Store the key securely in environment variables

### Environment Setup
```javascript
// .env.local file (Next.js)
RAPIDAPI_KEY=your_api_key_here

// Or .env file (Node.js)
RAPIDAPI_KEY=your_api_key_here
```

### TypeScript Interface for Headers
```typescript
interface ApiHeaders {
  'x-rapidapi-key': string;
  'x-rapidapi-host': string;
}
```

## Error Handling

The API returns standard HTTP status codes along with descriptive error messages.

### Common HTTP Status Codes

- **`200 OK`**: Request successful
- **`400 Bad Request`**: Invalid request parameters
- **`401 Unauthorized`**: Invalid or missing API key
- **`403 Forbidden`**: API key lacks required permissions
- **`404 Not Found`**: Resource not found
- **`429 Too Many Requests`**: Rate limit exceeded
- **`500 Internal Server Error`**: Server-side error

### Error Response Format
```json
{
  "message": "Invalid API key",
  "error": "Unauthorized",
  "statusCode": 401
}
```

### TypeScript Error Interfaces
```typescript
interface ApiError {
  message: string;
  error: string;
  statusCode: number;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
}
```

### Error Handling Best Practices
```javascript
// Using async/await with proper error handling
async function fetchMovieWithErrorHandling(titleId) {
  try {
    const response = await fetch(`https://moviesdatabase.p.rapidapi.com/titles/${titleId}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'moviesdatabase.p.rapidapi.com'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API Error ${response.status}: ${errorData.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('MoviesDatabase API Error:', error);
    // Handle error appropriately for your application
    throw error;
  }
}

// Using with Node.js HTTPS module
const https = require('https');

function fetchWithErrorHandling(path) {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'GET',
      hostname: 'moviesdatabase.p.rapidapi.com',
      port: null,
      path: path,
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'moviesdatabase.p.rapidapi.com'
      }
    };

    const req = https.request(options, function (res) {
      const chunks = [];

      res.on('data', function (chunk) {
        chunks.push(chunk);
      });

      res.on('end', function () {
        const body = Buffer.concat(chunks);
        
        if (res.statusCode >= 400) {
          const error = JSON.parse(body.toString());
          reject(new Error(`API Error ${res.statusCode}: ${error.message}`));
          return;
        }

        try {
          const data = JSON.parse(body.toString());
          resolve(data);
        } catch (parseError) {
          reject(new Error('Failed to parse response'));
        }
      });
    });

    req.on('error', function (error) {
      reject(error);
    });

    req.end();
  });
}
```


### Best Practices

#### 1. Implement Caching
Cache frequently requested data to reduce API calls:
```javascript
// Simple in-memory cache
const cache = new Map();

async function fetchWithCache(url) {
  const cacheKey = url;
  
  if (cache.has(cacheKey)) {
    console.log('Cache hit');
    return cache.get(cacheKey);
  }
  
  console.log('Cache miss - fetching from API');
  const data = await fetch(url, {
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY,
      'x-rapidapi-host': 'moviesdatabase.p.rapidapi.com'
    }
  }).then(res => res.json());
  
  // Cache for 1 hour
  cache.set(cacheKey, data);
  setTimeout(() => cache.delete(cacheKey), 3600000);
  
  return data;
}
```

#### 2. Use Debouncing for Search
Implement debouncing to avoid excessive API calls during user input:
```javascript
// Debounce function
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// Usage in search functionality
const debouncedSearch = debounce(async (searchTerm) => {
  if (searchTerm.length < 3) return;
  
  try {
    const response = await fetch(`https://moviesdatabase.p.rapidapi.com/titles/search/title/${encodeURIComponent(searchTerm)}`, {
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'moviesdatabase.p.rapidapi.com'
      }
    });
    
    const data = await response.json();
    // Handle search results
    console.log(data);
  } catch (error) {
    console.error('Search error:', error);
  }
}, 300); // 300ms delay
```

#### 3. Handle Pagination Efficiently
The API supports pagination for large result sets:
```javascript
async function fetchAllResults(baseUrl) {
  const results = [];
  let page = 1;
  let hasNext = true;

  while (hasNext) {
    try {
      const response = await fetch(`${baseUrl}?page=${page}`, {
        headers: {
          'x-rapidapi-key': process.env.RAPIDAPI_KEY,
          'x-rapidapi-host': 'moviesdatabase.p.rapidapi.com'
        }
      });
      
      const data = await response.json();
      results.push(...data.results);
      hasNext = !!data.next;
      page++;
      
      // Add delay to respect rate limits
      if (hasNext) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    } catch (error) {
      console.error(`Error fetching page ${page}:`, error);
      break;
    }
  }

  return results;
}
```

#### 4. Error Recovery Strategies
Implement retry logic with exponential backoff:
```javascript
async function fetchWithRetry(url, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(url, {
        headers: {
          'x-rapidapi-key': process.env.RAPIDAPI_KEY,
          'x-rapidapi-host': 'moviesdatabase.p.rapidapi.com'
        }
      });
      
      if (response.ok) {
        return await response.json();
      }
      
      if (response.status === 429) {
        // Rate limit exceeded, wait before retry
        const waitTime = Math.pow(2, attempt) * 1000; // Exponential backoff
        console.log(`Rate limited. Waiting ${waitTime}ms before retry ${attempt + 1}/${maxRetries}`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        continue;
      }
      
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    } catch (error) {
      console.error(`Attempt ${attempt + 1} failed:`, error.message);
      
      if (attempt === maxRetries - 1) {
        throw new Error(`Failed after ${maxRetries} attempts: ${error.message}`);
      }
      
      // Wait before next attempt
      await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
    }
  }
}
```

#### 5. Optimize Request Batching
Group related requests when possible and avoid unnecessary calls by checking if data already exists locally.

### Monitoring Usage
Regularly monitor your API usage through the RapidAPI dashboard to:
- Track remaining quota
- Identify usage patterns
- Plan for potential upgrades
- Monitor response times and success rates

### Data Usage Considerations
- Store frequently accessed data in your database
- Implement intelligent caching strategies
- Consider using webhooks if available for real-time updates
- Validate and sanitize all API responses before use

---

**Note**: Always refer to the official RapidAPI documentation for the most up-to-date information about endpoints, rate limits, and pricing tiers.
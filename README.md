# ⚽ Football Predictions API (NestJS + MongoDB)

A simple **NestJS** service that:
- Accepts a **date** as a query parameter.
- Calls the **BetMiner Football Predictions API** via RapidAPI.
- Filters results to show only matches where the **home team’s predicted win chance > 50%**.
- Caches responses in **MongoDB** to avoid hitting the API repeatedly.
- Falls back to **mock data** when the API rate limit is hit.

---

## 📦 Tech Stack
- **NestJS** — Backend framework
- **MongoDB** — Cache & storage
- **Axios** — API requests
- **Dotenv** — Environment variables
- **BetMiner API** — Football predictions

---

## 📂 Folder Structure

```bash
src/
 ├── predictions/
 │    ├── betminer-mock-data.ts   # Mock fallback data
 │    ├── predictions.controller.ts
 │    ├── predictions.service.ts
 │    ├── predictions.repository.ts
 │    └── schemas/
 │         └── prediction.schema.ts
 ├── app.module.ts
 ├── main.ts
.env
package.json


```

## 🚀 Getting Started


### 1️⃣ Clone the repository
```bash
git clone https://github.com/Elozzy/football-prediction-system-backend
cd football-predictions-api
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Environment variables
Create a .env file in the root directory:

```bash
PORT=3000
MONGO_URI=
API_BASE_URL=
API_KEY=your_rapidapi_key_here
```
**Note**: Get your API key from [RapidAPI](https://rapidapi.com/)

## 🏃 Running the project

```bash
npm run start:dev
```

## 🔥 API Routes

**Get predictions by date**
```bash
GET /predictions?date=YYYY-MM-DD
```
**Example request:**
```bash
curl "http://localhost:5000/predictions?date=2025-08-11"
```
**Example response:** 
```bash 
[
  {
    "match_details": {
      "home_team": "New England II",
      "away_team": "Columbus Crew II",
      "country": "USA",
      "competition_name": "MLS Next Pro"
    },
    "probability": { "home_win": "60.00" },
    "predictions": { "home_win": "Y" }
  }
]
```

## 🔄 Forcing Fresh Data (Bypassing Cache)
The API caches predictions for each date in MongoDB. <br/>
To fetch fresh data directly from BetMiner and update the cache:

```bash
GET /predictions?date=YYYY-MM-DD&refresh=true
```
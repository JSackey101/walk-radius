# Walk Radius

Find places you can walk to within X minutes.

Pick a time budget (10, 20, 30 or 45 minutes) and Walk Radius shades the area you can reach on foot, then lists parks, cafés and viewpoints inside it.

## Running Locally

### Prerequisites

- Node.js 22.12.0 or newer

### Frontend
```
cd frontend
npm install
npm run dev
```

Then open the url it prints (usually http://localhost:5173).

## Status

🚧 In planning. Building the MVP milestone by milestone (M1–M5).

## Stack

- **Frontend:** React + TypeScript (Vite), Leaflet + OpenStreetMap tiles
- **Backend:** Python + FastAPI
- **Data:** OpenRouteService (walking isochrones), Overpass API (OpenStreetMap places)

## Design decisions

See [DECISIONS.md](DECISIONS.md) for the reasoning behind key choices.

# Decision Log — Walk Radius

Lightweight decision records (ADR-style). Add a new entry whenever a choice would be hard or costly to reverse. Never edit an old entry's decision — supersede it with a new one.

---

## 001 — Build a web app first, not a native mobile app

- **Date:** 2026-11-08
- **Status:** Accepted

**Context:** The MVP needs a map, location access and a list of places. These work in mobile browsers as well as on desktop.

**Decision:** Build a responsive web app (React + TypeScript + Leaflet) first.

**Reasons:**
- Easiest route to a working MVP.
- Doesn't lock the project in — the backend API stays the same, so a mobile app can be added later on top of it.

**Consequences:** No app-store presence or background location for now. Revisit after M5 if a native app is wanted.

---

## 002 — Backend in Python with FastAPI

- **Date:** 2026-11-08
- **Status:** Accepted

**Context:** The backend calls OpenRouteService and Overpass, hides API keys, caches results, and filters and sorts places.

**Decision:** Use Python + FastAPI.

**Reasons:**
- Already strong in Python and use it at work, so progress is faster.
- Building a real API project deepens a skill used daily.

**Consequences:** Two languages in the repo (TypeScript frontend, Python backend). Tests use pytest.

---

## 003 — "X minutes" means one way, not a round trip

- **Date:** 2026-11-08
- **Status:** Accepted

**Context:** An isochrone shows how far you can walk in X minutes from a start point. It doesn't include the walk back.

**Decision:** The time budget means **X minutes to get there**.

**Consequences:**
- The UI should say this clearly (e.g. "Places within 30 min walk").
- Round-trip and loop routes stay as stretch ideas.

---

## 004 — Time-based isochrones with the default walking speed

- **Date:** 2026-11-08
- **Status:** Accepted

**Context:** Isochrones depend on an assumed walking speed. Real pace varies (roughly 4 km/h relaxed to 6+ km/h brisk), so a fixed speed makes "X minutes" an estimate.

**Decision:** Use time-based isochrones (`range_type: "time"`) with the routing engine's default walking speed (about 5 km/h). No custom speed setting for now.

**Options considered:**
- **Time-based isochrone** (chosen) — the engine applies its own speed model, including adjustments for the path network and terrain.
- **Distance-based isochrone with a user speed** — the backend converts speed × time to metres and requests `range_type: "distance"`. Supports custom speeds, but treats every metre the same.

**Reasons:**
- Simplest option: time-based is the API default, and there's nothing for the backend to compute.
- Around 5 km/h is a reasonable average and good enough for a minimum viable product.
- A speed setting adds UI and logic that isn't needed to prove the core idea, so it isn't worth baking in yet.
- Likely-small extra: the engine's speed model may adjust for path types (e.g. steps, tracks). Both options follow the real street network, so this affects timing, not which routes are possible.

**Consequences:**
- Results will be slightly off for noticeably faster or slower walkers.
- Custom speed is not planned. Revisit based on user need and whether there's time; the distance-based approach above is the known fallback.

---

## 005 — In-memory cache for API results

- **Date:** 2026-11-08
- **Status:** Accepted

**Context:** The backend calls OpenRouteService and Overpass, both of which have free-tier rate limits. Caching results avoids repeat calls for the same start point and time budget.

**Decision:** Use an in-memory cache (a dict with expiry, e.g. `cachetools.TTLCache`) inside the FastAPI app.

**Options considered:**
- **In-memory dict** (chosen) — few lines, no setup, very fast.
- **SQLite file** — survives restarts, but more code.
- **Redis** — industry standard at scale, but overkill for this project.
- CSV and cloud storage were ruled out: CSV is a poor fit for nested GeoJSON and key lookups, and cloud storage isn't worth setting up.

**Reasons:**
- Easy to implement.
- Persistent data is deliberately a non-MVP concern.
- Losing the cache only costs a slower first request, so persistence isn't needed yet.

**Consequences:**
- The cache is wiped on every restart or deploy.
- Cache key: rounded start point plus minutes; expiry (TTL) to be set when built in M4.
- Revisit with SQLite or Redis if persistence becomes a need after the MVP.

---

## Template

```
## NNN — Title

- **Date:** YYYY-MM-DD
- **Status:** Proposed | Accepted | Superseded by NNN

**Context:** What situation or problem prompted this?

**Decision:** What did you choose?

**Reasons:** Why this option over the alternatives?

**Consequences:** What follows from it — trade-offs, follow-ups?
```

"use client";

import { useState, useRef, useCallback } from "react";
import { Navigation, ArrowRight, Footprints, Car, Train, Search, X } from "lucide-react";

const GOOGLE_MAPS_KEY = "AIzaSyCX8uHtDFpCzTko1lptwqq9vTg1gV5Wp-4";

const TORONTO_LOCATIONS = [
  { name: "181 University Ave",  neighbourhood: "Financial District", lat: 43.6484, lng: -79.3842 },
  { name: "1 Adelaide St E",     neighbourhood: "Financial District", lat: 43.6508, lng: -79.3771 },
  { name: "2 Sheppard Ave E",    neighbourhood: "North York",         lat: 43.7615, lng: -79.4111 },
  { name: "901 King St W",       neighbourhood: "King West",          lat: 43.6424, lng: -79.4107 },
  { name: "20 Richmond St E",    neighbourhood: "Financial District", lat: 43.6529, lng: -79.3788 },
  { name: "180 Dundas St W",     neighbourhood: "Downtown West",      lat: 43.6553, lng: -79.3876 },
  { name: "212 King St W",       neighbourhood: "King West",          lat: 43.6479, lng: -79.3877 },
  { name: "56 Temperance St",    neighbourhood: "Financial District", lat: 43.6508, lng: -79.3806 },
  { name: "350 Bay St",          neighbourhood: "Financial District", lat: 43.6506, lng: -79.3810 },
  { name: "215 Spadina Ave",     neighbourhood: "Downtown West",      lat: 43.6482, lng: -79.3969 },
];

function haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function estimateTimes(km: number) {
  return {
    walk:    Math.max(1, Math.ceil((km / 5) * 60)),
    transit: Math.max(1, Math.ceil((km / 20) * 60)),
    drive:   Math.max(1, Math.ceil((km / 30) * 60)),
  };
}

function mapsUrl(destAddress: string) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destAddress + ", Toronto, ON, Canada")}`;
}

type Result = {
  name: string;
  neighbourhood: string;
  km: number;
  times: { walk: number; transit: number; drive: number };
};

type Suggestion = { label: string; placeId: string };

function findClosest(lat: number, lng: number): Result[] {
  return TORONTO_LOCATIONS
    .map((loc) => {
      const km = haversine(lat, lng, loc.lat, loc.lng);
      return { name: loc.name, neighbourhood: loc.neighbourhood, km, times: estimateTimes(km) };
    })
    .sort((a, b) => a.km - b.km)
    .slice(0, 3);
}

async function fetchSuggestions(query: string): Promise<Suggestion[]> {
  const res = await fetch("https://places.googleapis.com/v1/places:autocomplete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": GOOGLE_MAPS_KEY,
    },
    body: JSON.stringify({
      input: query,
      includedRegionCodes: ["ca"],
    }),
  });
  const data = await res.json();
  if (!res.ok) {
    console.error("[Places Autocomplete]", res.status, data);
    throw new Error(data?.error?.message || `HTTP ${res.status}`);
  }
  if (!data.suggestions) return [];
  return data.suggestions
    .filter((s: { placePrediction?: { placeId?: string; text?: { text?: string } } }) => s.placePrediction)
    .map((s: { placePrediction: { placeId: string; text: { text: string } } }) => ({
      label: s.placePrediction.text.text,
      placeId: s.placePrediction.placeId,
    }));
}

async function fetchPlaceLocation(placeId: string): Promise<{ lat: number; lng: number }> {
  const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
    headers: {
      "X-Goog-Api-Key": GOOGLE_MAPS_KEY,
      "X-Goog-FieldMask": "location",
    },
  });
  const data = await res.json();
  if (!data.location) throw new Error("No location in response");
  return { lat: data.location.latitude, lng: data.location.longitude };
}

// Fallback for manual submit without picking a suggestion
async function geocodeFallback(address: string): Promise<{ lat: number; lng: number }> {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1&countrycodes=ca`;
  const res = await fetch(url, { headers: { "Accept-Language": "en" } });
  const data = await res.json();
  if (!data.length) throw new Error("Address not found");
  return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
}

export default function LocationFinder() {
  const [address, setAddress]         = useState("");
  const [status, setStatus]           = useState<"idle" | "loading" | "done" | "error">("idle");
  const [results, setResults]         = useState<Result[]>([]);
  const [errorMsg, setErrorMsg]       = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showDrop, setShowDrop]       = useState(false);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef  = useRef<HTMLDivElement>(null);

  const runSuggestions = useCallback(async (query: string) => {
    if (query.trim().length < 3) { setSuggestions([]); setShowDrop(false); return; }
    try {
      const hits = await fetchSuggestions(query);
      setSuggestions(hits);
      setShowDrop(hits.length > 0);
      setErrorMsg("");
    } catch (err) {
      setSuggestions([]);
      setShowDrop(false);
      setErrorMsg(`Autocomplete error: ${(err as Error).message}. Check the browser console for details.`);
      setStatus("error");
    }
  }, []);

  function handleInput(val: string) {
    setAddress(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => runSuggestions(val), 300);
  }

  async function pickSuggestion(s: Suggestion) {
    setAddress(s.label);
    setSuggestions([]);
    setShowDrop(false);
    setStatus("loading");
    setErrorMsg("");
    try {
      const coords = await fetchPlaceLocation(s.placeId);
      setResults(findClosest(coords.lat, coords.lng));
      setStatus("done");
    } catch {
      setErrorMsg("Couldn't fetch that location. Try pressing Search instead.");
      setStatus("error");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!address.trim()) return;
    setShowDrop(false);
    setStatus("loading");
    setErrorMsg("");
    try {
      const coords = await geocodeFallback(address);
      setResults(findClosest(coords.lat, coords.lng));
      setStatus("done");
    } catch {
      setErrorMsg("We couldn't find that address. Try being more specific (e.g. 'King & Spadina, Toronto').");
      setStatus("error");
    }
  }

  function handleGeolocate() {
    if (!navigator.geolocation) {
      setErrorMsg("Your browser doesn't support geolocation.");
      setStatus("error");
      return;
    }
    setShowDrop(false);
    setStatus("loading");
    setErrorMsg("");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setResults(findClosest(pos.coords.latitude, pos.coords.longitude));
        setStatus("done");
      },
      () => {
        setErrorMsg("Location access was denied. Try typing your address instead.");
        setStatus("error");
      }
    );
  }

  function handleBlur() {
    // Slight delay so onMouseDown on a suggestion fires first
    setTimeout(() => setShowDrop(false), 150);
  }

  function handleReset() {
    setAddress("");
    setResults([]);
    setSuggestions([]);
    setShowDrop(false);
    setErrorMsg("");
    setStatus("idle");
  }

  return (
    <div className="rounded-2xl border border-hairline bg-white p-8 lg:p-10">
      {/* Header */}
      <div className="mb-8">
        <p className="text-[13px] font-semibold text-teal uppercase tracking-[0.14em] mb-2">
          Toronto · 10 Locations
        </p>
        <h3 className="text-[24px] lg:text-[28px] font-bold text-ink tracking-tight leading-tight">
          Find a Workhaus near you
        </h3>
        <p className="mt-3 text-[15px] leading-[1.6] text-ink-soft max-w-lg">
          Enter your address or share your location — we'll show you the three closest
          Workhaus spaces and how long it takes to get there.
        </p>
      </div>

      {/* Input row */}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div ref={wrapperRef} className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-mute pointer-events-none z-10" />
          <input
            type="text"
            value={address}
            onChange={(e) => handleInput(e.target.value)}
            onFocus={() => suggestions.length > 0 && setShowDrop(true)}
            onBlur={handleBlur}
            onKeyDown={(e) => e.key === "Escape" && setShowDrop(false)}
            placeholder="e.g. 100 King St W, Toronto"
            autoComplete="off"
            className="w-full pl-10 pr-10 py-3 rounded-full border border-hairline bg-white text-[14px] text-ink placeholder:text-mute focus:outline-none focus:border-teal transition-colors"
          />
          {(address || results.length > 0) && (
            <button
              type="button"
              onClick={handleReset}
              aria-label="Clear"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-mute hover:text-ink hover:bg-hairline transition-colors z-10"
            >
              <X size={14} />
            </button>
          )}

          {showDrop && suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 top-full mt-2 z-50 bg-white border border-hairline rounded-2xl shadow-lg overflow-hidden">
              {suggestions.map((s, i) => (
                <li key={i}>
                  <button
                    type="button"
                    onMouseDown={() => pickSuggestion(s)}
                    className="w-full text-left px-4 py-3 text-[13px] text-ink hover:bg-canvas transition-colors border-b border-hairline last:border-0"
                  >
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-ink text-white text-[14px] font-semibold hover:bg-teal transition-colors disabled:opacity-50 sm:w-auto w-full"
        >
          <ArrowRight size={15} />
          Search
        </button>
        <button
          type="button"
          onClick={handleGeolocate}
          disabled={status === "loading"}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-hairline bg-white text-ink text-[14px] font-semibold hover:border-teal hover:text-teal transition-colors disabled:opacity-50 sm:w-auto w-full"
        >
          <Navigation size={15} />
          Use my location
        </button>
      </form>

      {status === "loading" && (
        <div className="mt-6 text-[14px] text-mute animate-pulse">Finding closest locations…</div>
      )}

      {status === "error" && (
        <div className="mt-6 text-[14px] text-red-500">{errorMsg}</div>
      )}

      {status === "done" && results.length > 0 && (
        <div className="mt-6 flex flex-col gap-3">
          {results.map((r, i) => (
            <div
              key={r.name}
              className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border p-5 transition-colors ${
                i === 0 ? "border-teal/40 bg-teal-soft/30" : "border-hairline bg-white"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${
                  i === 0 ? "bg-teal text-white" : "bg-hairline text-mute"
                }`}>
                  {i + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-[15px] font-semibold text-ink">{r.name}</p>
                    {i === 0 && (
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-teal text-white uppercase tracking-wide">
                        Closest
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] text-mute">
                    {r.neighbourhood} · {r.km < 1 ? `${Math.round(r.km * 1000)} m` : `${r.km.toFixed(1)} km`} away
                  </p>
                  <div className="flex flex-wrap gap-3 mt-2">
                    <span className="flex items-center gap-1 text-[12px] text-ink-soft">
                      <Footprints size={12} className="text-mute" /> {r.times.walk} min walk
                    </span>
                    <span className="flex items-center gap-1 text-[12px] text-ink-soft">
                      <Train size={12} className="text-mute" /> {r.times.transit} min transit
                    </span>
                    <span className="flex items-center gap-1 text-[12px] text-ink-soft">
                      <Car size={12} className="text-mute" /> {r.times.drive} min drive
                    </span>
                  </div>
                </div>
              </div>
              <a
                href={mapsUrl(r.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-hairline text-[13px] font-semibold text-ink hover:border-teal hover:text-teal transition-colors"
              >
                Get Directions <ArrowRight size={13} />
              </a>
            </div>
          ))}
          <p className="text-[12px] text-mute mt-1">
            Travel times are estimates. <a href="/tour" className="underline hover:text-teal">Book a tour</a> at any location.
          </p>
        </div>
      )}
    </div>
  );
}

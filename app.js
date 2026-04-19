'use strict';
/* ═══════════════════════════════════════════════════════
   AeroFind — European Flights  |  app.js
   ═══════════════════════════════════════════════════════ */

// ── AIRPORTS (Europe only) ────────────────────────────────────────────────────

const AIRPORTS = [
  // United Kingdom
  { code:'LHR', city:'London',      name:'Heathrow Airport',              country:'United Kingdom', flag:'🇬🇧', lat:51.48,  lon:-0.46  },
  { code:'LGW', city:'London',      name:'Gatwick Airport',               country:'United Kingdom', flag:'🇬🇧', lat:51.16,  lon:-0.18  },
  { code:'STN', city:'London',      name:'Stansted Airport',              country:'United Kingdom', flag:'🇬🇧', lat:51.88,  lon:0.23   },
  { code:'LTN', city:'London',      name:'Luton Airport',                 country:'United Kingdom', flag:'🇬🇧', lat:51.87,  lon:-0.37  },
  { code:'MAN', city:'Manchester',  name:'Manchester Airport',            country:'United Kingdom', flag:'🇬🇧', lat:53.36,  lon:-2.27  },
  { code:'EDI', city:'Edinburgh',   name:'Edinburgh Airport',             country:'United Kingdom', flag:'🇬🇧', lat:55.95,  lon:-3.37  },
  { code:'BRS', city:'Bristol',     name:'Bristol Airport',               country:'United Kingdom', flag:'🇬🇧', lat:51.38,  lon:-2.72  },
  // France
  { code:'CDG', city:'Paris',       name:'Charles de Gaulle',             country:'France',         flag:'🇫🇷', lat:49.01,  lon:2.55   },
  { code:'ORY', city:'Paris',       name:'Orly Airport',                  country:'France',         flag:'🇫🇷', lat:48.72,  lon:2.36   },
  { code:'NCE', city:'Nice',        name:"Côte d'Azur Airport",           country:'France',         flag:'🇫🇷', lat:43.66,  lon:7.21   },
  { code:'LYS', city:'Lyon',        name:'Saint-Exupéry Airport',         country:'France',         flag:'🇫🇷', lat:45.72,  lon:5.08   },
  { code:'MRS', city:'Marseille',   name:'Provence Airport',              country:'France',         flag:'🇫🇷', lat:43.44,  lon:5.22   },
  // Spain
  { code:'MAD', city:'Madrid',      name:'Adolfo Suárez Barajas',         country:'Spain',          flag:'🇪🇸', lat:40.49,  lon:-3.57  },
  { code:'BCN', city:'Barcelona',   name:'El Prat Airport',               country:'Spain',          flag:'🇪🇸', lat:41.30,  lon:2.08   },
  { code:'AGP', city:'Málaga',      name:'Costa del Sol Airport',         country:'Spain',          flag:'🇪🇸', lat:36.67,  lon:-4.50  },
  { code:'PMI', city:'Palma',       name:'Son Sant Joan Airport',         country:'Spain',          flag:'🇪🇸', lat:39.55,  lon:2.74   },
  { code:'SVQ', city:'Seville',     name:'San Pablo Airport',             country:'Spain',          flag:'🇪🇸', lat:37.42,  lon:-5.89  },
  { code:'ALC', city:'Alicante',    name:'El Altet Airport',              country:'Spain',          flag:'🇪🇸', lat:38.28,  lon:-0.56  },
  // Germany
  { code:'FRA', city:'Frankfurt',   name:'Frankfurt Airport',             country:'Germany',        flag:'🇩🇪', lat:50.03,  lon:8.56   },
  { code:'MUC', city:'Munich',      name:'Franz Josef Strauss Airport',   country:'Germany',        flag:'🇩🇪', lat:48.35,  lon:11.79  },
  { code:'BER', city:'Berlin',      name:'Brandenburg Airport',           country:'Germany',        flag:'🇩🇪', lat:52.37,  lon:13.52  },
  { code:'DUS', city:'Düsseldorf',  name:'Düsseldorf Airport',            country:'Germany',        flag:'🇩🇪', lat:51.29,  lon:6.77   },
  { code:'HAM', city:'Hamburg',     name:'Helmut Schmidt Airport',        country:'Germany',        flag:'🇩🇪', lat:53.63,  lon:9.99   },
  // Italy
  { code:'FCO', city:'Rome',        name:'Leonardo da Vinci (Fiumicino)', country:'Italy',          flag:'🇮🇹', lat:41.80,  lon:12.24  },
  { code:'MXP', city:'Milan',       name:'Malpensa Airport',              country:'Italy',          flag:'🇮🇹', lat:45.63,  lon:8.72   },
  { code:'LIN', city:'Milan',       name:'Linate Airport',                country:'Italy',          flag:'🇮🇹', lat:45.45,  lon:9.28   },
  { code:'NAP', city:'Naples',      name:'Capodichino Airport',           country:'Italy',          flag:'🇮🇹', lat:40.88,  lon:14.29  },
  { code:'VCE', city:'Venice',      name:'Marco Polo Airport',            country:'Italy',          flag:'🇮🇹', lat:45.50,  lon:12.35  },
  // Netherlands
  { code:'AMS', city:'Amsterdam',   name:'Schiphol Airport',              country:'Netherlands',    flag:'🇳🇱', lat:52.31,  lon:4.77   },
  // Portugal
  { code:'LIS', city:'Lisbon',      name:'Humberto Delgado Airport',      country:'Portugal',       flag:'🇵🇹', lat:38.77,  lon:-9.13  },
  { code:'OPO', city:'Porto',       name:'Francisco Sá Carneiro Airport', country:'Portugal',       flag:'🇵🇹', lat:41.24,  lon:-8.68  },
  { code:'FAO', city:'Faro',        name:'Faro Airport',                  country:'Portugal',       flag:'🇵🇹', lat:37.01,  lon:-7.97  },
  // Ireland
  { code:'DUB', city:'Dublin',      name:'Dublin Airport',                country:'Ireland',        flag:'🇮🇪', lat:53.42,  lon:-6.27  },
  // Austria
  { code:'VIE', city:'Vienna',      name:'Vienna International Airport',  country:'Austria',        flag:'🇦🇹', lat:48.12,  lon:16.57  },
  // Switzerland
  { code:'ZRH', city:'Zurich',      name:'Zurich Airport',                country:'Switzerland',    flag:'🇨🇭', lat:47.46,  lon:8.55   },
  { code:'GVA', city:'Geneva',      name:'Geneva Airport',                country:'Switzerland',    flag:'🇨🇭', lat:46.24,  lon:6.11   },
  // Belgium
  { code:'BRU', city:'Brussels',    name:'Brussels Airport',              country:'Belgium',        flag:'🇧🇪', lat:50.90,  lon:4.48   },
  // Denmark
  { code:'CPH', city:'Copenhagen',  name:'Kastrup Airport',               country:'Denmark',        flag:'🇩🇰', lat:55.62,  lon:12.65  },
  // Sweden
  { code:'ARN', city:'Stockholm',   name:'Arlanda Airport',               country:'Sweden',         flag:'🇸🇪', lat:59.65,  lon:17.92  },
  { code:'GOT', city:'Gothenburg',  name:'Landvetter Airport',            country:'Sweden',         flag:'🇸🇪', lat:57.67,  lon:12.29  },
  // Norway
  { code:'OSL', city:'Oslo',        name:'Gardermoen Airport',            country:'Norway',         flag:'🇳🇴', lat:60.20,  lon:11.08  },
  // Finland
  { code:'HEL', city:'Helsinki',    name:'Helsinki-Vantaa Airport',       country:'Finland',        flag:'🇫🇮', lat:60.32,  lon:24.96  },
  // Greece
  { code:'ATH', city:'Athens',      name:'Eleftherios Venizelos',         country:'Greece',         flag:'🇬🇷', lat:37.94,  lon:23.95  },
  { code:'HER', city:'Heraklion',   name:'Nikos Kazantzakis Airport',     country:'Greece',         flag:'🇬🇷', lat:35.34,  lon:25.18  },
  { code:'SKG', city:'Thessaloniki',name:'Makedonia Airport',             country:'Greece',         flag:'🇬🇷', lat:40.52,  lon:22.97  },
  // Poland
  { code:'WAW', city:'Warsaw',      name:'Chopin Airport',                country:'Poland',         flag:'🇵🇱', lat:52.17,  lon:20.97  },
  { code:'KRK', city:'Kraków',      name:'John Paul II Airport',          country:'Poland',         flag:'🇵🇱', lat:50.08,  lon:19.78  },
  // Czech Republic
  { code:'PRG', city:'Prague',      name:'Václav Havel Airport',          country:'Czechia',        flag:'🇨🇿', lat:50.10,  lon:14.26  },
  // Hungary
  { code:'BUD', city:'Budapest',    name:'Ferenc Liszt Airport',          country:'Hungary',        flag:'🇭🇺', lat:47.43,  lon:19.26  },
  // Romania
  { code:'OTP', city:'Bucharest',   name:'Henri Coandă Airport',          country:'Romania',        flag:'🇷🇴', lat:44.57,  lon:26.10  },
  // Croatia
  { code:'DBV', city:'Dubrovnik',   name:'Dubrovnik Airport',             country:'Croatia',        flag:'🇭🇷', lat:42.56,  lon:18.27  },
  { code:'SPU', city:'Split',       name:'Split Airport',                 country:'Croatia',        flag:'🇭🇷', lat:43.54,  lon:16.30  },
  // Turkey
  { code:'IST', city:'Istanbul',    name:'Istanbul Airport',              country:'Turkey',         flag:'🇹🇷', lat:41.27,  lon:28.74  },
  { code:'SAW', city:'Istanbul',    name:'Sabiha Gökçen Airport',         country:'Turkey',         flag:'🇹🇷', lat:40.90,  lon:29.31  },
  // Iceland
  { code:'KEF', city:'Reykjavik',   name:'Keflavík International',        country:'Iceland',        flag:'🇮🇸', lat:63.99,  lon:-22.63 },
  // Malta
  { code:'MLA', city:'Malta',       name:'Malta International Airport',   country:'Malta',          flag:'🇲🇹', lat:35.86,  lon:14.48  },
];

// ── AIRLINES (Europe only) ────────────────────────────────────────────────────

const AIRLINES = [
  { code:'FR', name:'Ryanair',         emoji:'🟡', home:'https://www.ryanair.com'        },
  { code:'BA', name:'British Airways', emoji:'🔵', home:'https://www.britishairways.com' },
  { code:'AF', name:'Air France',      emoji:'🔷', home:'https://www.airfrance.com'      },
  { code:'KL', name:'KLM',             emoji:'🩵', home:'https://www.klm.com'            },
];

// ── AMADEUS LIVE API ──────────────────────────────────────────────────────────
// Free API keys → https://developers.amadeus.com  (Self-Service → Create app)
// Paste your credentials below; leave blank to use estimated prices as fallback.

const AMADEUS_CLIENT_ID     = '';   // ← your Amadeus client ID
const AMADEUS_CLIENT_SECRET = '';   // ← your Amadeus client secret
const AMADEUS_BASE          = 'https://test.api.amadeus.com';

let _amToken    = null;
let _amTokenExp = 0;

async function amadeusToken() {
  if (_amToken && Date.now() < _amTokenExp) return _amToken;
  const res = await fetch(`${AMADEUS_BASE}/v1/security/oauth2/token`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body:    `grant_type=client_credentials&client_id=${AMADEUS_CLIENT_ID}&client_secret=${AMADEUS_CLIENT_SECRET}`,
  });
  if (!res.ok) throw new Error(`Amadeus auth failed: ${res.status}`);
  const j = await res.json();
  _amToken    = j.access_token;
  _amTokenExp = Date.now() + (j.expires_in - 60) * 1000;
  return _amToken;
}

async function searchAmadeusFlights() {
  const token = await amadeusToken();
  const cabinMap = { economy:'ECONOMY', premium:'PREMIUM_ECONOMY', business:'BUSINESS', first:'FIRST' };

  const params = new URLSearchParams({
    originLocationCode:      S.origin.code,
    destinationLocationCode: S.destination.code,
    departureDate:           S.depDate,
    adults:                  String(S.passengers),
    max:                     '15',
    currencyCode:            'EUR',
    travelClass:             cabinMap[S.cabin] || 'ECONOMY',
  });
  if (S.tripType === 'roundtrip' && S.retDate) params.set('returnDate', S.retDate);

  const res = await fetch(`${AMADEUS_BASE}/v2/shopping/flight-offers?${params}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Flight search failed: ${res.status}`);
  const json = await res.json();
  if (!json.data?.length) throw new Error('No results from Amadeus');
  return mapAmadeusOffers(json.data);
}

function parseDuration(iso) {             // "PT2H35M" → minutes
  const h = parseInt(iso.match(/(\d+)H/)?.[1] || '0');
  const m = parseInt(iso.match(/(\d+)M/)?.[1] || '0');
  return h * 60 + m;
}

function mapAmadeusOffers(offers) {
  const dist = Math.round(haversine(S.origin.lat, S.origin.lon, S.destination.lat, S.destination.lon));
  return offers.map((offer, idx) => {
    const itin      = offer.itineraries[0];
    const seg0      = itin.segments[0];
    const segLast   = itin.segments[itin.segments.length - 1];
    const [dh, dm]  = seg0.departure.at.split('T')[1].split(':').map(Number);
    const [ah, am]  = segLast.arrival.at.split('T')[1].split(':').map(Number);
    const duration  = parseDuration(itin.duration);
    const stops     = itin.segments.length - 1;
    const layovers  = itin.segments.slice(0, -1).map(s => s.arrival.iataCode);
    const code      = seg0.carrierCode;
    const airline   = AIRLINES.find(a => a.code === code)
                   || { code, name: code, emoji: '✈️', home: '#' };
    const pricePerPax = parseFloat(offer.travelerPricings[0].price.total);
    const totalPrice  = parseFloat(offer.price.grandTotal);
    return {
      id: `${code}-${idx}-${S.depDate}`,
      airline, depH: dh, depM: dm, arrH: ah, arrM: am,
      duration, stops, layovers, pricePerPax, totalPrice,
      flightNum: `${code}${seg0.number}`,
      distance:  dist, date: S.depDate,
      _live: true,
    };
  });
}

// ── PRICING (fallback — used when Amadeus keys are not set) ───────────────────

// Base prices in EUR by distance bucket
const BASE_EUR = {
  short:  { min: 18,  max: 160  },  // < 800 km
  medium: { min: 55,  max: 320  },  // 800–2200 km
  long:   { min: 90,  max: 480  },  // > 2200 km
};

// Seasonal multipliers: Jan–Dec (European summer peak Jul/Aug, Christmas peak Dec)
const SEASON = [1.10, 1.00, 0.95, 0.92, 0.95, 1.10, 1.40, 1.45, 1.25, 1.00, 0.90, 1.30];

// Airlines that operate short-haul budget routes
const BUDGET = new Set(['FR']);

// ── UTILS ────────────────────────────────────────────────────────────────────

function djb2(s) {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = (Math.imul(h, 33) ^ s.charCodeAt(i)) >>> 0;
  return h;
}
function rng(seed, lo, hi) {
  return lo + (djb2(String(seed)) % (hi - lo + 1));
}

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371, r = Math.PI / 180;
  const dLat = (lat2 - lat1) * r, dLon = (lon2 - lon1) * r;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * r) * Math.cos(lat2 * r) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

function getAirport(code) {
  return AIRPORTS.find(a => a.code === code) ?? null;
}

function routeBucket(o, d) {
  const a1 = getAirport(o), a2 = getAirport(d);
  if (!a1 || !a2) return 'medium';
  const km = haversine(a1.lat, a1.lon, a2.lat, a2.lon);
  if (km < 800)  return 'short';
  if (km < 2200) return 'medium';
  return 'long';
}

function routeAirlines(o, d) {
  // All 6 airlines operate across the route network; budget carriers lead on short haul
  return AIRLINES;
}

function priceFor(o, d, dateStr, airlineCode) {
  const bucket = routeBucket(o, d);
  const r = BASE_EUR[bucket];
  const base = rng(`B${o}${d}${airlineCode}`, r.min, r.max);
  const dt = new Date(dateStr + 'T12:00:00');
  const wknd = (dt.getDay() === 0 || dt.getDay() === 6) ? 1.15 : 1.0;
  const seas = SEASON[dt.getMonth()];
  const vary = (rng(`V${o}${d}${airlineCode}${dateStr}`, 0, 30) - 15) / 100;
  // Budget airlines are inherently cheaper
  const budgetMult = BUDGET.has(airlineCode) ? (0.55 + rng(`BM${airlineCode}`, 0, 20) / 100) : 1.0;
  return Math.round(base * wknd * seas * budgetMult * (1 + vary));
}

function minPriceForDate(o, d, dateStr) {
  return Math.min(...routeAirlines(o, d).map(a => priceFor(o, d, dateStr, a.code)));
}

function iso(y, m, d)  { return `${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`; }
function toDisplay(ds) {
  const [y, m, d] = ds.split('-');
  return `${d}/${m}/${y}`;
}
function fmtTime(h, m)  { return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`; }
function fmtDur(mins) {
  const h = Math.floor(mins / 60), m = mins % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}
function addMins(h, m, add) {
  const t = h * 60 + m + add;
  return { h: Math.floor(t / 60) % 24, m: t % 60 };
}
function fmtDate(ds) {
  const [y, m, d] = ds.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-GB', { weekday:'short', day:'numeric', month:'short' });
}
function fmtPrice(n) {
  return Math.round(n).toLocaleString('en-GB');
}
function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

// ── BOOKING URL BUILDER ──────────────────────────────────────────────────────
// Strategy:
//  • Ryanair  → direct path-based deep link (confirmed working, pre-selects flight)
//  • All others → Google Flights deep link (has official airline API partnerships;
//    reliably opens the airline's site with the specific flight pre-selected,
//    exactly as demonstrated in the user-provided screenshots)

function buildBookingUrl(airlineCode, o, d, depDate, retDate, passengers, tripType, cabin) {
  const isRT = tripType === 'roundtrip' && retDate;
  const pax  = passengers || 1;

  // Ryanair: direct booking URL — pre-fills route, date and passenger count
  if (airlineCode === 'FR') {
    return `https://www.ryanair.com/gb/en/booking/home`
         + `/${o}/${d}/${depDate}/${isRT ? retDate : 'null'}/${pax}/0/0/0`;
  }

  // All other airlines: route through Google Flights.
  // Google Flights has official API partnerships with BA, AF and KLM and will
  // deep-link the user directly to the chosen airline with the specific flight
  // already pre-selected (same behaviour shown in the Google Flights screenshots).
  const cabinGF = { economy:'e', premium:'p', business:'b', first:'f' }[cabin] || 'e';
  return `https://www.google.com/flights?hl=en`
       + `#search;f=${o};t=${d};d=${depDate}`
       + `${isRT && retDate ? `;r=${retDate};tt=r` : ';tt=o'}`
       + `;c=${cabinGF};px=${pax}`;
}

// Returns the label for the Book button depending on how the link is handled
function bookBtnLabel(airlineCode, airlineName) {
  return airlineCode === 'FR'
    ? `Book at ${airlineName}`
    : `Find on Google Flights →`;
}

// ── STATE ────────────────────────────────────────────────────────────────────

const S = {
  tripType:    'roundtrip',
  origin:      null,
  destination: null,
  depDate:     null,
  retDate:     null,
  passengers:  1,
  cabin:       'economy',

  calFor:      null,
  calYear:     new Date().getFullYear(),
  calMonth:    new Date().getMonth(),

  allFlights:      [],
  filteredFlights: [],
  sortBy:          'recommended',

  filters: { stops:[], airlines:[], maxPrice:null, maxDur:null, times:[] },
};

const priceCache = {};

function cacheMonth(o, d, y, m) {
  const days = new Date(y, m + 1, 0).getDate();
  for (let day = 1; day <= days; day++) {
    const k = iso(y, m + 1, day);
    if (!(k in priceCache)) priceCache[k] = minPriceForDate(o, d, k);
  }
}

// ── DOM ──────────────────────────────────────────────────────────────────────

const $  = id => document.getElementById(id);
const $q = sel => document.querySelectorAll(sel);

const originInp   = $('origin-inp');
const destInp     = $('dest-inp');
const originSug   = $('origin-sug');
const destSug     = $('dest-sug');
const originClear = $('origin-clear');
const destClear   = $('dest-clear');
const depInp      = $('dep-inp');
const retInp      = $('ret-inp');
const retField    = $('ret-field');
const paxN        = $('pax-n');
const searchBtn   = $('search-btn');
const swapBtn     = $('swap-btn');
const stickyBar   = $('sticky-bar');
const stickyText  = $('sticky-text');
const stickyEdit  = $('sticky-edit');
const calOverlay  = $('cal-overlay');
const calMWrap    = $('cal-months-wrap');
const calM2       = $('cal-m2');
const calT1       = $('cal-t1');
const calT2       = $('cal-t2');
const calG1       = $('cal-g1');
const calG2       = $('cal-g2');
const calModeLbl  = $('cal-mode-label');
const calPrev     = $('cal-prev');
const calNext     = $('cal-next');
const calClose    = $('cal-close');
const calSelInfo  = $('cal-sel-info');
const calConfirm  = $('cal-confirm');
const resultsEl   = $('results');
const loadingEl   = $('loading');
const loadingSub  = $('loading-sub');
const resHeadEl   = $('res-head');
const resTitle    = $('res-title');
const resInfo     = $('res-info');
const noResults   = $('no-results');
const bestPick    = $('best-pick');
const flightsList = $('flights-list');
const countLabel  = $('count-label');
const clearFiltersBtn = $('clear-filters');
const toast       = $('toast');

// ── AUTOCOMPLETE ─────────────────────────────────────────────────────────────

let sugTimers = {};

function setupAutocomplete(input, sugEl, clearBtn, onPick) {
  input.addEventListener('input', () => {
    clearTimeout(sugTimers[input.id]);
    sugTimers[input.id] = setTimeout(() => showSuggestions(input.value.trim(), sugEl, onPick), 120);
    clearBtn.classList.toggle('hidden', !input.value);
  });

  input.addEventListener('keydown', e => {
    const items = sugEl.querySelectorAll('.sug-item');
    const cur   = sugEl.querySelector('.sug-item.hover');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = cur ? (cur.nextElementSibling || items[0]) : items[0];
      cur?.classList.remove('hover'); next?.classList.add('hover');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = cur ? (cur.previousElementSibling || items[items.length - 1]) : items[items.length - 1];
      cur?.classList.remove('hover'); prev?.classList.add('hover');
    } else if (e.key === 'Enter') {
      cur?.dispatchEvent(new MouseEvent('mousedown'));
    } else if (e.key === 'Escape') {
      sugEl.innerHTML = '';
    }
  });

  clearBtn.addEventListener('click', () => {
    input.value = ''; sugEl.innerHTML = '';
    clearBtn.classList.add('hidden'); input.classList.remove('filled');
    if (input === originInp) S.origin = null; else S.destination = null;
    clearPriceCache(); input.focus();
  });
}

function showSuggestions(query, sugEl, onPick) {
  if (!query) { sugEl.innerHTML = ''; return; }
  const q = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const hits = AIRPORTS.filter(a => {
    const city = (a.city + ' ' + a.name).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return a.code.toLowerCase().includes(q) || city.includes(q);
  }).slice(0, 7);

  if (!hits.length) { sugEl.innerHTML = ''; return; }

  sugEl.innerHTML = hits.map(a => `
    <div class="sug-item" data-code="${a.code}">
      <span class="sug-code">${a.code}</span>
      <div>
        <div class="sug-city">${a.flag} ${a.city}</div>
        <div class="sug-airport">${a.name} · ${a.country}</div>
      </div>
    </div>`).join('');

  sugEl.querySelectorAll('.sug-item').forEach(el =>
    el.addEventListener('mousedown', ev => {
      ev.preventDefault();
      const ap = AIRPORTS.find(a => a.code === el.dataset.code);
      onPick(ap); sugEl.innerHTML = '';
    })
  );
}

setupAutocomplete(originInp, originSug, originClear, ap => {
  S.origin = ap;
  originInp.value = `${ap.city} (${ap.code})`;
  originInp.classList.add('filled');
  originClear.classList.remove('hidden');
  clearPriceCache();
  if (!S.destination) destInp.focus();
});

setupAutocomplete(destInp, destSug, destClear, ap => {
  S.destination = ap;
  destInp.value = `${ap.city} (${ap.code})`;
  destInp.classList.add('filled');
  destClear.classList.remove('hidden');
  clearPriceCache();
  if (!S.depDate) depInp.click();
});

function clearPriceCache() {
  Object.keys(priceCache).forEach(k => delete priceCache[k]);
}

document.addEventListener('click', e => {
  if (!e.target.closest('.origin-f')) originSug.innerHTML = '';
  if (!e.target.closest('.dest-f'))   destSug.innerHTML = '';
});

// ── TRIP TYPE ────────────────────────────────────────────────────────────────

$q('.trip-btn').forEach(btn =>
  btn.addEventListener('click', () => {
    $q('.trip-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    S.tripType = btn.dataset.type;
    if (S.tripType === 'oneway') {
      retField.classList.add('hidden');
      S.retDate = null; retInp.value = '';
    } else {
      retField.classList.remove('hidden');
    }
  })
);

$('cabin-select').addEventListener('change', e => { S.cabin = e.target.value; });

// ── SWAP ─────────────────────────────────────────────────────────────────────

swapBtn.addEventListener('click', () => {
  [S.origin, S.destination] = [S.destination, S.origin];
  [originInp.value, destInp.value] = [destInp.value, originInp.value];
  if (S.origin) originClear.classList.remove('hidden'); else originClear.classList.add('hidden');
  if (S.destination) destClear.classList.remove('hidden'); else destClear.classList.add('hidden');
  clearPriceCache();
});

// ── PASSENGERS ───────────────────────────────────────────────────────────────

$('pax-minus').addEventListener('click', () => { if (S.passengers > 1) { S.passengers--; paxN.textContent = S.passengers; } });
$('pax-plus').addEventListener('click',  () => { if (S.passengers < 9) { S.passengers++; paxN.textContent = S.passengers; } });

// ── POPULAR TAGS ─────────────────────────────────────────────────────────────

$q('.pop-tag').forEach(btn => {
  btn.addEventListener('click', () => {
    const o = AIRPORTS.find(a => a.code === btn.dataset.o);
    const d = AIRPORTS.find(a => a.code === btn.dataset.d);
    if (o) { S.origin = o; originInp.value = `${o.city} (${o.code})`; originInp.classList.add('filled'); originClear.classList.remove('hidden'); }
    if (d) { S.destination = d; destInp.value = `${d.city} (${d.code})`; destInp.classList.add('filled'); destClear.classList.remove('hidden'); }
    clearPriceCache();
    if (!S.depDate) depInp.click();
  });
});

// ── CALENDAR ─────────────────────────────────────────────────────────────────

function openCal(forField) {
  S.calFor   = forField;
  S.calYear  = new Date().getFullYear();
  S.calMonth = new Date().getMonth();
  if (forField === 'ret' && S.depDate) {
    const [y, m] = S.depDate.split('-').map(Number);
    S.calYear = y; S.calMonth = m - 1;
  }
  if (S.origin && S.destination) {
    cacheMonth(S.origin.code, S.destination.code, S.calYear, S.calMonth);
    const nm = S.calMonth === 11 ? 0 : S.calMonth + 1;
    const ny = S.calMonth === 11 ? S.calYear + 1 : S.calYear;
    cacheMonth(S.origin.code, S.destination.code, ny, nm);
  }
  const dual = S.tripType === 'roundtrip';
  calMWrap.classList.toggle('single', !dual);
  calM2.classList.toggle('hidden', !dual);
  calModeLbl.textContent = forField === 'dep' ? 'Select departure date' : 'Select return date';
  updateCalSelInfo(); renderBothMonths();
  calOverlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function mOffset(y, m, n) {
  let nm = m + n, ny = y;
  while (nm > 11) { nm -= 12; ny++; }
  while (nm < 0)  { nm += 12; ny--; }
  return { y: ny, m: nm };
}

function renderBothMonths() {
  const { y: y1, m: m1 } = { y: S.calYear, m: S.calMonth };
  const { y: y2, m: m2 } = mOffset(y1, m1, 1);
  calT1.textContent = capitalize(new Date(y1, m1, 1).toLocaleDateString('en-GB', { month:'long', year:'numeric' }));
  calT2.textContent = capitalize(new Date(y2, m2, 1).toLocaleDateString('en-GB', { month:'long', year:'numeric' }));
  renderMonthGrid(calG1, y1, m1);
  renderMonthGrid(calG2, y2, m2);
}

function renderMonthGrid(grid, y, m) {
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const firstDow    = new Date(y, m, 1).getDay();
  const today       = new Date(); today.setHours(0, 0, 0, 0);

  const prices = [];
  for (let d = 1; d <= daysInMonth; d++) {
    const p = priceCache[iso(y, m + 1, d)];
    if (p !== undefined) prices.push(p);
  }
  const sorted = [...prices].sort((a, b) => a - b);
  const p33 = sorted[Math.floor(sorted.length * 0.33)] ?? Infinity;
  const p66 = sorted[Math.floor(sorted.length * 0.66)] ?? Infinity;

  let html = '';
  for (let i = 0; i < firstDow; i++) html += '<div class="cd cd-empty"></div>';

  for (let d = 1; d <= daysInMonth; d++) {
    const ds   = iso(y, m + 1, d);
    const date = new Date(y, m, d);
    const past = date < today;
    const price = priceCache[ds];

    let tier = '', pHtml = '';
    if (price !== undefined && !past) {
      tier  = price <= p33 ? 'p-low' : price <= p66 ? 'p-mid' : 'p-high';
      pHtml = `<span class="cd-p">€${fmtPrice(price)}</span>`;
    }

    let extra = (ds === S.depDate || ds === S.retDate) ? 'cd-sel'
              : (S.depDate && S.retDate && ds > S.depDate && ds < S.retDate) ? 'cd-range'
              : '';

    html += `<div class="cd ${tier} ${extra} ${past ? 'cd-past' : ''}" data-date="${ds}">
      <span class="cd-n">${d}</span>${pHtml}
    </div>`;
  }

  grid.innerHTML = html;
  grid.querySelectorAll('.cd:not(.cd-empty):not(.cd-past)').forEach(el =>
    el.addEventListener('click', () => pickDay(el.dataset.date))
  );
}

function pickDay(ds) {
  if (S.calFor === 'dep') {
    S.depDate = ds;
    depInp.value = toDisplay(ds);
    if (S.retDate && S.retDate <= ds) { S.retDate = null; retInp.value = ''; }
    if (S.tripType === 'roundtrip') {
      S.calFor = 'ret';
      calModeLbl.textContent = 'Select return date';
      showToast('Now select your return date');
    } else {
      closeCal();
    }
  } else {
    if (S.depDate && ds <= S.depDate) { showToast('Return must be after departure'); return; }
    S.retDate = ds;
    retInp.value = toDisplay(ds);
    closeCal();
  }
  updateCalSelInfo(); renderBothMonths();
}

function navigateCal(dir) {
  const { y, m } = mOffset(S.calYear, S.calMonth, dir);
  S.calYear = y; S.calMonth = m;
  if (S.origin && S.destination) {
    cacheMonth(S.origin.code, S.destination.code, y, m);
    const { y: y2, m: m2 } = mOffset(y, m, 1);
    cacheMonth(S.origin.code, S.destination.code, y2, m2);
  }
  renderBothMonths();
}

function updateCalSelInfo() {
  const dep = S.depDate ? `<strong>${toDisplay(S.depDate)}</strong>` : '—';
  const ret = S.retDate ? `<strong>${toDisplay(S.retDate)}</strong>` : '—';
  calSelInfo.innerHTML = S.tripType === 'roundtrip'
    ? `Departure: ${dep} &nbsp;·&nbsp; Return: ${ret}`
    : `Departure: ${dep}`;
  calConfirm.classList.toggle('hidden', !(S.depDate && (S.tripType === 'oneway' || S.retDate)));
}

calPrev.addEventListener('click', () => navigateCal(-1));
calNext.addEventListener('click', () => navigateCal(1));
calClose.addEventListener('click', closeCal);
calConfirm.addEventListener('click', closeCal);
calOverlay.addEventListener('click', e => { if (e.target === calOverlay) closeCal(); });
depInp.addEventListener('click', () => openCal('dep'));
retInp.addEventListener('click', () => { if (S.tripType === 'roundtrip') openCal('ret'); });

function closeCal() {
  calOverlay.classList.add('hidden');
  document.body.style.overflow = '';
}

// ── TOAST ────────────────────────────────────────────────────────────────────

let toastTimer;
function showToast(msg, ms = 2600) {
  toast.textContent = msg;
  toast.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.add('hidden'), ms);
}

// ── VALIDATION & SEARCH ──────────────────────────────────────────────────────

function validate() {
  if (!S.origin)                                { showToast('Please select an origin city');   return false; }
  if (!S.destination)                           { showToast('Please select a destination');    return false; }
  if (S.origin.code === S.destination.code)     { showToast('Origin and destination are the same'); return false; }
  if (!S.depDate)                               { showToast('Please select a departure date'); return false; }
  if (S.tripType === 'roundtrip' && !S.retDate) { showToast('Please select a return date');    return false; }
  return true;
}

searchBtn.addEventListener('click', () => doSearch());

async function doSearch() {
  if (!validate()) return;

  resultsEl.classList.remove('hidden');
  loadingEl.classList.remove('hidden');
  resHeadEl.classList.add('hidden');
  noResults.classList.add('hidden');
  bestPick.classList.add('hidden');
  flightsList.innerHTML = '';
  countLabel.classList.add('hidden');

  const useLive = !!(AMADEUS_CLIENT_ID && AMADEUS_CLIENT_SECRET);
  loadingSub.textContent = useLive
    ? 'Fetching live prices from airlines…'
    : `Checking ${AIRLINES.map(a => a.name).join(', ')}`;

  resetFilters();
  resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Run API call (or simulated delay) in parallel with a minimum 0.9 s loading time
  const [flights] = await Promise.all([
    fetchFlights(),
    new Promise(r => setTimeout(r, 900 + Math.random() * 700)),
  ]);

  S.allFlights = flights;
  resetFilters();
  applyFiltersAndRender();
  loadingEl.classList.add('hidden');
  resHeadEl.classList.remove('hidden');
  updateStickyBar();
  stickyBar.classList.remove('hidden');
}

async function fetchFlights() {
  if (AMADEUS_CLIENT_ID && AMADEUS_CLIENT_SECRET) {
    try {
      return await searchAmadeusFlights();
    } catch (err) {
      console.warn('Amadeus API error — falling back to estimated prices:', err);
      showToast('Live prices unavailable — showing estimated prices', 3500);
    }
  }
  return generateFlights();
}

// ── FLIGHT GENERATION ────────────────────────────────────────────────────────

function generateFlights() {
  const o = S.origin.code, d = S.destination.code, date = S.depDate;
  const bucket = routeBucket(o, d);
  const airlines = routeAirlines(o, d);
  const dist = Math.round(haversine(S.origin.lat, S.origin.lon, S.destination.lat, S.destination.lon));

  const durRange = { short:[45,130], medium:[90,240], long:[210,370] }[bucket];
  const flights = [];

  airlines.forEach(airline => {
    const count = rng(`n${airline.code}${o}${d}${date}`, 1, 3);
    for (let i = 0; i < count; i++) {
      const seed = `${airline.code}${o}${d}${date}${i}`;
      const depH = rng(`dh${seed}`, 5, 22);
      const depM = [0,5,10,15,20,25,30,35,40,45,50,55][rng(`dm${seed}`, 0, 11)];
      const dur  = rng(`dur${seed}`, durRange[0], durRange[1]);
      const arr  = addMins(depH, depM, dur);

      const stopRoll = rng(`st${seed}`, 0, 10);
      // Budget airlines mostly direct, full-service more connections
      const maxStops = BUDGET.has(airline.code) ? 0 : 2;
      const stops = Math.min(maxStops, stopRoll >= 9 ? 2 : stopRoll >= 7 ? 1 : 0);

      const baseP  = priceFor(o, d, date, airline.code);
      const vary   = (rng(`vr${seed}`, 0, 20) - 10) / 100;
      const stopDisc = stops === 0 ? 1.0 : stops === 1 ? 0.85 : 0.72;
      const pricePerPax = Math.max(9, Math.round(baseP * (1 + vary) * stopDisc));

      const layoverCandidates = ['AMS','CDG','FRA','MUC','MAD','BCN','LHR','VIE','ZRH'];
      const layovers = stops > 0
        ? [layoverCandidates[rng(`ly0${seed}`, 0, layoverCandidates.length - 1)]]
        : [];
      if (stops > 1) layovers.push(layoverCandidates[rng(`ly1${seed}`, 0, layoverCandidates.length - 1)]);

      flights.push({
        id: `${airline.code}-${i}-${date}`,
        airline,
        depH, depM,
        arrH: arr.h, arrM: arr.m,
        duration: dur,
        stops,
        layovers,
        pricePerPax,
        totalPrice: pricePerPax * S.passengers,
        flightNum: `${airline.code}${rng(`fn${seed}`, 100, 9999)}`,
        distance: dist,
        date,
      });
    }
  });

  return flights;
}

// ── SCORING & SORTING ─────────────────────────────────────────────────────────

function scoreFor(f, all) {
  const pp = all.map(x => x.pricePerPax), dd = all.map(x => x.duration);
  const minP = Math.min(...pp), maxP = Math.max(...pp);
  const minD = Math.min(...dd), maxD = Math.max(...dd);
  return 0.60 * (maxP === minP ? 0 : (f.pricePerPax - minP) / (maxP - minP))
       + 0.40 * (maxD === minD ? 0 : (f.duration    - minD) / (maxD - minD));
}

function sortedFlights(flights) {
  const a = [...flights];
  if (S.sortBy === 'price')    return a.sort((x, y) => x.pricePerPax - y.pricePerPax);
  if (S.sortBy === 'duration') return a.sort((x, y) => x.duration - y.duration);
  return a.sort((x, y) => scoreFor(x, flights) - scoreFor(y, flights));
}

// ── FILTERS ──────────────────────────────────────────────────────────────────

function resetFilters() {
  S.filters = { stops:[], airlines:[], maxPrice:null, maxDur:null, times:[] };
  buildFilterUI();
}

function buildFilterUI() {
  const airlines = routeAirlines(S.origin?.code ?? 'LHR', S.destination?.code ?? 'CDG');
  $('filter-airlines').innerHTML = airlines.map(a => `
    <label class="fcheck airline-check-item">
      <input type="checkbox" value="${a.code}">
      <span class="fc-box"></span>
      <span style="flex:1">${a.emoji} ${a.name}</span>
      <span class="airline-check-count">${S.allFlights.filter(f => f.airline.code === a.code).length}</span>
    </label>`).join('');

  const prices = S.allFlights.map(f => f.pricePerPax);
  const minP = Math.min(...prices), maxP = Math.max(...prices);
  const rangeEl = $('price-range');
  rangeEl.min = '0'; rangeEl.max = '100'; rangeEl.value = '100';
  $('range-min-label').textContent = `€${fmtPrice(minP)}`;
  $('range-max-label').textContent = `€${fmtPrice(maxP)}`;
  $('price-val-label').textContent = '';

  const durs = S.allFlights.map(f => f.duration);
  $('dur-range').min = '0'; $('dur-range').max = '100'; $('dur-range').value = '100';
  $('dur-val-label').textContent = '';

  $q('.time-chip').forEach(c => c.classList.remove('active'));
  clearFiltersBtn.classList.add('hidden');
  bindFilterEvents(minP, maxP, Math.max(...durs));
}

function bindFilterEvents(minP, maxP, maxDurFull) {
  $('filter-stops').querySelectorAll('input').forEach(inp =>
    inp.addEventListener('change', () => {
      S.filters.stops = [...$q('#filter-stops input:checked')].map(i => Number(i.value));
      updateClearBtn(); applyFiltersAndRender();
    })
  );
  $('filter-airlines').querySelectorAll('input').forEach(inp =>
    inp.addEventListener('change', () => {
      S.filters.airlines = [...$q('#filter-airlines input:checked')].map(i => i.value);
      updateClearBtn(); applyFiltersAndRender();
    })
  );
  $('price-range').addEventListener('input', e => {
    const pct = Number(e.target.value) / 100;
    S.filters.maxPrice = Math.round(minP + pct * (maxP - minP));
    $('price-val-label').textContent = `€${fmtPrice(S.filters.maxPrice)}`;
    updateClearBtn(); applyFiltersAndRender();
  });
  $('dur-range').addEventListener('input', e => {
    S.filters.maxDur = Math.round(maxDurFull * Number(e.target.value) / 100);
    $('dur-val-label').textContent = fmtDur(S.filters.maxDur);
    updateClearBtn(); applyFiltersAndRender();
  });
  $q('.time-chip').forEach(chip =>
    chip.addEventListener('click', () => {
      chip.classList.toggle('active');
      S.filters.times = [...$q('.time-chip.active')].map(c => c.dataset.t);
      updateClearBtn(); applyFiltersAndRender();
    })
  );
}

function updateClearBtn() {
  const active = S.filters.stops.length || S.filters.airlines.length
    || S.filters.maxPrice !== null || S.filters.maxDur !== null || S.filters.times.length;
  clearFiltersBtn.classList.toggle('hidden', !active);
}

clearFiltersBtn.addEventListener('click', () => { resetFilters(); applyFiltersAndRender(); });
$('reset-filters-btn').addEventListener('click', () => { resetFilters(); applyFiltersAndRender(); });

function applyFilter(flights) {
  const f = S.filters;
  return flights.filter(fl => {
    if (f.stops.length && !f.stops.includes(fl.stops)) return false;
    if (f.airlines.length && !f.airlines.includes(fl.airline.code)) return false;
    if (f.maxPrice !== null && fl.pricePerPax > f.maxPrice) return false;
    if (f.maxDur !== null && fl.duration > f.maxDur) return false;
    if (f.times.length) {
      const h = fl.depH;
      const period = h < 6 ? 'night' : h < 12 ? 'morning' : h < 18 ? 'afternoon' : 'evening';
      if (!f.times.includes(period)) return false;
    }
    return true;
  });
}

function applyFiltersAndRender() {
  S.filteredFlights = applyFilter(S.allFlights);
  renderResults(S.filteredFlights);
}

// ── RENDER ────────────────────────────────────────────────────────────────────

function stopDotsHTML(stops) {
  let h = '<div class="fc-dot"></div><div class="fc-line"></div>';
  for (let i = 0; i < stops; i++) h += '<div class="fc-dot"></div><div class="fc-line"></div>';
  return h + '<div class="fc-dot"></div>';
}

function stopsLabel(n) {
  return n === 0 ? 'Direct' : n === 1 ? '1 stop' : '2 stops';
}

function renderResults(flights) {
  const isLive = flights.some(f => f._live);
  resTitle.innerHTML = `${S.origin.city} → ${S.destination.city}`
    + (isLive
      ? ` <span style="font-size:11px;font-weight:600;background:#dcfce7;color:#15803d;padding:2px 8px;border-radius:99px;vertical-align:middle;margin-left:6px">● Live prices</span>`
      : ` <span style="font-size:11px;font-weight:600;background:#fef9c3;color:#854d0e;padding:2px 8px;border-radius:99px;vertical-align:middle;margin-left:6px">~ Estimated prices</span>`);
  const dist = Math.round(haversine(S.origin.lat, S.origin.lon, S.destination.lat, S.destination.lon));
  let info = fmtDate(S.depDate);
  if (S.retDate) info += ` · Return ${fmtDate(S.retDate)}`;
  info += ` · ${S.passengers} passenger${S.passengers > 1 ? 's' : ''}`;
  info += ` · ${capitalize(S.cabin)} · ~${fmtPrice(dist)} km`;
  if (!isLive) info += ' · Add Amadeus API keys for live prices';
  resInfo.textContent = info;

  $q('.sort-pill').forEach(p => p.classList.toggle('active', p.dataset.sort === S.sortBy));

  if (!flights.length) {
    bestPick.classList.add('hidden');
    flightsList.innerHTML = '';
    noResults.classList.remove('hidden');
    countLabel.classList.add('hidden');
    return;
  }
  noResults.classList.add('hidden');

  const best = [...flights].sort((a, b) => scoreFor(a, flights) - scoreFor(b, flights))[0];
  renderBestPick(best, flights);

  const sorted = sortedFlights(flights);
  flightsList.innerHTML = '';
  sorted.forEach((f, idx) => {
    const el = document.createElement('div');
    el.innerHTML = flightCardHTML(f);
    const card = el.firstElementChild;
    card.style.animationDelay = `${idx * 40}ms`;
    flightsList.appendChild(card);
  });

  countLabel.textContent = `${sorted.length} flight${sorted.length > 1 ? 's' : ''} found`;
  countLabel.classList.remove('hidden');
}

function renderBestPick(f, allFlights) {
  const dep   = fmtTime(f.depH, f.depM);
  const arr   = fmtTime(f.arrH, f.arrM);
  const dur   = fmtDur(f.duration);
  const nextD = f.arrH < f.depH || (f.arrH === f.depH && f.arrM < f.depM);
  const saving = Math.max(...allFlights.map(x => x.pricePerPax)) - f.pricePerPax;
  const url   = buildBookingUrl(f.airline.code, S.origin.code, S.destination.code, S.depDate, S.retDate, S.passengers, S.tripType, S.cabin);

  bestPick.innerHTML = `
    <div class="best-label">
      <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
      Best choice
    </div>
    <p class="best-desc">Best balance of price and flight duration${saving > 0 ? ` — save €${fmtPrice(saving)} vs. most expensive` : ''}</p>
    <div class="fc best-fc">
      <div class="fc-al">
        <div class="fc-al-logo">${f.airline.emoji}</div>
        <div class="fc-al-name">${f.airline.name}</div>
        <div class="fc-al-code">${f.flightNum}</div>
      </div>
      <div class="fc-times">
        <div class="fc-tb"><div class="fc-t">${dep}</div><div class="fc-ap">${S.origin.code}</div></div>
        <div class="fc-mid">
          <div class="fc-dur">${dur}</div>
          <div class="fc-track">${stopDotsHTML(f.stops)}</div>
          <div class="fc-stops ${f.stops === 0 ? 'direct' : ''}">${stopsLabel(f.stops)}${f.layovers.length ? ' via ' + f.layovers.join(', ') : ''}</div>
        </div>
        <div class="fc-tb">
          <div class="fc-t">${arr}${nextD ? '<sup style="font-size:9px;color:#15803d;margin-left:1px">+1</sup>' : ''}</div>
          <div class="fc-ap">${S.destination.code}</div>
        </div>
      </div>
      <div class="fc-pr">
        <div class="fc-pr-lbl">${S.passengers > 1 ? S.passengers + ' passengers' : 'per person'}</div>
        <div class="fc-price"><span class="fc-cur">€</span>${fmtPrice(S.passengers > 1 ? f.totalPrice : f.pricePerPax)}</div>
        ${S.passengers > 1 ? `<div class="fc-pp">€${fmtPrice(f.pricePerPax)} p.p.</div>` : ''}
        <a href="${url}" target="_blank" rel="noopener noreferrer" class="book-btn green">${bookBtnLabel(f.airline.code, f.airline.name)}</a>
      </div>
    </div>`;
  bestPick.classList.remove('hidden');
}

function flightCardHTML(f) {
  const dep    = fmtTime(f.depH, f.depM);
  const arr    = fmtTime(f.arrH, f.arrM);
  const dur    = fmtDur(f.duration);
  const nextD  = f.arrH < f.depH || (f.arrH === f.depH && f.arrM < f.depM);
  const sClass = f.stops === 0 ? 'direct' : '';
  const price  = fmtPrice(S.passengers > 1 ? f.totalPrice : f.pricePerPax);
  const pp     = fmtPrice(f.pricePerPax);
  const url    = buildBookingUrl(f.airline.code, S.origin.code, S.destination.code, S.depDate, S.retDate, S.passengers, S.tripType, S.cabin);
  const cabinLabel = { economy:'Economy', premium:'Premium Economy', business:'Business', first:'First Class' }[S.cabin];

  return `
  <div class="fc" data-id="${f.id}">
    <div class="fc-al">
      <div class="fc-al-logo">${f.airline.emoji}</div>
      <div class="fc-al-name">${f.airline.name}</div>
      <div class="fc-al-code">${f.flightNum}</div>
    </div>
    <div class="fc-times">
      <div class="fc-tb"><div class="fc-t">${dep}</div><div class="fc-ap">${S.origin.code}</div></div>
      <div class="fc-mid">
        <div class="fc-dur">${dur}</div>
        <div class="fc-track">${stopDotsHTML(f.stops)}</div>
        <div class="fc-stops ${sClass}">${stopsLabel(f.stops)}${f.layovers.length ? ' via ' + f.layovers.join(', ') : ''}</div>
      </div>
      <div class="fc-tb">
        <div class="fc-t">${arr}${nextD ? '<sup style="font-size:9px;color:#9ca3af;margin-left:1px">+1</sup>' : ''}</div>
        <div class="fc-ap">${S.destination.code}</div>
      </div>
    </div>
    <div class="fc-pr">
      <div class="fc-pr-lbl">${S.passengers > 1 ? S.passengers + ' passengers' : 'per person'}</div>
      <div class="fc-price"><span class="fc-cur">€</span>${price}</div>
      ${S.passengers > 1 ? `<div class="fc-pp">€${pp} p.p.</div>` : ''}
      <a href="${url}" target="_blank" rel="noopener noreferrer" class="book-btn">${bookBtnLabel(f.airline.code, f.airline.name)}</a>
    </div>
    <div class="fc-expand-row">
      <div class="fc-details">
        <div class="fc-detail-item"><strong>Flight:</strong> ${f.flightNum}</div>
        <div class="fc-detail-item"><strong>Duration:</strong> ${dur}</div>
        <div class="fc-detail-item"><strong>Distance:</strong> ~${fmtPrice(f.distance)} km</div>
        <div class="fc-detail-item"><strong>Class:</strong> ${cabinLabel}</div>
        <div class="fc-detail-item"><strong>Date:</strong> ${fmtDate(f.date)}</div>
        ${f.layovers.length ? `<div class="fc-detail-item"><strong>Via:</strong> ${f.layovers.join(' → ')}</div>` : ''}
      </div>
    </div>
    <button class="fc-expand-btn" style="grid-column:1/-1">Show details ↓</button>
  </div>`;
}

flightsList.addEventListener('click', e => {
  const btn = e.target.closest('.fc-expand-btn');
  if (!btn) return;
  const card = btn.closest('.fc');
  const expanded = card.classList.toggle('expanded');
  btn.textContent = expanded ? 'Hide details ↑' : 'Show details ↓';
});

// ── SORT ─────────────────────────────────────────────────────────────────────

$q('.sort-pill').forEach(pill =>
  pill.addEventListener('click', () => {
    S.sortBy = pill.dataset.sort;
    $q('.sort-pill').forEach(p => p.classList.toggle('active', p.dataset.sort === S.sortBy));
    if (S.filteredFlights.length) renderResults(S.filteredFlights);
  })
);

// ── STICKY BAR ────────────────────────────────────────────────────────────────

function updateStickyBar() {
  stickyText.textContent =
    `${S.origin.city} → ${S.destination.city} · ${depInp.value}${S.retDate ? ' → ' + retInp.value : ''} · ${S.passengers} pax`;
}

stickyEdit.addEventListener('click', () => $('hero').scrollIntoView({ behavior: 'smooth' }));

// ── INIT ─────────────────────────────────────────────────────────────────────

originInp.focus();

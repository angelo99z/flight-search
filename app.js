'use strict';
/* ═══════════════════════════════════════════════════════
   AeroFind — Complete Application Logic
   ═══════════════════════════════════════════════════════ */

// ── DATA ─────────────────────────────────────────────────────────────────────

const AIRPORTS = [
  { code:'GRU', city:'São Paulo',       name:'Guarulhos',                      full:'São Paulo — Guarulhos',       country:'Brasil',       flag:'🇧🇷', lat:-23.43, lon:-46.47 },
  { code:'CGH', city:'São Paulo',       name:'Congonhas',                      full:'São Paulo — Congonhas',       country:'Brasil',       flag:'🇧🇷', lat:-23.62, lon:-46.65 },
  { code:'VCP', city:'Campinas',        name:'Viracopos',                      full:'Campinas — Viracopos',        country:'Brasil',       flag:'🇧🇷', lat:-23.00, lon:-47.13 },
  { code:'GIG', city:'Rio de Janeiro',  name:'Galeão',                         full:'Rio de Janeiro — Galeão',     country:'Brasil',       flag:'🇧🇷', lat:-22.81, lon:-43.25 },
  { code:'SDU', city:'Rio de Janeiro',  name:'Santos Dumont',                  full:'Rio de Janeiro — Santos Dumont',country:'Brasil',     flag:'🇧🇷', lat:-22.91, lon:-43.16 },
  { code:'BSB', city:'Brasília',        name:'Presidente Juscelino Kubitschek',full:'Brasília — JK',               country:'Brasil',       flag:'🇧🇷', lat:-15.87, lon:-47.92 },
  { code:'SSA', city:'Salvador',        name:'Luís Eduardo Magalhães',         full:'Salvador — LEM',              country:'Brasil',       flag:'🇧🇷', lat:-12.91, lon:-38.32 },
  { code:'REC', city:'Recife',          name:'Guararapes',                     full:'Recife — Guararapes',         country:'Brasil',       flag:'🇧🇷', lat:-8.13,  lon:-34.92 },
  { code:'FOR', city:'Fortaleza',       name:'Pinto Martins',                  full:'Fortaleza — Pinto Martins',   country:'Brasil',       flag:'🇧🇷', lat:-3.78,  lon:-38.53 },
  { code:'BEL', city:'Belém',           name:'Val-de-Cans',                    full:'Belém — Val-de-Cans',         country:'Brasil',       flag:'🇧🇷', lat:-1.38,  lon:-48.48 },
  { code:'MAO', city:'Manaus',          name:'Eduardo Gomes',                  full:'Manaus — Eduardo Gomes',      country:'Brasil',       flag:'🇧🇷', lat:-3.04,  lon:-60.05 },
  { code:'CWB', city:'Curitiba',        name:'Afonso Pena',                    full:'Curitiba — Afonso Pena',      country:'Brasil',       flag:'🇧🇷', lat:-25.53, lon:-49.17 },
  { code:'POA', city:'Porto Alegre',    name:'Salgado Filho',                  full:'Porto Alegre — Salgado Filho',country:'Brasil',       flag:'🇧🇷', lat:-29.99, lon:-51.17 },
  { code:'FLN', city:'Florianópolis',   name:'Hercílio Luz',                   full:'Florianópolis — Hercílio Luz',country:'Brasil',       flag:'🇧🇷', lat:-27.67, lon:-48.55 },
  { code:'NAT', city:'Natal',           name:'São Gonçalo do Amarante',        full:'Natal — SGA',                 country:'Brasil',       flag:'🇧🇷', lat:-5.91,  lon:-35.25 },
  { code:'MCZ', city:'Maceió',          name:'Zumbi dos Palmares',             full:'Maceió — Zumbi dos Palmares', country:'Brasil',       flag:'🇧🇷', lat:-9.51,  lon:-35.79 },
  { code:'THE', city:'Teresina',        name:'Senador Petrônio Portela',       full:'Teresina — Petrônio Portela', country:'Brasil',       flag:'🇧🇷', lat:-5.06,  lon:-42.82 },
  { code:'MIA', city:'Miami',           name:'Miami International',            full:'Miami — MIA',                 country:'EUA',          flag:'🇺🇸', lat:25.79,  lon:-80.29 },
  { code:'JFK', city:'Nova York',       name:'John F. Kennedy',                full:'Nova York — JFK',             country:'EUA',          flag:'🇺🇸', lat:40.64,  lon:-73.78 },
  { code:'EWR', city:'Nova York',       name:'Newark Liberty',                 full:'Nova York — EWR',             country:'EUA',          flag:'🇺🇸', lat:40.69,  lon:-74.17 },
  { code:'LAX', city:'Los Angeles',     name:'Los Angeles International',      full:'Los Angeles — LAX',           country:'EUA',          flag:'🇺🇸', lat:33.94,  lon:-118.41},
  { code:'ORD', city:'Chicago',         name:"O'Hare International",           full:"Chicago — O'Hare",            country:'EUA',          flag:'🇺🇸', lat:41.98,  lon:-87.90 },
  { code:'LIS', city:'Lisboa',          name:'Humberto Delgado',               full:'Lisboa — LIS',                country:'Portugal',     flag:'🇵🇹', lat:38.77,  lon:-9.13  },
  { code:'CDG', city:'Paris',           name:'Charles de Gaulle',              full:'Paris — CDG',                 country:'França',       flag:'🇫🇷', lat:49.01,  lon:2.55   },
  { code:'ORY', city:'Paris',           name:'Orly',                           full:'Paris — Orly',                country:'França',       flag:'🇫🇷', lat:48.72,  lon:2.36   },
  { code:'MAD', city:'Madrid',          name:'Adolfo Suárez Barajas',          full:'Madrid — MAD',                country:'Espanha',      flag:'🇪🇸', lat:40.49,  lon:-3.57  },
  { code:'BCN', city:'Barcelona',       name:'El Prat',                        full:'Barcelona — El Prat',         country:'Espanha',      flag:'🇪🇸', lat:41.30,  lon:2.08   },
  { code:'LHR', city:'Londres',         name:'Heathrow',                       full:'Londres — Heathrow',          country:'Reino Unido',  flag:'🇬🇧', lat:51.48,  lon:-0.46  },
  { code:'AMS', city:'Amsterdã',        name:'Schiphol',                       full:'Amsterdã — Schiphol',         country:'Holanda',      flag:'🇳🇱', lat:52.31,  lon:4.77   },
  { code:'FRA', city:'Frankfurt',       name:'Frankfurt Airport',              full:'Frankfurt — FRA',             country:'Alemanha',     flag:'🇩🇪', lat:50.03,  lon:8.56   },
  { code:'FCO', city:'Roma',            name:'Leonardo da Vinci',              full:'Roma — Fiumicino',            country:'Itália',       flag:'🇮🇹', lat:41.80,  lon:12.24  },
  { code:'EZE', city:'Buenos Aires',    name:'Ezeiza',                         full:'Buenos Aires — EZE',          country:'Argentina',    flag:'🇦🇷', lat:-34.82, lon:-58.54 },
  { code:'SCL', city:'Santiago',        name:'Arturo Merino Benítez',          full:'Santiago — SCL',              country:'Chile',        flag:'🇨🇱', lat:-33.39, lon:-70.79 },
  { code:'BOG', city:'Bogotá',          name:'El Dorado',                      full:'Bogotá — El Dorado',          country:'Colômbia',     flag:'🇨🇴', lat:4.70,   lon:-74.14 },
  { code:'LIM', city:'Lima',            name:'Jorge Chávez',                   full:'Lima — Jorge Chávez',         country:'Peru',         flag:'🇵🇪', lat:-12.02, lon:-77.11 },
  { code:'CUN', city:'Cancún',          name:'Internacional de Cancún',        full:'Cancún — CUN',                country:'México',       flag:'🇲🇽', lat:21.04,  lon:-86.87 },
  { code:'DXB', city:'Dubai',           name:'Dubai International',            full:'Dubai — DXB',                 country:'Emirados',     flag:'🇦🇪', lat:25.25,  lon:55.36  },
  { code:'NRT', city:'Tóquio',          name:'Narita International',           full:'Tóquio — Narita',             country:'Japão',        flag:'🇯🇵', lat:35.77,  lon:140.39 },
  { code:'SYD', city:'Sydney',          name:'Kingsford Smith',                full:'Sydney — SYD',                country:'Austrália',    flag:'🇦🇺', lat:-33.94, lon:151.18 },
];

const AIRLINES = [
  { code:'LA', name:'LATAM',            emoji:'🔴', color:'#E31837', url:'https://www.latamairlines.com/br/pt/buscar-voos' },
  { code:'G3', name:'Gol',              emoji:'🟠', color:'#F86700', url:'https://www.voegol.com.br/pt/passagens-aereas'  },
  { code:'AD', name:'Azul',             emoji:'🔵', color:'#003DA5', url:'https://www.voeazul.com.br/passagens-aereas'    },
  { code:'AA', name:'American',         emoji:'⚫', color:'#0078D2', url:'https://www.aa.com/homePage.do?locale=pt_BR'    },
  { code:'DL', name:'Delta',            emoji:'🟣', color:'#3C1053', url:'https://www.delta.com/br/pt'                    },
  { code:'AF', name:'Air France',       emoji:'🔷', color:'#002157', url:'https://wwws.airfrance.com.br'                  },
  { code:'KL', name:'KLM',              emoji:'🩵', color:'#009BD9', url:'https://www.klm.com.br'                         },
  { code:'IB', name:'Iberia',           emoji:'🟤', color:'#C40016', url:'https://www.iberia.com'                         },
  { code:'TP', name:'TAP Air Portugal', emoji:'🟢', color:'#006A38', url:'https://www.tapairportugal.com/pt'              },
  { code:'UA', name:'United',           emoji:'⚪', color:'#002244', url:'https://www.united.com/pt/br'                   },
];

// airport sets for pricing
const DOMESTIC = new Set(['GRU','CGH','VCP','GIG','SDU','BSB','SSA','REC','FOR','BEL','MAO','CWB','POA','FLN','NAT','MCZ','THE']);
const S_AMER   = new Set(['EZE','SCL','BOG','LIM','CUN']);

const BASE_PRICE = {
  domestic:         { min: 290,  max: 980  },
  regional:         { min: 950,  max: 2900 },
  intercontinental: { min: 2800, max: 9800 },
};

// season multipliers Jan–Dec
const SEASON = [1.32, 1.08, 1.00, 0.92, 0.90, 0.97, 1.26, 1.06, 0.88, 0.90, 0.98, 1.42];

// ── UTILS ────────────────────────────────────────────────────────────────────

function djb2(s) {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = (Math.imul(h, 33) ^ s.charCodeAt(i)) >>> 0;
  return h;
}
function rng(seed, lo, hi) {
  return lo + (djb2(String(seed)) % (hi - lo + 1));
}

function routeType(o, d) {
  if (DOMESTIC.has(o) && DOMESTIC.has(d)) return 'domestic';
  const sameRegion = (DOMESTIC.has(o) || S_AMER.has(o)) && (DOMESTIC.has(d) || S_AMER.has(d));
  return sameRegion ? 'regional' : 'intercontinental';
}

function routeAirlines(o, d) {
  const t = routeType(o, d);
  if (t === 'domestic')         return AIRLINES.filter(a => ['LA','G3','AD'].includes(a.code));
  if (t === 'regional')         return AIRLINES.filter(a => ['LA','G3','AD','AA','DL'].includes(a.code));
  return AIRLINES.filter(a => ['LA','AA','DL','AF','KL','IB','TP','UA'].includes(a.code));
}

function priceFor(o, d, dateStr, airlineCode) {
  const type = routeType(o, d);
  const r    = BASE_PRICE[type];
  const base = rng(`B${o}${d}${airlineCode}`, r.min, r.max);
  const d_   = new Date(dateStr + 'T12:00:00');
  const wknd  = (d_.getDay() === 0 || d_.getDay() === 6) ? 1.18 : 1.0;
  const seas  = SEASON[d_.getMonth()];
  const vary  = ((rng(`V${o}${d}${airlineCode}${dateStr}`, 0, 30) - 15)) / 100;
  return Math.round(base * wknd * seas * (1 + vary));
}

function minPriceForDate(o, d, dateStr) {
  const airlines = routeAirlines(o, d);
  return Math.min(...airlines.map(a => priceFor(o, d, dateStr, a.code)));
}

function iso(y, m, d) {
  return `${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
}
function toDisplay(ds)     { const [y,m,d]=ds.split('-'); return `${d}/${m}/${y}`; }
function fmtTime(h, m)     { return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`; }
function fmtDur(mins) {
  const h = Math.floor(mins/60), m = mins%60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}
function addMins(h, m, add) {
  const t = h*60 + m + add;
  return { h: Math.floor(t/60)%24, m: t%60 };
}
function fmtDate(ds) {
  const [y,m,d] = ds.split('-').map(Number);
  return new Date(y,m-1,d).toLocaleDateString('pt-BR',{weekday:'short',day:'numeric',month:'short'});
}
function fmtPrice(n) { return n.toLocaleString('pt-BR'); }

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371, r = Math.PI/180;
  const dLat = (lat2-lat1)*r, dLon = (lon2-lon1)*r;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*r)*Math.cos(lat2*r)*Math.sin(dLon/2)**2;
  return 2 * R * Math.asin(Math.sqrt(a));
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

  calFor:   null,   // 'dep' | 'ret'
  calYear:  new Date().getFullYear(),
  calMonth: new Date().getMonth(),

  allFlights:  [],
  filteredFlights: [],
  sortBy:      'recommended',

  filters: {
    stops:    [],   // [] = all
    airlines: [],   // [] = all
    maxPrice: null, // null = unlimited
    maxDur:   null,
    times:    [],   // [] = all
  },
};

const priceCache = {};

function cacheMonth(o, d, y, m) {
  const days = new Date(y, m+1, 0).getDate();
  for (let day = 1; day <= days; day++) {
    const k = iso(y, m+1, day);
    if (!(k in priceCache)) priceCache[k] = minPriceForDate(o, d, k);
  }
}

// ── DOM HELPERS ──────────────────────────────────────────────────────────────

const $  = id  => document.getElementById(id);
const $q = sel => document.querySelectorAll(sel);

const originInp   = $('origin-inp');
const destInp     = $('dest-inp');
const originSug   = $('origin-sug');
const destSug     = $('dest-sug');
const originClear = $('origin-clear');
const destClear   = $('dest-clear');
const depInp      = $('dep-inp');
const retInp      = $('ret-inp');
const depHint     = $('dep-hint');
const retHint     = $('ret-hint');
const retField    = $('ret-field');
const paxN        = $('pax-n');
const searchBtn   = $('search-btn');
const swapBtn     = $('swap-btn');

const stickyBar   = $('sticky-bar');
const stickyText  = $('sticky-text');
const stickyEdit  = $('sticky-edit');

const calOverlay  = $('cal-overlay');
const calModeLbl  = $('cal-mode-label');
const calMWrap    = $('cal-months-wrap');
const calM2       = $('cal-m2');
const calT1       = $('cal-t1');
const calT2       = $('cal-t2');
const calG1       = $('cal-g1');
const calG2       = $('cal-g2');
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

const toast = $('toast');

// ── AUTOCOMPLETE ─────────────────────────────────────────────────────────────

let sugTimers = {};

function setupAutocomplete(input, sugEl, clearBtn, onPick) {
  input.addEventListener('input', () => {
    const q = input.value.trim();
    clearTimeout(sugTimers[input.id]);
    sugTimers[input.id] = setTimeout(() => showSuggestions(q, sugEl, onPick), 120);
    clearBtn.classList.toggle('hidden', q.length === 0);
  });

  input.addEventListener('keydown', e => {
    const items = sugEl.querySelectorAll('.sug-item');
    const cur   = sugEl.querySelector('.sug-item.hover');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = cur ? (cur.nextElementSibling || items[0]) : items[0];
      if (next) { cur?.classList.remove('hover'); next.classList.add('hover'); }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = cur ? (cur.previousElementSibling || items[items.length-1]) : items[items.length-1];
      if (prev) { cur?.classList.remove('hover'); prev.classList.add('hover'); }
    } else if (e.key === 'Enter') {
      if (cur) cur.dispatchEvent(new MouseEvent('mousedown'));
    } else if (e.key === 'Escape') {
      sugEl.innerHTML = '';
    }
  });

  clearBtn.addEventListener('click', () => {
    input.value = '';
    sugEl.innerHTML = '';
    clearBtn.classList.add('hidden');
    input.classList.remove('filled');
    if (input === originInp) S.origin = null;
    else S.destination = null;
    input.focus();
  });
}

function showSuggestions(query, sugEl, onPick) {
  if (!query) { sugEl.innerHTML = ''; return; }
  const q = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');

  const matches = AIRPORTS.filter(a => {
    const city    = (a.city+' '+a.full).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    const airport = a.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    return a.code.toLowerCase().includes(q) || city.includes(q) || airport.includes(q);
  }).slice(0, 7);

  if (!matches.length) { sugEl.innerHTML = ''; return; }

  sugEl.innerHTML = matches.map(a => `
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
      onPick(ap);
      sugEl.innerHTML = '';
    })
  );
}

setupAutocomplete(originInp, originSug, originClear, ap => {
  S.origin = ap;
  originInp.value = `${ap.city} (${ap.code})`;
  originInp.classList.add('filled');
  originClear.classList.remove('hidden');
  // clear cache when route changes
  clearPriceCache();
  // move focus to dest
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
      S.retDate = null; retInp.value = ''; retHint.textContent = '';
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
  const oc = S.origin    ? '' : 'hidden';
  const dc = S.destination ? '' : 'hidden';
  if (S.origin)      originClear.classList.remove('hidden'); else originClear.classList.add('hidden');
  if (S.destination) destClear.classList.remove('hidden');   else destClear.classList.add('hidden');
  clearPriceCache();
});

// ── PASSENGERS ───────────────────────────────────────────────────────────────

$('pax-minus').addEventListener('click', () => { if (S.passengers>1) { S.passengers--; paxN.textContent=S.passengers; } });
$('pax-plus').addEventListener('click',  () => { if (S.passengers<9) { S.passengers++; paxN.textContent=S.passengers; } });

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

  // If rt and dep already selected, start cal from dep month for ret
  if (forField === 'ret' && S.depDate) {
    const [y,m] = S.depDate.split('-').map(Number);
    S.calYear = y; S.calMonth = m-1;
  }

  if (S.origin && S.destination) {
    cacheMonth(S.origin.code, S.destination.code, S.calYear, S.calMonth);
    // For round trip cache next month too
    if (S.tripType === 'roundtrip') {
      const nm = S.calMonth === 11 ? 0 : S.calMonth+1;
      const ny = S.calMonth === 11 ? S.calYear+1 : S.calYear;
      cacheMonth(S.origin.code, S.destination.code, ny, nm);
    }
  }

  // dual view for roundtrip dep selection
  const dual = (S.tripType === 'roundtrip');
  calMWrap.classList.toggle('single', !dual);
  if (dual) { calM2.classList.remove('hidden'); }
  else       { calM2.classList.add('hidden'); }

  calModeLbl.textContent = forField === 'dep' ? 'Selecione a data de partida' : 'Selecione a data de volta';
  updateCalSelInfo();
  renderBothMonths();
  calOverlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function updateCalSelInfo() {
  const dep = S.depDate ? `<strong>${toDisplay(S.depDate)}</strong>` : '—';
  const ret = S.retDate ? `<strong>${toDisplay(S.retDate)}</strong>` : '—';
  if (S.tripType === 'roundtrip') {
    calSelInfo.innerHTML = `Partida: ${dep} &nbsp;·&nbsp; Volta: ${ret}`;
  } else {
    calSelInfo.innerHTML = `Partida: ${dep}`;
  }
  calConfirm.classList.toggle('hidden', !(S.depDate && (S.tripType === 'oneway' || S.retDate)));
}

function monthOffset(y, m, offset) {
  let nm = m + offset, ny = y;
  while (nm > 11) { nm -= 12; ny++; }
  while (nm < 0)  { nm += 12; ny--; }
  return { y: ny, m: nm };
}

function renderBothMonths() {
  const y1 = S.calYear, m1 = S.calMonth;
  const { y: y2, m: m2 } = monthOffset(y1, m1, 1);

  calT1.textContent = capitalize(new Date(y1,m1,1).toLocaleDateString('pt-BR',{month:'long',year:'numeric'}));
  calT2.textContent = capitalize(new Date(y2,m2,1).toLocaleDateString('pt-BR',{month:'long',year:'numeric'}));

  renderMonthGrid(calG1, y1, m1);
  renderMonthGrid(calG2, y2, m2);
}

function renderMonthGrid(grid, y, m) {
  const daysInMonth = new Date(y, m+1, 0).getDate();
  const firstDow    = new Date(y, m, 1).getDay();
  const today       = new Date(); today.setHours(0,0,0,0);

  // price thresholds for this month
  const prices = [];
  for (let d=1; d<=daysInMonth; d++) prices.push(priceCache[iso(y,m+1,d)] ?? Infinity);
  const sorted = [...prices].filter(p => p !== Infinity).sort((a,b)=>a-b);
  const p33 = sorted[Math.floor(sorted.length*.33)] ?? Infinity;
  const p66 = sorted[Math.floor(sorted.length*.66)] ?? Infinity;

  let html = '';
  for (let i=0; i<firstDow; i++) html += '<div class="cd cd-empty"></div>';

  for (let d=1; d<=daysInMonth; d++) {
    const ds   = iso(y, m+1, d);
    const date = new Date(y, m, d);
    const past = date < today;

    const price = priceCache[ds];
    let tier = '', pHtml = '';
    if (price && !past) {
      tier  = price <= p33 ? 'p-low' : price <= p66 ? 'p-mid' : 'p-high';
      pHtml = `<span class="cd-p">R$${fmtPrice(price)}</span>`;
    }

    let extra = '';
    if (ds === S.depDate || ds === S.retDate) extra = 'cd-sel';
    else if (S.depDate && S.retDate && ds > S.depDate && ds < S.retDate) extra = 'cd-range';
    else if (ds === S.depDate) extra = 'cd-range-start';
    else if (ds === S.retDate) extra = 'cd-range-end';

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
    depHint.textContent = fmtDate(ds).replace(/^\w+,\s*/,'');
    if (S.retDate && S.retDate <= ds) { S.retDate = null; retInp.value = ''; retHint.textContent = ''; }

    if (S.tripType === 'roundtrip') {
      S.calFor = 'ret';
      calModeLbl.textContent = 'Selecione a data de volta';
      showToast('Agora selecione a data de volta');
    } else {
      closeCal();
    }
  } else {
    if (S.depDate && ds <= S.depDate) { showToast('A data de volta deve ser após a partida'); return; }
    S.retDate = ds;
    retInp.value = toDisplay(ds);
    retHint.textContent = fmtDate(ds).replace(/^\w+,\s*/,'');
  }
  updateCalSelInfo();
  renderBothMonths();
}

function navigateCal(dir) {
  const { y, m } = monthOffset(S.calYear, S.calMonth, dir);
  S.calYear = y; S.calMonth = m;
  if (S.origin && S.destination) {
    cacheMonth(S.origin.code, S.destination.code, y, m);
    const { y: y2, m: m2 } = monthOffset(y, m, 1);
    cacheMonth(S.origin.code, S.destination.code, y2, m2);
  }
  renderBothMonths();
}

calPrev.addEventListener('click', () => navigateCal(-1));
calNext.addEventListener('click', () => navigateCal(1));
$('cal-prev-single')?.addEventListener('click', () => navigateCal(-1));
$('cal-next-single')?.addEventListener('click', () => navigateCal(1));

depInp.addEventListener('click', () => openCal('dep'));
retInp.addEventListener('click', () => { if (S.tripType === 'roundtrip') openCal('ret'); });

calClose.addEventListener('click', closeCal);
calConfirm.addEventListener('click', closeCal);
calOverlay.addEventListener('click', e => { if (e.target === calOverlay) closeCal(); });

function closeCal() {
  calOverlay.classList.add('hidden');
  document.body.style.overflow = '';
}

function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

// ── TOAST ────────────────────────────────────────────────────────────────────

let toastTimer;
function showToast(msg, duration=2600) {
  toast.textContent = msg;
  toast.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.add('hidden'), duration);
}

// ── SEARCH VALIDATION ────────────────────────────────────────────────────────

function validate() {
  if (!S.origin)                                 { showToast('Selecione a cidade de origem');  return false; }
  if (!S.destination)                            { showToast('Selecione o destino');           return false; }
  if (S.origin.code === S.destination.code)      { showToast('Origem e destino são iguais');   return false; }
  if (!S.depDate)                                { showToast('Selecione a data de partida');   return false; }
  if (S.tripType === 'roundtrip' && !S.retDate)  { showToast('Selecione a data de volta');     return false; }
  return true;
}

// ── PERFORM SEARCH ───────────────────────────────────────────────────────────

searchBtn.addEventListener('click', doSearch);

document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && document.activeElement !== calOverlay) {
    const ac = document.activeElement;
    if (ac === originInp || ac === destInp || ac === depInp || ac === retInp) return;
    doSearch();
  }
});

function doSearch() {
  if (!validate()) return;

  // show results section, start loading
  resultsEl.classList.remove('hidden');
  loadingEl.classList.remove('hidden');
  resHeadEl.classList.add('hidden');
  noResults.classList.add('hidden');
  bestPick.classList.add('hidden');
  flightsList.innerHTML = '';
  countLabel.classList.add('hidden');

  // update loading subtitle
  const airlines = routeAirlines(S.origin.code, S.destination.code);
  loadingSub.textContent = `Consultando ${airlines.map(a=>a.name).join(', ')}`;

  // update sort filters
  resetFilters();

  resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const delay = 900 + Math.floor(Math.random() * 900);
  setTimeout(() => {
    S.allFlights = generateFlights();
    resetFilters();
    applyFiltersAndRender();
    loadingEl.classList.add('hidden');
    resHeadEl.classList.remove('hidden');
    updateStickyBar();
    stickyBar.classList.remove('hidden');
  }, delay);
}

// ── FLIGHT GENERATION ────────────────────────────────────────────────────────

function generateFlights() {
  const o = S.origin.code, d = S.destination.code, date = S.depDate;
  const airlines = routeAirlines(o, d);
  const type = routeType(o, d);
  const flights = [];

  const durRange = {
    domestic:         [55,  220],
    regional:         [160, 480],
    intercontinental: [550, 1500],
  }[type];

  // distance for info
  const dist = Math.round(haversine(S.origin.lat, S.origin.lon, S.destination.lat, S.destination.lon));

  airlines.forEach(airline => {
    const numFlights = rng(`n${airline.code}${o}${d}${date}`, 1, 3);
    for (let i = 0; i < numFlights; i++) {
      const seed = `${airline.code}${o}${d}${date}${i}`;

      const depH = rng(`dh${seed}`, 5, 22);
      const depM = [0,5,10,15,20,25,30,35,40,45,50,55][rng(`dm${seed}`,0,11)];
      const dur  = rng(`dur${seed}`, durRange[0], durRange[1]);
      const arr  = addMins(depH, depM, dur);

      const stopRoll = rng(`st${seed}`, 0, 10);
      const stops = stopRoll >= 9 ? 2 : stopRoll >= 7 ? 1 : 0;

      const baseP   = priceFor(o, d, date, airline.code);
      const vary    = (rng(`vr${seed}`, 0, 24) - 12) / 100;
      // connecting flights are ~15-25% cheaper per stop
      const stopDiscount = stops === 0 ? 1.0 : stops === 1 ? (0.82 + rng(`sd1${seed}`,0,8)/100) : (0.68 + rng(`sd2${seed}`,0,8)/100);
      const pricePerPax  = Math.round(baseP * (1 + vary) * stopDiscount);

      // layover city for multi-stop
      let layovers = [];
      if (stops >= 1) {
        const candidates = type === 'domestic' ? ['BSB','CGH','GRU','GIG','REC']
                         : type === 'regional' ? ['BOG','LIM','MIA','SCL','EZE']
                         : ['LIS','MIA','MAD','CDG','AMS','JFK','EWR'];
        const idx = rng(`ly${seed}`, 0, candidates.length-1);
        layovers.push(candidates[idx]);
        if (stops >= 2) {
          const idx2 = (idx+1) % candidates.length;
          layovers.push(candidates[idx2]);
        }
      }

      // flight number
      const flightNum = `${airline.code}${rng(`fn${seed}`, 100, 9999)}`;

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
        flightNum,
        distance: dist,
        date,
      });
    }
  });

  return flights;
}

// ── SCORING ──────────────────────────────────────────────────────────────────

function scoreFor(f, all) {
  const pp = all.map(x => x.pricePerPax);
  const dd = all.map(x => x.duration);
  const minP = Math.min(...pp), maxP = Math.max(...pp);
  const minD = Math.min(...dd), maxD = Math.max(...dd);
  const np = maxP===minP ? 0 : (f.pricePerPax-minP)/(maxP-minP);
  const nd = maxD===minD ? 0 : (f.duration-minD)/(maxD-minD);
  return 0.60*np + 0.40*nd;
}

function sortedFlights(flights) {
  const all = [...flights];
  if (S.sortBy === 'price')    return all.sort((a,b) => a.pricePerPax - b.pricePerPax);
  if (S.sortBy === 'duration') return all.sort((a,b) => a.duration - b.duration);
  return all.sort((a,b) => scoreFor(a, flights) - scoreFor(b, flights));
}

// ── FILTERS ──────────────────────────────────────────────────────────────────

function resetFilters() {
  S.filters = { stops:[], airlines:[], maxPrice:null, maxDur:null, times:[] };
  buildFilterUI();
}

function buildFilterUI() {
  // airline checkboxes
  const airlines = routeAirlines(S.origin?.code??'GRU', S.destination?.code??'GIG');
  const aEl = $('filter-airlines');
  aEl.innerHTML = airlines.map(a => `
    <label class="fcheck airline-check-item">
      <input type="checkbox" value="${a.code}">
      <span class="fc-box"></span>
      <span style="flex:1">${a.emoji} ${a.name}</span>
      <span class="airline-check-count">${S.allFlights.filter(f=>f.airline.code===a.code).length}</span>
    </label>`).join('');

  // price range
  const prices = S.allFlights.map(f=>f.pricePerPax);
  const minP = Math.min(...prices), maxP = Math.max(...prices);
  const rangeEl = $('price-range');
  rangeEl.min = '0'; rangeEl.max = '100'; rangeEl.value = '100';
  $('range-min-label').textContent = `R$${fmtPrice(minP)}`;
  $('range-max-label').textContent = `R$${fmtPrice(maxP)}`;
  $('price-val-label').textContent = '';

  // duration range
  const durs = S.allFlights.map(f=>f.duration);
  const maxDurVal = Math.max(...durs);
  $('dur-range').min='0'; $('dur-range').max='100'; $('dur-range').value='100';
  $('dur-val-label').textContent = '';

  // reset time chips
  $q('.time-chip').forEach(c => c.classList.remove('active'));

  clearFiltersBtn.classList.add('hidden');
  bindFilterEvents(minP, maxP, maxDurVal);
}

function bindFilterEvents(minP, maxP, maxDurFull) {
  // stops
  $('filter-stops').querySelectorAll('input').forEach(inp =>
    inp.addEventListener('change', () => {
      S.filters.stops = [...$q('#filter-stops input:checked')].map(i=>Number(i.value));
      updateClearBtn();
      applyFiltersAndRender();
    })
  );

  // airlines
  $('filter-airlines').querySelectorAll('input').forEach(inp =>
    inp.addEventListener('change', () => {
      S.filters.airlines = [...$q('#filter-airlines input:checked')].map(i=>i.value);
      updateClearBtn();
      applyFiltersAndRender();
    })
  );

  // price range
  const rangeEl = $('price-range');
  rangeEl.addEventListener('input', () => {
    const pct = Number(rangeEl.value) / 100;
    S.filters.maxPrice = Math.round(minP + pct*(maxP-minP));
    $('price-val-label').textContent = `R$${fmtPrice(S.filters.maxPrice)}`;
    updateClearBtn();
    applyFiltersAndRender();
  });

  // duration range
  const durEl = $('dur-range');
  durEl.addEventListener('input', () => {
    const pct = Number(durEl.value)/100;
    S.filters.maxDur = Math.round(maxDurFull * pct);
    $('dur-val-label').textContent = fmtDur(S.filters.maxDur);
    updateClearBtn();
    applyFiltersAndRender();
  });

  // time chips
  $q('.time-chip').forEach(chip =>
    chip.addEventListener('click', () => {
      chip.classList.toggle('active');
      S.filters.times = [...$q('.time-chip.active')].map(c=>c.dataset.t);
      updateClearBtn();
      applyFiltersAndRender();
    })
  );
}

function updateClearBtn() {
  const active = S.filters.stops.length || S.filters.airlines.length
    || S.filters.maxPrice !== null || S.filters.maxDur !== null || S.filters.times.length;
  clearFiltersBtn.classList.toggle('hidden', !active);
}

clearFiltersBtn.addEventListener('click', () => {
  resetFilters();
  applyFiltersAndRender();
});

$('reset-filters-btn').addEventListener('click', () => {
  resetFilters();
  applyFiltersAndRender();
});

function applyFilter(flights) {
  const f = S.filters;
  return flights.filter(fl => {
    if (f.stops.length && !f.stops.includes(fl.stops)) return false;
    if (f.airlines.length && !f.airlines.includes(fl.airline.code)) return false;
    if (f.maxPrice !== null && fl.pricePerPax > f.maxPrice) return false;
    if (f.maxDur !== null && fl.duration > f.maxDur) return false;
    if (f.times.length) {
      const h = fl.depH;
      const period = h >= 0 && h < 6 ? 'night' : h < 12 ? 'morning' : h < 18 ? 'afternoon' : 'evening';
      if (!f.times.includes(period)) return false;
    }
    return true;
  });
}

function applyFiltersAndRender() {
  S.filteredFlights = applyFilter(S.allFlights);
  renderResults(S.filteredFlights);
}

// ── RENDER RESULTS ────────────────────────────────────────────────────────────

function renderResults(flights) {
  const sorted = sortedFlights(flights);

  // title / info
  resTitle.textContent = `${S.origin.city} → ${S.destination.city}`;
  let info = fmtDate(S.depDate);
  if (S.retDate) info += ` · Volta ${fmtDate(S.retDate)}`;
  info += ` · ${S.passengers} passageiro${S.passengers>1?'s':''}`;
  info += ` · ${capitalize(S.cabin)}`;
  resInfo.textContent = info;

  // sort pills sync
  $q('.sort-pill').forEach(p => p.classList.toggle('active', p.dataset.sort === S.sortBy));

  if (!sorted.length) {
    bestPick.classList.add('hidden');
    flightsList.innerHTML = '';
    noResults.classList.remove('hidden');
    countLabel.classList.add('hidden');
    return;
  }

  noResults.classList.add('hidden');

  // best flight
  const best = [...flights].sort((a,b) => scoreFor(a,flights) - scoreFor(b,flights))[0];
  renderBestPick(best, flights);

  // flight list (skip the best one)
  flightsList.innerHTML = '';
  sorted.forEach((f, idx) => {
    const el = document.createElement('div');
    el.innerHTML = flightCardHTML(f, false);
    const card = el.firstElementChild;
    card.style.animationDelay = `${idx * 40}ms`;
    flightsList.appendChild(card);
  });

  countLabel.textContent = `${sorted.length} voo${sorted.length>1?'s':''} encontrado${sorted.length>1?'s':''}`;
  countLabel.classList.remove('hidden');
}

function renderBestPick(f, allFlights) {
  const dep   = fmtTime(f.depH, f.depM);
  const arr   = fmtTime(f.arrH, f.arrM);
  const dur   = fmtDur(f.duration);
  const nextD = f.arrH < f.depH || (f.arrH === f.depH && f.arrM < f.depM);
  const stopsLbl = f.stops === 0 ? 'Direto' : f.stops === 1 ? '1 parada' : '2 paradas';
  const stopDots = stopDotsHTML(f.stops);
  const saving   = savingVsMax(f, allFlights);

  bestPick.innerHTML = `
    <div class="best-label">
      <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      Melhor escolha
    </div>
    <p class="best-desc">Melhor equilíbrio entre preço e duração — ${saving > 0 ? `economia de R$${fmtPrice(saving)} vs. opção mais cara` : 'opção mais eficiente desta busca'}</p>
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
          <div class="fc-track">${stopDots}</div>
          <div class="fc-stops ${f.stops===0?'direct':''}">${stopsLbl}${f.layovers.length ? ' · '+f.layovers.join(', ') : ''}</div>
        </div>
        <div class="fc-tb">
          <div class="fc-t">${arr}${nextD?'<sup style="font-size:9px;color:#15803d;margin-left:1px">+1</sup>':''}</div>
          <div class="fc-ap">${S.destination.code}</div>
        </div>
      </div>
      <div class="fc-pr">
        <div class="fc-pr-lbl">${S.passengers>1 ? S.passengers+' passageiros' : 'por pessoa'}</div>
        <div class="fc-price"><span class="fc-cur">R$</span>${fmtPrice(S.passengers>1 ? f.totalPrice : f.pricePerPax)}</div>
        ${S.passengers>1 ? `<div class="fc-pp">R$${fmtPrice(f.pricePerPax)} p.p.</div>` : ''}
        <a href="${f.airline.url}" target="_blank" rel="noopener noreferrer" class="book-btn green">Ver na ${f.airline.name}</a>
      </div>
    </div>
  `;
  bestPick.classList.remove('hidden');
}

function savingVsMax(f, all) {
  const maxP = Math.max(...all.map(x=>x.pricePerPax));
  return maxP - f.pricePerPax;
}

function stopDotsHTML(stops) {
  let h = '<div class="fc-dot"></div><div class="fc-line"></div>';
  for (let i=0; i<stops; i++) h += '<div class="fc-dot"></div><div class="fc-line"></div>';
  return h + '<div class="fc-dot"></div>';
}

function flightCardHTML(f) {
  const dep    = fmtTime(f.depH, f.depM);
  const arr    = fmtTime(f.arrH, f.arrM);
  const dur    = fmtDur(f.duration);
  const nextD  = f.arrH < f.depH || (f.arrH === f.depH && f.arrM < f.depM);
  const sLabel = f.stops === 0 ? 'Direto' : f.stops === 1 ? '1 parada' : '2 paradas';
  const sClass = f.stops === 0 ? 'direct' : '';
  const price  = fmtPrice(S.passengers>1 ? f.totalPrice : f.pricePerPax);
  const pp     = fmtPrice(f.pricePerPax);
  const stopDots = stopDotsHTML(f.stops);

  const layInfo = f.layovers.length ? `<div class="fc-detail-item"><strong>Escalas:</strong> ${f.layovers.join(' → ')}</div>` : '';
  const cabinLbl = { economy:'Econômica', premium:'Premium Economy', business:'Executiva', first:'Primeira Classe' }[S.cabin];

  return `
  <div class="fc" data-id="${f.id}">
    <div class="fc-al">
      <div class="fc-al-logo">${f.airline.emoji}</div>
      <div class="fc-al-name">${f.airline.name}</div>
      <div class="fc-al-code">${f.flightNum}</div>
    </div>

    <div class="fc-times">
      <div class="fc-tb">
        <div class="fc-t">${dep}</div>
        <div class="fc-ap">${S.origin.code}</div>
      </div>
      <div class="fc-mid">
        <div class="fc-dur">${dur}</div>
        <div class="fc-track">${stopDots}</div>
        <div class="fc-stops ${sClass}">${sLabel}${f.layovers.length ? ' · '+f.layovers.join(', ') : ''}</div>
      </div>
      <div class="fc-tb">
        <div class="fc-t">${arr}${nextD?'<sup style="font-size:9px;color:#9ca3af;margin-left:1px">+1</sup>':''}</div>
        <div class="fc-ap">${S.destination.code}</div>
      </div>
    </div>

    <div class="fc-pr">
      <div class="fc-pr-lbl">${S.passengers>1 ? S.passengers+' passageiros' : 'por pessoa'}</div>
      <div class="fc-price"><span class="fc-cur">R$</span>${price}</div>
      ${S.passengers>1 ? `<div class="fc-pp">R$${pp} p.p.</div>` : ''}
      <a href="${f.airline.url}" target="_blank" rel="noopener noreferrer" class="book-btn">Ver na ${f.airline.name}</a>
    </div>

    <div class="fc-expand-row">
      <div class="fc-details">
        <div class="fc-detail-item"><strong>Voo:</strong> ${f.flightNum}</div>
        <div class="fc-detail-item"><strong>Duração:</strong> ${dur}</div>
        <div class="fc-detail-item"><strong>Distância:</strong> ~${fmtPrice(f.distance)} km</div>
        <div class="fc-detail-item"><strong>Classe:</strong> ${cabinLbl}</div>
        <div class="fc-detail-item"><strong>Data:</strong> ${fmtDate(f.date)}</div>
        ${layInfo}
      </div>
    </div>
    <button class="fc-expand-btn" style="grid-column:1/-1">Ver detalhes ↓</button>
  </div>`;
}

// expand cards
flightsList.addEventListener('click', e => {
  const btn = e.target.closest('.fc-expand-btn');
  if (!btn) return;
  const card = btn.closest('.fc');
  const expanded = card.classList.toggle('expanded');
  btn.textContent = expanded ? 'Ocultar detalhes ↑' : 'Ver detalhes ↓';
});

// ── SORT BUTTONS ─────────────────────────────────────────────────────────────

$q('.sort-pill').forEach(pill =>
  pill.addEventListener('click', () => {
    S.sortBy = pill.dataset.sort;
    $q('.sort-pill').forEach(p => p.classList.toggle('active', p.dataset.sort===S.sortBy));
    if (S.filteredFlights.length) renderResults(S.filteredFlights);
  })
);

// ── STICKY BAR ────────────────────────────────────────────────────────────────

function updateStickyBar() {
  const dep = depInp.value;
  const ret = retInp.value;
  stickyText.textContent = `${S.origin.city} → ${S.destination.city} · ${dep}${ret ? ' → '+ret : ''} · ${S.passengers} pax`;
}

stickyEdit.addEventListener('click', () => {
  $('hero').scrollIntoView({ behavior: 'smooth' });
});

// ── INIT ─────────────────────────────────────────────────────────────────────

originInp.focus();

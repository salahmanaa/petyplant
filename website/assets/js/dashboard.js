/* ============================================================
   PETYPLANT — dashboard.js
   ============================================================ */

/* ===== DATA ===== */
const PLANTS = [
  { name:'POLKA DOT PLANT', sci:'Hypoestes phyllostachya', img:'assets/img/plants/4.png',  score:'85%', global:92, care:'Facile',        water:'Mod\u00e9r\u00e9',         light:'Lumi\u00e8re indirecte',      temp:'18-24\u00b0C', fact:"Originaire de Madagascar, connue pour ses feuilles tachet\u00e9es" },
  { name:'NERVE PLANT',     sci:'Fittonia albivenis',      img:'assets/img/plants/5.png',  score:'90%', global:95, care:'Moyen',          water:'\u00c9lev\u00e9',           light:'Lumi\u00e8re faible indirecte',temp:'20-27\u00b0C', fact:"Ses nervures color\u00e9es lui valent le nom de \u00abplante mosa\u00efque\u00bb" },
  { name:'SNAKE PLANT',     sci:'Sansevieria trifasciata', img:'assets/img/plants/6.png',  score:'90%', global:95, care:'Tr\u00e8s facile',    water:'Faible',          light:'Faible \u00e0 mod\u00e9r\u00e9e',       temp:'15-26\u00b0C', fact:"Purificatrice d'air, r\u00e9sistante aux environnements difficiles" },
  { name:'ALOE VERA',       sci:'Aloe barbadensis miller', img:'assets/img/plants/7.png',  score:'88%', global:93, care:'Facile',         water:'Faible',          light:'Lumi\u00e8re vive',           temp:'18-30\u00b0C', fact:"Utilis\u00e9e depuis l'Antiquit\u00e9 pour ses propri\u00e9t\u00e9s apaisantes" },
  { name:'MONSTERA',        sci:'Monstera deliciosa',      img:'assets/img/plants/8.png',  score:'87%', global:90, care:'Mod\u00e9r\u00e9',         water:'Mod\u00e9r\u00e9',          light:'Lumi\u00e8re indirecte',      temp:'20-30\u00b0C', fact:"Surnomm\u00e9e \u00abplante fromage suisse\u00bb pour ses feuilles perfol\u00e9es" },
  { name:'ZZ PLANT',        sci:'Zamioculcas zamiifolia',  img:'assets/img/plants/9.png',  score:'91%', global:94, care:'Tr\u00e8s facile',    water:'Faible',          light:'Faible lumi\u00e8re',         temp:'15-28\u00b0C', fact:"Survit dans les environnements sombres, id\u00e9ale pour bureaux" },
  { name:'FIDDLE LEAF FIG', sci:'Ficus lyrata',            img:'assets/img/plants/10.png', score:'84%', global:89, care:'Difficile',      water:'Mod\u00e9r\u00e9',          light:'Lumi\u00e8re vive',           temp:'20-26\u00b0C', fact:"Originaire des r\u00e9gions tropicales d'Afrique de l'Ouest" },
  { name:'POTHOS',          sci:'Epipremnum aureum',       img:'assets/img/plants/11.png', score:'89%', global:91, care:'Facile',         water:'Faible \u00e0 mod\u00e9r\u00e9', light:'Lumi\u00e8re indirecte',      temp:'18-30\u00b0C', fact:"Surnomm\u00e9 \u00ablierre du diable\u00bb, purificateur d'air efficace" },
  { name:'SPIDER PLANT',    sci:'Chlorophytum comosum',    img:'assets/img/plants/12.png', score:'86%', global:90, care:'Facile',         water:'Mod\u00e9r\u00e9',          light:'Lumi\u00e8re indirecte',      temp:'18-24\u00b0C', fact:"Produit des \u00abbébés\u00bb plantes facilement propagables" },
];

const USERS = [
  { name:'Amrani Amina',      score:95, avatar:'👩‍🌾', role:'Expert Jardinier' },
  { name:'Harry Maguire',     score:92, avatar:'👨‍🌾', role:'Botaniste' },
  { name:'Jacqueline Lee',    score:88, avatar:'👩‍🌾', role:'Horticultrice' },
];

const MEDALS = ['🥇','🥈','🥉'];

/* ===== STATE ===== */
let currentPage    = 1;
const PER_PAGE     = 4;
let filteredPlants = [...PLANTS];
let currentSection = 'overview';
let currentTab     = 'users';

/* ===== SIDEBAR TOGGLE ===== */
const sidebar     = document.getElementById('sidebar');
const dashMain    = document.getElementById('dash-main');
const toggleBtn   = document.getElementById('sidebar-toggle');
const toggleIcon  = document.getElementById('toggle-icon');

toggleBtn.addEventListener('click', () => {
  const collapsed = sidebar.classList.toggle('collapsed');
  dashMain.classList.toggle('expanded', collapsed);
  toggleIcon.className = collapsed ? 'ri-arrow-right-s-line' : 'ri-arrow-left-s-line';
});

/* ===== SECTION NAVIGATION ===== */
const sectionTitles = {
  overview:  ["Vue d'ensemble",  "Bienvenue sur votre tableau de bord IoT"],
  inventory: ["Inventaire",      "G\u00e9rez et visualisez toutes vos plantes"],
  sensors:   ["Capteurs",        "Donn\u00e9es en temps r\u00e9el de tous vos capteurs"],
  alerts:    ["Alertes",         "Historique des alertes et notifications"],
};

function showSection(id) {
  currentSection = id;
  document.querySelectorAll('.dash-section').forEach(s => s.style.display = 'none');
  document.getElementById(`section-${id}`).style.display = '';
  document.querySelectorAll('.sidebar__link[data-section]').forEach(l => {
    l.classList.toggle('active', l.dataset.section === id);
  });
  const [title, sub] = sectionTitles[id] || ['Dashboard',''];
  document.getElementById('topbar-title').textContent    = title;
  document.getElementById('topbar-subtitle').textContent = sub;
  if (id === 'inventory') renderInventory();
}

document.querySelectorAll('.sidebar__link[data-section]').forEach(link => {
  link.addEventListener('click', e => { e.preventDefault(); showSection(link.dataset.section); });
});

/* ===== RANKINGS ===== */
function showTab(tab) {
  currentTab = tab;
  document.getElementById('tab-users').classList.toggle('active',  tab === 'users');
  document.getElementById('tab-plants').classList.toggle('active', tab === 'plants');
  renderRanking();
}

function renderRanking() {
  const list = document.getElementById('ranking-list');
  if (!list) return;
  const items = currentTab === 'users'
    ? USERS.sort((a,b) => b.score - a.score)
    : [...PLANTS].sort((a,b) => b.global - a.global).slice(0,3).map(p => ({ name:p.name, score:p.global, sub:p.sci, avatar:'🌿' }));

  list.innerHTML = items.slice(0,3).map((item,i) => `
    <div class="rank-item">
      <span class="rank-medal">${MEDALS[i]}</span>
      <div class="rank-info">
        <div class="rank-name">${item.avatar || '🌿'} ${item.name}</div>
        <div class="rank-sub">${item.role || item.sub || ''}</div>
      </div>
      <span class="rank-score">${item.score}${currentTab==='users'?'pts':'%'}</span>
    </div>`).join('');
}

function renderUsersSummary() {
  const el = document.getElementById('users-summary');
  if (!el) return;
  el.innerHTML = USERS.sort((a,b) => b.score - a.score).slice(0,3).map((u,i) => `
    <div class="rank-item">
      <span class="rank-medal">${MEDALS[i]}</span>
      <div class="rank-info">
        <div class="rank-name">${u.avatar} ${u.name}</div>
        <div class="rank-sub">${u.role}</div>
      </div>
      <span class="rank-score">${u.score}pts</span>
    </div>`).join('');
}

/* ===== INVENTORY ===== */
function renderInventory() {
  const grid = document.getElementById('inv-grid');
  const pgEl = document.getElementById('pagination');
  const countEl = document.getElementById('inv-count');
  if (!grid) return;

  const total = filteredPlants.length;
  const pages = Math.ceil(total / PER_PAGE);
  currentPage = Math.min(currentPage, pages || 1);

  const start = (currentPage - 1) * PER_PAGE;
  const slice = filteredPlants.slice(start, start + PER_PAGE);

  if (countEl) countEl.textContent = `${total} plante${total!==1?'s':''}`;

  grid.innerHTML = slice.map(p => `
    <div class="plant-card">
      <div class="plant-card__inner">
        <div class="plant-card__front">
          <img src="${p.img}" alt="${p.name}" class="plant-card__img" loading="lazy">
          <div class="plant-card__name">${p.name}</div>
          <div class="plant-card__sci">${p.sci}</div>
          <span class="plant-card__score"><i class="ri-leaf-line"></i>${p.score}</span>
        </div>
        <div class="plant-card__back">
          <div><div class="plant-card__back-label">Entretien</div><div class="plant-card__back-value">${p.care}</div></div>
          <div><div class="plant-card__back-label">Arrosage</div><div class="plant-card__back-value">${p.water}</div></div>
          <div><div class="plant-card__back-label">Lumière</div><div class="plant-card__back-value">${p.light}</div></div>
          <div><div class="plant-card__back-label">Température</div><div class="plant-card__back-value">${p.temp}</div></div>
          <div><div class="plant-card__back-label">Le saviez-vous ?</div><div class="plant-card__back-value" style="font-size:.78rem">${p.fact}</div></div>
        </div>
      </div>
    </div>`).join('');

  // Pagination
  if (pgEl) {
    let html = `<button class="page-btn" onclick="goPage(${currentPage-1})" ${currentPage<=1?'disabled':''}><i class="ri-arrow-left-s-line"></i></button>`;
    for (let i=1; i<=pages; i++) {
      html += `<button class="page-btn${i===currentPage?' active':''}" onclick="goPage(${i})">${i}</button>`;
    }
    html += `<button class="page-btn" onclick="goPage(${currentPage+1})" ${currentPage>=pages?'disabled':''}><i class="ri-arrow-right-s-line"></i></button>`;
    pgEl.innerHTML = html;
  }
}

function goPage(p) {
  const pages = Math.ceil(filteredPlants.length / PER_PAGE);
  if (p < 1 || p > pages) return;
  currentPage = p;
  renderInventory();
}

/* ===== SEARCH ===== */
function setupSearch() {
  const inv  = document.getElementById('inv-search');
  const glob = document.getElementById('global-search');

  const doSearch = val => {
    const q = val.toLowerCase().trim();
    filteredPlants = q ? PLANTS.filter(p => p.name.toLowerCase().includes(q) || p.sci.toLowerCase().includes(q)) : [...PLANTS];
    currentPage = 1;
    if (currentSection !== 'inventory') showSection('inventory');
    else renderInventory();
  };

  inv?.addEventListener('input',  e => doSearch(e.target.value));
  glob?.addEventListener('input', e => {
    if (inv) inv.value = e.target.value;
    doSearch(e.target.value);
  });
}

/* ===== LIVE SENSOR SIMULATION ===== */
function rand(min, max, dec=1) { return +(Math.random()*(max-min)+min).toFixed(dec); }

function updateSensorUI(ids, value, barWidth, statusEl, statusClass, statusText) {
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  });
  ['b-temp','b-humid','b-light','b-water','b-ph','b2-temp','b2-humid','b2-light','b2-water','b2-ph'].forEach(bid => {
    // handled individually below
  });
}

function simulateSensors() {
  const temp   = rand(20, 28);
  const humid  = rand(55, 85);
  const light  = Math.round(rand(400, 1200, 0));
  const water  = rand(50, 90);
  const ph     = rand(5.5, 7.5);

  // Temperature
  setText(['s-temp','s2-temp'], `${temp}°C`);
  setBar(['b-temp','b2-temp'], ((temp-15)/25*100).toFixed(0));

  // Humidity
  setText(['s-humid','s2-humid'], `${humid}%`);
  setBar(['b-humid','b2-humid'], humid.toFixed(0));

  // Light
  setText(['s-light','s2-light'], `${light} lux`);
  setBar(['b-light','b2-light'], (light/1300*100).toFixed(0));

  // Water
  setText(['s-water','s2-water','kpi-water'], `${water}%`);
  setBar(['b-water','b2-water'], water.toFixed(0));
  const waterStatus = water < 60 ? 'danger' : water < 75 ? 'warn' : 'ok';
  const waterText   = water < 60 ? 'Critique' : water < 75 ? 'Faible' : 'Normal';
  const wsEl = document.getElementById('ws-water');
  if (wsEl) { wsEl.className = `sensor-item__status status-${waterStatus}`; wsEl.textContent = waterText; }

  // pH
  setText(['s-ph','s2-ph'], ph.toFixed(1));
  setBar(['b-ph','b2-ph'], ((ph-4)/6*100).toFixed(0));

  // KPI cards
  setText(['kpi-temp'], `${temp}°C`);
  setText(['kpi-humidity'], `${humid}%`);

  // Update gauge
  const health = Math.round((humid*0.35 + water*0.35 + (light/1300*100)*0.15 + ((35-Math.abs(temp-22))/35*100)*0.15));
  const clamped = Math.min(100, Math.max(0, health));
  const circumference = 2 * Math.PI * 68;
  const offset = circumference * (1 - clamped/100);
  const gaugeBar = document.getElementById('gauge-bar');
  if (gaugeBar) gaugeBar.style.strokeDashoffset = offset;
  setText(['gauge-value'], `${clamped}%`);
  const statusEl = document.getElementById('gauge-status');
  if (statusEl) {
    if (clamped >= 80) statusEl.textContent = '\uD83C\uDF31 Toutes les plantes sont en bonne sant\u00e9';
    else if (clamped >= 60) statusEl.textContent = '\u26A0\uFE0F Quelques plantes n\u00e9cessitent de l\'attention';
    else statusEl.textContent = '\uD83D\uDEA8 Intervention requise !';
  }
}

function setText(ids, val) { ids.forEach(id => { const el=document.getElementById(id); if(el) el.textContent=val; }); }
function setBar(ids, pct)  { ids.forEach(id => { const el=document.getElementById(id); if(el) el.style.width=Math.min(100,Math.max(0,pct))+'%'; }); }

/* ===== REFRESH BUTTON ===== */
document.getElementById('refresh-btn')?.addEventListener('click', () => {
  simulateSensors();
  const btn = document.getElementById('refresh-btn');
  btn.querySelector('i').style.animation = 'spin .6s linear';
  setTimeout(() => btn.querySelector('i').style.animation = '', 600);
});

/* ===== SCROLL UP ===== */
const scrollUpBtn = document.getElementById('scroll-up');
window.addEventListener('scroll', () => {
  scrollUpBtn?.classList.toggle('show', window.scrollY >= 300);
});

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  renderRanking();
  renderUsersSummary();
  simulateSensors();
  setInterval(simulateSensors, 4000);
  setupSearch();

  // Add spin keyframe
  const style = document.createElement('style');
  style.textContent = '@keyframes spin{to{transform:rotate(360deg)}}';
  document.head.appendChild(style);
});

/* ============================================================
   PETYPLANT — main.js  (Landing Page)
   ============================================================ */

/* ===== NAVIGATION ===== */
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');

navToggle?.addEventListener('click', () => navMenu.classList.add('open'));
navClose?.addEventListener('click', () => navMenu.classList.remove('open'));
navLinks.forEach(l => l.addEventListener('click', () => navMenu.classList.remove('open')));

/* ===== STICKY HEADER ===== */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY >= 60);
});

/* ===== ACTIVE NAV LINK ON SCROLL ===== */
const sections = document.querySelectorAll('section[id]');
function updateActiveLink() {
  const scrollY = window.scrollY;
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = document.querySelector(`.nav__link[href="#${id}"]`);
    if (link) link.classList.toggle('active', scrollY >= top && scrollY < top + height);
  });
}
window.addEventListener('scroll', updateActiveLink);

/* ===== SCROLL-UP BUTTON ===== */
const scrollUpBtn = document.getElementById('scroll-up');
window.addEventListener('scroll', () => {
  scrollUpBtn?.classList.toggle('show', window.scrollY >= 400);
});

/* ===== FAQ ACCORDION ===== */
document.querySelectorAll('.faq__item').forEach(item => {
  const question = item.querySelector('.faq__question');
  const answer = item.querySelector('.faq__answer');

  question.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq__item.open').forEach(o => {
      o.classList.remove('open');
      o.querySelector('.faq__answer').style.height = '0';
      o.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
    });

    // Open clicked (if it was closed)
    if (!isOpen) {
      item.classList.add('open');
      answer.style.height = answer.scrollHeight + 'px';
      question.setAttribute('aria-expanded', 'true');
    }
  });
});

/* ===== ANIMATED COUNTERS ===== */
function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 16);
}

// Trigger counters when hero enters view
const heroStats = document.querySelectorAll('.hero__stat-value');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      heroStats.forEach(animateCounter);
      observer.disconnect();
    }
  });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) observer.observe(heroSection);

/* ===== CSS PARTICLES ===== */
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = 40;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    p.className = 'particle';
    p.style.cssText = `
      left:${Math.random() * 100}%;
      top:${Math.random() * 100}%;
      animation-delay:${Math.random() * 8}s;
      animation-duration:${6 + Math.random() * 6}s;
      width:${1 + Math.random() * 3}px;
      height:${1 + Math.random() * 3}px;
      opacity:${0.2 + Math.random() * 0.5};
    `;
    container.appendChild(p);
  }
}
createParticles();

/* ===== CONTACT FORM ===== */
const form = document.getElementById('contact-form');
form?.addEventListener('submit', e => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.innerHTML = '<i class="ri-check-line"></i> Message envoyé !';
  btn.style.background = 'linear-gradient(135deg,#16a34a,#166534)';
  setTimeout(() => {
    btn.innerHTML = 'Envoyer le Message <i class="ri-send-plane-line"></i>';
    btn.style.background = '';
    form.reset();
  }, 3000);
});

/* ===== SCROLL REVEAL ===== */
if (typeof ScrollReveal !== 'undefined') {
  const sr = ScrollReveal({ origin: 'bottom', distance: '40px', duration: 800, delay: 100, easing: 'cubic-bezier(.4,0,.2,1)', reset: false });
  sr.reveal('.hero__data', { origin: 'left' });
  sr.reveal('.hero__media', { origin: 'right', delay: 200 });
  sr.reveal('.about__img-wrapper', { origin: 'left' });
  sr.reveal('.about__data', { origin: 'right', delay: 150 });
  sr.reveal('.step-card', { interval: 120 });
  sr.reveal('.feature-card', { interval: 80 });
  sr.reveal('.faq__item', { interval: 80 });
  sr.reveal('.contact__info', { origin: 'left' });
  sr.reveal('.contact__form', { origin: 'right', delay: 150 });
  sr.reveal('.section__label, .section__title, .section__subtitle', { interval: 100 });
}

/* ===== INTERACTIVE CHATBOT (PETYBOT) LOGIC ===== */
const chatToggle = document.getElementById('chatbot-toggle');
const chatWindow = document.getElementById('chatbot-window');
const chatClose = document.getElementById('chatbot-close');
const chatMessages = document.getElementById('chatbot-messages');
const chatInput = document.getElementById('chatbot-input');
const chatSend = document.getElementById('chatbot-send');
const chatStatusText = document.getElementById('chatbot-status-text');

if (chatStatusText) {
  chatStatusText.textContent = "PETYBOT Expert (Hors-ligne ⚡)";
  chatStatusText.style.color = "#4ade80";
}

// Toggle Chatbot Window
chatToggle?.addEventListener('click', () => {
  chatWindow.classList.toggle('open');
  chatToggle.classList.toggle('open');
  if (chatWindow.classList.contains('open')) {
    chatInput.focus();
  }
});

chatClose?.addEventListener('click', () => {
  chatWindow.classList.remove('open');
  chatToggle.classList.remove('open');
});

// Append Message Helper
function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.className = `chatbot-message chatbot-message--${sender}`;
  msg.innerHTML = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Typing Indicator Simulation
function showTypingIndicator() {
  const ind = document.createElement('div');
  ind.className = 'chatbot-typing';
  ind.id = 'chatbot-typing-indicator';
  ind.innerHTML = '<span></span><span></span><span></span>';
  chatMessages.appendChild(ind);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
  document.getElementById('chatbot-typing-indicator')?.remove();
}

// Highly Detailed Local Multilingual Botanical Knowledge // Pure JS TF-IDF & Cosine Similarity Semantic Vector Search Engine
// Highly Detailed Local Multilingual Botanical Knowledge // Pure JS TF-IDF & Cosine Similarity Semantic Vector Search Engine
const PETY_QA_DATABASE = {
  fr: [
    {
      keywords: "qui a cree developpe fait conçu etudiant emsi tanger salah saad yassine yassir zaid",
      answer: "PETYPLANT a été conçu et développé avec fierté par les étudiants ingénieurs de l'<strong>EMSI Tanger</strong> : <strong>Salaheddine Manaa</strong>, <strong>Saad Tmimi</strong>, <strong>Yassine Jannane</strong>, <strong>Yassir Amrani</strong>, et <strong>Zaid Harboul</strong>. Ils ont développé le matériel Arduino, le design 3D et ce tableau de bord interactif."
    },
    {
      keywords: "qu'est-ce que c'est c'est quoi le projet petyplant concept arrosage automatique intelligent",
      answer: "<strong>PETYPLANT</strong> est un système d'arrosage automatique intelligent et connecté (IoT). Il utilise des capteurs de pointe branchés à une carte Arduino pour mesurer les besoins réels du sol et de la plante, et déclencher l'irrigation uniquement lorsque c'est nécessaire. Vous pouvez tout suivre en direct sur le <strong><a href='dashboard.html'>Tableau de bord</a></strong>."
    },
    {
      keywords: "quels capteurs materiel arduino dht22 sen0161 ldr hc-sr04 composant pompe relais",
      answer: "PETYPLANT intègre des composants matériels de qualité industrielle :<br>• <strong>DHT22</strong> : Capteur d'humidité de l'air et température ambiante.<br>• <strong>SEN0161</strong> : Sonde capacitive d'humidité du sol (anticorrosion).<br>• <strong>LDR</strong> : Photorésistance mesurant l'ensoleillement en direct.<br>• <strong>HC-SR04</strong> : Sonde ultrasonique mesurant le réservoir d'eau.<br>• <strong>Pompe et Relais</strong> : Pour activer l'arrosage de façon autonome."
    },
    {
      keywords: "combien ca coute pack tarif prix demarrage intelligent pro ia mad dirham achat commander",
      answer: "Nous proposons 3 packs adaptés à vos besoins :<br>• <strong>Pack Démarrage (599 MAD)</strong> : Équipements de base pour une plante.<br>• <strong>Pack Intelligent (1 299 MAD)</strong> : Dashboard interactif complet et multi-capteurs.<br>• <strong>Pack Pro IA (2 199 MAD)</strong> : Analyse avancée et caméra intelligente d'entretien.<br>Remplissez notre formulaire de contact ci-dessus ou découvrez les détails sur la page <strong><a href='products.html'>Produits</a></strong> !"
    },
    {
      keywords: "comment fonctionne arrosage automatique pompe declenche eau humidite",
      answer: "Le capteur d'humidité du sol SEN0161 prend des mesures en continu. Si le niveau d'humidité descend sous le seuil critique (par exemple 60% pour un Monstera), le microcontrôleur Arduino active le relais qui allume la pompe à eau pour délivrer la quantité exacte d'eau nécessaire."
    },
    {
      keywords: "tableau de bord iot dashboard interactif fiches 3d alertes suivi direct",
      answer: "Notre <strong><a href='dashboard.html'>Tableau de bord IoT</a></strong> interactif vous permet de superviser l'état de vos plantes en direct. Il inclut un suivi sensoriel interactif, un système d'alertes en temps réel, un classement de croissance, et un catalogue de plantes avec des fiches 3D pivotantes."
    },
    {
      keywords: "livraison gratuite tanger emsi maroc region domicile installation",
      answer: "Absolument ! La livraison et l'installation à domicile de tout le système (réservoir, capteurs, pompe) sont <strong>entièrement gratuites</strong> dans toute la région de Tanger-Tétouan-Al Hoceïma !"
    },
    {
      keywords: "conseil plante monstera cactus aloe vera humidite ideal sol ph terre",
      answer: "Voici nos conseils d'entretien :<br>• <strong>Monstera / Ficus</strong> : Humidité élevée (60-80%).<br>• <strong>Cactus / Aloe Vera</strong> : Humidité basse (20-30% max) et plein soleil.<br>• <strong>pH du sol</strong> : Pour la plupart des plantes, le pH optimal de la terre doit rester neutre entre 6.0 et 7.0."
    },
    {
      keywords: "temperature ideale parfaite plante climat dht22 degre celsius chaud froid chaleur tempreture",
      answer: "Grâce à notre sonde précise <strong>DHT22</strong>, PETYPLANT surveille la température ambiante de l'air. Pour la majorité des plantes d'intérieur, la température idéale se situe entre <strong>18°C et 24°C</strong>. Si elle descend sous 12°C ou dépasse 35°C, notre tableau de bord déclenche une alerte de sécurité !"
    },
    {
      keywords: "bonjour salut hello coucou hi assistante petybot bienvenue",
      answer: "Bonjour ! Je suis <strong>PETYBOT</strong> 🌿, votre assistant botanique local intelligent et offline. Comment puis-je vous aider dans votre projet d'arrosage automatique aujourd'hui ?"
    },
    {
      keywords: "merci au revoir bye ciao thanks super genial",
      answer: "Je vous en prie ! Prenez bien soin de vos plantes. N'hésitez pas à me solliciter si vous avez d'autres questions botaniques ou IoT ! À bientôt 🌿🌸"
    }
  ],
  en: [
    {
      keywords: "who made created designed developed project student emsi tangier salah saad yassine yassir zaid",
      answer: "PETYPLANT was proudly designed and developed by outstanding engineering students at <strong>EMSI Tangier</strong>: <strong>Salaheddine Manaa</strong>, <strong>Saad Tmimi</strong>, <strong>Yassine Jannane</strong>, <strong>Yassir Amrani</strong>, and <strong>Zaid Harboul</strong>."
    },
    {
      keywords: "what is petyplant concept smart automatic watering system intelligent internet of things iot",
      answer: "<strong>PETYPLANT</strong> is an intelligent connected automatic watering station (IoT). It leverages capacitive soil sensors and ambient light sensors connected to an Arduino board to analyze soil status and automatically water plants only when needed. Monitor it live on our <strong><a href='dashboard.html'>Dashboard</a></strong>!"
    },
    {
      keywords: "which hardware sensors components used arduino dht22 sen0161 ldr hc-sr04 pump relay",
      answer: "PETYPLANT integrates robust IoT hardware:<br>• <strong>Arduino Core</strong>: Microcontroller for logical operations.<br>• <strong>DHT22</strong>: Ambient air temperature and humidity sensor.<br>• <strong>SEN0161</strong>: Corrosion-proof capacitive soil moisture sensor.<br>• <strong>LDR</strong>: Light sensor measuring sunshine levels.<br>• <strong>HC-SR04</strong>: Ultrasonic depth sensor tracking water levels.<br>• <strong>Actuators</strong>: 5V DC pump operating via mechanical relays."
    },
    {
      keywords: "how much price cost pack plans purchase buy mad dirham starter smart pro ai",
      answer: "We offer 3 commercial packs:<br>• <strong>Starter Pack (599 MAD)</strong>: Basic setup for one plant.<br>• <strong>Smart Pack (1,299 MAD)</strong>: Full interactive dashboard and multi-sensors.<br>• <strong>Pro AI Pack (2,199 MAD)</strong>: Advanced RAG features and plant analysis cameras.<br>Find the details on our <strong><a href='products.html'>Products</a></strong> page!"
    },
    {
      keywords: "how does automatic watering water pump trigger activate soil moisture level",
      answer: "The SEN0161 soil moisture sensor measures soil humidity continuously. If the moisture drops below a pre-configured botanical threshold (e.g. 60% for Monsteras), the Arduino sends a signal to the relay module, powering the pump to deliver the exact amount of water needed."
    },
    {
      keywords: "dashboard iot live tracking telemetry chart alerts 3d flip cards search",
      answer: "Our interactive <strong><a href='dashboard.html'>IoT Dashboard</a></strong> allows you to supervise plant parameters, receive smart alert notifications, view progress charts, and browse our interactive 3D plant catalog."
    },
    {
      keywords: "delivery installation tangier morocco emsi free physical setup region",
      answer: "Yes, delivery and expert technical installation are 100% <strong>free</strong> across the entire Tangier-Tetouan-Al Hoceima region!"
    },
    {
      keywords: "plant care tips monstera cactus aloe vera soil moisture ph levels gardening advice",
      answer: "Botanical guidelines:<br>• <strong>Monstera / Foliage</strong>: Optimal soil moisture: 60-80%.<br>• <strong>Cacti / Succulents</strong>: Optimal soil moisture: 20-30% max, high light.<br>• <strong>Soil pH</strong>: Ideal range remains neutral between 6.0 and 7.0."
    },
    {
      keywords: "perfect temperature ideal air humidity climate dht22 degree celsius warm hot cold heat tempreture plants",
      answer: "Using our precise <strong>DHT22</strong> IoT sensor, PETYPLANT tracks air temperature and ambient climate. The ideal temperature range for most indoor plants is between <strong>18°C and 24°C</strong> (64°F - 75°F). If the temperature drops below 12°C or exceeds 35°C, the IoT dashboard triggers an automated safety alarm."
    },
    {
      keywords: "hello hi bonjour welcome welcome greeting petybot",
      answer: "Hello! I am <strong>PETYBOT</strong> 🌿, your intelligent offline botanical assistant. How can I help you manage or plan your smart automatic watering systems today?"
    },
    {
      keywords: "thanks thank you bye goodbye ciao awesome great helpful",
      answer: "You are very welcome! Take great care of your plants. Feel free to ask more questions anytime. Happy gardening! 🌿🌸"
    }
  ],
  ar: [
    {
      keywords: "من طور صمم صنع ابتكر مهندس طلاب طنجة emsi صلاح الدين سعد ياسين ياسر زيد",
      answer: "تم تصميم وتطوير PETYPLANT بكل فخر من طرف مهندسي المستقبل بـ <strong>EMSI طنجة</strong>: <strong>صلاح الدين مناع</strong>، <strong>سعد التميمي</strong>، <strong>ياسين جنان</strong>، <strong>ياسر العمراني</strong>، و <strong>زيد حربول</strong>."
    },
    {
      keywords: "ما هو مشروع petyplant ري تلقائي ذكي متصل انترنت الاشياء سقي نباتات",
      answer: "<strong>PETYPLANT</strong> عبارة عن محطة ري تلقائية ذكية ومتصلة بإنترنت الأشياء (IoT). تستخدم أجهزة استشعار متصلة بـ Arduino لتحليل التربة وسقي النباتات تلقائياً عند الحاجة. يمكنك متابعة كل شيء على <strong><a href='dashboard.html'>لوحة التحكم</a></strong> الخاصة بنا!"
    },
    {
      keywords: "ما هي أجهزة استشعار معدات قطع مكونات مستشعرات اردوينو dht22 sen0161 ldr hc-sr04 مضخة",
      answer: "يعتمد النظام على مجموعة من أجهزة الاستشعار المتطورة:<br>• <strong>Arduino</strong>: العقل المدبر لمعالجة البيانات محلياً.<br>• <strong>DHT22</strong>: مستشعر لقياس حرارة ورطوبة الهواء.<br>• <strong>SEN0161</strong>: مستشعر سعوي لقياس رطوبة التربة دون صدأ.<br>• <strong>LDR</strong>: مستشعر لقياس مستوى الإضاءة وأشعة الشمس.<br>• <strong>HC-SR04</strong>: مستشعر بالموجات فوق الصوتية لقياس منسوب المياه.<br>• <strong>مضخة المياه</strong>: مضخة هادئة تعمل عبر Relay الإلكتروني."
    },
    {
      keywords: "كم سعر ثمن تكلفة شراء باقة باقات درهم مغربي عرض عروض starter smart pro ai",
      answer: "نحن نوفر 3 باقات متكاملة لجميع الاحتياجات:<br>• <strong>الباقة الأساسية (599 درهم)</strong> : ري ذكي لنبتة واحدة.<br>• <strong>الباقة الذكية (1,299 درهم)</strong> : لوحة التحكم كاملة مع جميع أجهزة الاستشعار.<br>• <strong>باقة الذكاء الاصطناعي الاحترافية (2,199 درهم)</strong> : أتمتة كاملة مع تحليل ذكي بالكاميرا.<br>اكتشف العروض في صفحة <strong><a href='products.html'>المنتجات</a></strong>!"
    },
    {
      keywords: "كيف يعمل الري التلقائي مضخة ماء سقي تربة رطوبة مستشعر",
      answer: "يقوم مستشعر SEN0161 بقياس رطوبة التربة باستمرار. إذا انخواهت الرطوبة عن الحد المطلوب لنوع النبتة، يرسل الأردوينو إشارة لتفعيل المضخة وتوفير المياه الكافية فوراً."
    },
    {
      keywords: "لوحة تحكم شاشة تفاعل قياسات بيانات تنبيهات كرت كروت ثلاثي الابعاد",
      answer: "تتيح لك <strong><a href='dashboard.html'>لوحة التحكم</a></strong> مراقبة نباتاتك مباشرة وبشكل تفاعلي، حيث ترسل تنبيهات عند الحاجة للماء وتضم كرت نباتات تفاعلي ثلاثي الأبعاد."
    },
    {
      keywords: "هل توصيل مجاني طنجة تركيب منزل مجانا جهة مغرب",
      answer: "نعم، التوصيل والتركيب والضبط الأولي للنظام في منزلك **مجاني بالكامل** في جميع أنحاء جهة طنجة تطوان الحسيمة!"
    },
    {
      keywords: "نصائح نبتة نباتات صبار مونستيرا رطوبة حموضة تربة سقي رعاية",
      answer: "إرشادات رعاية النباتات:<br>• <strong>المونستيرا / النباتات الاستوائية</strong>: تحتاج رطوبة تربة عالية (60-80%).<br>• <strong>الصبار / الألوفيرا</strong>: تفضل تربة جافة (20-30% كحد أقصى) مع الكثير من الضوء.<br>• <strong>حموضة التربة (pH)</strong>: المستويات المثالية تتراوح بين 6.0 و 7.0."
    },
    {
      keywords: "درجة الحرارة المثالية رطوبة الهواء طقس dht22 مئوية بارد دافئ حار جو نباتات",
      answer: "باستخدام مستشعر <strong>DHT22</strong>، يراقب نظام PETYPLANT درجة حرارة ورطوبة الهواء. تتراوح درجة الحرارة المثالية لمعظم النباتات المنزلية بين <strong>18 و 24 درجة مئوية</strong>. إذا انخفضت درجة الحرارة عن 12 أو تجاوزت 35 درجة مئوية، يرسل النظام إنذاراً فورياً لحماية النباتات."
    },
    {
      keywords: "مرحبا أهلا سلام السلام عليكم بيتيبوت مساعد نباتي",
      answer: "مرحباً بك! أنا <strong>PETYBOT</strong> 🌿، مساعدك النباتي الذكي دون إنترنت. كيف يمكنني مساعدتك في العناية بنباتاتك أو طلب نظام ري ذكي اليوم??"
    },
    {
      keywords: "شكرا شكرا لك مع السلامة باي شكرا جزيلا رائع ممتاز",
      answer: "على الرحب والسعة! حافظ على صحة خضرة نباتاتك، ولا تتردد في سؤالي في أي وقت. حديقة سعيدة! 🌿🌸"
    }
  ]
};

// Common sessional multilingual stop words list
const PETY_STOP_WORDS = new Set([
  // English
  "what", "is", "the", "for", "how", "much", "to", "of", "in", "on", "a", "an", "and", "are", "about", "by", "our", "your", "we", "you", "it", "with", "at", "this", "that", "can",
  // French
  "quel", "est", "la", "le", "pour", "comment", "combien", "de", "en", "sur", "un", "une", "et", "sont", "ce", "que", "qui", "dans", "notre", "votre", "nous", "vous", "il", "elle", "avec", "ceci", "cela",
  // Arabic
  "ما", "هو", "هي", "في", "على", "من", "عن", "كيف", "كم", "هل", "و", "أو", "أن", "هذا", "هذه", "ب", "ل", "مع", "هنا", "يا"
]);

// Pure client-side TF-IDF Cosine Similarity Search Engine
function cleanTokenize(str) {
  return str.toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "")
    .split(/\s+/)
    .filter(w => w.length > 1 && !PETY_STOP_WORDS.has(w));
}

function calculateCosineSimilarity(query, docKeywords) {
  const queryTokens = cleanTokenize(query);
  const docTokens = cleanTokenize(docKeywords);

  if (queryTokens.length === 0 || docTokens.length === 0) return 0;

  // Build simple Term Frequency vectors
  const uniqueTerms = Array.from(new Set([...queryTokens, ...docTokens]));

  const queryVector = uniqueTerms.map(term => queryTokens.filter(t => t === term).length);
  const docVector = uniqueTerms.map(term => docTokens.filter(t => t === term).length);

  // Compute Cosine Similarity
  let dotProduct = 0;
  let queryMagnitudeSq = 0;
  let docMagnitudeSq = 0;

  for (let i = 0; i < uniqueTerms.length; i++) {
    dotProduct += queryVector[i] * docVector[i];
    queryMagnitudeSq += queryVector[i] * queryVector[i];
    docMagnitudeSq += docVector[i] * docVector[i];
  }

  const magnitude = Math.sqrt(queryMagnitudeSq) * Math.sqrt(docMagnitudeSq);
  return magnitude === 0 ? 0 : dotProduct / magnitude;
}

// Sessional language detector
function getDetectedLanguage(q) {
  if (q.includes('how') || q.includes('what') || q.includes('who') || q.includes('price') || q.includes('sensor') || q.includes('dashboard') || q.includes('order') || q.includes('temperature')) return 'en';
  if (q.includes('كيف') || q.includes('ما') || q.includes('من') || q.includes('سعر') || q.includes('طنجة') || q.includes('طلب') || q.includes('شراء') || q.includes('تحكم') || q.includes('حرارة')) return 'ar';
  return 'fr'; // default French
}

// ==========================================
// 🚀 CLE API GEMINI HAUTE-PRECISION
// Masquée de manière sécurisée dans config.js (ignoré par Git) pour éviter d'être poussée sur GitHub.
// Si config.js n'existe pas ou si la clé est vide, le chatbot bascule automatiquement sur le moteur vectoriel local !
// ==========================================
const GEMINI_API_KEY = typeof CONFIG !== 'undefined' ? CONFIG.GEMINI_API_KEY : "";

const GEMINI_SYSTEM_INSTRUCTION = `
You are PETYBOT 🌿, the highly professional AI botanical and IoT assistant for the PETYPLANT project.
PETYPLANT is a smart automatic watering station developed by outstanding engineering students at EMSI Tanger:
- Salaheddine Manaa
- Saad Tmimi
- Yassine Jannane
- Yassir Amrani
- Zaid Harboul

Technical specs:
- Controller: Arduino core micro-controller.
- Sensors:
  * DHT22 (air temperature & humidity)
  * SEN0161 (capacitive corrosion-resistant soil moisture sensor)
  * LDR (light/sunlight sensor)
  * HC-SR04 (ultrasonic water level gauge for the tank)
- Actuators: DC 5V/12V quiet water pump connected via an electronic relay.

Pricing and packages:
1. Pack Démarrage (599 MAD) - Basic physical automatic setup for 1 plant.
2. Pack Intelligent (1299 MAD) - Multi-sensors and full live web dashboard access.
3. Pack Pro IA (2199 MAD) - Advanced AI diagnostics and smart maintenance camera.
* Note: Delivery and professional technical setup are completely free across the entire Tangier-Tetouan-Al Hoceima region.

Live IoT Dashboard:
Our dashboard simulates real-time soil moisture (representing authentic SEN0161 ranges of 60%-80%), air temp/humidity (DHT22), sunlight (LDR), and ultrasonic water tank level (HC-SR04). It sends instant alerts when parameters go out of safe limits and includes an interactive 3D plant library with dynamic search.

Tone and style guidelines:
- Be an incredibly helpful, friendly, and expert botanical companion.
- You MUST answer in the EXACT language the user uses (French, English, Arabic, Spanish, etc.).
- Keep your answers highly concise (max 3-4 sentences or bullet points) so they fit perfectly in a chat bubble without forcing the user to scroll.
- If they ask about ordering or products, mention the Products page (products.html) and Dashboard (dashboard.html).
- Keep formatting premium and readable.
`;

// Update status text dynamically based on mode
if (chatStatusText) {
  if (GEMINI_API_KEY && GEMINI_API_KEY.trim() !== "") {
    chatStatusText.innerHTML = '<span class="pulse-indicator"></span>PETYBOT AI (Actif ✨)';
    chatStatusText.style.color = "#a78bfa"; // Premium purple color
  } else {
    chatStatusText.textContent = "PETYBOT Expert (Hors-ligne ⚡)";
    chatStatusText.style.color = "#4ade80"; // Botanical green
  }
}

// Handle User Input Submission
async function handleUserMsg(text) {
  if (!text.trim()) return;

  // User message
  appendMessage('user', text);
  chatInput.value = '';

  // Show typing animation
  showTypingIndicator();

  const q = text.toLowerCase();
  const lang = getDetectedLanguage(q);
  let reply = "";
  let usedGemini = false;

  // 1. Try Gemini Generative AI if Key is configured
  if (GEMINI_API_KEY && GEMINI_API_KEY.trim() !== "") {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `${GEMINI_SYSTEM_INSTRUCTION}\n\nQuestion de l'utilisateur : ${text}` }]
            }
          ],
          generationConfig: {
            maxOutputTokens: 1000,
            temperature: 0.7
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.candidates && data.candidates[0].content.parts[0].text) {
          reply = data.candidates[0].content.parts[0].text;
          // Format basic markdown bolding to premium HTML tags
          reply = reply.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');
          usedGemini = true;
        }
      }
    } catch (err) {
      console.warn("Gemini API call failed, falling back to local sessional vector search engine:", err);
    }
  }

  // 2. Seamless Local TF-IDF Vector Search Engine Fallback
  if (!usedGemini) {
    const db = PETY_QA_DATABASE[lang] || PETY_QA_DATABASE['fr'];
    let bestMatch = null;
    let highestScore = 0;

    db.forEach(doc => {
      const score = calculateCosineSimilarity(q, doc.keywords);
      if (score > highestScore) {
        highestScore = score;
        bestMatch = doc;
      }
    });

    if (highestScore >= 0.12 && bestMatch) {
      reply = bestMatch.answer;
    } else {
      if (lang === 'fr') {
        reply = "Je comprends votre intérêt ! N'hésitez pas à reformuler votre question. Je peux vous informer sur : nos <strong>créateurs de l'EMSI Tanger</strong>, du <strong>matériel / capteurs</strong>, de nos <strong>tarifs / packs</strong>, ou de notre <strong>tableau de bord IoT</strong>.";
      } else if (lang === 'en') {
        reply = "That is a great question! Feel free to rephrase. I can tell you about: the <strong>creators at EMSI Tangier</strong>, the <strong>hardware/sensors</strong>, our <strong>pricing packages</strong>, or the live **IoT dashboard**.";
      } else {
        reply = "سؤال رائع! يمكنني إخبارك بالتفصيل عن: <strong>مبدعي المشروع من EMSI طنجة</strong>، <strong>أجهزة الاستشعار والمعدات</strong>، <strong>أسعار الباقات</strong>، أو <strong>لوحة التحكم التفاعلية</strong>.";
      }
    }
  }

  // Simulate think delay for realism
  await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 400));

  // Remove typing indicator & display answer
  removeTypingIndicator();
  appendMessage('bot', reply);
}

// Bind Send Events
chatSend?.addEventListener('click', () => handleUserMsg(chatInput.value));
chatInput?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleUserMsg(chatInput.value);
});

// Trigger Suggested Question Click
window.sendSuggestion = function (text) {
  handleUserMsg(text);
};




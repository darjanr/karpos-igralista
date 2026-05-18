// Игралишта Карпош — податоци
// Еден фајл, рачно одржуван, верзиониран со git.
//
// CHANGE LOG PATTERN:
//   Кога игралиште се подобрува, стари вредности одат во history[] ПРЕД да ги промениш.
//   history: [{ date, condition, cleanliness, note }]

// ── РЕЈТИНГ ФОРМУЛА ────────────────────────────────────────────────────────
// Автоматски пресметан од податоците. Скала 1.0 – 5.0.
// Не е потребно рачно менување — се ажурира кога се менуваат полињата.
function computeRating(p) {
  if (!p.equipment || p.equipment.length === 0) {
    return { good: 4.0, ok: 3.0, poor: 2.0 }[p.condition];
  }
  const totalN = p.equipment.reduce((s, e) => s + e.n, 0);
  const funcN  = p.equipment.reduce((s, e) => s + (e.nf ?? e.n), 0);
  const wtdCond = p.equipment.reduce((s, e) => s + e.c * e.n, 0) / totalN;
  const funcRatio = funcN / totalN;

  // Base: weighted avg condition (0.6) + functional ratio scaled to 0-5 (0.4)
  let score = wtdCond * 0.6 + funcRatio * 5 * 0.4;

  // Safety issues penalty
  score -= Math.min(p.safety_issues.length * 0.3, 0.9);

  // Cleanliness
  score += { clean: 0.2, ok: 0, dirty: -0.4 }[p.cleanliness] ?? 0;

  // Amenities small bonus (benches, shade, lighting, water)
  const amenBonus = [p.benches >= 2, p.shade !== 'none', p.lighting, p.water_nearby]
    .filter(Boolean).length * 0.05;
  score += amenBonus;

  return Math.round(Math.max(1.0, Math.min(5.0, score)) * 10) / 10;
}

// ── ИГРАЛИШТА ──────────────────────────────────────────────────────────────
const playgrounds = [
  {
    id: 'mk-karpos-001',
    name: 'Кај ОУ Владо Тасевски',
    address: 'кај ОУ Владо Тасевски, Тафталиџе 1',
    neighborhood: 'Тафталиџе',
    lat: 41.9962, lon: 21.3969,

    condition: 'poor',
    cleanliness: 'clean',
    fenced: false,
    bikes_ok: false,

    safety_issues: [
      'Нишалки без седишта — 5 слободни метални рамки и синџири на висина на глава на дете',
    ],
    rating_reason: 'Слаба состојба: 5 од 8 нишалки немаат седишта — само метални конструкции без дрвени делови. Останатата опрема е стара и истрошена. Чакал подлога во умерена состојба.',

    road_proximity: 'safe',
    road_note: 'Далеку од улица, во средина на блок.',

    age_range: ['school'],
    size: 'medium',
    shade: 'partial',
    benches: 4,
    water_nearby: false,
    toilet_nearby: false,
    store_nearby: true,
    lighting: true,
    crowdedness: 'quiet',

    surface: { type: 'чакал', cond: 'warn', lbl: 'умерена состојба' },

    equipment: [
      { t: 'Нишалки', n: 8, nf: 3, c: 2 },
      { t: 'Кула со тобоган', n: 1, nf: 1, c: 2 },
    ],

    notes: 'Десната страна — сите 4 нишалки без седишта, само метални рамки. Лева страна — 3 нишалки функционални, 1 без седиште.',

    tender: null,
    assessed: '2026-05-17',

    photos: [
      'photos/vlado-tasevski/IMG_8197.jpg',
      'photos/vlado-tasevski/IMG_8198.jpg',
      'photos/vlado-tasevski/IMG_8199.jpg',
      'photos/vlado-tasevski/IMG_8200.jpg',
      'photos/vlado-tasevski/IMG_8201.jpg',
      'photos/vlado-tasevski/IMG_8202.jpg',
      'photos/vlado-tasevski/IMG_8203.jpg',
      'photos/vlado-tasevski/IMG_8204.jpg',
    ],

    history: [],
  },

  {
    id: 'mk-karpos-002',
    name: 'Парк спроти Веро',
    address: 'Тафталиџе 1 (до трговски центар Веро)',
    neighborhood: 'Тафталиџе',
    lat: 41.99576, lon: 21.40466,

    condition: 'ok',
    cleanliness: 'clean',
    fenced: false,
    bikes_ok: true,

    safety_issues: [
      'Рѓа на метални рамки и синџири кај нишалките — видлива корозија на повеќе места',
    ],
    rating_reason: 'Голем парк со две зони: класично игралиште и сообраќаен парк за деца. Опремата е стара и истрошена — дрвена конструкција со траги на рѓа на металните делови, 1 нишалка без седиште. Тодлерски нишалки во добра состојба. Одличен број клупи, многу сенка и осветлување.',

    road_proximity: 'moderate',
    road_note: 'Улица во непосредна близина, паркот е одделен со зеленило.',

    age_range: ['toddler', 'school'],
    size: 'large',
    shade: 'good',
    benches: 8,
    water_nearby: false,
    toilet_nearby: true,
    store_nearby: true,
    lighting: true,
    crowdedness: 'busy',

    surface: { type: 'чакал / трева', cond: 'warn', lbl: 'умерена состојба' },

    equipment: [
      { t: 'Нишалки (обични)', n: 4, nf: 3, c: 3 },
      { t: 'Нишалки (тодлерски)', n: 3, nf: 3, c: 3 },
      { t: 'Дрвена кула со тобоган', n: 1, nf: 1, c: 3 },
    ],

    notes: 'Бонус зона: Сообраќаен парк со асфалтна патека, сообраќајни знаци и маркирани ленти — идеален за велосипеди и тротинети. Тоалет во Веро, преку улица.',

    tender: null,
    assessed: '2026-05-17',

    photos: [
      'photos/park-sproti-vero/IMG_8207.jpg',
      'photos/park-sproti-vero/IMG_8208.jpg',
      'photos/park-sproti-vero/IMG_8209.jpg',
      'photos/park-sproti-vero/IMG_8210.jpg',
      'photos/park-sproti-vero/IMG_8211.jpg',
      'photos/park-sproti-vero/IMG_8212.jpg',
      'photos/park-sproti-vero/IMG_8213.jpg',
      'photos/park-sproti-vero/IMG_8214.jpg',
      'photos/park-sproti-vero/IMG_8215.jpg',
      'photos/park-sproti-vero/IMG_8216.jpg',
      'photos/park-sproti-vero/IMG_8217.jpg',
    ],

    history: [],
  },

  {
    id: 'mk-karpos-003',
    name: 'Кај Пожарната',
    address: 'кај Пожарница, Тафталиџе',
    neighborhood: 'Тафталиџе',
    lat: 41.99636, lon: 21.40631,

    condition: 'good',
    cleanliness: 'clean',
    fenced: true,
    bikes_ok: false,

    safety_issues: [],
    rating_reason: 'Добро одржано игралиште со гумирана подлога и разновидна шарена опрема — кула со тобоган, тодлерски нишалки, лулашка, пружинасти јавачи и јаже пирамида. Нема безбедносни проблеми. Оградено со метална решетка кон улицата.',

    road_proximity: 'moderate',
    road_note: 'Улица во непосредна близина, но игралиштето е оградено со метална решетка.',

    age_range: ['toddler', 'school'],
    size: 'medium',
    shade: 'partial',
    benches: 5,
    water_nearby: false,
    toilet_nearby: false,
    store_nearby: true,
    lighting: true,
    crowdedness: 'busy',

    surface: { type: 'гумирана подлога', cond: 'good', lbl: 'добра' },

    equipment: [
      { t: 'Кула со тобоган и тунел', n: 1, nf: 1, c: 4 },
      { t: 'Нишалки (тодлерски)', n: 4, nf: 4, c: 4 },
      { t: 'Лулашка', n: 1, nf: 1, c: 3 },
      { t: 'Пружинасти јавачи', n: 2, nf: 2, c: 3 },
      { t: 'Јаже пирамида', n: 1, nf: 1, c: 3 },
      { t: 'Рамнотежни греди', n: 1, nf: 1, c: 3 },
    ],

    notes: 'Оградено со зелена метална решетка. Разновидна опрема погодна и за мали деца. Многу посетено.',

    tender: null,
    assessed: '2026-05-17',

    photos: [
      'photos/kaj-pozarnata/IMG_8218.jpg',
      'photos/kaj-pozarnata/IMG_8219.jpg',
      'photos/kaj-pozarnata/IMG_8220.jpg',
      'photos/kaj-pozarnata/IMG_8221.jpg',
      'photos/kaj-pozarnata/IMG_8222.jpg',
      'photos/kaj-pozarnata/IMG_8223.jpg',
      'photos/kaj-pozarnata/IMG_8224.jpg',
    ],

    history: [],
  },

  {
    id: 'mk-karpos-004',
    name: 'Спроти Дабов',
    address: 'Тафталиџе 1 (спроти Дабов)',
    neighborhood: 'Тафталиџе',
    lat: 41.99737, lon: 21.40582,

    condition: 'ok',
    cleanliness: 'ok',
    fenced: true,
    bikes_ok: false,

    safety_issues: [
      'Скршена ограда со слободни метални жици — ризик за убоди и кора',
      'Јаже пирамида делумно срушена — жичани јажиња на земја, ризик за сплеткување',
    ],
    rating_reason: 'Игралиште со разновидна опрема — шарена замок-структура во добра состојба, тодлерски нишалки, помала кула и ротирачки диск. Ограда присутна но скршена со слободни жици — самата ограда е безбедносен проблем. Јаже пирамида делумно срушена.',

    road_proximity: 'moderate',
    road_note: 'Sporо-возечка улица во близина, паркинг меѓу игралиштето и улицата.',

    age_range: ['toddler', 'school'],
    size: 'medium',
    shade: 'partial',
    benches: 3,
    water_nearby: false,
    toilet_nearby: false,
    store_nearby: true,
    lighting: true,
    crowdedness: 'quiet',

    surface: { type: 'чакал / трева', cond: 'warn', lbl: 'умерена состојба' },

    equipment: [
      { t: 'Кула со тобоган (модуларна)', n: 1, nf: 1, c: 4 },
      { t: 'Помала кула со тобоган', n: 1, nf: 1, c: 3 },
      { t: 'Јаже пирамида', n: 1, nf: 1, c: 2 },
      { t: 'Нишалки (тодлерски)', n: 4, nf: 4, c: 3 },
      { t: 'Пружинаст јавач (ротирачки диск)', n: 1, nf: 1, c: 3 },
    ],

    notes: 'Оградата е присутна но скршена — слободни метални жици претставуваат самостоен ризик. Јаже пирамидата стои но долните јажиња се на земја.',

    tender: null,
    assessed: '2026-05-17',

    photos: [
      'photos/sproti-dabov/IMG_8225.jpg',
      'photos/sproti-dabov/IMG_8226.jpg',
      'photos/sproti-dabov/IMG_8227.jpg',
      'photos/sproti-dabov/IMG_8228.jpg',
      'photos/sproti-dabov/IMG_8229.jpg',
      'photos/sproti-dabov/IMG_8230.jpg',
      'photos/sproti-dabov/IMG_8231.jpg',
      'photos/sproti-dabov/IMG_8232.jpg',
      'photos/sproti-dabov/IMG_8233.jpg',
    ],

    history: [],
  },

  {
    id: 'mk-karpos-005',
    name: 'На Млечен',
    address: 'Млечен, Карпош',
    neighborhood: 'Млечен',
    lat: 41.99709, lon: 21.40952,

    condition: 'poor',
    cleanliness: 'ok',
    fenced: false,
    bikes_ok: true,

    safety_issues: [
      'Сите 6 нишалки без функционални седишта — голи метални рамки и синџири',
    ],
    rating_reason: 'Голема и разновидна структура со три тобогана и катерачки елементи во прифатлива состојба — но сите 6 нишалки се нефункционални (само метални рамки без седишта). Гумирана подлога со видливи оштетувања и празнини меѓу плочите. Одлична сенка, осветлување и вода во близина.',

    road_proximity: 'safe',
    road_note: 'Далеку од улица — паркинг простор меѓу игралиштето и улицата.',

    age_range: ['toddler', 'school'],
    size: 'large',
    shade: 'good',
    benches: 4,
    water_nearby: true,
    toilet_nearby: false,
    store_nearby: true,
    lighting: true,
    crowdedness: 'moderate',

    surface: { type: 'гумирана подлога', cond: 'warn', lbl: 'оштетена — празнини меѓу плочите' },

    equipment: [
      { t: 'Голема модуларна структура (3 тобогани)', n: 1, nf: 1, c: 4 },
      { t: 'Нишалки', n: 6, nf: 0, c: 2 },
      { t: 'Лулашка', n: 1, nf: 1, c: 3 },
      { t: 'Хоризонтална лества (monkey bars)', n: 1, nf: 1, c: 3 },
    ],

    notes: 'Игралиштето е погодно за велосипеди и тротинети. Нишалките се целосно нефункционални — без седишта. Тоалети во блиски кафулиња.',

    tender: null,
    assessed: '2026-05-17',

    photos: [
      'photos/mlecen/IMG_8234.jpg',
      'photos/mlecen/IMG_8235.jpg',
      'photos/mlecen/IMG_8236.jpg',
      'photos/mlecen/IMG_8237.jpg',
      'photos/mlecen/IMG_8238.jpg',
      'photos/mlecen/IMG_8239.jpg',
      'photos/mlecen/IMG_8240.jpg',
      'photos/mlecen/IMG_8241.jpg',
      'photos/mlecen/IMG_8242.jpg',
    ],

    history: [],
  },

  {
    id: 'mk-karpos-006',
    name: 'Во ОУ Лазо Трповски',
    address: 'кај ОУ Лазо Трповски, Карпош 3',
    neighborhood: 'Карпош 3',
    lat: 42.00646, lon: 21.39895,

    condition: 'good',
    cleanliness: 'clean',
    fenced: false,
    bikes_ok: true,

    safety_issues: [],
    rating_reason: 'Скоро префарбано и репарирано игралиште во солидна состојба. Нишалките и структурата се функционални, нема безбедносни проблеми. Новододаден зелен тобоган. Ниска оценка единствено поради скромниот број реквизити — инаку одржувањето е на ниво. Одлична зелена ливада за трчање.',

    road_proximity: 'safe',
    road_note: 'Во средина на блок, далеку од улица.',

    age_range: ['toddler', 'school'],
    size: 'medium',
    shade: 'partial',
    benches: 4,
    water_nearby: false,
    toilet_nearby: false,
    store_nearby: true,
    lighting: true,
    crowdedness: 'quiet',

    surface: { type: 'чакал / трева', cond: 'good', lbl: 'добра' },

    equipment: [
      { t: 'Кула со тобоган (стара + нов зелен)', n: 1, nf: 1, c: 3 },
      { t: 'Нишалки (црвена рамка)', n: 3, nf: 2, c: 3 },
      { t: 'Нишалки (бела рамка)', n: 3, nf: 3, c: 3 },
      { t: 'Пружинаст јавач', n: 1, nf: 1, c: 3 },
    ],

    notes: 'Одлична отворена ливада за трчање и игра покрај игралиштето. Скоро реновирано — добар пример за одржување.',

    tender: null,
    assessed: '2026-05-17',

    photos: [
      'photos/lazo-trpovski/IMG_8243.jpg',
      'photos/lazo-trpovski/IMG_8244.jpg',
      'photos/lazo-trpovski/IMG_8245.jpg',
      'photos/lazo-trpovski/IMG_8246.jpg',
      'photos/lazo-trpovski/IMG_8247.jpg',
    ],

    history: [],
  },

  {
    id: 'mk-karpos-007',
    name: 'Кај Руските во Карпош 3',
    address: 'Карпош 3 (кај Руските)',
    neighborhood: 'Карпош 3',
    lat: 42.00677, lon: 21.39601,

    condition: 'poor',
    cleanliness: 'ok',
    fenced: true,
    bikes_ok: false,

    safety_issues: [
      'Скршена ограда со слободни метални жици — ризик за убоди и кора',
    ],
    rating_reason: 'Речиси сè е скршено — само лизгалките се во прифатлива состојба. Од 6 нишалки само 2 се функционални, лулашката е целосно скршена, оградата е скршена со слободни жици. Нема осветлување, нема продавница, нема вода. Слабо посетено.',

    road_proximity: 'moderate',
    road_note: 'Паркинг во близина, улицата не е директно опасна.',

    age_range: ['school'],
    size: 'medium',
    shade: 'partial',
    benches: 2,
    water_nearby: false,
    toilet_nearby: false,
    store_nearby: false,
    lighting: false,
    crowdedness: 'quiet',

    surface: { type: 'чакал / трева', cond: 'warn', lbl: 'умерена состојба' },

    equipment: [
      { t: 'Структура со 4 тобогани', n: 3, nf: 3, c: 3 },
      { t: 'Нишалки', n: 6, nf: 2, c: 2 },
      { t: 'Лулашка', n: 1, nf: 0, c: 1 },
      { t: 'Катерачка рамка', n: 1, nf: 1, c: 2 },
    ],

    notes: 'Едно од најлошо одржуваните игралишта во посетата. Ниска посетеност веројатно поради лошата состојба. Нема никаква инфраструктура во близина.',

    tender: null,
    assessed: '2026-05-17',

    photos: [
      'photos/karpos-3-kaj-ruskite/IMG_8248.jpg',
      'photos/karpos-3-kaj-ruskite/IMG_8249.jpg',
      'photos/karpos-3-kaj-ruskite/IMG_8250.jpg',
      'photos/karpos-3-kaj-ruskite/IMG_8251.jpg',
      'photos/karpos-3-kaj-ruskite/IMG_8252.jpg',
      'photos/karpos-3-kaj-ruskite/IMG_8253.jpg',
      'photos/karpos-3-kaj-ruskite/IMG_8254.jpg',
      'photos/karpos-3-kaj-ruskite/IMG_8255.jpg',
      'photos/karpos-3-kaj-ruskite/IMG_8256.jpg',
      'photos/karpos-3-kaj-ruskite/IMG_8257.jpg',
    ],

    history: [],
  },

  {
    id: 'mk-karpos-008',
    name: 'Фонтанче во Карпош 3',
    address: 'Фонтанче, Карпош 3',
    neighborhood: 'Карпош 3',
    lat: 42.00519, lon: 21.39529,

    condition: 'poor',
    cleanliness: 'ok',
    fenced: false,
    bikes_ok: true,

    safety_issues: [
      'Основата на спиралниот тобоган тешко корозирана — анкерните точки структурно компромитирани, ризик од колапс',
      'Паднат метален елемент (лулашка/рамнотежна греда) лежи на гумена подлога — ризик за сплеткување и падови',
      'Металните нишалки со тешка корозија — голи рамки без седишта, рѓавени остри ивици',
    ],
    rating_reason: 'Катастрофална состојба на опремата — сè е во опасна и нефункционална состојба: тобоганот е структурно компромитиран, лулашка е паднала, нишалките се без седишта со рѓа. Ниту еден реквизит не е безбеден за користење. Единствена вредност: одлична локација во зелена средина со сенка, вода, клупи и осветлување.',

    road_proximity: 'safe',
    road_note: 'Во длабочина на паркот, далеку од улица.',

    age_range: ['toddler', 'school'],
    size: 'medium',
    shade: 'good',
    benches: 4,
    water_nearby: true,
    toilet_nearby: false,
    store_nearby: true,
    lighting: true,
    crowdedness: 'busy',

    surface: { type: 'гумирана подлога', cond: 'warn', lbl: 'умерена состојба' },

    equipment: [
      { t: 'Спирален тобоган со кула', n: 1, nf: 1, c: 1 },
      { t: 'Нишалки (дрвени седишта)', n: 4, nf: 4, c: 1 },
      { t: 'Нишалки (метална рамка)', n: 2, nf: 2, c: 1 },
      { t: 'Лулашка / рамнотежен елемент', n: 1, nf: 1, c: 1 },
    ],

    notes: 'Одлична локација во зеленило — одлично за возење велосипед и тротинет. Опремата е опасна и не смее да се користи додека не се замени. Итна интервенција потребна.',

    tender: null,
    assessed: '2026-05-17',

    photos: [
      'photos/fontance-karpos-3/IMG_8258.jpg',
      'photos/fontance-karpos-3/IMG_8259.jpg',
      'photos/fontance-karpos-3/IMG_8260.jpg',
      'photos/fontance-karpos-3/IMG_8261.jpg',
      'photos/fontance-karpos-3/IMG_8262.jpg',
      'photos/fontance-karpos-3/IMG_8263.jpg',
      'photos/fontance-karpos-3/IMG_8264.jpg',
      'photos/fontance-karpos-3/IMG_8265.jpg',
    ],

    history: [],
  },

  {
    id: 'mk-karpos-009',
    name: 'Кај Црвената',
    address: 'Карпош 3 (кај Црвената)',
    neighborhood: 'Карпош 3',
    lat: 42.00380, lon: 21.39439,

    condition: 'poor',
    cleanliness: 'ok',
    fenced: true,
    bikes_ok: false,

    safety_issues: [
      'Сина лизгалка скршена со остри раскинати рабови на дното — ризик за посекотини',
      'Покривот на дрвената кула свиткан и откачен — ризик за пад врз деца',
      'Скршена нишалка со рѓосани синџири — нестабилна, ризик за нагло паѓање',
    ],
    rating_reason: 'Мало катастрофално одржувано игралиште: сина лизгалка со скршени остри рабови, покрив на кулата полу-откачен и вода, нишалките со тешка рѓа — само 1 од 2 е некако употреблива. Нема гужва, ограда ја штити од улицата.',

    road_proximity: 'safe',
    road_note: 'Оградено со зелена метална мрежа, улицата е далеку.',

    age_range: ['toddler', 'school'],
    size: 'small',
    shade: 'partial',
    benches: 1,
    water_nearby: false,
    toilet_nearby: false,
    store_nearby: false,
    lighting: true,
    crowdedness: 'quiet',

    surface: { type: 'трева / чакал', cond: 'warn', lbl: 'умерена состојба' },

    equipment: [
      { t: 'Дрвена кула со тобогани (плава + розева)', n: 1, nf: 1, c: 1 },
      { t: 'Нишалки', n: 2, nf: 1, c: 2 },
    ],

    notes: 'Многу мало игралиште, слабо посетено. Плавата лизгалка е опасна — скршена пластика со остри рабови. Покривот на кулата е делумно откачен.',

    tender: null,
    assessed: '2026-05-17',

    photos: [
      'photos/kaj-crvenata/IMG_8266.jpg',
      'photos/kaj-crvenata/IMG_8267.jpg',
      'photos/kaj-crvenata/IMG_8268.jpg',
      'photos/kaj-crvenata/IMG_8269.jpg',
      'photos/kaj-crvenata/IMG_8270.jpg',
      'photos/kaj-crvenata/IMG_8271.jpg',
    ],

    history: [],
  },

  {
    id: 'mk-karpos-010',
    name: 'Пред City Mall',
    address: 'City Mall, Карпош 3',
    neighborhood: 'Карпош 3',
    lat: 42.00408, lon: 21.39067,

    condition: 'good',
    cleanliness: 'clean',
    fenced: false,
    bikes_ok: true,

    safety_issues: [],
    rating_reason: 'Премиум дизајнерско игралиште — единствена опрема во градот: нерѓосувачки зајак со тобоган, масивна жолта решеткаста кула со тубален тобоган, јаже-лак комплекс, ротирачки елементи и гнездо-нишалка. Сè е во одлична состојба, гумена подлога, одлично одржувано. Погодно за постари деца; ограничено за тодлери.',

    road_proximity: 'safe',
    road_note: 'Поставено длабоко во отворената пјаца на молот, улицата е далеку со повеќе пешачки бариери.',

    age_range: ['school'],
    size: 'large',
    shade: 'partial',
    benches: 8,
    water_nearby: true,
    toilet_nearby: true,
    store_nearby: true,
    lighting: true,
    crowdedness: 'busy',

    surface: { type: 'гумирана подлога', cond: 'good', lbl: 'одлична' },

    equipment: [
      { t: 'Нерѓосувачки зајак со тобоган', n: 1, nf: 1, c: 5 },
      { t: 'Жолта решеткаста кула со тубален тобоган', n: 1, nf: 1, c: 4 },
      { t: 'Жолт лачен јаже-комплекс', n: 1, nf: 1, c: 4 },
      { t: 'Ротирачка платформа (уфо-дизајн)', n: 1, nf: 1, c: 4 },
      { t: 'Гнездо-нишалка', n: 1, nf: 1, c: 4 },
      { t: 'Ротирачки дискови', n: 1, nf: 1, c: 4 },
    ],

    notes: 'Дел од City Mall надворешниот простор. Дизајниран со уметнички инсталации и дизајнерски клупи. Тоалети и вода во молот. Голема гужва — особено викенди.',

    tender: null,
    assessed: '2026-05-17',

    photos: [
      'photos/city-mall/IMG_8279.jpg',
      'photos/city-mall/IMG_8272.jpg',
      'photos/city-mall/IMG_8273.jpg',
      'photos/city-mall/IMG_8274.jpg',
      'photos/city-mall/IMG_8275.jpg',
      'photos/city-mall/IMG_8276.jpg',
      'photos/city-mall/IMG_8277.jpg',
      'photos/city-mall/IMG_8278.jpg',
    ],

    history: [],
  },

  {
    id: 'mk-karpos-011',
    name: 'Спроти Олимпико',
    address: 'Олимпико, Карпош',
    neighborhood: 'Олимпико',
    lat: 41.99797, lon: 21.39084,

    condition: 'good',
    cleanliness: 'clean',
    fenced: true,
    bikes_ok: true,

    safety_issues: [],
    rating_reason: 'Едно од најголемите игралишта во Карпош, целосно реновирано во мај 2026 — сите 10 нишалки, 2 клацкалки и повеќе структури со тобогани се префарбани и репарирани. Пространо, со фонтана, одлично осветлување, многу клупи и огромен простор за возење. Мала забелешка: елементите се постар тип — но одржувањето е примерно.',

    road_proximity: 'moderate',
    road_note: 'Улица/булевар релативно близу, но игралиштето е оградено.',

    age_range: ['toddler', 'school'],
    size: 'large',
    shade: 'good',
    benches: 10,
    water_nearby: true,
    toilet_nearby: false,
    store_nearby: true,
    lighting: true,
    crowdedness: 'busy',

    surface: { type: 'чакал / песок', cond: 'good', lbl: 'добра' },

    equipment: [
      { t: 'Нишалки', n: 10, nf: 10, c: 4 },
      { t: 'Клацкалки', n: 2, nf: 2, c: 4 },
      { t: 'Кула со сини тобогани (×2)', n: 1, nf: 1, c: 3 },
      { t: 'Тодлерска структура (зелени тобогани)', n: 1, nf: 1, c: 3 },
      { t: 'Структура со спирален тобоган', n: 1, nf: 1, c: 3 },
      { t: 'Дрвена надземна платформа со тобоган', n: 1, nf: 1, c: 3 },
    ],

    notes: 'Реновирано во мај 2026 — прва посета непосредно по реновирањето. Огромен простор за возење велосипед и тротинет. Фонтана на локацијата. Кафуле и продавница непосредно во близина.',

    tender: null,
    assessed: '2026-05-17',

    photos: [
      'photos/city-mall/IMG_8280.jpg',
      'photos/olimpiko/IMG_8281.jpg',
      'photos/olimpiko/IMG_8282.jpg',
      'photos/olimpiko/IMG_8283.jpg',
      'photos/olimpiko/IMG_8284.jpg',
      'photos/olimpiko/IMG_8285.jpg',
      'photos/olimpiko/IMG_8286.jpg',
      'photos/olimpiko/IMG_8287.jpg',
      'photos/olimpiko/IMG_8288.jpg',
      'photos/olimpiko/IMG_8289.jpg',
      'photos/olimpiko/IMG_8290.jpg',
      'photos/olimpiko/IMG_8291.jpg',
      'photos/olimpiko/IMG_8292.jpg',
    ],

    history: [],
  },
];

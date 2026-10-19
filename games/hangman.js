/* Виселица на двоих — против компьютера и дуэль на одном устройстве. Языки: ru, ky, en. */
(function () {
  "use strict";
  var MAX_WRONG = 7;

  var LANGS = {
    ru: {
      alphabet: "абвгдежзийклмнопрстуфхцчшщъыьэюя", cols: 8,
      keep: /[^а-я]/g, inputStrip: /[^а-яА-ЯёЁ]/g,
      words: {
        "Животное": ["слон","жираф","крокодил","пингвин","бегемот","медведь","обезьяна","попугай","черепаха","дельфин","кенгуру","барсук","страус","хамелеон"],
        "Еда": ["пельмени","борщ","сметана","шоколад","блины","макароны","мороженое","сосиска","арбуз","картошка","пирожок","сырники","лагман","самса","плов","манты","бешбармак"],
        "Природа": ["радуга","водопад","ураган","пустыня","вулкан","болото","туман","гроза","океан","береза","ледник","метель","родник","пещера"],
        "Предмет": ["чайник","будильник","зонтик","рюкзак","ножницы","холодильник","телескоп","гитара","фонарик","чемодан","микроскоп","расческа","утюг","календарь"],
        "Профессия": ["пожарный","учитель","космонавт","программист","художник","повар","водитель","архитектор","кондитер","пилот","врач","шахтер","сантехник","режиссер"],
        "Город или страна": ["париж","япония","египет","норвегия","лондон","самарканд","ташкент","токио","италия","мексика","алматы","стамбул","бразилия","монголия"],
        "Спорт и игры": ["футбол","шахматы","баскетбол","волейбол","бильярд","теннис","шашки","биатлон","скейтборд","гимнастика","карате","хоккей"],
        "Наука и космос": ["галактика","планета","комета","магнит","электричество","молекула","гравитация","спутник","атмосфера","лаборатория","созвездие","астероид"]
      },
      t: {
        title: "Виселица", tagMenu: "на двоих · у каждого своё слово", tagCpu: "против компьютера", tagDuel: "дуэль на одном устройстве",
        menu: "Меню", cpuH: "Против компьютера",
        cpuP: "Компьютер загадывает слово из восьми категорий и даёт подсказку. Отгадай раньше, чем нарисуют человечка.",
        stats: function (w, l, s) { return "Побед: <b>" + w + "</b> · поражений: <b>" + l + "</b> · серия: <b>" + s + "</b>"; },
        play: "Играть", duelH: "Дуэль вдвоём",
        duelP: "Каждый загадывает слово сопернику. Ходите по очереди: угадал букву — ходишь ещё, ошибся — ход переходит.",
        duelBtn: "Начать дуэль", rulesH: "Правила",
        rules: ["Открывай слово по буквам: нажимай на клавиатуру на экране или печатай буквы.", "За каждую ошибку к виселице добавляется часть человечка. На седьмой ошибке игрок проигрывает.", "В дуэли побеждает тот, кто первым отгадал своё слово."],
        namesH: "Кто играет?", p1: "Первый игрок", p2: "Второй игрок", next: "Дальше", defNames: ["Игрок 1", "Игрок 2"],
        setupH: function (setter, who) { return setter + ", загадай слово для " + who; },
        setupP: function (who) { return who + ", не подглядывай. Буквы скрыты точками."; },
        wordLabel: "Слово (3–16 букв)", wordPh: "Например, самолёт", hintLabel: "Подсказка (необязательно)", hintPh: "Например, транспорт",
        setBtn: "Загадать", randBtn: "Случайное слово", errLen: "Слово должно быть от 3 до 16 русских букв.",
        passTop: "Передайте устройство", ready: "Я готов",
        passSetter: function (s) { return s + " загадывает слово"; },
        away1: function (w) { return w + ", отвернитесь от экрана."; },
        away2: function (w) { return w + ", теперь ваша очередь отвернуться."; },
        starts: function (n) { return "Начинает " + n; },
        playText: "Слова загаданы. Угадал букву — ходишь ещё. Ошибся — ход переходит сопернику.",
        kbd: "Буквы", letter: function (c) { return "Буква " + c; }, hint: "Подсказка: ",
        opened: function (a, b) { return "Открыто " + a + " из " + b; }, wordAria: function (n) { return "Слово из " + n + " букв"; },
        you: "Ты", cpuWord: "слово компьютера", turn: function (n) { return "Ходит <b>" + n + "</b>"; },
        againCpu: "Ещё слово", againDuel: "Реванш",
        win: "Победа!", winSub: function (w, m, s) { return "Слово «" + w + "» отгадано. Ошибок: " + m + ". Серия побед: " + s + "."; },
        lose: "Поражение", loseSub: function (w) { return "Было загадано слово «" + w + "»."; },
        duelWin: function (n) { return "Победил(а) " + n; },
        duelWinSub: function (w, o) { return "Слово «" + w + "» отгадано первым. Слово соперника было «" + o + "»."; },
        hangedSub: function (n, w) { return n + " повешен. Его слово было «" + w + "»."; },
        missToast: function (n) { return "Мимо. Ходит " + n; },
        gallows: function (w, m) { return "Виселица, ошибок " + w + " из " + m; }, wrongAria: "Ошибочные буквы"
      }
    },
    ky: {
      alphabet: "абвгдежзийклмнңоөпрстуүфхцчшщъыьэюя", cols: 9,
      keep: /[^а-яңөү]/g, inputStrip: /[^а-яА-ЯёЁңҢөӨүҮ]/g,
      words: {
        "Жаныбар": ["жылкы","төө","аюу","карышкыр","түлкү","коён","бүркүт","жолборс","маймыл","мышык","эчки","кирпи","бугу","пил"],
        "Тамак-аш": ["боорсок","бешбармак","манты","самса","лагман","кымыз","айран","чучук","куурдак","шорпо","палоо","каймак","токоч","жарма"],
        "Жаратылыш": ["тоо","көл","дарыя","токой","булут","жамгыр","шамал","булак","мөңгү","асман","талаа","капчыгай","шаркыратма"],
        "Буюм": ["китеп","калем","дептер","терезе","эшик","үстөл","отургуч","ачкыч","чөйчөк","кашык","бычак","саат","кайчы","чайнек"],
        "Кесип": ["мугалим","дарыгер","айдоочу","ашпозчу","сүрөтчү","куруучу","учкуч","сатуучу","дыйкан","малчы","программист","журналист"],
        "Шаар же өлкө": ["бишкек","каракол","нарын","талас","баткен","токмок","казакстан","кытай","түркия","япония","германия","египет","италия"],
        "Спорт жана оюн": ["футбол","шахмат","күрөш","улак","бокс","теннис","волейбол","баскетбол","хоккей","дзюдо","тогузкоргоол"],
        "Илим жана космос": ["планета","галактика","комета","магнит","молекула","спутник","атмосфера","лаборатория","телескоп","ракета","космонавт","астероид"]
      },
      t: {
        title: "Дарга асуу", tagMenu: "экөө үчүн · ар кимдин өз сөзү", tagCpu: "компьютерге каршы", tagDuel: "бир түзмөктө дуэль",
        menu: "Меню", cpuH: "Компьютерге каршы",
        cpuP: "Компьютер сегиз категориядан сөз ойлойт жана кыйытма берет. Адамча толук тартылганга чейин сөздү тап.",
        stats: function (w, l, s) { return "Жеңиш: <b>" + w + "</b> · жеңилүү: <b>" + l + "</b> · катар: <b>" + s + "</b>"; },
        play: "Ойноо", duelH: "Экөөлөп дуэль",
        duelP: "Ар ким атаандашына сөз ойлойт. Кезек менен жүрөсүңөр: тамганы тапсаң, дагы жүрөсүң, жаңылсаң, кезек атаандашка өтөт.",
        duelBtn: "Дуэлди баштоо", rulesH: "Эрежелер",
        rules: ["Сөздү тамга-тамгасы менен ач: экрандагы баскычтарды бас же клавиатурадан жаз.", "Ар бир катага адамчанын бир бөлүгү тартылат. Жетинчи катада оюнчу утулат.", "Дуэлде өз сөзүн биринчи тапкан оюнчу жеңет."],
        namesH: "Ким ойнойт?", p1: "Биринчи оюнчу", p2: "Экинчи оюнчу", next: "Улантуу", defNames: ["1-оюнчу", "2-оюнчу"],
        setupH: function (setter, who) { return setter + ", " + who + " үчүн сөз ойло"; },
        setupP: function (who) { return who + ", карабаңыз. Тамгалар чекит менен жашырылган."; },
        wordLabel: "Сөз (3–16 тамга)", wordPh: "Мисалы, учак", hintLabel: "Кыйытма (милдеттүү эмес)", hintPh: "Мисалы, транспорт",
        setBtn: "Ойлодум", randBtn: "Кокус сөз", errLen: "Сөз 3төн 16 тамгага чейин болушу керек.",
        passTop: "Түзмөктү бериңиз", ready: "Даярмын",
        passSetter: function (s) { return s + " сөз ойлоп жатат"; },
        away1: function (w) { return w + ", экранды карабаңыз."; },
        away2: function (w) { return w + ", эми сиз карабаңыз."; },
        starts: function (n) { return n + " баштайт"; },
        playText: "Сөздөр ойлонду. Тамганы тапсаң, дагы жүрөсүң. Жаңылсаң, кезек атаандашка өтөт.",
        kbd: "Тамгалар", letter: function (c) { return c + " тамгасы"; }, hint: "Кыйытма: ",
        opened: function (a, b) { return b + " тамгадан " + a + " ачылды"; }, wordAria: function (n) { return n + " тамгалуу сөз"; },
        you: "Сен", cpuWord: "компьютердин сөзү", turn: function (n) { return "Кезек: <b>" + n + "</b>"; },
        againCpu: "Дагы бир сөз", againDuel: "Реванш",
        win: "Жеңиш!", winSub: function (w, m, s) { return "«" + w + "» сөзү табылды. Ката: " + m + ". Жеңиш катары: " + s + "."; },
        lose: "Жеңилүү", loseSub: function (w) { return "Ойлонгон сөз: «" + w + "»."; },
        duelWin: function (n) { return n + " жеңди"; },
        duelWinSub: function (w, o) { return "«" + w + "» сөзү биринчи табылды. Атаандаштын сөзү «" + o + "» болчу."; },
        hangedSub: function (n, w) { return n + " утулду. Анын сөзү «" + w + "» болчу."; },
        missToast: function (n) { return "Туура эмес. Кезек: " + n; },
        gallows: function (w, m) { return "Дар, ката " + w + "/" + m; }, wrongAria: "Туура эмес тамгалар"
      }
    },
    en: {
      alphabet: "abcdefghijklmnopqrstuvwxyz", cols: 9,
      keep: /[^a-z]/g, inputStrip: /[^a-zA-Z]/g,
      words: {
        "Animal": ["elephant","giraffe","crocodile","penguin","dolphin","kangaroo","squirrel","octopus","butterfly","tiger","rabbit","turtle","zebra"],
        "Food": ["pancake","chocolate","sandwich","noodles","cheese","pizza","banana","popcorn","cookie","burger","yogurt","avocado"],
        "Nature": ["rainbow","waterfall","volcano","desert","glacier","thunder","island","forest","canyon","meadow","river","ocean"],
        "Object": ["umbrella","backpack","scissors","telescope","guitar","lantern","suitcase","microscope","keyboard","pillow","candle","ladder"],
        "Job": ["firefighter","teacher","astronaut","programmer","artist","chef","pilot","doctor","architect","plumber","farmer","journalist"],
        "City or country": ["paris","japan","egypt","norway","london","tashkent","tokyo","italy","mexico","almaty","istanbul","brazil","bishkek"],
        "Sports and games": ["football","chess","basketball","volleyball","tennis","hockey","karate","boxing","cycling","skiing"],
        "Science and space": ["galaxy","planet","comet","magnet","molecule","gravity","satellite","atmosphere","asteroid","rocket"]
      },
      t: {
        title: "Hangman", tagMenu: "for two · each has their own word", tagCpu: "against the computer", tagDuel: "duel on one device",
        menu: "Menu", cpuH: "Against the computer",
        cpuP: "The computer picks a word from eight categories and gives you a hint. Guess it before the stick figure is drawn.",
        stats: function (w, l, s) { return "Wins: <b>" + w + "</b> · losses: <b>" + l + "</b> · streak: <b>" + s + "</b>"; },
        play: "Play", duelH: "Duel for two",
        duelP: "Each player picks a word for the other. Take turns: guess a letter right and you go again, miss and the turn passes.",
        duelBtn: "Start duel", rulesH: "Rules",
        rules: ["Reveal the word letter by letter: tap the on-screen keys or type on your keyboard.", "Every miss adds a part of the figure to the gallows. On the seventh miss the player loses.", "In a duel, whoever guesses their word first wins."],
        namesH: "Who is playing?", p1: "Player one", p2: "Player two", next: "Next", defNames: ["Player 1", "Player 2"],
        setupH: function (setter, who) { return setter + ", pick a word for " + who; },
        setupP: function (who) { return who + ", don't peek. The letters are hidden as dots."; },
        wordLabel: "Word (3–16 letters)", wordPh: "For example, airplane", hintLabel: "Hint (optional)", hintPh: "For example, transport",
        setBtn: "Lock in", randBtn: "Random word", errLen: "The word must be 3 to 16 English letters.",
        passTop: "Pass the device", ready: "I'm ready",
        passSetter: function (s) { return s + " is picking a word"; },
        away1: function (w) { return w + ", look away from the screen."; },
        away2: function (w) { return w + ", now it's your turn to look away."; },
        starts: function (n) { return n + " goes first"; },
        playText: "Both words are set. Guess a letter right and you go again. Miss and the turn passes.",
        kbd: "Letters", letter: function (c) { return "Letter " + c; }, hint: "Hint: ",
        opened: function (a, b) { return a + " of " + b + " revealed"; }, wordAria: function (n) { return n + "-letter word"; },
        you: "You", cpuWord: "computer's word", turn: function (n) { return "<b>" + n + "</b>'s turn"; },
        againCpu: "Next word", againDuel: "Rematch",
        win: "You win!", winSub: function (w, m, s) { return "You guessed “" + w + "”. Misses: " + m + ". Win streak: " + s + "."; },
        lose: "You lose", loseSub: function (w) { return "The word was “" + w + "”."; },
        duelWin: function (n) { return n + " wins"; },
        duelWinSub: function (w, o) { return "Guessed “" + w + "” first. The opponent's word was “" + o + "”."; },
        hangedSub: function (n, w) { return n + " was hanged. Their word was “" + w + "”."; },
        missToast: function (n) { return "Miss. " + n + "'s turn"; },
        gallows: function (w, m) { return "Gallows, " + w + " of " + m + " misses"; }, wrongAria: "Wrong letters"
      }
    }
  };

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function boardState(word, guesses) {
    var letters = {}, i;
    for (i = 0; i < word.length; i++) letters[word[i]] = true;
    var uniq = Object.keys(letters);
    var hits = guesses.filter(function (c) { return letters[c]; });
    var misses = guesses.filter(function (c) { return !letters[c]; });
    return { word: word, g: guesses, hits: hits, misses: misses, total: uniq.length,
      won: uniq.every(function (c) { return guesses.indexOf(c) >= 0; }), lost: misses.length >= MAX_WRONG };
  }
  function figSVG(wrong, grew, label) {
    var parts = [
      ["circle", 'cx="140" cy="70" r="18"'], ["path", 'd="M140 88 V152"'], ["path", 'd="M140 104 L116 132"'],
      ["path", 'd="M140 104 L164 132"'], ["path", 'd="M140 152 L122 194"'], ["path", 'd="M140 152 L158 194"']
    ];
    var shown = Math.min(wrong, 6), person = "";
    for (var i = 0; i < shown; i++) {
      var nw = grew && wrong <= 6 && i === shown - 1;
      person += "<" + parts[i][0] + ' class="p' + (nw ? " new" : "") + '" ' + parts[i][1] + ' pathLength="1"/>';
    }
    if (wrong >= 7) person += '<g class="face"><path d="M131 62 l7 7 M138 62 l-7 7 M142 62 l7 7 M149 62 l-7 7"/><path d="M134 80 H146"/></g>';
    else if (wrong >= 1) person += '<g class="face"><circle cx="134" cy="66" r="1.8"/><circle cx="146" cy="66" r="1.8"/><path d="M134 80 Q140 75 146 80"/></g>';
    return '<svg viewBox="0 0 180 240" role="img" aria-label="' + esc(label) + '">' +
      '<g class="gallows"><path d="M18 226 H132"/><path d="M52 226 V18"/><path d="M52 18 H140"/><path d="M52 56 L90 18"/><path d="M140 18 V52"/></g>' +
      '<g class="person' + (wrong >= 7 ? " dead" : "") + '">' + person + "</g></svg>";
  }

  function mount(root, opts) {
    opts = opts || {};
    var L = LANGS[opts.lang] || LANGS.ru, T = L.t;
    var ALPHABET = L.alphabet.split("");
    function norm(s) { return String(s || "").toLowerCase().replace(/ё/g, "е").replace(L.keep, ""); }
    function pickWord() {
      var cats = Object.keys(L.words), cat = cats[Math.floor(Math.random() * cats.length)], list = L.words[cat];
      return { word: list[Math.floor(Math.random() * list.length)], hint: cat };
    }
    root.classList.add("gm", "gm-hangman");
    root.setAttribute("lang", opts.lang || "ru");
    var st = { mode: null, phase: "menu", names: T.defNames.slice(), words: [null, null], g: [[], []], turn: 0, starter: 0, prevMiss: [0, 0], cpu: null, result: null };
    var SKEY = "hm_stats_" + (opts.lang || "ru");
    var stats = { w: 0, l: 0, streak: 0 };
    try { stats = JSON.parse(localStorage.getItem(SKEY)) || stats; } catch (e) {}
    function saveStats() { try { localStorage.setItem(SKEY, JSON.stringify(stats)); } catch (e) {} }
    var toastT;
    function toast(msg) {
      var t = root.querySelector(".hm-toast"); if (!t) return;
      t.textContent = msg; t.classList.add("on");
      clearTimeout(toastT); toastT = setTimeout(function () { t.classList.remove("on"); }, 2200);
    }
    function shell(inner) {
      return '<div class="hm-wrap"><header class="hm-top"><h2 class="hm-title">' + esc(T.title) + "</h2>" +
        '<p class="hm-tag">' + esc(st.mode === "duel" ? T.tagDuel : st.mode === "cpu" ? T.tagCpu : T.tagMenu) + "</p>" +
        (st.phase !== "menu" ? '<button type="button" class="hm-btn small" data-a="menu">' + esc(T.menu) + "</button>" : "") +
        "</header>" + inner + '<div class="hm-toast" role="status" aria-live="polite"></div></div>';
    }
    function render() {
      var h = st.phase === "menu" ? menuHtml() : st.phase === "names" ? namesHtml() : st.phase === "setup" ? setupHtml() : st.phase === "pass" ? passHtml() : playHtml();
      root.innerHTML = shell(h);
      var f = root.querySelector("[data-autofocus]");
      if (f) try { f.focus({ preventScroll: true }); } catch (e) {}
    }
    function menuHtml() {
      return '<div class="hm-two">' +
        '<div class="hm-card hm-stack"><h3>' + esc(T.cpuH) + '</h3><p class="hm-muted">' + esc(T.cpuP) + "</p>" +
        '<p class="hm-muted">' + T.stats(stats.w, stats.l, stats.streak) + "</p>" +
        '<div><button type="button" class="hm-btn primary" data-a="cpu">' + esc(T.play) + "</button></div></div>" +
        '<div class="hm-card hm-stack"><h3>' + esc(T.duelH) + '</h3><p class="hm-muted">' + esc(T.duelP) + "</p>" +
        '<div><button type="button" class="hm-btn" data-a="duel">' + esc(T.duelBtn) + "</button></div></div></div>" +
        '<div class="hm-card hm-rules"><h3>' + esc(T.rulesH) + "</h3><ol>" + T.rules.map(function (r) { return "<li>" + esc(r) + "</li>"; }).join("") + "</ol></div>";
    }
    function namesHtml() {
      return '<form class="hm-card hm-stack" data-form="names" autocomplete="off"><h3>' + esc(T.namesH) + "</h3>" +
        '<div class="hm-two"><div><label for="hm-n1">' + esc(T.p1) + '</label><input id="hm-n1" maxlength="16" value="' + esc(st.names[0]) + '" data-autofocus></div>' +
        '<div><label for="hm-n2">' + esc(T.p2) + '</label><input id="hm-n2" maxlength="16" value="' + esc(st.names[1]) + '"></div></div>' +
        '<div><button class="hm-btn primary" type="submit">' + esc(T.next) + "</button></div></form>";
    }
    function setupHtml() {
      var who = st.setupFor, setter = 1 - who;
      return '<form class="hm-card hm-stack" data-form="word" autocomplete="off">' +
        "<h3>" + esc(T.setupH(st.names[setter], st.names[who])) + "</h3>" +
        '<p class="hm-muted">' + esc(T.setupP(st.names[who])) + "</p>" +
        '<div><label for="hm-word">' + esc(T.wordLabel) + '</label><input id="hm-word" class="hm-secret" maxlength="16" autocapitalize="off" spellcheck="false" placeholder="' + esc(T.wordPh) + '" data-autofocus></div>' +
        '<div><label for="hm-hint">' + esc(T.hintLabel) + '</label><input id="hm-hint" maxlength="32" placeholder="' + esc(T.hintPh) + '"></div>' +
        '<div class="hm-row"><button class="hm-btn primary" type="submit">' + esc(T.setBtn) + '</button><button class="hm-btn" type="button" data-a="rand">' + esc(T.randBtn) + "</button></div>" +
        '<p class="hm-err" role="alert"></p></form>';
    }
    function passHtml() {
      return '<div class="hm-card hm-stack hm-center"><p class="hm-muted">' + esc(T.passTop) + '</p><h3 class="hm-big">' + esc(st.passTitle) + "</h3>" +
        '<p class="hm-muted">' + esc(st.passText) + '</p><div><button type="button" class="hm-btn primary" data-a="pass" data-autofocus>' + esc(T.ready) + "</button></div></div>";
    }
    function slotsHtml(b, reveal) {
      var s = "";
      for (var i = 0; i < b.word.length; i++) {
        var ch = b.word[i], open = b.g.indexOf(ch) >= 0;
        s += '<span class="hm-slot' + (!open && reveal ? " missed" : "") + '">' + (open || reveal ? esc(ch.toUpperCase()) : "") + "</span>";
      }
      return '<div class="hm-slots" aria-label="' + esc(T.wordAria(b.word.length)) + '">' + s + "</div>";
    }
    function pipsHtml(n) {
      var s = "";
      for (var k = 0; k < MAX_WRONG; k++) s += '<span class="hm-pip' + (k < n ? " on" : "") + '">' + (k < n ? "×" : "") + "</span>";
      return '<div class="hm-pips" aria-hidden="true">' + s + "</div>";
    }
    function kbdHtml(b, off) {
      return '<div class="hm-kbd" role="group" aria-label="' + esc(T.kbd) + '" style="grid-template-columns:repeat(' + L.cols + ',minmax(0,1fr))">' + ALPHABET.map(function (ch) {
        var hit = b.hits.indexOf(ch) >= 0, miss = b.misses.indexOf(ch) >= 0;
        return '<button type="button" class="hm-key' + (hit ? " hit" : "") + (miss ? " miss" : "") + '" data-ch="' + ch + '"' + (hit || miss || off ? " disabled" : "") + ' aria-label="' + esc(T.letter(ch.toUpperCase())) + '">' + ch + "</button>";
      }).join("") + "</div>";
    }
    function boardHtml(b, o) {
      return '<article class="hm-card hm-board' + (o.small ? " small" : "") + (o.active ? " active" : "") + '">' +
        '<div class="hm-bgrid"><div class="hm-fig">' + figSVG(b.misses.length, o.grew, T.gallows(b.misses.length, MAX_WRONG)) + "</div>" +
        '<div class="hm-side"><div class="hm-who">' + (o.label ? '<span class="role">' + esc(o.label) + "</span> · " : "") + esc(o.name) + "</div>" +
        (o.hint ? '<p class="hm-hint">' + esc(T.hint + o.hint) + "</p>" : "") +
        pipsHtml(b.misses.length) + '<p class="hm-wrong" aria-label="' + esc(T.wrongAria) + '">' + esc(b.misses.map(function (c) { return c.toUpperCase(); }).join(" ")) + "</p>" +
        '<p class="hm-prog">' + esc(T.opened(b.hits.length, b.total)) + "</p></div>" +
        slotsHtml(b, o.reveal) + (o.kbd ? kbdHtml(b, o.reveal) : "") + "</div></article>";
    }
    function bannerHtml() {
      var r = st.result;
      return '<div class="hm-card hm-banner" aria-live="polite"><div class="hm-grade">' + r.grade + '</div><div class="hm-btext"><h3>' + esc(r.title) + "</h3><p>" + esc(r.sub) + "</p>" +
        '<div class="hm-row"><button type="button" class="hm-btn primary" data-a="again" data-autofocus>' + esc(st.mode === "cpu" ? T.againCpu : T.againDuel) + "</button>" +
        '<button type="button" class="hm-btn" data-a="menu">' + esc(T.menu) + "</button></div></div></div>";
    }
    function playHtml() {
      var over = st.phase === "over";
      if (st.mode === "cpu") {
        var b = boardState(st.cpu.word, st.g[0]);
        var grew = b.misses.length > st.prevMiss[0]; st.prevMiss[0] = b.misses.length;
        return (over ? bannerHtml() : "") + '<div class="hm-arena single">' + boardHtml(b, { name: T.cpuWord, label: T.you, hint: st.cpu.hint, kbd: !over, reveal: over, grew: grew, active: true }) + "</div>";
      }
      var html = over ? bannerHtml() : '<p class="hm-turn">' + T.turn(esc(st.names[st.turn])) + "</p>";
      html += '<div class="hm-arena">';
      [st.turn, 1 - st.turn].forEach(function (i, pos) {
        var b = boardState(st.words[i].word, st.g[i]);
        var grew = b.misses.length > st.prevMiss[i]; st.prevMiss[i] = b.misses.length;
        html += boardHtml(b, { name: st.names[i], hint: st.words[i].hint, kbd: pos === 0 && !over, reveal: over, grew: grew, small: pos === 1, active: pos === 0 && !over });
      });
      return html + "</div>";
    }

    function startCpu() { st.mode = "cpu"; st.cpu = pickWord(); st.g = [[], []]; st.prevMiss = [0, 0]; st.result = null; st.phase = "play"; render(); }
    function startDuelSetup() {
      st.words = [null, null]; st.g = [[], []]; st.prevMiss = [0, 0]; st.result = null;
      st.setupFor = st.starter;
      st.passTitle = T.passSetter(st.names[1 - st.setupFor]);
      st.passText = T.away1(st.names[st.setupFor]);
      st.afterPass = "setup"; st.phase = "pass"; render();
    }
    function wordSet(word, hint) {
      st.words[st.setupFor] = { word: word, hint: hint };
      var other = 1 - st.setupFor;
      if (!st.words[other]) {
        st.setupFor = other;
        st.passTitle = T.passSetter(st.names[1 - other]);
        st.passText = T.away2(st.names[other]);
        st.afterPass = "setup";
      } else {
        st.turn = st.starter;
        st.passTitle = T.starts(st.names[st.turn]);
        st.passText = T.playText;
        st.afterPass = "play";
      }
      st.phase = "pass"; render();
    }
    function guess(ch) {
      if (st.phase !== "play") return;
      if (st.mode === "cpu") {
        if (st.g[0].indexOf(ch) >= 0) return;
        st.g[0].push(ch);
        var b = boardState(st.cpu.word, st.g[0]);
        if (b.won || b.lost) {
          if (b.won) { stats.w++; stats.streak++; } else { stats.l++; stats.streak = 0; }
          saveStats();
          st.result = b.won
            ? { grade: "5", title: T.win, sub: T.winSub(b.word.toUpperCase(), b.misses.length, stats.streak) }
            : { grade: "2", title: T.lose, sub: T.loseSub(b.word.toUpperCase()) };
          st.phase = "over";
        }
        render(); return;
      }
      var i = st.turn;
      if (st.g[i].indexOf(ch) >= 0) return;
      st.g[i].push(ch);
      var bb = boardState(st.words[i].word, st.g[i]);
      var hit = bb.hits.indexOf(ch) >= 0;
      if (bb.won) { st.result = { grade: "5", title: T.duelWin(st.names[i]), sub: T.duelWinSub(bb.word.toUpperCase(), st.words[1 - i].word.toUpperCase()) }; st.phase = "over"; }
      else if (bb.lost) { st.result = { grade: "2", title: T.duelWin(st.names[1 - i]), sub: T.hangedSub(st.names[i], bb.word.toUpperCase()) }; st.phase = "over"; }
      else if (!hit) st.turn = 1 - i;
      render();
      if (st.phase === "play" && !hit) toast(T.missToast(st.names[st.turn]));
    }

    function onClick(e) {
      var k = e.target.closest(".hm-key");
      if (k && !k.disabled) { guess(k.getAttribute("data-ch")); return; }
      var a = e.target.closest("[data-a]");
      if (!a) return;
      var act = a.getAttribute("data-a");
      if (act === "menu") { st.mode = null; st.phase = "menu"; render(); }
      else if (act === "cpu") startCpu();
      else if (act === "duel") { st.mode = "duel"; st.phase = "names"; render(); }
      else if (act === "pass") { st.phase = st.afterPass; render(); }
      else if (act === "rand") { var p = pickWord(); root.querySelector("#hm-word").value = p.word; root.querySelector("#hm-hint").value = p.hint; }
      else if (act === "again") { if (st.mode === "cpu") startCpu(); else { st.starter = 1 - st.starter; startDuelSetup(); } }
    }
    function onSubmit(e) {
      var f = e.target.closest("[data-form]");
      if (!f) return;
      e.preventDefault();
      if (f.getAttribute("data-form") === "names") {
        st.names = [
          (root.querySelector("#hm-n1").value || "").trim().slice(0, 16) || T.defNames[0],
          (root.querySelector("#hm-n2").value || "").trim().slice(0, 16) || T.defNames[1]
        ];
        if (st.names[0] === st.names[1]) st.names[1] += " (2)";
        st.starter = 0; startDuelSetup();
      } else {
        var w = norm(root.querySelector("#hm-word").value);
        if (w.length < 3 || w.length > 16) { root.querySelector(".hm-err").textContent = T.errLen; return; }
        wordSet(w, (root.querySelector("#hm-hint").value || "").trim().slice(0, 32));
      }
    }
    function onInput(e) { if (e.target.id === "hm-word") e.target.value = e.target.value.replace(L.inputStrip, ""); }
    function onKey(e) {
      if (e.ctrlKey || e.metaKey || e.altKey || st.phase !== "play") return;
      var tag = (e.target && e.target.tagName || "").toLowerCase();
      if (tag === "input" || tag === "textarea") return;
      var k = (e.key || "").toLowerCase();
      if (k === "ё") k = "е";
      if (ALPHABET.indexOf(k) >= 0) { e.preventDefault(); guess(k); }
    }
    root.addEventListener("click", onClick);
    root.addEventListener("submit", onSubmit);
    root.addEventListener("input", onInput);
    document.addEventListener("keydown", onKey);
    render();
    return {
      destroy: function () {
        clearTimeout(toastT);
        root.removeEventListener("click", onClick);
        root.removeEventListener("submit", onSubmit);
        root.removeEventListener("input", onInput);
        document.removeEventListener("keydown", onKey);
        root.innerHTML = ""; root.classList.remove("gm", "gm-hangman");
      }
    };
  }

  window.GAMES = window.GAMES || {};
  window.GAMES.hangman = { mount: mount, langs: Object.keys(LANGS), _test: { boardState: boardState, LANGS: LANGS } };
})();

/* Finish the Word — против компьютера или 2–4 игрока на одном устройстве. Интерфейс: ru, ky, en. */
(function () {
  "use strict";
  var MIN_LEN = 3, SPIN_MS = 1400;
  var START_POOL = "abcdefghijklmnoprstuvw";
  var COLORS = ["#2F5BFF", "#DC3F45", "#17996A", "#8E4EC6"];
  var BOT_WORDS = "able about above accept accident account across action active actor address adult advice afraid after afternoon again against agent agree ahead airport alarm album alive allow almost alone along already always amazing amount angel anger angle angry animal answer anything apart apple area argue arm army around arrive arrow art article artist ask asleep attack attention aunt author autumn avoid awake away baby back bacon bad bag bake balance ball balloon banana band bank bar base basket bath battle beach bean bear beard beat beautiful beauty because become bed bedroom bee beef before begin behind believe bell belt bench berry best better between bicycle big bird birthday biscuit bitter black blanket blood blue board boat body bone book boot border borrow boss bottle bottom bowl box boy brain branch brave bread break breakfast brick bridge bright bring brother brown brush bubble bucket build building burn bus business busy butter button buy cabbage cable cake calendar call calm camel camera camp candle candy cap captain car card care carpet carrot carry castle cat catch cattle cave ceiling center chain chair chalk chance change cheap check cheese chef cherry chess chicken child chocolate choose church circle city class clean clever climb clock close cloud clown coach coast coat coffee coin cold collect color comb come comfort common cook cookie copy corn corner cotton count country cousin cover cow crab crazy cream crowd crown cry cup curtain cushion customer cut dad daily damage dance danger dark date daughter day dead deal dear decide deep deer delete dentist desert design desk dessert detail diamond diary dinner direct dirty discover dish doctor dog doll dollar dolphin donkey door double dragon draw dream dress drink drive drop drum dry duck dust eagle ear early earn earth easy eat echo edge egg eight elbow elephant elevator empty end enemy energy engine enjoy enough enter envelope equal escape evening event every exam example exit expert explain extra eye face fact factory fail fair fall false family famous fan far farm fast father fear feather feel fence festival field fight file film find finger finish fire fish five flag flame flat floor flower fly fog follow food foot forest forget fork form fox free fresh fridge friend frog front fruit full fun funny future game garage garden gas gate gather gentle ghost giant gift giraffe girl give glad glass glove goal goat gold good goose grape grass gray great green ground group grow guard guess guest guitar gym habit hair half hall hammer hand happy harbor hard hat hate have head health hear heart heat heavy height hello help hero hide high hill history hobby hold hole holiday home honey hope horse hospital hot hotel hour house human hungry hunt hurry husband ice idea ignore ill image imagine important inch income increase index inside insect invite iron island item ivory jacket jam jar jeans jelly jet jewel job join joke journey juice jump jungle junior jury just kangaroo keep kettle key kick kid kind king kingdom kiss kitchen kite kitten knee knife knock know koala label lady lake lamp land language large laser last late laugh lawyer lazy leader leaf learn leather leave left lemon lesson letter level library light lion lip list listen little live lizard lock long lose loud love lucky lunch machine magic mail make man mango many map market marry mask match meat medal melon memory menu metal middle milk mind minute mirror mistake money monkey month moon morning mother mountain mouse mouth move movie music nail name narrow nature near neck need needle nest net never new news next nice night nine noise noon north nose note nothing number nurse nut oak ocean office often oil old olive onion open orange order other outside oven owl owner oxygen page paint pair palace pancake panda paper parent park party pass pasta path peach pear pen pencil people pepper perfect person phone piano picture piece pig pillow pilot pink pirate pizza place plane planet plant plate play pocket poem police pool potato power present price prince puzzle quack quality quarter queen question quick quiet quilt quiz rabbit race radio rain rainbow read ready real reason red remember rescue rest rice rich ride right ring river road robot rock rocket roof room root rope rose round row rule run sad safe salad salt sand sandwich school science scissors sea season seat secret seed sell send seven shadow shape share shark sheep shell ship shirt shoe shop short shower sign silver simple sing sister sit size skate skin sky sleep small smile snake snow soap sock soft soldier song soup space spider spoon sport spring square star station stone storm story street student sugar summer sun swim table tail talk tall taxi tea teacher team teeth tent test thank thin thing three ticket tiger time tiny toast today tomato tongue tool tooth top tower town toy train travel tree trip truck true try turtle twelve twin ugly umbrella uncle under understand uniform universe unlock until upset urban use useful usual vacation valley value van vase vegetable velvet very vest video village violin visit voice volcano vote voyage wait walk wall want warm wash watch water wave weather wedding week weight welcome west whale wheel white wide wife wild wind window winter wish wolf woman wood wool word work world worm write wrong xenon xylophone yacht yard yawn year yell yellow yes yesterday yoga yogurt young youth yummy zebra zero zigzag zipper zone zoo zoom".split(" ");
  var HARD_ENDINGS = "xqzjvkyuiw";
  var LEVELS = {
    easy:   { think: [2500, 5000], fail: 0.22, deep: false },
    normal: { think: [1500, 3500], fail: 0.10, deep: false },
    hard:   { think: [900, 2200],  fail: 0.03, deep: true }
  };

  var TEXT = {
    ru: {
      eyebrow: "Цепочка английских слов", lead: "Следующее слово начинается на последнюю букву предыдущего. Не успел за время — минус жизнь.",
      opponent: "Соперник", modeBot: "Компьютер", modeLocal: "Друзья на этом устройстве",
      level: "Сложность компьютера", levels: { easy: "Лёгкий", normal: "Средний", hard: "Сложный" },
      count: "Сколько игроков", yourName: "Твоё имя", player: function (n) { return "Игрок " + n; },
      turnTime: "Время на ход", sec: " с", lives: "Жизней у каждого", start: "Начать игру",
      dictLoading: "Загружаю словарь…", dictOk: function (n) { return "Словарь: " + n + " тыс. слов"; }, dictFail: "Словарь не загрузился, слова не проверяются",
      rulesH: "Как играть", rules: ["Игра выбирает случайную букву. Первый игрок называет английское слово на неё.", "Следующий называет слово на последнюю букву предыдущего.", "Слова от трёх букв, без повторов, только из словаря на 112 тысяч слов.", "Не успел — теряешь жизнь. Последний, у кого остались жизни, побеждает."],
      exit: "Выйти в меню", botTurn: "Ходит компьютер", yourTurn: "Твой ход", turnOf: function (n) { return "Ходит " + n; },
      onLetter: "Слово на букву", inputPh: "Введи слово", inputAria: "Твоё слово", send: "Дальше", thinking: "Компьютер подбирает слово",
      botWin: "Победил компьютер", youWin: "Ты победил!", someoneWin: function (n) { return "Победил(а) " + n; }, over: "Игра окончена",
      words: function (n) { return "слов: " + n; }, longest: "Самое длинное", again: "Играть снова", settings: "Настройки",
      chain: "Цепочка слов", empty: "Здесь появятся слова. Первое слово ещё не названо.", timeout: "время вышло",
      out: function (n) { return n + " выбывает из игры"; }, minus: function (n) { return "Время вышло у " + n + ": минус жизнь"; },
      livesAria: function (n) { return "Жизней: " + n; },
      errEmpty: "Введи слово", errLatin: "Только английские буквы", errMin: function (n) { return "Минимум " + n + " буквы"; },
      errStart: function (l) { return "Слово должно начинаться на «" + l + "»"; }, errUsed: function (w) { return "«" + w + "» уже было в этой игре"; },
      errDict: function (w) { return "«" + w + "» нет в словаре"; },
      you: "Ты", bot: "Компьютер"
    },
    ky: {
      eyebrow: "Англис сөздөрүнүн чынжыры", lead: "Кийинки сөз мурунку сөздүн акыркы тамгасынан башталат. Убакытка үлгүрбөсөң, бир жан кетет.",
      opponent: "Атаандаш", modeBot: "Компьютер", modeLocal: "Ушул түзмөктөгү достор",
      level: "Компьютердин деңгээли", levels: { easy: "Жеңил", normal: "Орточо", hard: "Татаал" },
      count: "Канча оюнчу", yourName: "Атың", player: function (n) { return n + "-оюнчу"; },
      turnTime: "Жүрүшкө убакыт", sec: " сек", lives: "Ар кимдин жаны", start: "Оюнду баштоо",
      dictLoading: "Сөздүк жүктөлүүдө…", dictOk: function (n) { return "Сөздүк: " + n + " миң сөз"; }, dictFail: "Сөздүк жүктөлгөн жок, сөздөр текшерилбейт",
      rulesH: "Кантип ойнойт", rules: ["Оюн кокус тамга тандайт. Биринчи оюнчу ошол тамгадан башталган англис сөзүн айтат.", "Кийинки оюнчу мурунку сөздүн акыркы тамгасынан башталган сөз айтат.", "Сөздөр үч тамгадан кем эмес, кайталанбайт жана 112 миң сөздүк сөздүктө болушу керек.", "Үлгүрбөсөң, бир жан кетет. Жаны калган акыркы оюнчу жеңет."],
      exit: "Менюга чыгуу", botTurn: "Компьютер жүрөт", yourTurn: "Сенин кезегиң", turnOf: function (n) { return "Кезек: " + n; },
      onLetter: "Ушул тамгадан сөз", inputPh: "Сөз жаз", inputAria: "Сенин сөзүң", send: "Андан ары", thinking: "Компьютер сөз издеп жатат",
      botWin: "Компьютер жеңди", youWin: "Сен жеңдиң!", someoneWin: function (n) { return n + " жеңди"; }, over: "Оюн бүттү",
      words: function (n) { return "сөз: " + n; }, longest: "Эң узун сөз", again: "Кайра ойноо", settings: "Жөндөөлөр",
      chain: "Сөз чынжыры", empty: "Бул жерде сөздөр пайда болот. Биринчи сөз али айтыла элек.", timeout: "убакыт бүттү",
      out: function (n) { return n + " оюндан чыкты"; }, minus: function (n) { return n + " үлгүрбөдү: бир жан кетти"; },
      livesAria: function (n) { return "Жан: " + n; },
      errEmpty: "Сөз жаз", errLatin: "Англис тамгалары гана", errMin: function (n) { return "Кеминде " + n + " тамга"; },
      errStart: function (l) { return "Сөз «" + l + "» тамгасынан башталышы керек"; }, errUsed: function (w) { return "«" + w + "» бул оюнда айтылган"; },
      errDict: function (w) { return "«" + w + "» сөздүктө жок"; },
      you: "Сен", bot: "Компьютер"
    },
    en: {
      eyebrow: "English word chain", lead: "Each word starts with the last letter of the previous one. Run out of time and you lose a life.",
      opponent: "Opponent", modeBot: "Computer", modeLocal: "Friends on this device",
      level: "Computer difficulty", levels: { easy: "Easy", normal: "Medium", hard: "Hard" },
      count: "Number of players", yourName: "Your name", player: function (n) { return "Player " + n; },
      turnTime: "Time per turn", sec: " s", lives: "Lives each", start: "Start game",
      dictLoading: "Loading dictionary…", dictOk: function (n) { return "Dictionary: " + n + "k words"; }, dictFail: "Dictionary failed to load, words are not checked",
      rulesH: "How to play", rules: ["The game picks a random letter. The first player names an English word starting with it.", "The next player names a word starting with the last letter of the previous one.", "Words must be at least three letters, no repeats, and in the 112,000-word dictionary.", "Run out of time and you lose a life. The last player with lives left wins."],
      exit: "Back to menu", botTurn: "Computer's turn", yourTurn: "Your turn", turnOf: function (n) { return n + "'s turn"; },
      onLetter: "Word starting with", inputPh: "Type a word", inputAria: "Your word", send: "Go", thinking: "The computer is thinking",
      botWin: "The computer wins", youWin: "You win!", someoneWin: function (n) { return n + " wins"; }, over: "Game over",
      words: function (n) { return n + (n === 1 ? " word" : " words"); }, longest: "Longest word", again: "Play again", settings: "Settings",
      chain: "Word chain", empty: "Words will appear here. Nobody has played yet.", timeout: "ran out of time",
      out: function (n) { return n + " is out"; }, minus: function (n) { return n + " ran out of time: minus one life"; },
      livesAria: function (n) { return "Lives: " + n; },
      errEmpty: "Type a word", errLatin: "English letters only", errMin: function (n) { return "At least " + n + " letters"; },
      errStart: function (l) { return "The word must start with “" + l + "”"; }, errUsed: function (w) { return "“" + w + "” was already played"; },
      errDict: function (w) { return "“" + w + "” is not in the dictionary"; },
      you: "You", bot: "Computer"
    }
  };

  var dictPromise = null, DICT = null, DICT_BY_LETTER = null;
  function loadDict(base) {
    if (dictPromise) return dictPromise;
    dictPromise = fetch((base || "") + "words-en.txt")
      .then(function (r) { if (!r.ok) throw new Error("http " + r.status); return r.text(); })
      .then(function (t) {
        var list = t.split("\n").map(function (w) { return w.trim(); }).filter(Boolean);
        DICT = new Set(list);
        if (DICT.size < 1000) { DICT = null; throw new Error("empty"); }
        DICT_BY_LETTER = {};
        list.forEach(function (w) { if (w.length >= 4 && w.length <= 8) (DICT_BY_LETTER[w[0]] = DICT_BY_LETTER[w[0]] || []).push(w); });
        return DICT;
      })
      .catch(function (e) { dictPromise = null; throw e; });
    return dictPromise;
  }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function initial(s) { return (Array.from(s || "?")[0] || "?").toUpperCase(); }
  function rnd(a, b) { return a + Math.random() * (b - a); }

  function checkWord(raw, letter, used, T) {
    T = T || TEXT.ru;
    var w = String(raw || "").trim().toLowerCase();
    if (!w) return { err: T.errEmpty };
    if (!/^[a-z]+$/.test(w)) return { err: T.errLatin };
    if (w.length < MIN_LEN) return { err: T.errMin(MIN_LEN) };
    if (w.charAt(0) !== letter) return { err: T.errStart(letter.toUpperCase()) };
    if (used.has(w)) return { err: T.errUsed(w) };
    if (DICT && !DICT.has(w)) return { err: T.errDict(w) };
    return { w: w };
  }
  function botPick(letter, used, level) {
    var cand = BOT_WORDS.filter(function (w) { return w[0] === letter && !used.has(w); });
    if (!cand.length && level.deep && DICT_BY_LETTER && DICT_BY_LETTER[letter]) {
      var pool = DICT_BY_LETTER[letter];
      for (var t = 0; t < 40; t++) { var x = pool[Math.floor(Math.random() * pool.length)]; if (!used.has(x)) return x; }
    }
    if (!cand.length) return null;
    if (level.deep) {
      var tough = cand.filter(function (w) { return HARD_ENDINGS.indexOf(w[w.length - 1]) >= 0; });
      if (tough.length && Math.random() < 0.6) cand = tough;
    }
    return cand[Math.floor(Math.random() * cand.length)];
  }

  var HEART = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
  function heartsHtml(lives, max) { var s = ""; for (var i = 0; i < max; i++) s += i < lives ? HEART : HEART.replace("<svg ", '<svg class="lost" '); return s; }
  function wordHtml(word, size) {
    var ch = Array.from(word);
    return '<span class="wc-word" style="--ws:' + (size || 28) + 'px">' + ch.map(function (c, i) {
      return '<i class="' + (i === 0 ? "head" : i === ch.length - 1 ? "tail" : "") + '">' + esc(c) + "</i>";
    }).join("") + "</span>";
  }

  function mount(root, opts) {
    opts = opts || {};
    var lang = TEXT[opts.lang] ? opts.lang : "ru", T = TEXT[lang];
    root.classList.add("gm", "gm-wordchain");
    root.setAttribute("lang", lang);
    var KEY = "wc_setup_" + lang, saved = {};
    try { saved = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) {}
    var cfg = {
      mode: saved.mode || "bot", level: saved.level || "normal", turn: saved.turn || 15, lives: saved.lives || 3,
      names: saved.names || [T.you, T.player(2), T.player(3), T.player(4)], count: saved.count || 2
    };
    var G = null, dictState = DICT ? "ok" : "loading", ticker = null, botTimer = null, toastT = null;

    loadDict(opts.base).then(function () { dictState = "ok"; updateDictNote(); }, function () { dictState = "fail"; updateDictNote(); });

    function toast(msg) {
      var t = root.querySelector(".wc-toast"); if (!t) return;
      t.innerHTML = "<div>" + esc(msg) + "</div>";
      clearTimeout(toastT); toastT = setTimeout(function () { t.innerHTML = ""; }, 2600);
    }
    function updateDictNote() {
      var n = root.querySelector(".wc-dict"); if (!n) return;
      n.textContent = dictState === "ok" ? T.dictOk(Math.round(DICT.size / 1000)) : dictState === "fail" ? T.dictFail : T.dictLoading;
    }
    function seg(name, values, current, fmt) {
      return '<div class="wc-seg" role="radiogroup">' + values.map(function (v) {
        return '<button type="button" role="radio" data-seg="' + name + '" data-v="' + v + '" aria-checked="' + (String(v) === String(current)) + '">' + esc(fmt(v)) + "</button>";
      }).join("") + "</div>";
    }

    function renderSetup() {
      var names = "", n = cfg.mode === "bot" ? 1 : cfg.count;
      for (var i = 0; i < n; i++) {
        names += '<div class="wc-field"><label for="wc-n' + i + '">' + esc(cfg.mode === "bot" ? T.yourName : T.player(i + 1)) + '</label><input type="text" id="wc-n' + i + '" maxlength="16" value="' + esc(cfg.names[i]) + '"></div>';
      }
      root.innerHTML = '<div class="wc-shell">' +
        '<div class="wc-hero"><div class="wc-eyebrow">' + esc(T.eyebrow) + '</div><h2 class="wc-h1">Finish the Word</h2>' +
        '<div class="wc-demo">' + wordHtml("game", 28) + '<span class="wc-arrow">→</span>' + wordHtml("elephant", 28) + '<span class="wc-arrow">→</span>' + wordHtml("tiger", 28) + "</div>" +
        '<p class="wc-muted">' + esc(T.lead) + "</p></div>" +
        '<div class="wc-panel"><div class="wc-field"><span class="wc-label">' + esc(T.opponent) + "</span>" +
        seg("mode", ["bot", "local"], cfg.mode, function (v) { return v === "bot" ? T.modeBot : T.modeLocal; }) + "</div>" +
        (cfg.mode === "bot"
          ? '<div class="wc-field"><span class="wc-label">' + esc(T.level) + "</span>" + seg("level", ["easy", "normal", "hard"], cfg.level, function (v) { return T.levels[v]; }) + "</div>"
          : '<div class="wc-field"><span class="wc-label">' + esc(T.count) + "</span>" + seg("count", [2, 3, 4], cfg.count, String) + "</div>") +
        '<div class="wc-names">' + names + "</div>" +
        '<div class="wc-field"><span class="wc-label">' + esc(T.turnTime) + "</span>" + seg("turn", [10, 15, 20, 30], cfg.turn, function (v) { return v + T.sec; }) + "</div>" +
        '<div class="wc-field"><span class="wc-label">' + esc(T.lives) + "</span>" + seg("lives", [1, 2, 3, 5], cfg.lives, String) + "</div>" +
        '<div class="wc-row"><button type="button" class="wc-btn primary" data-a="start">' + esc(T.start) + '</button><span class="wc-hint wc-dict"></span></div></div>' +
        '<details class="wc-panel wc-rules"><summary>' + esc(T.rulesH) + "</summary><ol>" + T.rules.map(function (r) { return "<li>" + esc(r) + "</li>"; }).join("") + "</ol></details>" +
        '<div class="wc-toast" aria-live="polite"></div></div>';
      updateDictNote();
    }
    function collectNames() {
      root.querySelectorAll(".wc-names input").forEach(function (inp, i) {
        cfg.names[i] = (inp.value || "").replace(/\s+/g, " ").trim().slice(0, 16) || (cfg.mode === "bot" ? T.you : T.player(i + 1));
      });
      try { localStorage.setItem(KEY, JSON.stringify(cfg)); } catch (e) {}
    }
    function startGame() {
      collectNames();
      var players = [];
      if (cfg.mode === "bot") {
        players.push({ name: cfg.names[0], bot: false });
        players.push({ name: T.bot, bot: true });
        if (Math.random() < 0.5) players.reverse();
      } else {
        for (var i = 0; i < cfg.count; i++) players.push({ name: cfg.names[i], bot: false });
      }
      players.forEach(function (p, i) { p.lives = cfg.lives; p.color = COLORS[i % COLORS.length]; });
      G = {
        players: players, cur: 0, chain: [], used: new Set(), over: false, winner: null,
        letter: START_POOL.charAt(Math.floor(Math.random() * START_POOL.length)),
        turnMs: cfg.turn * 1000, start: Date.now() + SPIN_MS, spinUntil: Date.now() + SPIN_MS, landed: false, seq: 0,
        level: LEVELS[cfg.level]
      };
      renderGame();
      clearInterval(ticker); ticker = setInterval(tick, 100);
    }
    function alive() { return G.players.filter(function (p) { return p.lives > 0; }); }
    function nextAlive(from) {
      var n = G.players.length;
      for (var k = 1; k <= n; k++) { var i = (from + k) % n; if (G.players[i].lives > 0) return i; }
      return from;
    }
    function newTurn(idx) { clearTimeout(botTimer); G.cur = idx; G.seq++; G.start = Date.now(); renderGame(); scheduleBot(); }
    function scheduleBot() {
      var p = G.players[G.cur];
      if (!p.bot || G.over) return;
      var seq = G.seq;
      if (Math.random() < G.level.fail) return; // компьютер «не вспомнил» слово
      var wait = Math.min(rnd(G.level.think[0], G.level.think[1]), G.turnMs - 900);
      botTimer = setTimeout(function () {
        if (!G || G.seq !== seq || G.over) return;
        var w = botPick(G.letter, G.used, G.level);
        if (w) playWord(w);
      }, Math.max(0, G.start - Date.now()) + wait);
    }
    function playWord(w) {
      G.used.add(w); G.chain.push({ w: w, by: G.cur }); G.letter = w.charAt(w.length - 1);
      newTurn(nextAlive(G.cur));
    }
    function miss() {
      var i = G.cur, p = G.players[i];
      p.lives = Math.max(0, p.lives - 1);
      G.chain.push({ m: 1, by: i });
      toast(p.lives === 0 ? T.out(p.name) : T.minus(p.name));
      var a = alive();
      if (a.length <= 1) {
        G.over = true; G.winner = a[0] ? G.players.indexOf(a[0]) : null;
        clearInterval(ticker); clearTimeout(botTimer); renderGame(); return;
      }
      newTurn(nextAlive(i));
    }

    function renderGame() {
      var p = G.players[G.cur], human = !p.bot && !G.over;
      var playersHtml = G.players.map(function (pl, i) {
        return '<div class="wc-pl' + (!G.over && i === G.cur ? " cur" : "") + (pl.lives <= 0 ? " dead" : "") + '" style="--pc:' + pl.color + '">' +
          '<span class="wc-dot">' + esc(initial(pl.name)) + '</span><span class="wc-nm">' + esc(pl.name) + '</span><div class="wc-hearts" aria-label="' + esc(T.livesAria(pl.lives)) + '">' + heartsHtml(pl.lives, cfg.lives) + "</div></div>";
      }).join("");
      var stage;
      if (!G.over) {
        stage = '<div class="wc-panel wc-stage" style="--turn:' + p.color + '">' +
          '<div class="wc-who">' + esc(p.bot ? T.botTurn : (cfg.mode === "bot" ? T.yourTurn : T.turnOf(p.name))) + "</div>" +
          '<div class="wc-eyebrow">' + esc(T.onLetter) + '</div><div class="wc-tile xl" id="wc-target" aria-live="polite">' + (G.landed ? G.letter.toUpperCase() : "?") + "</div>" +
          '<div class="wc-timer"><div class="wc-bar" id="wc-bar"><div id="wc-fill"></div></div><div class="wc-secs" id="wc-secs">' + cfg.turn + "</div></div>" +
          (human
            ? '<form class="wc-form" id="wc-form" autocomplete="off"><div class="wc-in"><input type="text" id="wc-word-in" maxlength="24" autocomplete="off" autocapitalize="none" autocorrect="off" spellcheck="false" aria-label="' + esc(T.inputAria) + '" placeholder="' + esc(T.inputPh) + '"' + (G.landed ? "" : " disabled") + '><button type="submit" class="wc-btn primary">' + esc(T.send) + '</button></div><div class="wc-err" id="wc-err" role="alert"></div></form>'
            : '<div class="wc-hint">' + esc(T.thinking) + '<span class="wc-dots"></span></div>') +
          "</div>";
      } else {
        var counts = {}, longest = "", longestBy = null;
        G.chain.forEach(function (e) { if (!e.w) return; counts[e.by] = (counts[e.by] || 0) + 1; if (e.w.length > longest.length) { longest = e.w; longestBy = e.by; } });
        var title = G.winner == null ? T.over : (G.players[G.winner].bot ? T.botWin : (cfg.mode === "bot" ? T.youWin : T.someoneWin(G.players[G.winner].name)));
        stage = '<div class="wc-panel wc-finish"><div class="wc-tile" style="width:92px;height:92px;font-size:48px;border-radius:20px">1</div><h3>' + esc(title) + '</h3><div class="wc-stats">' +
          G.players.map(function (pl, i) { return "<div><span>" + esc(pl.name) + '</span><span class="wc-muted">' + esc(T.words(counts[i] || 0)) + "</span></div>"; }).join("") +
          (longest ? "<div><span>" + esc(T.longest) + '</span><span class="wc-muted">' + esc(longest) + " (" + esc(G.players[longestBy].name) + ")</span></div>" : "") +
          '</div><div class="wc-row" style="justify-content:center"><button type="button" class="wc-btn primary" data-a="again">' + esc(T.again) + '</button><button type="button" class="wc-btn ghost" data-a="setup">' + esc(T.settings) + "</button></div></div>";
      }
      var chain = G.chain.length
        ? G.chain.slice(-40).reverse().map(function (e, i) {
            var pl = G.players[e.by];
            return e.m
              ? '<div class="wc-link miss' + (i === 0 ? " fresh" : "") + '" style="--pc:' + pl.color + '"><span class="wc-dot">' + esc(initial(pl.name)) + "</span><span>" + esc(pl.name) + ": " + esc(T.timeout) + "</span><span></span></div>"
              : '<div class="wc-link' + (i === 0 ? " fresh" : "") + '" style="--pc:' + pl.color + '"><span class="wc-dot">' + esc(initial(pl.name)) + "</span>" + wordHtml(e.w, 26) + '<span class="wc-by">' + esc(pl.name) + "</span></div>";
          }).join("")
        : '<p class="wc-empty">' + esc(T.empty) + "</p>";
      var words = G.chain.filter(function (e) { return e.w; }).length;
      root.innerHTML = '<div class="wc-shell"><div class="wc-top"><span class="wc-chip">Finish the Word</span><button type="button" class="wc-btn ghost small" data-a="setup">' + esc(T.exit) + "</button></div>" +
        '<div class="wc-players">' + playersHtml + '</div><div class="wc-grid"><div>' + stage + "</div>" +
        '<div class="wc-panel"><div class="wc-chain-head"><h3>' + esc(T.chain) + '</h3><span class="wc-hint">' + (words ? esc(T.words(words)) : "") + '</span></div><div class="wc-chain">' + chain + "</div></div></div>" +
        '<div class="wc-toast" aria-live="polite"></div></div>';
      if (human && G.landed) { var inp = root.querySelector("#wc-word-in"); if (inp) try { inp.focus({ preventScroll: true }); } catch (e) {} }
      tick();
    }
    function tick() {
      if (!G || G.over) return;
      var now = Date.now(), tgt = root.querySelector("#wc-target");
      if (now < G.spinUntil) {
        if (tgt) { tgt.textContent = START_POOL.charAt(Math.floor(Math.random() * START_POOL.length)).toUpperCase(); tgt.classList.add("spin"); }
        return;
      }
      if (!G.landed) {
        G.landed = true;
        if (tgt) { tgt.classList.remove("spin"); tgt.textContent = G.letter.toUpperCase(); }
        var inp = root.querySelector("#wc-word-in");
        if (inp) { inp.disabled = false; try { inp.focus({ preventScroll: true }); } catch (e) {} }
        scheduleBot();
      }
      var rem = G.turnMs - (now - G.start);
      var fill = root.querySelector("#wc-fill"), bar = root.querySelector("#wc-bar"), secs = root.querySelector("#wc-secs");
      if (fill) fill.style.width = Math.max(0, Math.min(100, rem / G.turnMs * 100)) + "%";
      if (bar) bar.className = "wc-bar" + (rem <= 3000 ? " crit" : rem <= 6000 ? " low" : "");
      var shown = String(Math.max(0, Math.ceil(rem / 1000)));
      if (secs && secs.textContent !== shown) secs.textContent = shown;
      if (rem <= 0) miss();
    }

    function onClick(e) {
      var s = e.target.closest("[data-seg]");
      if (s) {
        var name = s.getAttribute("data-seg"), v = s.getAttribute("data-v");
        collectNames();
        cfg[name] = (name === "turn" || name === "lives" || name === "count") ? +v : v;
        renderSetup(); return;
      }
      var a = e.target.closest("[data-a]");
      if (!a) return;
      var act = a.getAttribute("data-a");
      if (act === "start" || act === "again") startGame();
      else if (act === "setup") { clearInterval(ticker); clearTimeout(botTimer); G = null; renderSetup(); }
    }
    function onSubmit(e) {
      if (e.target.id !== "wc-form") return;
      e.preventDefault();
      if (!G || G.over || !G.landed || G.players[G.cur].bot) return;
      var inp = root.querySelector("#wc-word-in");
      var res = checkWord(inp.value, G.letter, G.used, T);
      if (res.err) {
        root.querySelector("#wc-err").textContent = res.err;
        inp.classList.remove("shake"); void inp.offsetWidth; inp.classList.add("shake");
        return;
      }
      playWord(res.w);
    }
    function onInput(e) {
      if (e.target.id === "wc-word-in") {
        var v = e.target.value.replace(/[^a-zA-Z]/g, ""); if (v !== e.target.value) e.target.value = v;
        var er = root.querySelector("#wc-err"); if (er) er.textContent = "";
      }
    }
    root.addEventListener("click", onClick);
    root.addEventListener("submit", onSubmit);
    root.addEventListener("input", onInput);
    renderSetup();
    return {
      destroy: function () {
        clearInterval(ticker); clearTimeout(botTimer); clearTimeout(toastT);
        root.removeEventListener("click", onClick);
        root.removeEventListener("submit", onSubmit);
        root.removeEventListener("input", onInput);
        root.innerHTML = ""; root.classList.remove("gm", "gm-wordchain");
      }
    };
  }

  window.GAMES = window.GAMES || {};
  window.GAMES.wordchain = { mount: mount, _test: { checkWord: checkWord, botPick: botPick, loadDict: loadDict, LEVELS: LEVELS, BOT_WORDS: BOT_WORDS, TEXT: TEXT } };
})();

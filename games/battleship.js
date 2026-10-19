/* Морской бой — против компьютера или вдвоём на одном устройстве. Интерфейс: ru, ky, en. */
(function () {
  "use strict";
  var FLEET = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
  var TEXT = {
    ru: {
      cols: "АБВГДЕЖЗИК", title: "Морской бой", newGame: "Новая игра", sound: function (on) { return "Звук: " + (on ? "вкл" : "выкл"); },
      lead: "Расставьте флот на карте и найдите корабли противника раньше, чем он найдёт ваши.",
      vsCpu: "Играть с компьютером", vsTwo: "Играть вдвоём", menuHint: "Попали — стреляете ещё раз. Корабли не касаются друг друга.",
      placeH: function (two, n) { return "Расстановка флота" + (two ? ", игрок " + n : ""); },
      placeHint: "Выберите корабль и нажмите на карту. Поворот: кнопка, клавиша R или правая кнопка мыши. Нажатие на корабль снимает его с карты.",
      left: function (n) { return "осталось " + n; }, rotate: function (h) { return "Повернуть: " + (h ? "вдоль" : "поперёк"); },
      random: "Случайно", clear: "Очистить", go: "В бой", ready: "Я готов",
      passPlace2: { t: "Расставляет игрок 2", s: "Передайте устройство. Игрок 1, отвернитесь от экрана." },
      passTurn: function (n) { return "Ход игрока " + n; }, passGive: function (n) { return "Передайте устройство игроку " + n + "."; },
      startMsg: "Нажимайте на клетки в водах противника, чтобы стрелять.",
      winCpu: "Победа! Вражеский флот потоплен.", loseCpu: "Поражение. Ваш флот потоплен.", winTwo: function (n) { return "Победил игрок " + n; },
      yourTurn: "Ваш ход", cpuTurn: "Ход компьютера", turnOf: function (n) { return "Ход игрока " + n; },
      enemy: "Воды противника", mine: "Ваши воды",
      you: "Вы", cpu: "Компьютер", player: function (n) { return "Игрок " + n; },
      lastShip: function (c) { return "Последний корабль потоплен на " + c + "."; },
      sunk: function (w, c) { return w + ": корабль потоплен на " + c + ". Стреляют ещё раз."; },
      hit: function (w, c) { return w + ": попадание в " + c + ". Стреляют ещё раз."; },
      miss: function (w, c) { return w + ": мимо, " + c + "."; }, passSuffix: " Передайте устройство."
    },
    ky: {
      cols: "АБВГДЕЖЗИК", title: "Деңиз согушу", newGame: "Жаңы оюн", sound: function (on) { return "Үн: " + (on ? "күйүк" : "өчүк"); },
      lead: "Флотуңду картага жайгаштыр жана атаандашың сеникин тапканга чейин анын кемелерин тап.",
      vsCpu: "Компьютер менен ойноо", vsTwo: "Экөөлөп ойноо", menuHint: "Тийгизсең, дагы атасың. Кемелер бири-бирине тийбейт.",
      placeH: function (two, n) { return "Флотту жайгаштыруу" + (two ? ", " + n + "-оюнчу" : ""); },
      placeHint: "Кемени тандап, картаны бас. Буруу: баскыч, R клавишасы же чычкандын оң баскычы. Кемени бассаң, ал картадан алынат.",
      left: function (n) { return "калды " + n; }, rotate: function (h) { return "Буруу: " + (h ? "туурасынан" : "тигинен"); },
      random: "Кокус", clear: "Тазалоо", go: "Согушка", ready: "Даярмын",
      passPlace2: { t: "2-оюнчу жайгаштырат", s: "Түзмөктү бериңиз. 1-оюнчу, экранды карабаңыз." },
      passTurn: function (n) { return n + "-оюнчунун жүрүшү"; }, passGive: function (n) { return "Түзмөктү " + n + "-оюнчуга бериңиз."; },
      startMsg: "Атуу үчүн атаандаштын суусундагы клеткаларды бас.",
      winCpu: "Жеңиш! Душмандын флоту чөктү.", loseCpu: "Жеңилүү. Сиздин флот чөктү.", winTwo: function (n) { return n + "-оюнчу жеңди"; },
      yourTurn: "Сиздин жүрүш", cpuTurn: "Компьютердин жүрүшү", turnOf: function (n) { return n + "-оюнчунун жүрүшү"; },
      enemy: "Атаандаштын суусу", mine: "Сиздин суу",
      you: "Сиз", cpu: "Компьютер", player: function (n) { return n + "-оюнчу"; },
      lastShip: function (c) { return "Акыркы кеме " + c + " клеткасында чөктү."; },
      sunk: function (w, c) { return w + ": " + c + " клеткасында кеме чөктү. Дагы атат."; },
      hit: function (w, c) { return w + ": " + c + " клеткасына тийди. Дагы атат."; },
      miss: function (w, c) { return w + ": " + c + ", тийген жок."; }, passSuffix: " Түзмөктү бериңиз."
    },
    en: {
      cols: "ABCDEFGHIJ", title: "Battleship", newGame: "New game", sound: function (on) { return "Sound: " + (on ? "on" : "off"); },
      lead: "Place your fleet on the map and find the enemy's ships before they find yours.",
      vsCpu: "Play the computer", vsTwo: "Play with a friend", menuHint: "Hit a ship and you shoot again. Ships never touch each other.",
      placeH: function (two, n) { return "Place your fleet" + (two ? ", player " + n : ""); },
      placeHint: "Pick a ship and tap the map. Rotate with the button, the R key or a right click. Tap a placed ship to remove it.",
      left: function (n) { return n + " left"; }, rotate: function (h) { return "Rotate: " + (h ? "horizontal" : "vertical"); },
      random: "Random", clear: "Clear", go: "Battle", ready: "I'm ready",
      passPlace2: { t: "Player 2 places ships", s: "Pass the device. Player 1, look away from the screen." },
      passTurn: function (n) { return "Player " + n + "'s turn"; }, passGive: function (n) { return "Pass the device to player " + n + "."; },
      startMsg: "Tap squares in the enemy waters to fire.",
      winCpu: "Victory! The enemy fleet is sunk.", loseCpu: "Defeat. Your fleet is sunk.", winTwo: function (n) { return "Player " + n + " wins"; },
      yourTurn: "Your turn", cpuTurn: "Computer's turn", turnOf: function (n) { return "Player " + n + "'s turn"; },
      enemy: "Enemy waters", mine: "Your waters",
      you: "You", cpu: "Computer", player: function (n) { return "Player " + n; },
      lastShip: function (c) { return "The last ship went down at " + c + "."; },
      sunk: function (w, c) { return w + ": ship sunk at " + c + ". Fire again."; },
      hit: function (w, c) { return w + ": hit at " + c + ". Fire again."; },
      miss: function (w, c) { return w + ": miss, " + c + "."; }, passSuffix: " Pass the device."
    }
  };

  function mk() { return { g: Array(100).fill(0), ships: [], s: Array(100).fill(0) }; }
  function nb(i) { var r = i / 10 | 0, c = i % 10, o = []; for (var a = -1; a <= 1; a++) for (var b = -1; b <= 1; b++) { var y = r + a, x = c + b; if (y >= 0 && y < 10 && x >= 0 && x < 10) o.push(y * 10 + x); } return o; }
  function cells(i, n, h) { var r = i / 10 | 0, c = i % 10, o = []; for (var k = 0; k < n; k++) { var y = h ? r : r + k, x = h ? c + k : c; if (y > 9 || x > 9) return null; o.push(y * 10 + x); } return o; }
  function fits(p, cs) { return cs && cs.every(function (i) { return nb(i).every(function (j) { return !p.g[j]; }); }); }
  function left(p, n) { return FLEET.filter(function (x) { return x === n; }).length - p.ships.filter(function (s) { return s.cs.length === n; }).length; }
  function put(p, cs) { p.ships.push({ cs: cs, h: 0 }); cs.forEach(function (i) { p.g[i] = p.ships.length; }); }
  function unput(p, id) { p.ships.splice(id - 1, 1); p.g.fill(0); p.ships.forEach(function (s, k) { s.cs.forEach(function (i) { p.g[i] = k + 1; }); }); }
  function randomize(p) {
    for (var attempt = 0; attempt < 50; attempt++) {
      var q = mk(), ok = true;
      for (var f = 0; f < FLEET.length && ok; f++) {
        var n = FLEET[f], placed = false;
        for (var t = 0; t < 500; t++) { var cs = cells(Math.random() * 100 | 0, n, Math.random() < 0.5); if (fits(q, cs)) { put(q, cs); placed = true; break; } }
        ok = placed;
      }
      if (ok) { p.g = q.g; p.ships = q.ships; p.s = q.s; return; }
    }
  }
  function sunk(p, id) { return p.ships[id - 1].h === p.ships[id - 1].cs.length; }

  function mount(root, opts) {
    opts = opts || {};
    var lang = TEXT[opts.lang] ? opts.lang : "ru", T = TEXT[lang], L = T.cols;
    function nm(i) { return L[i % 10] + ((i / 10 | 0) + 1); }
    root.classList.add("gm", "gm-battleship");
    root.setAttribute("lang", lang);
    var mode = 1, snd = true, ph = "menu", P = [], cur = 0, pl = 0, sel = 4, horiz = true, busy = false, msg = "", pass = {}, win = 0, ac = null, timers = [];
    function later(fn, ms) { var t = setTimeout(fn, ms); timers.push(t); return t; }
    function beep(f, d, type, v, at) {
      if (!snd) return;
      try {
        ac = ac || new (window.AudioContext || window.webkitAudioContext)();
        var o = ac.createOscillator(), g = ac.createGain(), s = ac.currentTime + (at || 0);
        o.type = type || "sine"; o.frequency.value = f;
        g.gain.setValueAtTime(v || 0.07, s); g.gain.exponentialRampToValueAtTime(0.001, s + d);
        o.connect(g); g.connect(ac.destination); o.start(s); o.stop(s + d);
      } catch (e) {}
    }
    function board(p, show, id) {
      var h = '<div class="bs-bd" data-board="' + id + '"><i></i>' + L.split("").map(function (c) { return "<b>" + c + "</b>"; }).join("");
      for (var r = 0; r < 10; r++) {
        h += "<b>" + (r + 1) + "</b>";
        for (var c = 0; c < 10; c++) {
          var i = r * 10 + c, g = p.g[i], s = p.s[i], k = "bs-c";
          if (g && (show || s === 2)) k += " sh";
          if (s === 2) { k += " hit"; if (sunk(p, g)) k += " sk"; } else if (s) k += " ms";
          h += '<button type="button" class="' + k + '" data-i="' + i + '" aria-label="' + nm(i) + '"></button>';
        }
      }
      return h + "</div>";
    }
    function render() {
      var h = '<div class="bs-app"><header class="bs-head"><h2 class="bs-h1">' + T.title + '</h2><div class="bs-row">' +
        (ph === "menu" ? "" : '<button type="button" class="bs-t" data-a="new">' + T.newGame + "</button>") +
        '<button type="button" class="bs-t" data-a="snd">' + T.sound(snd) + "</button></div></header>";
      if (ph === "menu") {
        h += '<section><p class="bs-lead">' + T.lead + '</p><div class="bs-row"><button type="button" class="bs-b" data-a="m1">' + T.vsCpu + '</button><button type="button" class="bs-b o" data-a="m2">' + T.vsTwo + "</button></div>" +
          '<p class="bs-hint">' + T.menuHint + "</p></section>";
      } else if (ph === "place") {
        var p = P[pl], all = p.ships.length === 10;
        h += '<section><h3 class="bs-h2">' + T.placeH(mode === 2, pl + 1) + '</h3><p class="bs-hint">' + T.placeHint + "</p>" +
          '<div class="bs-pw">' + board(p, 1, "pb") + '<div class="bs-fl">' +
          [4, 3, 2, 1].map(function (n) {
            return '<button type="button" class="bs-chip' + (sel === n ? " on" : "") + '" data-a="sel" data-n="' + n + '"' + (left(p, n) ? "" : " disabled") + '><span class="bs-bl">' + new Array(n + 1).join("<u></u>") + "</span><em>" + T.left(left(p, n)) + "</em></button>";
          }).join("") +
          '<button type="button" class="bs-t" data-a="rot">' + T.rotate(horiz) + "</button>" +
          '<button type="button" class="bs-t" data-a="rnd">' + T.random + '</button><button type="button" class="bs-t" data-a="clr">' + T.clear + "</button>" +
          '<button type="button" class="bs-b" data-a="go"' + (all ? "" : " disabled") + ">" + T.go + "</button></div></div></section>";
      } else if (ph === "pass") {
        h += '<section class="bs-ps"><h3 class="bs-h2">' + pass.t + '</h3><p class="bs-hint">' + pass.s + '</p><button type="button" class="bs-b" data-a="ready">' + T.ready + "</button></section>";
      } else {
        var v = mode === 1 ? 0 : cur, me = P[v], en = P[1 - v], live = ph === "battle" && cur === v && !busy;
        var ttl = ph === "over" ? (mode === 1 ? (win === 0 ? T.winCpu : T.loseCpu) : T.winTwo(win + 1)) : (mode === 1 ? (cur === 0 ? T.yourTurn : T.cpuTurn) : T.turnOf(cur + 1));
        h += '<section><h3 class="bs-h2">' + ttl + '</h3><p class="bs-hint">' + msg + '</p><div class="bs-bt"><div class="' + (live ? "live" : "") + '"><h4 class="bs-h3">' + T.enemy + "</h4>" + board(en, ph === "over", "eb") + "</div>" +
          '<div class="bs-sm"><h4 class="bs-h3">' + T.mine + "</h4>" + board(me, 1, "mb") + "</div></div>" +
          (ph === "over" ? '<p><button type="button" class="bs-b" data-a="new">' + T.newGame + "</button></p>" : "") + "</section>";
      }
      root.innerHTML = h + "</div>";
    }
    function pv(i) {
      root.querySelectorAll('[data-board="pb"] .bs-c').forEach(function (c) { c.classList.remove("pv", "bad"); });
      if (i < 0) return;
      var p = P[pl], cs = cells(i, sel, horiz), ok = fits(p, cs) && left(p, sel) > 0 && !p.g[i];
      (cs || [i]).forEach(function (j) {
        var c = root.querySelector('[data-board="pb"] .bs-c[data-i="' + j + '"]');
        if (c) { c.classList.add("pv"); if (!ok) c.classList.add("bad"); }
      });
    }
    function rot() { horiz = !horiz; render(); }
    function finish() {
      if (mode === 2 && pl === 0) { pl = 1; pass = { t: T.passPlace2.t, s: T.passPlace2.s, go: "place" }; ph = "pass"; }
      else {
        if (mode === 1) randomize(P[1]);
        cur = 0; msg = T.startMsg;
        if (mode === 2) { pass = { t: T.passTurn(1), s: T.passGive(1), go: "battle" }; ph = "pass"; } else ph = "battle";
      }
      sel = 4; render();
    }
    function shoot(i) {
      var t = P[1 - cur], id = t.g[i], r = "miss";
      if (id) {
        var s = t.ships[id - 1]; t.s[i] = 2; s.h++; r = "hit";
        if (s.h === s.cs.length) { r = "sunk"; s.cs.forEach(function (j) { nb(j).forEach(function (k) { if (!t.s[k]) t.s[k] = 3; }); }); }
      } else t.s[i] = 1;
      var who = mode === 1 ? (cur === 0 ? T.you : T.cpu) : T.player(cur + 1);
      if (t.ships.every(function (s) { return s.h === s.cs.length; })) {
        ph = "over"; win = cur; msg = T.lastShip(nm(i));
        beep(392, 0.3, "triangle"); beep(523, 0.3, "triangle", 0.07, 0.25); beep(659, 0.5, "triangle", 0.07, 0.5);
        render(); return;
      }
      if (r === "sunk") { beep(140, 0.6, "square", 0.06); msg = T.sunk(who, nm(i)); }
      else if (r === "hit") { beep(230, 0.25, "sawtooth", 0.06); msg = T.hit(who, nm(i)); }
      else { beep(520, 0.15); msg = T.miss(who, nm(i)); }
      render();
      if (r === "miss") {
        busy = true; render();
        later(function () {
          busy = false; cur = 1 - cur;
          if (mode === 2) { pass = { t: T.passTurn(cur + 1), s: msg + T.passSuffix, go: "battle" }; ph = "pass"; }
          else if (cur === 1) aiTurn();
          render();
        }, mode === 2 ? 1000 : 800);
      } else if (mode === 1 && cur === 1) aiTurn();
    }
    function aiTurn() { busy = true; later(function () { busy = false; shoot(pick()); }, 750); }
    function pick() {
      var t = P[0], open = [], hits = [], i;
      for (i = 0; i < 100; i++) if (!t.s[i]) open.push(i);
      for (i = 0; i < 100; i++) if (t.s[i] === 2 && !sunk(t, t.g[i])) hits.push(i);
      if (hits.length) {
        var c = new Set();
        hits.forEach(function (i) {
          [[i - 10, true], [i + 10, true], [i - 1, i % 10 > 0], [i + 1, i % 10 < 9]].forEach(function (pair) { var j = pair[0]; if (pair[1] && j >= 0 && j < 100 && !t.s[j]) c.add(j); });
        });
        var a = Array.from(c);
        if (hits.length > 1) {
          var hz = hits[1] - hits[0] < 10;
          var f = a.filter(function (j) { return hits.some(function (i) { return hz ? (j / 10 | 0) === (i / 10 | 0) : j % 10 === i % 10; }); });
          if (f.length) a = f;
        }
        if (a.length) return a[Math.random() * a.length | 0];
      }
      var pr = open.filter(function (i) { return ((i / 10 | 0) + i % 10) % 2 === 0; }), src = pr.length ? pr : open;
      return src[Math.random() * src.length | 0];
    }
    function onClick(e) {
      var t = e.target.closest("[data-a],.bs-c");
      if (!t || !root.contains(t)) return;
      var a = t.getAttribute("data-a");
      if (a) {
        if (a === "new") { ph = "menu"; busy = false; timers.forEach(clearTimeout); timers = []; }
        else if (a === "snd") snd = !snd;
        else if (a === "m1" || a === "m2") { mode = a === "m1" ? 1 : 2; P = [mk(), mk()]; pl = 0; sel = 4; ph = "place"; }
        else if (a === "sel") sel = +t.getAttribute("data-n");
        else if (a === "rot") horiz = !horiz;
        else if (a === "rnd") randomize(P[pl]);
        else if (a === "clr") { P[pl] = mk(); sel = 4; }
        else if (a === "go") return finish();
        else if (a === "ready") ph = pass.go;
        render(); return;
      }
      var i = +t.getAttribute("data-i"), id = t.parentElement.getAttribute("data-board");
      if (id === "pb") {
        var p = P[pl];
        if (p.g[i]) { sel = p.ships[p.g[i] - 1].cs.length; unput(p, p.g[i]); }
        else {
          var cs = cells(i, sel, horiz);
          if (left(p, sel) > 0 && fits(p, cs)) { put(p, cs); if (!left(p, sel)) sel = [4, 3, 2, 1].find(function (n) { return left(p, n); }) || sel; }
          else beep(120, 0.15, "square", 0.04);
        }
        render();
      } else if (id === "eb" && ph === "battle" && !busy && (mode === 2 || cur === 0) && !P[1 - cur].s[i]) shoot(i);
    }
    function onOver(e) { if (ph !== "place") return; var c = e.target.closest('[data-board="pb"] .bs-c'); pv(c ? +c.getAttribute("data-i") : -1); }
    function onCtx(e) { if (ph === "place" && e.target.closest('[data-board="pb"]')) { e.preventDefault(); rot(); } }
    function onKey(e) { if (ph === "place" && /^[rRкК]$/.test(e.key) && !/input|textarea/i.test(e.target.tagName)) rot(); }
    root.addEventListener("click", onClick);
    root.addEventListener("mouseover", onOver);
    root.addEventListener("contextmenu", onCtx);
    document.addEventListener("keydown", onKey);
    render();
    return {
      destroy: function () {
        timers.forEach(clearTimeout);
        root.removeEventListener("click", onClick);
        root.removeEventListener("mouseover", onOver);
        root.removeEventListener("contextmenu", onCtx);
        document.removeEventListener("keydown", onKey);
        try { if (ac) ac.close(); } catch (e) {}
        root.innerHTML = ""; root.classList.remove("gm", "gm-battleship");
      }
    };
  }

  window.GAMES = window.GAMES || {};
  window.GAMES.battleship = { mount: mount, _test: { mk: mk, randomize: randomize, FLEET: FLEET, TEXT: TEXT } };
})();

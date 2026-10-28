(function () {
  "use strict";
  var S = window.SITE || {}, D = window.I18N || {};
  var LANGS = (S.languages || ["ru"]).filter(function (l) { return D[l]; });
  var studio = S.studio || {}, games = S.games || [], team = S.team || [], gallery = S.gallery || [];

  /* ---------- язык ---------- */
  function initialLang() {
    var l = null;
    try { l = new URLSearchParams(location.search).get("lang"); } catch (e) {}
    if (!l) try { l = localStorage.getItem("kletka-lang"); } catch (e) {}
    if (!l) {
      var nav = (navigator.languages || [navigator.language || ""]).map(function (x) { return String(x).slice(0, 2).toLowerCase(); });
      for (var i = 0; i < nav.length && !l; i++) if (LANGS.indexOf(nav[i]) >= 0) l = nav[i];
    }
    return LANGS.indexOf(l) >= 0 ? l : (S.defaultLanguage || "ru");
  }
  var lang = initialLang();
  function tr(v) {
    if (v == null) return "";
    if (typeof v === "object" && !Array.isArray(v)) return v[lang] != null ? v[lang] : (v.ru != null ? v.ru : "");
    return v;
  }
  function t(path) {
    function get(o) { return path.split(".").reduce(function (a, k) { return a == null ? a : a[k]; }, o); }
    var v = get(D[lang]);
    return v == null ? get(D.ru) : v;
  }
  function fill(str, map) { return String(str).replace(/\{(\w+)\}/g, function (_, k) { return map[k] != null ? map[k] : ""; }); }

  function $(sel, root) { return (root || document).querySelector(sel); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; });
  }
  function icon(id) { return '<svg aria-hidden="true"><use href="#' + id + '"/></svg>'; }
  function toast(msg) {
    var el = document.createElement("div");
    el.className = "toast"; el.setAttribute("role", "status"); el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(function () { el.remove(); }, 2000);
  }
  function gameById(id) { return games.filter(function (g) { return g.id === id; })[0]; }

  /* ---------- статичные тексты ---------- */
  function applyStatic() {
    document.documentElement.lang = lang;
    document.title = tr(studio.full) || document.title;
    var md = $('meta[name="description"]'); if (md) md.setAttribute("content", t("metaDesc"));
    document.querySelectorAll("[data-i18n]").forEach(function (n) { n.textContent = t(n.getAttribute("data-i18n")); });
    document.querySelectorAll("[data-i18n-html]").forEach(function (n) { n.innerHTML = t(n.getAttribute("data-i18n-html")); });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (n) { n.setAttribute("placeholder", t(n.getAttribute("data-i18n-ph"))); });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (n) { n.setAttribute("aria-label", t(n.getAttribute("data-i18n-aria"))); });
    document.querySelectorAll("[data-studio]").forEach(function (n) { n.textContent = tr(studio[n.getAttribute("data-studio")]); });
    $("#year").textContent = new Date().getFullYear();
  }
  function renderLangSwitch() {
    $("#langSwitch").innerHTML = LANGS.map(function (l) {
      return '<button type="button" data-lang="' + l + '" aria-pressed="' + (l === lang) + '" title="' + esc(D[l].langName) + '" lang="' + l + '">' + l.toUpperCase() + "</button>";
    }).join("");
  }

  /* ---------- обложки игр ---------- */
  var COVER = {
    hangman: {
      ru: { title: "Виселица", slots: ["С", "А", "М", "", "Л", "", "Т"], wrong: "К Ы Р Д" },
      ky: { title: "Дарга асуу", slots: ["К", "", "Т", "Е", ""], wrong: "Ш Ө Ң" },
      en: { title: "Hangman", slots: ["R", "O", "C", "", "E", ""], wrong: "Z Q K" }
    },
    battleship: { ru: "Морской бой", ky: "Деңиз согушу", en: "Battleship" }
  };
  function cover(id, tall) {
    if (id === "hangman") {
      var c = COVER.hangman[lang] || COVER.hangman.ru;
      return '<span class="cv cv-hang' + (tall ? " tall" : "") + '" lang="' + lang + '"><svg viewBox="0 0 180 240" aria-hidden="true"><g class="gal"><path d="M18 226 H132"/><path d="M52 226 V18"/><path d="M52 18 H140"/><path d="M52 56 L90 18"/><path d="M140 18 V52"/></g>' +
        '<g class="fig"><circle cx="140" cy="70" r="18"/><path d="M140 88 V152"/><path d="M140 104 L116 132"/><path d="M140 104 L164 132"/></g><circle class="face" cx="134" cy="66" r="2"/><circle class="face" cx="146" cy="66" r="2"/></svg>' +
        '<span><span class="title">' + esc(c.title) + '</span><span class="slots">' + c.slots.map(function (s) { return "<span>" + esc(s) + "</span>"; }).join("") + '</span><span class="wrong">' + esc(c.wrong) + "</span></span></span>";
    }
    if (id === "wordchain") {
      var tiles = function (w) { return '<span class="tiles">' + w.split("").map(function (ch, i) { return "<i" + (i === 0 ? ' class="h"' : i === w.length - 1 ? ' class="y"' : "") + ">" + ch + "</i>"; }).join("") + "</span>"; };
      return '<span class="cv cv-word"><span class="ttl">Finish the Word</span><span class="big">E</span><span class="bar"><i></i></span>' +
        '<span class="chain">' + tiles("TIGER") + '<span class="arr">→</span>' + tiles("RIVER") + '<span class="arr">→</span>' + tiles("ROBE") + "</span></span>";
    }
    var map = "..........s...m.....s.......hh....m.......m.....s......m...s.kk.....s..........m....m.sss.........m....", g = "";
    for (var i = 0; i < 100; i++) {
      var ch = map[i] || ".";
      g += "<i" + (ch === "s" ? ' class="sh"' : ch === "m" ? ' class="ms"' : ch === "h" ? ' class="hit"' : ch === "k" ? ' class="hit sk"' : "") + "></i>";
    }
    return '<span class="cv cv-sea" lang="' + lang + '"><span class="ttl">' + esc(COVER.battleship[lang] || COVER.battleship.ru) + '</span><span class="grid10">' + g + "</span></span>";
  }

  /* ---------- секции ---------- */
  function renderHero() {
    $("#facts").innerHTML = t("hero.facts").map(function (f) { return '<div class="fact"><b>' + esc(f[0]) + "</b><span>" + esc(f[1]) + "</span></div>"; }).join("");
    $("#bento").innerHTML = games.map(function (g, i) {
      return '<button type="button" class="tile" data-play="' + esc(g.id) + '" aria-label="' + esc(t("ui.playAria") + tr(g.title)) + '">' + cover(g.id, i === 0) +
        '<span class="tile-label">' + icon("i-play") + "<span>" + esc(tr(g.title)) + "</span></span></button>";
    }).join("");
  }
  function renderGames() {
    $("#gameList").innerHTML = games.map(function (g) {
      var l = g.links || {};
      return '<article class="game" id="game-' + esc(g.id) + '">' +
        '<button type="button" class="game-cover" data-play="' + esc(g.id) + '" aria-label="' + esc(t("ui.playAria") + tr(g.title)) + '">' + cover(g.id, false) + "</button>" +
        '<div class="game-body">' +
          '<div class="game-meta"><span class="pill">' + esc(tr(g.genre)) + "</span></div>" +
          "<h3>" + esc(tr(g.title)) + "</h3>" +
          '<p class="game-summary">' + esc(tr(g.summary)) + "</p>" +
          '<ul class="modes">' + (tr(g.modes) || []).map(function (m) { return "<li>" + icon("i-check") + "<span>" + esc(m) + "</span></li>"; }).join("") + "</ul>" +
          '<dl class="specs"><div><dt>' + esc(t("games.players")) + "</dt><dd>" + esc(tr(g.players)) + "</dd></div><div><dt>" + esc(t("games.session")) + "</dt><dd>" + esc(tr(g.session)) + "</dd></div><div><dt>" + esc(t("games.year")) + "</dt><dd>" + esc(g.year) + "</dd></div></dl>" +
          '<div class="game-actions"><button type="button" class="btn btn-primary btn-sm" data-play="' + esc(g.id) + '">' + icon("i-play") + esc(t("games.play")) + "</button>" +
            (l.online ? '<a class="text-link" href="' + esc(l.online) + '" target="_blank" rel="noopener">' + icon("i-users") + esc(t("games.online")) + "</a>" : "") +
            (l.repo ? '<a class="text-link" href="' + esc(l.repo) + '" target="_blank" rel="noopener">' + icon("i-gh") + "GitHub</a>" : "") +
        "</div></div></article>";
    }).join("");
  }
  function renderAbout() {
    $("#aboutText").innerHTML = t("about.p").map(function (p) { return "<p>" + esc(fill(p, { studio: tr(studio.full) })) + "</p>"; }).join("");
    var icons = ["i-clock", "i-target", "i-globe", "i-code"];
    $("#principles").innerHTML = t("about.principles").map(function (p, i) {
      return '<div class="principle"><span class="ic">' + icon(icons[i] || "i-check") + "</span><b>" + esc(p[0]) + "</b><span>" + esc(p[1]) + "</span></div>";
    }).join("");
  }
  function renderSteps() {
    $("#steps").innerHTML = t("process.steps").map(function (s) {
      return '<li class="step"><b>' + esc(s[0]) + '</b><span class="dur">' + esc(s[1]) + "</span><p>" + esc(s[2]) + "</p></li>";
    }).join("");
  }

  /* ---------- команда и оценки ---------- */
  var live = {}, RATED = "kletka-rated";
  function getRated() { try { return JSON.parse(localStorage.getItem(RATED) || "{}") || {}; } catch (e) { return {}; } }
  function setRated(id, stars) { try { var r = getRated(); r[id] = stars; localStorage.setItem(RATED, JSON.stringify(r)); } catch (e) {} }
  function statsFor(dev) {
    var seed = dev.rating || {}, l = live[dev.id] || {};
    var sc = +seed.count || 0, sa = +seed.avg || 0, lc = +l.count || 0, ls = +l.sum || 0, count = sc + lc;
    return { count: count, avg: count ? (sa * sc + ls) / count : 0 };
  }
  function starsHtml(avg) {
    var five = ""; for (var i = 0; i < 5; i++) five += '<svg aria-hidden="true"><use href="#i-star"/></svg>';
    return '<span class="rating-stars">' + five + '<span class="fill" style="width:' + (avg / 5 * 100).toFixed(1) + '%">' + five + "</span></span>";
  }
  function ratingHtml(dev) {
    var s = statsFor(dev);
    if (!s.count) return '<div class="rating">' + starsHtml(0) + '<span class="rating-count">' + esc(t("team.noRatings")) + "</span></div>";
    var avg = lang === "en" ? s.avg.toFixed(1) : s.avg.toFixed(1).replace(".", ","), cnt = t("team.ratings")(s.count);
    return '<div class="rating" aria-label="' + esc(t("team.ratingAria")(avg, cnt)) + '">' + starsHtml(s.avg) + '<span class="rating-num">' + avg + '</span><span class="rating-count">· ' + esc(cnt) + "</span></div>";
  }
  function renderTeam() {
    var rated = getRated();
    $("#teamList").innerHTML = team.map(function (d) {
      var gl = (d.games || []).map(function (gid) { var g = gameById(gid); return '<button type="button" data-play="' + esc(gid) + '">' + esc(g ? tr(g.title) : gid) + "</button>"; }).join(", ");
      var links = "";
      if (d.links && d.links.github) links += '<a class="icon-btn" href="' + esc(d.links.github) + '" target="_blank" rel="noopener" aria-label="GitHub">' + icon("i-gh") + "</a>";
      if (d.links && d.links.telegram) links += '<a class="icon-btn" href="https://t.me/' + esc(d.links.telegram) + '" target="_blank" rel="noopener" aria-label="Telegram">' + icon("i-tg") + "</a>";
      var action = rated[d.id]
        ? '<span class="rated">' + icon("i-check") + esc(t("team.rated")(rated[d.id])) + "</span>"
        : '<button type="button" class="btn btn-line btn-sm" data-rate="' + esc(d.id) + '">' + icon("i-star") + esc(t("team.rate")) + "</button>";
      return '<article class="dev' + (d.founder ? " founder" : "") + '">' + (d.founder ? '<span class="badge">' + esc(t("team.founder")) + "</span>" : "") +
        '<img class="dev-photo" src="' + esc(d.photo) + '" alt="' + esc(tr(d.name)) + '" width="64" height="64">' +
        "<div><h3>" + esc(tr(d.name)) + '</h3><p class="dev-role">' + esc(tr(d.role)) + "</p></div>" +
        ratingHtml(d) +
        '<p class="dev-bio">' + esc(tr(d.bio)) + "</p>" +
        '<div class="tags">' + (tr(d.skills) || []).map(function (s) { return '<span class="tag">' + esc(s) + "</span>"; }).join("") + "</div>" +
        '<p class="dev-exp">' + esc(tr(d.experience)) + "</p>" +
        (gl ? '<p class="dev-games">' + esc(t("team.games")) + " " + gl + "</p>" : "") +
        '<div class="dev-actions">' + action + links + "</div></article>";
    }).join("");
  }
  if (S.ratingsEndpoint && team.length) {
    fetch(S.ratingsEndpoint, { headers: { Accept: "application/json" } })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) { if (j && j.ok && j.ratings) { live = j.ratings; renderTeam(); } })
      .catch(function () { /* сервер недоступен: показываем рейтинг из config.js */ });
  }

  /* ---------- галерея ---------- */
  var lbIndex = 0;
  function renderGallery() {
    $("#galleryGrid").innerHTML = gallery.map(function (g, i) {
      var cap = tr(g.caption);
      return '<figure class="g-item"><button type="button" class="g-btn" data-lb="' + i + '" aria-label="' + esc(t("ui.open") + cap) + '"><img src="' + esc(g.src) + '" alt="' + esc(cap) + '" loading="lazy"></button>' +
        "<figcaption><span>" + esc(cap) + "</span></figcaption></figure>";
    }).join("");
  }
  var lb = $("#lightbox");
  function renderLb() {
    var g = gallery[lbIndex], cap = tr(g.caption);
    lb.setAttribute("aria-label", cap);
    lb.innerHTML = '<div class="lightbox"><img src="' + esc(g.src) + '" alt="' + esc(cap) + '"><div class="lb-bar">' +
      '<button type="button" class="lb-btn" data-lb-step="-1" aria-label="' + esc(t("ui.prev")) + '">' + icon("i-left") + "</button>" +
      '<button type="button" class="lb-btn" data-lb-step="1" aria-label="' + esc(t("ui.next")) + '">' + icon("i-right") + "</button>" +
      "<p>" + esc(cap) + '</p><span class="count">' + (lbIndex + 1) + " / " + gallery.length + "</span>" +
      '<button type="button" class="lb-btn" data-close aria-label="' + esc(t("ui.close")) + '">' + icon("i-x") + "</button></div></div>";
  }
  lb.addEventListener("click", function (e) {
    var s = e.target.closest("[data-lb-step]");
    if (s) { lbIndex = (lbIndex + (+s.getAttribute("data-lb-step")) + gallery.length) % gallery.length; renderLb(); return; }
    if (e.target === lb || e.target.closest("[data-close]")) lb.close();
  });
  lb.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") { lbIndex = (lbIndex + (e.key === "ArrowRight" ? 1 : -1) + gallery.length) % gallery.length; renderLb(); }
  });

  /* ---------- контакты, форма, подвал ---------- */
  function renderContact() {
    $("#contactLead").textContent = fill(t("contact.p"), { time: t("contact.time") });
    var ch = [];
    if (studio.telegram) ch.push({ icon: "i-tg", label: t("contact.bot"), value: "@" + studio.telegram, href: "https://t.me/" + studio.telegram });
    if (studio.email) ch.push({ icon: "i-mail", label: t("contact.email"), value: studio.email });
    if (studio.github) ch.push({ icon: "i-gh", label: "GitHub", value: studio.github.replace(/^https?:\/\//, ""), href: studio.github });
    $("#channels").innerHTML = ch.map(function (c) {
      var val = c.href ? '<a class="val" href="' + esc(c.href) + '" target="_blank" rel="noopener">' + esc(c.value) + "</a>" : '<span class="val">' + esc(c.value) + "</span>";
      return '<div class="channel"><span class="channel-icon">' + icon(c.icon) + "</span><div><small>" + esc(c.label) + "</small>" + val + "</div>" +
        '<button type="button" class="copy-btn" data-copy="' + esc(c.value) + '">' + esc(t("contact.copy")) + "</button></div>";
    }).join("");
    // в Telegram уходят русские значения списков, на экране — перевод
    [["#f-channel", "form.channels"], ["#f-type", "form.types"], ["#f-budget", "form.budgets"]].forEach(function (pair) {
      var sel = $(pair[0]), idx = Math.max(0, sel.selectedIndex), ru = D.ru.form[pair[1].split(".")[1]], cur = t(pair[1]);
      sel.innerHTML = cur.map(function (label, i) { return '<option value="' + esc(ru[i]) + '">' + esc(label) + "</option>"; }).join("");
      sel.selectedIndex = Math.min(idx, cur.length - 1);
    });
    var fl = games.map(function (g) { return '<a href="#game-' + esc(g.id) + '">' + esc(tr(g.title)) + "</a>"; });
    if (studio.github) fl.push('<a href="' + esc(studio.github) + '" target="_blank" rel="noopener">GitHub</a>');
    if (studio.telegram) fl.push('<a href="https://t.me/' + esc(studio.telegram) + '" target="_blank" rel="noopener">Telegram</a>');
    $("#footerLinks").innerHTML = fl.join("");
  }

  function renderAll() {
    applyStatic(); renderLangSwitch(); renderHero(); renderGames(); renderAbout(); renderTeam(); renderGallery(); renderSteps(); renderContact();
    var hint = $("#starHint"); if (hint && !$("#rateForm").querySelector("input[name=stars]:checked")) hint.textContent = t("rate.hint");
  }
  renderAll();

  $("#langSwitch").addEventListener("click", function (e) {
    var b = e.target.closest("[data-lang]"); if (!b) return;
    lang = b.getAttribute("data-lang");
    try { localStorage.setItem("kletka-lang", lang); } catch (err) {}
    renderAll();
  });

  /* ---------- меню ---------- */
  var nav = $("#nav"), menuBtn = $("#menuBtn");
  menuBtn.addEventListener("click", function () { var open = nav.classList.toggle("open"); menuBtn.setAttribute("aria-expanded", open ? "true" : "false"); });
  nav.addEventListener("click", function (e) { if (e.target.closest("a")) { nav.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); } });

  /* ---------- окно игры ---------- */
  var pd = $("#playDialog"), playBody = $("#playBody"), active = null;
  function openGame(id) {
    var g = gameById(id), engine = window.GAMES && window.GAMES[id];
    if (!g || !engine) { toast(t("ui.loadFail")); return; }
    if (active) { try { active.destroy(); } catch (e) {} }
    $("#playTitle").textContent = tr(g.title);
    $("#playNewTab").href = "games/" + id + ".html?lang=" + lang;
    playBody.innerHTML = "";
    var host = document.createElement("div");
    playBody.appendChild(host);
    active = engine.mount(host, { base: "games/", lang: lang });
    document.body.classList.add("locked");
    if (!pd.open) pd.showModal();
    playBody.scrollTop = 0;
    try { history.replaceState(null, "", "#play-" + id); } catch (e) {}
  }
  pd.addEventListener("close", function () {
    if (active) { try { active.destroy(); } catch (e) {} active = null; }
    playBody.innerHTML = "";
    document.body.classList.remove("locked");
    try { history.replaceState(null, "", location.pathname + location.search + "#games"); } catch (e) {}
  });
  pd.addEventListener("click", function (e) { if (e.target.closest("[data-close]")) pd.close(); });
  var m = /^#play-([a-z]+)$/.exec(location.hash);
  if (m) setTimeout(function () { openGame(m[1]); }, 0);

  /* ---------- общий обработчик кликов ---------- */
  document.addEventListener("click", function (e) {
    var p = e.target.closest("[data-play]");
    if (p) { openGame(p.getAttribute("data-play")); return; }
    var r = e.target.closest("[data-rate]");
    if (r) { openRate(r.getAttribute("data-rate")); return; }
    var l = e.target.closest("[data-lb]");
    if (l) { lbIndex = +l.getAttribute("data-lb"); renderLb(); lb.showModal(); return; }
    var c = e.target.closest("[data-copy]");
    if (c) {
      var text = c.getAttribute("data-copy");
      var fallback = function () {
        var v = c.parentNode.querySelector(".val");
        if (v) { var rg = document.createRange(); rg.selectNodeContents(v); var s = getSelection(); s.removeAllRanges(); s.addRange(rg); }
        toast(t("contact.selected"));
      };
      try { navigator.clipboard.writeText(text).then(function () { toast(t("contact.copied") + text); }, fallback); } catch (err) { fallback(); }
    }
  });

  /* ---------- оценка ---------- */
  var rd = $("#rateDialog"), rf = $("#rateForm"), rStatus = $("#rateStatus"), rBtn = $("#rateSubmit");
  function openRate(id) {
    var d = team.filter(function (x) { return x.id === id; })[0];
    if (!d) return;
    rf.reset(); rStatus.hidden = true;
    $("#starPicker").classList.remove("invalid");
    $("#starHint").textContent = t("rate.hint");
    $("#r-dev").value = d.id;
    $("#rateTitle").textContent = tr(d.name);
    $("#rateRole").textContent = tr(d.role);
    $("#rateAvatar").src = d.photo; $("#rateAvatar").alt = tr(d.name);
    rBtn.disabled = false; rBtn.textContent = t("rate.submit");
    rd.showModal();
  }
  rd.addEventListener("click", function (e) { if (e.target === rd || e.target.closest("[data-close]")) rd.close(); });
  rf.addEventListener("change", function (e) {
    if (e.target.name === "stars") {
      $("#starPicker").classList.remove("invalid");
      $("#starHint").textContent = t("rate.picked")(e.target.value, t("rate.hints")[e.target.value - 1]);
    }
  });
  rf.addEventListener("submit", function (e) {
    e.preventDefault();
    var f = rf.elements, checked = rf.querySelector('input[name="stars"]:checked');
    if (!checked) { $("#starPicker").classList.add("invalid"); $("#starHint").textContent = t("rate.need"); return; }
    var devId = f.devId.value, stars = +checked.value, d = team.filter(function (x) { return x.id === devId; })[0];
    rBtn.disabled = true;
    rBtn.innerHTML = '<span class="spinner" aria-hidden="true"></span>';
    rStatus.hidden = true;
    fetch(S.rateEndpoint || "/api/rate", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ devId: devId, devName: d ? (d.name.ru || tr(d.name)) : devId, stars: stars, name: f.name.value.trim(), project: f.project.value.trim(), comment: f.comment.value.trim(), website: f.website.value, page: location.href.split("#")[0], lang: lang })
    }).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (j) { return { status: r.status, j: j }; });
    }).then(function (res) {
      if (res.status === 409) { setRated(devId, stars); renderTeam(); throw { known: t("rate.dup") }; }
      if (!res.j.ok) throw { server: res.j.error };
      if (res.j.stats) live[devId] = res.j.stats;
      else { var l = live[devId] || { sum: 0, count: 0 }; live[devId] = { sum: (+l.sum || 0) + stars, count: (+l.count || 0) + 1 }; }
      setRated(devId, stars); renderTeam();
      rStatus.className = "form-status ok"; rStatus.innerHTML = t("rate.ok"); rStatus.hidden = false;
      rBtn.textContent = t("rate.done");
      setTimeout(function () { if (rd.open) rd.close(); }, 1800);
    }).catch(function (err) {
      rStatus.className = "form-status error";
      rStatus.innerHTML = esc(err && err.known ? err.known : (lang === "ru" && err && err.server ? err.server + "." : t("rate.fail")));
      rStatus.hidden = false;
      rBtn.disabled = false; rBtn.textContent = t("rate.submit");
    });
  });

  /* ---------- заявка ---------- */
  var form = $("#leadForm"), statusBox = $("#formStatus"), btn = $("#submitBtn");
  var placeholders = { "Telegram": "@username", "WhatsApp": "+996 555 000 000", "Email": "name@mail.com", "Телефон": "+996 555 000 000" };
  $("#f-channel").addEventListener("change", function () { $("#f-contact").placeholder = placeholders[$("#f-channel").value] || ""; });
  function setError(id, msg) {
    var field = document.getElementById(id).closest(".field");
    var old = field.querySelector(".err"); if (old) old.remove();
    field.classList.toggle("invalid", !!msg);
    if (msg) { var el = document.createElement("span"); el.className = "err"; el.textContent = msg; field.appendChild(el); }
  }
  function showStatus(kind, html) { statusBox.className = "form-status " + kind; statusBox.innerHTML = html; statusBox.hidden = false; }
  function collect() {
    var f = form.elements;
    return { name: f.name.value.trim(), channel: f.channel.value, contact: f.contact.value.trim(), type: f.type.value, budget: f.budget.value,
      message: f.message.value.trim(), agree: f.agree.checked, website: f.website.value, page: location.href.split("#")[0], lang: lang };
  }
  var DRAFT = "kletka-lead-draft";
  try {
    var saved = JSON.parse(localStorage.getItem(DRAFT) || "null");
    if (saved) ["name", "channel", "contact", "type", "budget", "message"].forEach(function (k) { if (saved[k] && form.elements[k]) form.elements[k].value = saved[k]; });
  } catch (e) {}
  var draftTimer;
  form.addEventListener("input", function () {
    clearTimeout(draftTimer);
    draftTimer = setTimeout(function () { try { localStorage.setItem(DRAFT, JSON.stringify(collect())); } catch (e) {} }, 400);
  });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    statusBox.hidden = true;
    var d = collect(), ok = true;
    setError("f-name", ""); setError("f-contact", ""); setError("f-message", "");
    if (d.name.length < 2) { setError("f-name", t("form.errName")); ok = false; }
    if (d.contact.length < 3) { setError("f-contact", t("form.errContact")); ok = false; }
    else if (d.channel === "Email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.contact)) { setError("f-contact", t("form.errEmail")); ok = false; }
    if (d.message.length < 10) { setError("f-message", t("form.errMessage")); ok = false; }
    if (!d.agree) { showStatus("error", esc(t("form.errAgree"))); ok = false; }
    if (!ok) return;
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner" aria-hidden="true"></span> ' + esc(t("form.sending"));
    fetch(S.formEndpoint || "/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(d) })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok && j.ok, j: j }; }); })
      .then(function (res) {
        if (!res.ok) throw { server: res.j && res.j.error };
        form.reset();
        try { localStorage.removeItem(DRAFT); } catch (e2) {}
        showStatus("ok", fill(t("form.ok"), { time: esc(t("contact.time")) }));
      })
      .catch(function (err) {
        var head = lang === "ru" && err && err.server ? esc(err.server) + "." : esc(t("form.fail"));
        showStatus("error", head + " " + fill(t("form.retry"), { tg: esc(studio.telegram || "") }));
      })
      .then(function () { btn.disabled = false; btn.textContent = t("form.submit"); });
  });
})();

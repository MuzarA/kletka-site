/* Тексты интерфейса сайта на трёх языках. Содержимое (игры, команда, галерея) — в config.js. */
window.I18N = {
  ru: {
    langName: "Русский",
    metaDesc: "Студия браузерных игр: Виселица на двоих, Finish the Word и Морской бой. Играйте прямо на сайте или закажите игру.",
    nav: { games: "Игры", about: "Студия", team: "Команда", gallery: "Галерея", contact: "Контакты", cta: "Консультация", menu: "Открыть меню", lang: "Язык сайта" },
    hero: {
      eyebrow: "Студия браузерных игр",
      h1: "Браузерные игры, в которые играют <em>вместе</em>",
      lead: "Делаем словесные дуэли, игры на время и настольную классику. Они открываются по ссылке, без установки, на телефоне и компьютере.",
      play: "Сыграть сейчас", order: "Заказать игру",
      facts: [["3", "игры на сайте"], ["112 тыс.", "слов в словаре"], ["3", "языка интерфейса"]]
    },
    games: {
      eyebrow: "Наши игры", h2: "Три игры, в которые можно сыграть прямо сейчас",
      p: "Игра откроется на весь экран. Играйте против компьютера или с другом за одним устройством.",
      play: "Играть", online: "Онлайн с друзьями", repo: "Код на GitHub",
      players: "Игроки", session: "Партия", year: "Год"
    },
    about: {
      eyebrow: "Студия", h2: "Маленькие игры, сделанные всерьёз",
      p: [
        "{studio} делает браузерные игры, в которые играют вдвоём или компанией. Нам интересны игры, которые объясняются за минуту и затягивают на весь вечер.",
        "Каждую игру доводим до состояния, когда в неё удобно играть и на телефоне, и на большом мониторе. Без установки и регистрации: открыл ссылку и играешь.",
        "Делаем игры и на заказ: для бренда, мероприятия, обучения или в подарок."
      ],
      principles: [
        ["Правила за минуту", "Если игру долго объяснять, мы её упрощаем. Правила помещаются на один экран."],
        ["Честный соперник", "Компьютер не знает ваших кораблей и слов. Он побеждает стратегией, а сложность можно выбрать."],
        ["Три языка", "Сайт и игры работают на русском, кыргызском и английском."],
        ["Открытый код", "Исходники игр лежат на GitHub. Можно посмотреть, как всё устроено."]
      ]
    },
    team: {
      eyebrow: "Команда", h2: "Кто делает игры",
      p: "Работали с кем-то из нас или играли в наши игры? Поставьте оценку: она появится в рейтинге, а команда сразу получит ваш отзыв.",
      founder: "Основатель", noRatings: "Пока нет оценок", rate: "Оценить", games: "Игры:",
      ratings: function (n) { var m10 = n % 10, m100 = n % 100; return n + " " + (m10 === 1 && m100 !== 11 ? "оценка" : m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14) ? "оценки" : "оценок"); },
      rated: function (n) { return "Вы поставили " + n + " из 5"; },
      ratingAria: function (avg, cnt) { return "Рейтинг " + avg + " из 5, " + cnt; }
    },
    gallery: { eyebrow: "Галерея", h2: "Кадры из игр", p: "Как выглядят наши игры в разгар партии." },
    process: {
      eyebrow: "Игра на заказ", h2: "Как мы работаем",
      p: "Оплата по этапам. После каждого этапа у вас есть ссылка, по которой можно открыть и проверить игру.",
      steps: [
        ["Консультация", "30 минут · бесплатно", "Обсуждаем идею, аудиторию, сроки и бюджет. Честно говорим, что получится."],
        ["Прототип", "3–5 дней", "Игровой цикл без украшений, в который уже можно сыграть и понять, интересно ли."],
        ["Разработка", "от 2 недель", "Дизайн, соперник-компьютер, режимы, звук. Новая версия по ссылке каждую неделю."],
        ["Запуск", "по договорённости", "Публикуем на вашем домене, передаём код и помогаем с обновлениями."]
      ]
    },
    contact: {
      eyebrow: "Консультация", h2: "Расскажите, какую игру хотите",
      p: "Заполните форму: заявка сразу придёт нашему Telegram-боту, и мы ответим {time}. Можно и просто написать боту. Консультация бесплатная и ни к чему не обязывает.",
      time: "в течение рабочего дня", email: "Почта", bot: "Telegram-бот", copy: "Копировать", copied: "Скопировано: ", selected: "Выделено, нажмите Ctrl+C"
    },
    form: {
      title: "Заявка на консультацию", name: "Имя", namePh: "Как к вам обращаться", contact: "Как с вами связаться", channel: "Способ связи",
      channels: ["Telegram", "WhatsApp", "Email", "Телефон"],
      type: "Что нужно", types: ["Новая игра под ключ", "Игра для бренда или мероприятия", "Доработка нашей игры под вас", "Другое"],
      budget: "Ориентировочный бюджет", budgets: ["Пока не знаю", "до $300", "$300 – $1 000", "$1 000 – $3 000", "от $3 000"],
      message: "Об игре", messagePh: "Какая игра, для кого, сколько игроков, похожие игры, желаемые сроки",
      agree: "Согласен на обработку моих данных для ответа на заявку.", submit: "Отправить заявку", sending: "Отправляем…",
      note: "Заявка сразу приходит команде в Telegram.",
      errName: "Укажите имя", errContact: "Укажите контакт, чтобы мы могли ответить", errEmail: "Проверьте адрес почты",
      errMessage: "Опишите игру хотя бы в паре предложений", errAgree: "Отметьте согласие на обработку данных.",
      ok: "<b>Заявка отправлена.</b> Мы ответим {time}.", fail: "Не удалось отправить заявку.",
      retry: "Попробуйте ещё раз или напишите нам в Telegram: <b>@{tg}</b>. Текст заявки сохранён в форме."
    },
    rate: {
      eyebrow: "Оценка разработчика", legend: "Ваша оценка", hint: "Выберите от 1 до 5 звёзд",
      hints: ["Очень плохо", "Плохо", "Нормально", "Хорошо", "Отлично"], picked: function (n, h) { return n + " из 5 · " + h; },
      need: "Поставьте оценку от 1 до 5 звёзд", name: "Ваше имя или ник", optional: "Необязательно", project: "Игра или проект",
      comment: "Отзыв", commentPh: "Что понравилось, что можно улучшить", submit: "Отправить оценку",
      note: "Одна оценка на разработчика с одного устройства.",
      ok: "<b>Спасибо!</b> Оценка учтена, команда получила ваш отзыв.", done: "Готово",
      fail: "Не удалось отправить оценку. Попробуйте ещё раз чуть позже.", dup: "Вы уже оценивали этого разработчика."
    },
    ui: { newTab: "В новой вкладке", close: "Закрыть", prev: "Предыдущее", next: "Следующее", open: "Открыть: ", loadFail: "Игра не загрузилась. Обновите страницу.", playAria: "Играть: " }
  },

  ky: {
    langName: "Кыргызча",
    metaDesc: "Браузер оюндарынын студиясы: Дарга асуу, Finish the Word жана Деңиз согушу. Сайтта эле ойноңуз же оюнга буйрутма бериңиз.",
    nav: { games: "Оюндар", about: "Студия", team: "Команда", gallery: "Галерея", contact: "Байланыш", cta: "Кеңешме", menu: "Менюну ачуу", lang: "Сайттын тили" },
    hero: {
      eyebrow: "Браузер оюндарынын студиясы",
      h1: "<em>Чогуу</em> ойной турган браузер оюндары",
      lead: "Сөз дуэлдерин, убакытка оюндарды жана классикалык үстөл оюндарын жасайбыз. Алар шилтеме аркылуу, орнотпостон, телефондо да, компьютерде да ачылат.",
      play: "Азыр ойноо", order: "Оюнга буйрутма берүү",
      facts: [["3", "оюн сайтта"], ["112 миң", "сөз сөздүктө"], ["3", "интерфейс тили"]]
    },
    games: {
      eyebrow: "Биздин оюндар", h2: "Азыр эле ойной турган үч оюн",
      p: "Оюн толук экранда ачылат. Компьютерге каршы же бир түзмөктө досуң менен ойно.",
      play: "Ойноо", online: "Достор менен онлайн", repo: "GitHub'дагы код",
      players: "Оюнчулар", session: "Оюн убактысы", year: "Жыл"
    },
    about: {
      eyebrow: "Студия", h2: "Олуттуу жасалган кичинекей оюндар",
      p: [
        "{studio} экөөлөп же топ менен ойнолуучу браузер оюндарын жасайт. Бизди бир мүнөттө түшүндүрүлүп, бүт кечке тартып алган оюндар кызыктырат.",
        "Ар бир оюнду телефондо да, чоң мониторго да ыңгайлуу ойногудай кылып бүтүрөбүз. Орнотуусуз жана каттоосуз: шилтемени ачып, ойной бересиң.",
        "Буйрутма боюнча да оюн жасайбыз: бренд, иш-чара, окутуу үчүн же белек катары."
      ],
      principles: [
        ["Эрежелер бир мүнөттө", "Оюнду түшүндүрүү узакка созулса, аны жөнөкөйлөтөбүз. Эрежелер бир экранга батат."],
        ["Чынчыл атаандаш", "Компьютер сиздин кемелериңизди жана сөздөрүңүздү билбейт. Ал стратегия менен жеңет, ал эми татаалдыгын өзүңүз тандайсыз."],
        ["Үч тил", "Сайт жана оюндар орус, кыргыз жана англис тилдеринде иштейт."],
        ["Ачык код", "Оюндардын булак коду GitHub'да. Баары кантип түзүлгөнүн көрсө болот."]
      ]
    },
    team: {
      eyebrow: "Команда", h2: "Оюндарды ким жасайт",
      p: "Бирөөбүз менен иштештиңизби же оюндарыбызды ойнодуңузбу? Баа коюңуз: ал рейтингде көрүнөт, ал эми команда пикириңизди дароо алат.",
      founder: "Негиздөөчү", noRatings: "Азырынча баа жок", rate: "Баа берүү", games: "Оюндар:",
      ratings: function (n) { return n + " баа"; },
      rated: function (n) { return "Сиз 5тен " + n + " койдуңуз"; },
      ratingAria: function (avg, cnt) { return "Рейтинг 5тен " + avg + ", " + cnt; }
    },
    gallery: { eyebrow: "Галерея", h2: "Оюндардан кадрлар", p: "Оюндарыбыз кызуу учурда кандай көрүнөт." },
    process: {
      eyebrow: "Буйрутма оюн", h2: "Биз кантип иштейбиз",
      p: "Төлөм этап боюнча. Ар бир этаптан кийин оюнду ачып текшере турган шилтемеңиз болот.",
      steps: [
        ["Кеңешме", "30 мүнөт · акысыз", "Идеяны, аудиторияны, мөөнөттү жана бюджетти талкуулайбыз. Эмне чыгарын ачык айтабыз."],
        ["Прототип", "3–5 күн", "Кооздоосуз оюн цикли: ойноп көрүп, кызыкпы же жокпу түшүнсө болот."],
        ["Иштеп чыгуу", "2 жумадан", "Дизайн, компьютер-атаандаш, режимдер, үн. Ар жумада шилтеме боюнча жаңы версия."],
        ["Ишке киргизүү", "макулдашуу боюнча", "Сиздин доменге жарыялайбыз, кодду өткөрүп беребиз жана жаңылоолорго жардам беребиз."]
      ]
    },
    contact: {
      eyebrow: "Кеңешме", h2: "Кандай оюн керек экенин айтыңыз",
      p: "Форманы толтуруңуз: арыз дароо Telegram-ботубузга келет, биз {time} жооп беребиз. Ботко түз жазсаңыз да болот. Кеңешме акысыз жана эч нерсеге милдеттендирбейт.",
      time: "бир иш күнүнүн ичинде", email: "Почта", bot: "Telegram-бот", copy: "Көчүрүү", copied: "Көчүрүлдү: ", selected: "Белгиленди, Ctrl+C басыңыз"
    },
    form: {
      title: "Кеңешмеге арыз", name: "Аты", namePh: "Сизге кантип кайрылалы", contact: "Сиз менен кантип байланышабыз", channel: "Байланыш жолу",
      channels: ["Telegram", "WhatsApp", "Email", "Телефон"],
      type: "Эмне керек", types: ["Даяр жаңы оюн", "Бренд же иш-чара үчүн оюн", "Биздин оюнду сизге ылайыктоо", "Башка"],
      budget: "Болжолдуу бюджет", budgets: ["Азырынча билбейм", "$300гө чейин", "$300 – $1 000", "$1 000 – $3 000", "$3 000дон жогору"],
      message: "Оюн жөнүндө", messagePh: "Кандай оюн, ким үчүн, канча оюнчу, окшош оюндар, каалаган мөөнөт",
      agree: "Арызга жооп берүү үчүн маалыматтарымды иштетүүгө макулмун.", submit: "Арыз жөнөтүү", sending: "Жөнөтүлүүдө…",
      note: "Арыз командага дароо Telegram аркылуу келет.",
      errName: "Атыңызды жазыңыз", errContact: "Жооп бере алышыбыз үчүн байланыш жазыңыз", errEmail: "Почта дарегин текшериңиз",
      errMessage: "Оюнду жок дегенде эки сүйлөм менен сүрөттөңүз", errAgree: "Маалыматтарды иштетүүгө макулдугуңузду белгилеңиз.",
      ok: "<b>Арыз жөнөтүлдү.</b> Биз {time} жооп беребиз.", fail: "Арызды жөнөтүү мүмкүн болгон жок.",
      retry: "Кайра аракет кылыңыз же бизге Telegram'га жазыңыз: <b>@{tg}</b>. Арыздын тексти формада сакталды."
    },
    rate: {
      eyebrow: "Иштеп чыгуучуга баа", legend: "Сиздин баа", hint: "1ден 5ке чейин жылдыз тандаңыз",
      hints: ["Абдан начар", "Начар", "Орточо", "Жакшы", "Эң сонун"], picked: function (n, h) { return "5тен " + n + " · " + h; },
      need: "1ден 5ке чейин баа коюңуз", name: "Атыңыз же никиңиз", optional: "Милдеттүү эмес", project: "Оюн же долбоор",
      comment: "Пикир", commentPh: "Эмне жакты, эмнени жакшыртса болот", submit: "Бааны жөнөтүү",
      note: "Бир түзмөктөн бир иштеп чыгуучуга бир баа.",
      ok: "<b>Рахмат!</b> Баа эсепке алынды, команда пикириңизди алды.", done: "Даяр",
      fail: "Бааны жөнөтүү мүмкүн болгон жок. Бир аздан кийин кайра аракет кылыңыз.", dup: "Сиз бул иштеп чыгуучуга мурун баа бергенсиз."
    },
    ui: { newTab: "Жаңы өтмөктө", close: "Жабуу", prev: "Мурунку", next: "Кийинки", open: "Ачуу: ", loadFail: "Оюн жүктөлгөн жок. Баракты жаңылаңыз.", playAria: "Ойноо: " }
  },

  en: {
    langName: "English",
    metaDesc: "A browser game studio: Hangman Duel, Finish the Word and Battleship. Play right on the site or order a game from us.",
    nav: { games: "Games", about: "Studio", team: "Team", gallery: "Gallery", contact: "Contact", cta: "Consultation", menu: "Open menu", lang: "Site language" },
    hero: {
      eyebrow: "Browser game studio",
      h1: "Browser games made to play <em>together</em>",
      lead: "We make word duels, timed games and tabletop classics. They open from a link with nothing to install, on phones and computers.",
      play: "Play now", order: "Order a game",
      facts: [["3", "games on the site"], ["112k", "words in the dictionary"], ["3", "interface languages"]]
    },
    games: {
      eyebrow: "Our games", h2: "Three games you can play right now",
      p: "Each game opens full screen. Play the computer or a friend on the same device.",
      play: "Play", online: "Online with friends", repo: "Code on GitHub",
      players: "Players", session: "Game length", year: "Year"
    },
    about: {
      eyebrow: "Studio", h2: "Small games, made seriously",
      p: [
        "{studio} makes browser games for two players or a group. We like games that take a minute to explain and keep you playing all evening.",
        "We polish every game until it plays well on a phone and on a big monitor. No installs, no sign-up: open the link and play.",
        "We also make games to order: for a brand, an event, a class or as a gift."
      ],
      principles: [
        ["Rules in a minute", "If a game takes long to explain, we simplify it. The rules fit on one screen."],
        ["A fair opponent", "The computer never sees your ships or words. It wins on strategy, and you choose the difficulty."],
        ["Three languages", "The site and the games work in Russian, Kyrgyz and English."],
        ["Open code", "The games' source code is on GitHub, so you can see how everything works."]
      ]
    },
    team: {
      eyebrow: "Team", h2: "Who makes the games",
      p: "Worked with one of us or played our games? Leave a rating: it shows up in the ranking and the team gets your review right away.",
      founder: "Founder", noRatings: "No ratings yet", rate: "Rate", games: "Games:",
      ratings: function (n) { return n + (n === 1 ? " rating" : " ratings"); },
      rated: function (n) { return "You gave " + n + " of 5"; },
      ratingAria: function (avg, cnt) { return "Rated " + avg + " of 5, " + cnt; }
    },
    gallery: { eyebrow: "Gallery", h2: "Shots from the games", p: "What our games look like mid-game." },
    process: {
      eyebrow: "Custom games", h2: "How we work",
      p: "You pay per stage. After each stage you get a link to open and check the game.",
      steps: [
        ["Consultation", "30 minutes · free", "We discuss the idea, audience, timeline and budget, and tell you honestly what's realistic."],
        ["Prototype", "3–5 days", "The core loop without the polish, already playable so you can tell whether it's fun."],
        ["Development", "from 2 weeks", "Design, computer opponent, modes, sound. A new version at your link every week."],
        ["Launch", "by agreement", "We publish on your domain, hand over the code and help with updates."]
      ]
    },
    contact: {
      eyebrow: "Consultation", h2: "Tell us what game you want",
      p: "Fill in the form: your request goes straight to our Telegram bot and we'll reply {time}. You can also message the bot directly. The consultation is free and there's no obligation.",
      time: "within one business day", email: "Email", bot: "Telegram bot", copy: "Copy", copied: "Copied: ", selected: "Selected, press Ctrl+C"
    },
    form: {
      title: "Consultation request", name: "Name", namePh: "How should we address you", contact: "How to reach you", channel: "Contact method",
      channels: ["Telegram", "WhatsApp", "Email", "Phone"],
      type: "What you need", types: ["A new game, end to end", "A game for a brand or event", "One of our games adapted for you", "Something else"],
      budget: "Approximate budget", budgets: ["Not sure yet", "up to $300", "$300 – $1,000", "$1,000 – $3,000", "$3,000+"],
      message: "About the game", messagePh: "What kind of game, who it's for, how many players, similar games, desired timeline",
      agree: "I agree to my data being used to reply to this request.", submit: "Send request", sending: "Sending…",
      note: "Your request goes straight to the team on Telegram.",
      errName: "Enter your name", errContact: "Add a contact so we can reply", errEmail: "Check the email address",
      errMessage: "Describe the game in at least a couple of sentences", errAgree: "Please tick the consent box.",
      ok: "<b>Request sent.</b> We'll reply {time}.", fail: "The request couldn't be sent.",
      retry: "Try again or message us on Telegram: <b>@{tg}</b>. Your text is still in the form."
    },
    rate: {
      eyebrow: "Rate a developer", legend: "Your rating", hint: "Choose 1 to 5 stars",
      hints: ["Very poor", "Poor", "Okay", "Good", "Excellent"], picked: function (n, h) { return n + " of 5 · " + h; },
      need: "Pick a rating from 1 to 5 stars", name: "Your name or nickname", optional: "Optional", project: "Game or project",
      comment: "Review", commentPh: "What you liked and what could be better", submit: "Send rating",
      note: "One rating per developer per device.",
      ok: "<b>Thank you!</b> Your rating is counted and the team has your review.", done: "Done",
      fail: "The rating couldn't be sent. Please try again a little later.", dup: "You've already rated this developer."
    },
    ui: { newTab: "Open in new tab", close: "Close", prev: "Previous", next: "Next", open: "Open: ", loadFail: "The game didn't load. Please refresh the page.", playAria: "Play: " }
  }
};

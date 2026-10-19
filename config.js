/*
  ДАННЫЕ САЙТА — редактируйте только этот файл.
  Текст на трёх языках записывается так: { ru: "...", ky: "...", en: "..." }.
  Если перевода нет, сайт покажет русский вариант.
*/
window.SITE = {
  languages: ["ru", "ky", "en"],
  defaultLanguage: "ru",

  studio: {
    name: { ru: "Клетка", ky: "Клетка", en: "Kletka" },
    full: { ru: "Студия «Клетка»", ky: "«Клетка» студиясы", en: "Kletka Studio" },
    founded: 2025,
    email: "hello@kletka.games",
    telegram: "kletka_games",          // без @
    github: "https://github.com/MuzarA"
  },

  // Куда отправляются заявки и оценки. Vercel: /api/...; обычный PHP-хостинг: send.php, rate.php, ratings.php
  formEndpoint: "/api/lead",
  rateEndpoint: "/api/rate",
  ratingsEndpoint: "/api/ratings",

  // Игры. id — имя файла игры в папке games/
  games: [
    {
      id: "hangman",
      title: { ru: "Виселица на двоих", ky: "Дарга асуу: экөө үчүн", en: "Hangman Duel" },
      genre: { ru: "Словесная дуэль", ky: "Сөз дуэли", en: "Word duel" },
      year: 2026,
      players: { ru: "1–2 игрока", ky: "1–2 оюнчу", en: "1–2 players" },
      session: { ru: "3–5 минут", ky: "3–5 мүнөт", en: "3–5 minutes" },
      summary: {
        ru: "Классическая виселица в виде дуэли: каждый загадывает слово сопернику, побеждает тот, кто первым откроет своё.",
        ky: "Классикалык оюн дуэль түрүндө: ар ким атаандашына сөз ойлойт, өз сөзүн биринчи тапкан жеңет.",
        en: "Classic hangman turned into a duel: each player picks a word for the other, and whoever reveals theirs first wins."
      },
      modes: {
        ru: ["Против компьютера: слова в восьми категориях на русском, кыргызском и английском", "Дуэль на одном устройстве: слова скрыты точками", "Онлайн-комнаты по коду в версии для Claude"],
        ky: ["Компьютерге каршы: орус, кыргыз жана англис тилдеринде сегиз категориядагы сөздөр", "Бир түзмөктө дуэль: сөздөр чекит менен жашырылат", "Claude'дагы версияда код менен онлайн бөлмөлөр"],
        en: ["Against the computer: words in eight categories in Russian, Kyrgyz and English", "Duel on one device: words are hidden as dots", "Online rooms by code in the Claude version"]
      },
      links: {
        online: "https://claude.ai/artifact/NZ5YWPPrRFMNf4ugkA12jh",
        repo: "https://github.com/MuzarA/hangman-duel"
      }
    },
    {
      id: "wordchain",
      title: { ru: "Finish the Word", ky: "Finish the Word", en: "Finish the Word" },
      genre: { ru: "Цепочка слов на время", ky: "Убакытка сөз чынжыры", en: "Timed word chain" },
      year: 2026,
      players: { ru: "1–4 игрока", ky: "1–4 оюнчу", en: "1–4 players" },
      session: { ru: "5–10 минут", ky: "5–10 мүнөт", en: "5–10 minutes" },
      summary: {
        ru: "Называй английское слово на последнюю букву предыдущего, пока не кончилось время. Словарь на 112 тысяч слов не даст схитрить.",
        ky: "Убакыт бүтө электе мурунку сөздүн акыркы тамгасынан башталган англис сөзүн айт. 112 миң сөздүк сөздүк алдатпайт.",
        en: "Name an English word starting with the last letter of the previous one before time runs out. A 112,000-word dictionary keeps everyone honest."
      },
      modes: {
        ru: ["Против компьютера: три уровня, на сложном он подсовывает слова на X, Y и W", "До четырёх игроков на одном устройстве", "Онлайн-комнаты до восьми игроков в версии для Claude"],
        ky: ["Компьютерге каршы: үч деңгээл, татаалында X, Y жана W менен бүткөн сөздөрдү берет", "Бир түзмөктө төрт оюнчуга чейин", "Claude'дагы версияда сегиз оюнчуга чейин онлайн бөлмөлөр"],
        en: ["Against the computer: three levels, on hard it feeds you words ending in X, Y and W", "Up to four players on one device", "Online rooms for up to eight players in the Claude version"]
      },
      links: {
        online: "https://claude.ai/artifact/DVvxXamiwTAqpG828UNszo",
        repo: "https://github.com/MuzarA/finish-the-word"
      }
    },
    {
      id: "battleship",
      title: { ru: "Морской бой", ky: "Деңиз согушу", en: "Battleship" },
      genre: { ru: "Тактика на поле 10×10", ky: "10×10 талаада тактика", en: "Tactics on a 10×10 grid" },
      year: 2026,
      players: { ru: "1–2 игрока", ky: "1–2 оюнчу", en: "1–2 players" },
      session: { ru: "10–15 минут", ky: "10–15 мүнөт", en: "10–15 minutes" },
      summary: {
        ru: "Расставь флот и найди корабли противника раньше, чем он найдёт твои. Компьютер добивает раненые корабли и прочёсывает поле шахматкой.",
        ky: "Флотуңду жайгаштырып, атаандаштын кемелерин ал сеникин тапканга чейин тап. Компьютер жараланган кемелерди бүтүрүп, талааны шахмат тартибинде текшерет.",
        en: "Place your fleet and find the enemy's ships before they find yours. The computer finishes off damaged ships and sweeps the board in a checkerboard pattern."
      },
      modes: {
        ru: ["Против компьютера, который охотится за подбитыми кораблями", "Вдвоём на одном устройстве с экраном передачи хода", "Ручная или случайная расстановка флота"],
        ky: ["Жараланган кемелерди издеген компьютерге каршы", "Бир түзмөктө экөөлөп, жүрүш берүү экраны менен", "Флотту колго же кокус жайгаштыруу"],
        en: ["Against a computer that hunts down damaged ships", "Two players on one device with a hand-over screen", "Manual or random fleet placement"]
      },
      links: {
        online: "https://claude.ai/artifact/X1fJXWLEaUqsJbypKHCoyx",
        repo: "https://github.com/MuzarA/battleship"
      }
    }
  ],

  // Команда. id латиницей, по нему хранятся оценки — после запуска его не меняйте.
  // founder: true — карточка с отметкой «Основатель». rating — необязательно: { avg: 4.8, count: 12 }.
  team: [
    {
      id: "muzar",
      founder: true,
      name: { ru: "Музар Алияскаров", ky: "Музар Алияскаров", en: "Muzar Aliyaskarov" },
      role: { ru: "Основатель и разработчик игр", ky: "Негиздөөчү жана оюн иштеп чыгуучу", en: "Founder and game developer" },
      photo: "images/team/muzar.jpg",
      experience: { ru: "2006 года рождения", ky: "2006-жылы туулган", en: "Born in 2006" },
      bio: {
        ru: "Основал студию и сам сделал все три игры: от правил и соперника-компьютера до онлайн-комнат. Отвечает за то, чтобы в игры хотелось возвращаться.",
        ky: "Студияны негиздеп, үч оюндун баарын өзү жасаган: эрежелерден жана компьютер-атаандаштан онлайн бөлмөлөргө чейин. Оюндарга кайра келгиң келиши үчүн жооп берет.",
        en: "Founded the studio and built all three games himself, from the rules and computer opponents to the online rooms. Makes sure the games are worth coming back to."
      },
      skills: { ru: ["JavaScript", "Геймдизайн", "Игровая логика"], ky: ["JavaScript", "Оюн дизайны", "Оюн логикасы"], en: ["JavaScript", "Game design", "Game logic"] },
      games: ["hangman", "wordchain", "battleship"],
      links: { github: "https://github.com/MuzarA" },
      rating: null
    },
    {
      id: "artem",
      name: { ru: "Артём Кузнецов", ky: "Артём Кузнецов", en: "Artem Kuznetsov" },
      role: { ru: "Разработчик сетевой игры", ky: "Тармактык оюн иштеп чыгуучу", en: "Multiplayer developer" },
      photo: "images/team/artem.jpg",
      experience: { ru: "6 лет в разработке", ky: "Иштеп чыгууда 6 жыл", en: "6 years in development" },
      bio: {
        ru: "Делает онлайн-комнаты и следит, чтобы игра не ломалась, когда соперник закрыл вкладку посреди хода.",
        ky: "Онлайн бөлмөлөрдү жасайт жана атаандаш жүрүштүн ортосунда барагын жапканда оюн бузулбашын карайт.",
        en: "Builds the online rooms and makes sure a game survives when an opponent closes the tab mid-turn."
      },
      skills: { ru: ["JavaScript", "Сетевая игра", "Тестирование"], ky: ["JavaScript", "Тармактык оюн", "Тестирлөө"], en: ["JavaScript", "Multiplayer", "Testing"] },
      games: ["hangman", "wordchain"],
      links: { github: "https://github.com/kletka-artem", telegram: "kletka_artem" },
      rating: null
    },
    {
      id: "alina",
      name: { ru: "Алина Мамбетова", ky: "Алина Мамбетова", en: "Alina Mambetova" },
      role: { ru: "Дизайнер игр и интерфейсов", ky: "Оюн жана интерфейс дизайнери", en: "Game and UI designer" },
      photo: "images/team/alina.jpg",
      experience: { ru: "4 года в геймдеве", ky: "Геймдевде 4 жыл", en: "4 years in game dev" },
      bio: {
        ru: "Придумывает, как игра выглядит и ощущается: тетрадь в клетку, кубики с буквами, морская карта. Проверяет каждый экран на телефоне.",
        ky: "Оюндун көрүнүшүн жана сезимин ойлоп табат: торчолуу дептер, тамгалуу кубиктер, деңиз картасы. Ар бир экранды телефондо текшерет.",
        en: "Decides how each game looks and feels: the squared notebook, the letter blocks, the sea chart. Checks every screen on a phone."
      },
      skills: { ru: ["UI/UX", "Анимация", "Иллюстрация"], ky: ["UI/UX", "Анимация", "Иллюстрация"], en: ["UI/UX", "Animation", "Illustration"] },
      games: ["hangman", "wordchain"],
      links: { github: "https://github.com/kletka-alina", telegram: "kletka_alina" },
      rating: null
    },
    {
      id: "daniyar",
      name: { ru: "Данияр Сапаров", ky: "Данияр Сапаров", en: "Daniyar Saparov" },
      role: { ru: "Геймдизайнер, ИИ-соперники", ky: "Геймдизайнер, ЖИ-атаандаштар", en: "Game designer, AI opponents" },
      photo: "images/team/daniyar.jpg",
      experience: { ru: "5 лет в геймдеве", ky: "Геймдевде 5 жыл", en: "5 years in game dev" },
      bio: {
        ru: "Настраивает соперников-компьютеров: как быстро думать, когда ошибаться и какие слова выбирать, чтобы играть было интересно.",
        ky: "Компьютер-атаандаштарды жөндөйт: канча тез ойлонуу, качан жаңылуу жана оюн кызык болушу үчүн кайсы сөздөрдү тандоо.",
        en: "Tunes the computer opponents: how fast they think, when they slip up and which words they pick to keep things interesting."
      },
      skills: { ru: ["Геймдизайн", "Баланс", "Алгоритмы"], ky: ["Оюн дизайны", "Баланс", "Алгоритмдер"], en: ["Game design", "Balance", "Algorithms"] },
      games: ["wordchain", "battleship"],
      links: { github: "https://github.com/kletka-daniyar", telegram: "kletka_daniyar" },
      rating: null
    }
  ],

  // Галерея. Можно добавить фото команды и плейтестов.
  gallery: [
    { src: "images/screens/hangman-duel.jpg", caption: { ru: "Виселица: дуэль на одном устройстве", ky: "Дарга асуу: бир түзмөктө дуэль", en: "Hangman: duel on one device" } },
    { src: "images/screens/wordchain-game.jpg", caption: { ru: "Finish the Word: партия против компьютера", ky: "Finish the Word: компьютерге каршы оюн", en: "Finish the Word: a game against the computer" } },
    { src: "images/screens/battleship-battle.jpg", caption: { ru: "Морской бой: перестрелка с компьютером", ky: "Деңиз согушу: компьютер менен атышуу", en: "Battleship: exchanging fire with the computer" } },
    { src: "images/screens/hangman-cpu.jpg", caption: { ru: "Виселица: игра против компьютера", ky: "Дарга асуу: компьютерге каршы", en: "Hangman: playing the computer" } },
    { src: "images/screens/wordchain-setup.jpg", caption: { ru: "Finish the Word: настройки партии", ky: "Finish the Word: оюндун жөндөөлөрү", en: "Finish the Word: game settings" } },
    { src: "images/screens/battleship-place.jpg", caption: { ru: "Морской бой: расстановка флота", ky: "Деңиз согушу: флотту жайгаштыруу", en: "Battleship: placing the fleet" } }
  ]
};

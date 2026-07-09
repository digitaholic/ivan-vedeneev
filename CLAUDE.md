# Портфолио Ивана Веденеева — контекст проекта

## Кто делает и зачем

Иван Веденеев, продуктовый дизайнер, 5+ лет опыта (ed-tech, финтех, бизнес-сообщества). Сайт-портфолио MVP: показать кейсы рекрутерам и потенциальным заказчикам. Русскоязычный.

Деплой: `vedeneev.netlify.app` (Netlify / Vercel, статика).

---

## Стек

- **Чистый HTML** без фреймворков
- **Tailwind Play CDN** — без сборки, конфиг подключается отдельным скриптом
- **Google Fonts** — Onest, JetBrains Mono (Climate Crisis убран в июле 2026, см. «Шрифты» ниже)
- Никакого React, Next.js, Vite, Node

Общие скрипты в `scripts/`:
- `tailwind.config.js` — конфиг тем + кастомная шкала
- `theme-init.js` — инициализация темы до рендера (anti-FOUC)
- `main.js` — переключатель темы + инъекция года в footer `<span id="year">`

На страницах подключаются так:
```html
<!-- index.html -->
<script src="scripts/tailwind.config.js"></script>
<link rel="stylesheet" href="styles.css">

<!-- cases/*.html -->
<script src="../scripts/tailwind.config.js"></script>
<link rel="stylesheet" href="../styles.css">
```

---

## Архитектура файлов

```
portfolio/
├── index.html              # Главная: hero, кейсы (превью), о себе, контакты
├── styles.css              # CSS-токены + утилиты (.meta, .placeholder, base)
├── scripts/
│   ├── tailwind.config.js  # Общий Tailwind-конфиг
│   ├── theme-init.js       # Anti-FOUC скрипт темы
│   └── main.js             # Переключатель темы, год в footer
├── cases/
│   ├── edcheck.html        # Кейс Maximum Education (заполнен)
│   └── blizkie.html        # Кейс Близкие (заполнен)
└── assets/
    ├── edcheck/            # Изображения кейса Edcheck (см. ниже)
    ├── blizkie/            # Изображения кейса Близкие (см. ниже)
    ├── og-image.jpg        # OG-превью для index + edcheck (TODO: положить)
    └── og-blizkie.jpg      # OG-превью для blizkie (TODO: положить)
```

---

## Дизайн-система

### Цвета (CSS-токены в `styles.css`)

| Токен              | Light       | Dark        |
|--------------------|-------------|-------------|
| `--color-bg`       | `#FFF5ED`   | `#0A0A0B`   |
| `--color-fg`       | `#09090B`   | `#E8E8EA`   |
| `--color-secondary`| `#3F3F46`   | `#A1A1AA`   |
| `--color-border`   | `#E4E4E7`   | `#27272A`   |
| `--color-accent`   | `#FD7E14`   | `#FF8C2E`   |
| `--color-accent-ink` | `#B34F0D` | `#FF8C2E`   |
| `--color-accent-fill` | `#C2570E` | `#C2570E` |

> `--color-fg` в dark: **`#E8E8EA`**, не `#FAFAFA` — пользователь просил снизить контраст «на тон».

**Три акцентных токена, не путать:**
- `--color-accent` — декоративный: границы, ::selection, hover-подсветка. НЕ использовать как цвет текста на фоне страницы — контраст ~2.4:1, провал WCAG AA.
- `--color-accent-ink` — акцент **как текст** на `--color-bg` (тире-маркеры, meta-лейблы, ссылки). AA-safe (4.5:1+).
- `--color-accent-fill` — акцент **как заливка** под белым текстом (кнопки, крупные метрики типа «1,5–2×»). AA-safe с белым (5:1+).

Tailwind-алиасы: `bg-bg`, `text-fg`, `text-secondary`, `border-border`, `text-accent`, `border-accent`, `text-accent-ink`, `text-accent-fill`.

### Темная тема

- Атрибут `data-theme="dark"` на `<html>`
- Tailwind: `darkMode: ['class', '[data-theme="dark"]']`
- **Не использовать** Tailwind-префикс `dark:` — вся логика через CSS `[data-theme="dark"]`
- Переключатель хранит выбор в `localStorage`, скрипт `theme-init.js` восстанавливает до рендера

### Шрифты

**Ровно два текстовых стиля на экран** — пользователь явно отклонил микс из трёх шрифтов (Climate Crisis + Onest + JetBrains Mono) в hero как «хаос». Climate Crisis полностью удалён из проекта (был только в hero/заголовках секций, нигде больше не подключать).

| Переменная        | Семейство         | Использование                        |
|-------------------|-------------------|--------------------------------------|
| `font-display`    | Onest (алиас, = font-sans) | Крупные заголовки: hero-statement, section-title, about-heading, H1 кейсов |
| `font-sans`       | Onest 400/500/600/700 | Всё остальное — body, nav, кнопки/ссылки |
| `font-mono`       | JetBrains Mono 400/500 | Только мелкие `.meta`-лейблы внутри кейсов (роль/команда/продукт и т.п.) — НЕ в nav, НЕ в hero, НЕ в кнопках |

Референсы стиля, на которые ориентировались при переделке (чистая типографика, минимум декора): puschkarew.com, mariasafronova.work, mishanaer.com, uncoo.art, sikorsky.design, shugaev.vercel.app.

### Шкала размеров (кастомные Tailwind-классы)

| Класс       | px   | line-height |
|-------------|------|-------------|
| `text-12`   | 12px | 1.4         |
| `text-14`   | 14px | 1.5         |
| `text-16`   | 16px | 1.6         |
| `text-18`   | 18px | 1.6         |
| `text-24`   | 24px | 1.3         |
| `text-32`   | 32px | 1.2         |
| `text-48`   | 48px | 1.1         |
| `text-72`   | 72px | 1.05        |
| `text-120`  | 120px| 0.95        |

> H1 максимум: `text-48 md:text-72`. Класс `text-120` зарезервирован, **не использовать** — пользователь отклонил, «сильно на себя внимание забирает».

### Размеры контейнеров и отступы

- `max-w-content` = 1200px (страница)
- `max-w-prose` = 720px (текстовый контент)
- Горизонтальные отступы секций: `px-5 md:px-8` (компактно, пользователь просил уменьшить)

---

## Паттерны разметки

### Секция кейса

```html
<section class="max-w-content mx-auto px-5 md:px-8 py-10 md:py-16 border-t border-border">
  <p class="meta mb-4 md:mb-6">NN / метка</p>
  <h2 class="text-24 md:text-32 font-semibold max-w-prose">Заголовок</h2>
  <div class="mt-6 md:mt-8 text-16 md:text-18 text-secondary max-w-prose space-y-5">
    <p>Текст</p>
  </div>
</section>
```

### Список с оранжевым тире

```html
<ul class="space-y-3">
  <li class="flex gap-3">
    <span class="text-accent shrink-0" aria-hidden="true">—</span>
    <span>Текст пункта</span>
  </li>
</ul>
```

### Изображение с подписью

```html
<figure class="mt-8 md:mt-10">
  <img src="../assets/edcheck/cover.jpg" alt="Описание" class="w-full rounded-lg" loading="lazy">
  <figcaption class="mt-3 meta">Подпись</figcaption>
</figure>
```

### Плейсхолдер (пока нет картинки)

```html
<div class="placeholder aspect-[16/9]">метка · кейс</div>
```

Класс `.placeholder` определён в `styles.css`. Заменяется на `<img>` когда есть файл.

### Metric-блок (06 / результат в Edcheck)

```html
<div class="grid grid-cols-1 md:grid-cols-3 gap-px bg-border rounded-lg overflow-hidden">
  <div class="bg-bg px-6 py-8 md:px-8 md:py-10">
    <p class="font-sans font-bold tracking-tight text-48 md:text-72 text-accent-fill leading-none">1,5–2×</p>
    <p class="mt-3 text-16 md:text-18 font-semibold text-fg">Заголовок</p>
    <p class="mt-2 text-14 md:text-16 text-secondary">Описание.</p>
  </div>
  ...
</div>
```

### Hero — один statement, два текстовых стиля (актуально с июля 2026)

```html
<section class="hero wrap">
  <h1 class="hero-title">
    Продуктовый дизайнер.
    <span class="hero-title-dim">Начинаю с вопроса «а что тут на самом деле ломается».</span>
  </h1>
  <div class="hero-foot">
    <p class="hero-meta">5+ лет в ed-tech, финтехе и бизнес-сообществах · Москва</p>
    <div class="hero-links">
      <a href="#projects" class="link-arrow">Смотреть кейсы ↓</a>
      <a href="https://t.me/digitaholic" class="link-arrow" target="_blank" rel="noopener">Написать в Telegram ↗</a>
    </div>
  </div>
</section>
```

Один `<h1>`, один шрифт (Onest 600). Первое предложение — `--color-fg`, второе — обёрнуто в `.hero-title-dim` (`--color-secondary`), иерархия через цвет, не через смену гарнитуры. CTA — текстовые ссылки с подчёркиванием (`.link-arrow`), не кнопки-пилюли. Никаких наклонных карточек, glow, теней — только текст и воздух.

**Не возвращать:** декоративные картинки в hero, `.btn-primary`/`.btn-ghost` в hero, mono-кикер над заголовком — всё это было и осознанно убрано, см. «Предпочтения» ниже.

### Nav на кейс-страницах

Ссылки используют явный путь `../index.html`, **не** `../`:

```html
<a href="../index.html">иван веденеев</a>
<a href="../index.html#projects">кейсы</a>
<a href="../index.html#about">о себе</a>
<a href="../index.html#contact">контакты</a>
```

---

## Утилиты CSS (`styles.css`)

`.meta` — типичная meta-строка:
```css
.meta {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: var(--color-secondary);
}
```

---

## Структура страниц

### `index.html`

```
Nav (sticky, без backdrop-blur decorations, Onest — не mono)
Hero — один statement + приглушённое продолжение (см. «Hero» выше)
  - H1: "Продуктовый дизайнер. [Начинаю с вопроса «а что тут на самом деле ломается».]"
  - hero-foot: мета-строка слева ("5+ лет в ed-tech..."), 2 текстовые ссылки справа
#projects — превью кейсов (реальные обложки кейсов, hover accent-tint)
  01 / edcheck → cases/edcheck.html
  02 / близкие → cases/blizkie.html
#about — о себе
  - Позиционирование (text-18/24 secondary)
  - Суперсила (border-l-4 border-accent, text-24/32 semibold)
  - Опыт: Maximum Education, Escape Tech, УК BART, MGCOM
  - Образование: 2025/2024/2019/2016
  - Строка про ТГ-канал: `.about-channel` — «Веду телеграм-канал «Я так живу»» → https://t.me/i_lived_here
#contact — контакты
  - Telegram: @digitaholic → https://t.me/digitaholic (та же ссылка дублируется как CTA в hero-foot)
  - Email: wedeneew@yandex.ru
  - Meta: "Москва · доступен для проектов"
Footer: "навайбкожено руками · html + tailwind"
```

### `cases/edcheck.html` (Maximum Education)

```
01 / контекст — "Два канала, одна воронка"
02 / проблема — "Люди бросали тесты, а результаты не вели дальше"
03 / рамки    — "Три жёстких ограничения"
04 / процесс  — "Дизайн внутри живого процесса" (+ 12 изображений)
05 / решения  — "Три нетривиальных выбора"
06 / результат — 3 метрики: 1,5–2× / конверсия / автономность
07 / рефлексия — "Что бы я сделал иначе"
```

### `cases/blizkie.html` (Telegram мини-апп)

```
01 / контекст  — "Нарисовать экраны. Это был не тот запрос."
02 / проблема  — "Категории строились от акций, а не от людей"
03 / решение   — "Перекроил категории под джобы пользователя"
                  (сетка 10 экранов grid-cols-2 md:grid-cols-5, aspect-[9/19])
04 / рефлексия — "Чему научил этот проект"
```

---

## Ассеты

### `assets/edcheck/`

| Файл | Содержимое |
|------|-----------|
| `cover.jpg` | Обложка / превью продукта |
| `landing-banner.jpg` | Лендинг профтеста (точка входа с баннера) |
| `event-navigator.jpg` | Мероприятие «Навигатор поступления» |
| `team-process-flow.jpg` | Схема процесса работы команды |
| `test-stages.jpg` | Этапность прохождения тестов |
| `progress-card-states.jpg` | 3 состояния карточки прогресса |
| `results-long.jpg` | Длинный результат (9 профессий, вертикальное меню) |
| `results-a4.jpg` | Короткий результат А4 |
| `profession-card.jpg` | Карточка профессии |
| `history-panels.jpg` | Плашки истории профтестирования |
| `diagnostics-scaled.jpg` | Масштабирование для диагностики знаний |
| `illustrations-midjourney.jpg` | Иллюстрации Midjourney |

### `assets/blizkie/`

| Файл | Содержимое |
|------|-----------|
| `cover-mockups.jpg` | 2 iPhone-макета на тёмном фоне |
| `audience-segments.jpg` | Слайд с 3 сегментами аудитории |
| `welcome-categories.jpg` | Экран онбординга с категориями |
| `screen-welcome.jpg` | Экран приветствия |
| `screen-home.jpg` | Главный экран |
| `screen-actions-district.jpg` | Акции по районам |
| `screen-best-offers.jpg` | Лучшие предложения |
| `screen-map.jpg` | Карта заведений |
| `screen-map-list.jpg` | Карта со списком |
| `screen-action-detail.jpg` | Детали акции |
| `screen-search-districts.jpg` | Поиск по районам |
| `screen-profile.jpg` | Профиль пользователя |
| `screen-qr.jpg` | QR-подтверждение |

### OG-изображения (нужно положить)

- `assets/og-image.jpg` — 1200×630, фон `#FFF5ED`, акцент оранжевый. Используется для index + edcheck.
- `assets/og-blizkie.jpg` — 1200×630. Используется для blizkie.

---

## OG / Twitter мета

Добавлена на все три страницы. Домен: `https://vedeneev.netlify.app/`.

| Страница | og:image |
|----------|---------|
| index.html | `/assets/og-image.jpg` |
| cases/edcheck.html | `/assets/og-image.jpg` |
| cases/blizkie.html | `/assets/og-blizkie.jpg` |

---

## Антипаттерны (что не делать)

- **Не использовать `dark:` префикс Tailwind** — тема управляется через `[data-theme="dark"]`
- **Не использовать `href="../"`** на кейс-страницах — только `href="../index.html"`
- **Не ставить `text-120`** для H1 — слишком доминирует
- **Не ставить `#FAFAFA`** для fg в dark — только `#E8E8EA`
- **Не использовать emoji как иконки** — только SVG (Heroicons, Lucide или инлайн)
- **Не увеличивать отступы** сверх `px-5 md:px-8` и `py-10 md:py-16` — пользователь просил компактность
- **Не добавлять четвёртый кейс** «Я в 2023 vs Apple в 2026» — удалён намеренно
- **Не трогать footer** — текст «навайбкожено руками · html + tailwind» финальный
- **Не смешивать больше двух текстовых стилей на экране** — пользователь жёстко отклонил hero с Climate Crisis + Onest + JetBrains Mono как «полнейший провал». Держать: крупный statement (Onest 600) + body (Onest 400/500); mono — только для `.meta` внутри кейсов
- **Не возвращать Climate Crisis** — удалён из подключения шрифтов и из всех заголовков (hero, section-title, about-heading, H1 кейсов, метрика в Edcheck). Если где-то всплывёт `font-family: "Climate Crisis"` — это регресс, убрать
- **Не использовать `--color-accent` как цвет текста** на `--color-bg` — контраст проваливает WCAG AA. Для текста — `--color-accent-ink`, для заливки под белым текстом — `--color-accent-fill`
- **Не возвращать кнопки-пилюли / декоративные картинки / glow в hero** — пользователь хочет чистый текстовый hero в духе puschkarew.com / sikorsky.design, CTA — текстовые ссылки с подчёркиванием (`.link-arrow`)

---

## Предпочтения и решения пользователя

- Язык интерфейса — **русский**, код — английский
- Меньше отступов: пользователь дважды просил сделать поля компактнее
- Hero — один statement в двух цветовых весах (чёрный + secondary), не микс шрифтов; CTA — текстовые ссылки, не кнопки (июль 2026, замена прошлой версии с Climate Crisis)
- Тёмная тема: контраст чуть снижен (fg `#E8E8EA` вместо `#FAFAFA`)
- Footer: «навайбкожено руками» — осознанная авторская формулировка
- 06/результат Edcheck — 3 плитки (не 4); «единомышленники» убрана как не-метрика
- Blizkie: Категории по ситуациям (не по типам акций) — ключевой инсайт кейса
- Prototip на Taiga UI (дизайн-система Т-Банка) — специально для передачи разработке
- Telegram-канал «Я так живу» (https://t.me/i_lived_here) упомянут в конце секции «О себе», ссылка на личный ТГ (@digitaholic) продублирована как основной CTA в hero
- Референсы для визуального языка: puschkarew.com, mariasafronova.work, mishanaer.com, uncoo.art, sikorsky.design, shugaev.vercel.app — чистая типографика, минимум декора, текстовые CTA

---

## TODO (что ещё не сделано)

- [ ] Положить `assets/og-image.jpg` (1200×630)
- [ ] Положить `assets/og-blizkie.jpg` (1200×630)
- [ ] Заменить placeholder-карточки на `index.html` на реальные обложки кейсов
- [ ] Добавить фото в About-секцию (упоминалось: «справа может потом фотку мою поставим»)
- [ ] Задеплоить на `vedeneev.netlify.app`
- [ ] Git init и первый коммит (проект пока не в git)

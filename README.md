<h1 align="center">今日快讯 · Today Brief</h1>

<p align="center">A mobile-style news reader demo built with Vue 3.</p>

<p align="center">
<b><a href="README.zh-CN.md">简体中文</a></b> · <b>English</b>
</p>

## Overview

Today Brief is a mobile-style news reading demo. It presents mock news with colorful cards, and includes the interactions you would expect from a real news app: categories, favorites, reading history, comments, search, notifications, and a personal profile.

All data is mocked locally (see `src/data`). Everything you do (favorites, reading history, follows, notifications, login state) is persisted in `localStorage` — nothing leaves your browser.

## Pages

| Route                                    | Page                                |
| ---------------------------------------- | ----------------------------------- |
| `/`                                      | Home with category tabs             |
| `/hot?period=realtime\|day\|week\|month` | Trending list, per period           |
| `/search`                                | Search news, sources, tags          |
| `/news/:id`                              | Article detail with nested comments |
| `/category/:id`, `/tag/:tag`             | Category and tag listings           |
| `/favorites`                             | Your saved articles                 |
| `/history`                               | Reading history                     |
| `/messages`                              | Notification center                 |
| `/user/:id`                              | Other users' profile                |
| `/login`, `/register`, `/profile`        | Auth and profile editing            |
| `/settings`                              | Dark mode, font size, cache         |
| `/about`                                 | About this app                      |

## Features

- Vue 3 `<script setup>` with TypeScript
- File-based routing via [Vue Router](https://github.com/vuejs/vue-router)
- Atomic CSS by [UnoCSS](https://github.com/unocss/unocss), pure CSS icons
- Auto-imported components and composables
- Local persistence with VueUse `useLocalStorage`
- Dark mode and global font-size scaling
- Unit tests with [Vitest](https://vitest.dev/)
- ESLint with [`@antfu/eslint-config`](https://github.com/antfu/eslint-config)

## Getting Started

```bash
pnpm i      # install (requires pnpm)
pnpm dev    # dev server on http://localhost:3333
pnpm build  # production build to dist/
pnpm test   # run tests once
pnpm lint   # lint
pnpm typecheck
pnpm preview
```

## Project Structure

```
src/
├── pages/         # file-based routes
├── components/    # auto-imported components
├── composables/   # auto-imported composition utilities (history, settings, follows, ...)
└── data/          # mock news and comments
```

## Notes

- The app is a demo: login, registration, and saving are simulated with local state and timers.
- Clearing the cache in `/settings` resets all `vue-news:*` keys in `localStorage`.

## Credits

Based on [Vitesse Lite](https://github.com/antfu-collective/vitesse-lite) by [antfu](https://github.com/antfu).

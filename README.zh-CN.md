<h1 align="center">今日快讯 · Today Brief</h1>

<p align="center">基于 Vue 3 的移动端风格资讯阅读 Demo。</p>

<p align="center">
<b><a href="README.md">English</a></b> · <b>简体中文</b>
</p>

## 简介

今日快讯是一款移动端风格的资讯阅读 Demo，用多彩卡片呈现世界，让资讯触手可及。应用包含分类、收藏、阅读历史、评论、搜索、消息中心与个人主页等真实资讯类应用的常见交互。

所有数据均为本地模拟数据（见 `src/data`）。你的所有操作（收藏、阅读历史、关注、消息、登录状态）都保存在浏览器 `localStorage` 中，不会上传到任何服务器。

## 页面

| 路由                                     | 页面                                    |
| ---------------------------------------- | --------------------------------------- |
| `/`                                      | 首页（分类 Tab）                        |
| `/hot?period=realtime\|day\|week\|month` | 热榜（实时 / 日 / 周 / 月，query 切换） |
| `/search`                                | 搜索（标题 / 来源 / 标签）              |
| `/news/:id`                              | 新闻详情（楼中楼评论）                  |
| `/category/:id`、`/tag/:tag`             | 分类页、话题页                          |
| `/favorites`                             | 我的收藏                                |
| `/history`                               | 阅读历史                                |
| `/messages`                              | 消息通知中心                            |
| `/user/:id`                              | 他人主页                                |
| `/login`、`/register`、`/profile`        | 登录、注册、编辑资料                    |
| `/settings`                              | 设置（深色模式、字体大小、清除缓存）    |
| `/about`                                 | 关于应用                                |

## 特性

- Vue 3 `<script setup>` + TypeScript
- [Vue Router](https://github.com/vuejs/vue-router) 文件式路由，路由自动生成
- [UnoCSS](https://github.com/unocss/unocss) 按需原子化 CSS，纯 CSS 图标
- 组件与组合式函数自动导入
- VueUse `useLocalStorage` 本地持久化
- 深色模式与全局字体大小缩放
- [Vitest](https://vitest.dev/) 单元与组件测试
- ESLint（[`@antfu/eslint-config`](https://github.com/antfu/eslint-config)）

## 快速开始

```bash
pnpm i      # 安装依赖（需要 pnpm）
pnpm dev    # 开发服务器 http://localhost:3333
pnpm build  # 生产构建，输出到 dist/
pnpm test   # 运行测试
pnpm lint   # 代码检查
pnpm typecheck
pnpm preview
```

## 项目结构

```
src/
├── pages/         # 文件式路由页面
├── components/    # 自动导入的组件
├── composables/   # 自动导入的组合式函数（history、settings、follows 等）
└── data/          # 模拟新闻与评论数据
```

## 说明

- 本应用为演示用途：登录、注册、保存均为本地模拟（含定时器模拟请求延迟）。
- 在 `/settings` 中清除缓存会重置 `localStorage` 里全部 `vue-news:*` 键。

## 致谢

基于 [antfu](https://github.com/antfu) 的 [Vitesse Lite](https://github.com/antfu-collective/vitesse-lite) 模板构建。

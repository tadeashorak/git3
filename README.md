# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


## Login form

A clean, accessible login form component is available at `src/components/LoginForm.jsx`.

Security notes:
- Send credentials to your server over HTTPS and **never** store raw passwords in localStorage.
- Prefer server-set, secure, httpOnly cookies for session authentication.
- Validate and rate-limit login attempts on the server to protect against brute-force attacks.

The form performs basic client-side validation (email format, password length) and posts to `/api/login` by default.

## Theming / quick customization

You can customize the site's look by editing CSS variables defined in `src/index.css` under the `:root` selector. Example variables you may want to change:

- `--primary` — main accent color
- `--bg` — page background color
- `--text` — main text color
- `--muted` — secondary/muted text color
- `--btn-bg` / `--btn-text` — button colors

Change a variable and refresh the page to see the update; dark-mode overrides are provided with `prefers-color-scheme`.

## Admin demo & simple dashboard

For development, a simple admin login is available to demonstrate the dashboard flow. Use:

- **Email:** `admin@example.com`
- **Password:** `adminpass`

When a user signs in with these credentials the app will show a minimal **Admin dashboard** (local demo only). In production you should remove any client-side mock and rely on server-provided roles / tokens; the server should return a user object with a `role` field (for example: `{ user: { name, email, role: 'admin' } }`).

## Dashboard demo

I added a simple metrics dashboard (10 cards) to demonstrate how personal admin metrics can appear. The metrics are provided by a local mock `src/mocks/stats.js` and the UI components are under `src/components/dashboard/`:

- `MetricCard.jsx` — small card with value, delta, and a sparkline
- `StatsGrid.jsx` — responsive grid of cards
- `useStats.js` — demo data hook that fetches mock metrics and polls every 30s

To replace the mock with a real API, make an endpoint at `/api/admin/stats` that returns `{ metrics: [{ id, name, value, delta, series }] }`.
# git3

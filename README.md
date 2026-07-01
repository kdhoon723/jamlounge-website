# JamLounge Website

A Vue 3 + Vite website for **JamLounge**, a jazz lounge / dining venue concept with pages for menu, schedules, reservations, pre-orders, and internal photos.

## Features

- Public pages for home, menu, story, performance schedule, reservation, and pre-order flows
- Firebase-backed content and admin management pages
- Firebase Auth, Firestore, Storage, Realtime Database, and Hosting integration
- Vuetify-based responsive UI

## Tech Stack

| Area | Stack |
| --- | --- |
| Frontend | Vue 3, Vite, Vue Router, Vuetify |
| Backend services | Firebase Auth, Firestore, Storage, Realtime Database |
| Hosting | Firebase Hosting |

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Fill `.env.local` with your Firebase web app configuration before running the app against a real Firebase project.

## Environment Variables

This repository does **not** hard-code Firebase project identifiers or API keys in source files. Vite exposes only variables prefixed with `VITE_` to the browser bundle.

Required variables:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_DATABASE_URL`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID` (optional for Analytics)

Firebase web API keys are client-side identifiers, but public apps still need restrictive Firestore/Storage/Realtime Database rules and Google Cloud API key restrictions.

## Scripts

```bash
npm run dev      # local development
npm run build    # production build into dist/
npm run preview  # preview production build
```

## Deployment

The repository includes Firebase Hosting workflow files. Configure the following in GitHub before using the workflows:

- Secret: `FIREBASE_SERVICE_ACCOUNT_JAMLOUNGEPROJECT`
- Repository variables: all `VITE_FIREBASE_*` values from `.env.example`

The workflow builds the Vite app and deploys the generated `dist/` directory.

## Security Notes

- Do not commit `.env`, `.env.local`, Firebase service-account JSON files, or generated `.firebase/` cache files.
- Keep Firebase security rules in the Firebase console or infrastructure repo and review them before exposing production data.
- Treat admin routes as UI only; authorization must be enforced by Firebase rules and backend/service configuration.

## License

MIT License. See [LICENSE](./LICENSE).

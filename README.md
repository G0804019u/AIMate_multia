# Multia - Marketplace Template

Thank you for buying the Multia Marketplace template!

## Features

- Built with Expo, React Native & Nativewind
- Dark/light mode
- Fully customizable components
- Marketplace-specific screens and flows
- TypeScript 

## Getting Started

```bash
# Use Node.js v20
nvm use 20

# Install dependencies
npm install

# Start the Expo development server with a clean cache
npx expo start -c
```

> **Note:** the repository ships an `.npmrc` with `legacy-peer-deps=true`, so plain `npm install` (and `npm ci` in CI) work out of the box — no extra flags needed.

## Before you ship

- **EAS project identifiers:** `app.json` intentionally ships without an `owner`, EAS `projectId`, or updates URL. Run `eas init` while logged into your own Expo account to generate them before building or publishing with EAS.
- **Mock data:** all app data (products, chats, orders, profiles) is local demo content, and some screens use remote placeholder images. Replace these with your own data sources and assets.
- **Auth & backend:** login/signup and checkout flows are UI-only — connect them to your own backend services.

## Dependency audit status

Last reviewed 2026-10-02: everything `npm audit fix` can resolve is resolved. `npm audit` still reports 8 transitive findings (5 high, 3 moderate) from two packages that cannot be fixed until an upstream release:

- **node-forge** (high; via `@expo/code-signing-certificates`, pulled in by `@expo/cli` and `expo-updates`) — RSA PKCS#1 v1.5 signature verification issue. No fixed node-forge release exists yet, and it comes in through Expo's command-line tooling.
- **decode-uri-component** (moderate; via `query-string`, pinned by `expo-router`) — DoS on malformed percent-encoded input. The fixed release (0.5.0) is ESM-only and incompatible with query-string's current CJS usage.

These will clear with future Expo SDK updates. Do not run `npm audit fix --force` — it replaces `expo-router` and `expo-updates` with incompatible major versions.

## Useful commands

```bash
npx tsc --noEmit   # Type check
npm run lint       # ESLint + Prettier check
npm run format     # Auto-fix lint + formatting
```

## License

Licensed for use in your own projects — see [LICENSE.md](LICENSE.md) for the full terms.

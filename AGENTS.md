# Repository Guidelines

## Project Structure & Module Organization
- `SyzygyHearts/` is the Expo React Native app.
- `SyzygyHearts/src/` holds app code: `screens/`, `components/`, `services/`, `contexts/`, `data/`, `astrology/`.
- `SyzygyHearts/assets/` contains app icons and images.
- `research/` and top-level `.md` files capture product and architecture notes.
- `BugReports/` stores Android bugreport artifacts.

## Build, Test, and Development Commands
Run commands from `SyzygyHearts/`:
- `npm install` installs dependencies.
- `npm run start` launches Expo Dev Server.
- `npm run android` runs the Android app via Expo.
- `npm run ios` runs the iOS app via Expo (macOS only).
- `npm run web` starts the web build via Expo.

## Coding Style & Naming Conventions
- Language: TypeScript + React Native.
- Follow existing file formatting and patterns in `SyzygyHearts/src/`.
- Components use `PascalCase` filenames (e.g., `RedThreadPath.tsx`).
- Utility/data modules use `camelCase` or descriptive nouns (e.g., `compatibilityMatrix.ts`).
- Keep imports grouped by domain (React, third-party, local) as seen in existing files.

## Testing Guidelines
- No dedicated test runner is configured in `package.json`.
- An example test file exists at `SyzygyHearts/src/services/auspiciousService.test.example.ts`.
- If adding tests, keep them alongside related modules and name with `.test.ts` or `.test.tsx`.

## Commit & Pull Request Guidelines
- No commit message convention is documented in the repo. Use concise, imperative summaries (e.g., "Add onboarding validation").
- PRs should include:
  - A brief description of changes and scope.
  - Linked issue or task reference, if available.
  - Screenshots or recordings for UI changes.

## Configuration Tips
- App configuration lives in `SyzygyHearts/app.json`.
- Entry point is `SyzygyHearts/index.ts`, with `App.tsx` as the main component.

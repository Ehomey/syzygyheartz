# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Syzygy Hearts is a mobile dating app for Android/iOS that matches users based on Chinese astrological compatibility (BaZi/Four Pillars system). Built with React Native + Expo + TypeScript.

## Development Commands

Run all commands from `SyzygyHearts/`:

```bash
npm install          # Install dependencies
npm run start        # Launch Expo Dev Server
npm run android      # Run on Android via Expo
npm run ios          # Run on iOS (macOS only)
npm run web          # Run web version
```

## Architecture

### Entry Points
- `SyzygyHearts/index.ts` - App entry point
- `SyzygyHearts/App.tsx` - Main component with navigation, screens, and most UI logic (large monolithic file)

### Source Structure (`SyzygyHearts/src/`)

| Directory | Purpose |
|-----------|---------|
| `astrology/` | BaZi calculations, zodiac logic, element compatibility |
| `components/` | Reusable UI: `AuspiciousTimeWidget`, `ElementFusion`, `RedThreadVisual`, `BaZiChartInteractive` |
| `screens/` | Full screens: `DestinyDashboard`, `RedThreadGarden`, `MatchFeedScreen`, `ChatScreen`, onboarding |
| `services/` | Business logic: `auspiciousService` (timing calculations), `astrology` (chart generation) |
| `data/` | Static data: `compatibilityMatrix`, `zodiacData`, `auspiciousData`, `destinyReadings` |
| `contexts/` | React contexts: `AuthContext` |
| `config/` | Firebase configuration |

### Key Types (`src/types.ts`)
- `FiveElement` - Wu Xing elements: Wood, Fire, Earth, Metal, Water
- `ZodiacAnimal` - 12 Chinese zodiac animals
- `FourPillars` / `BaZiChart` - BaZi chart structure with year/month/day/hour pillars
- `HeavenlyStem` / `EarthlyBranch` - Traditional Chinese calendar components

### Color System
Uses Chinese-inspired palette defined in `App.tsx`:
- `chineseRed` (#C41E3A), `imperialGold` (#FFD700), `jadeGreen` (#00A86B)
- Five Element colors: metal, wood, water, fire, earth

## Coding Conventions

- Components: PascalCase filenames (e.g., `RedThreadPath.tsx`)
- Utilities/data: camelCase (e.g., `compatibilityMatrix.ts`)
- Group imports: React first, then third-party, then local
- Types go in `src/types.ts` for shared types

## Testing

No test runner configured. Example test file at `src/services/auspiciousService.test.example.ts`. Name test files with `.test.ts` or `.test.tsx` suffix.

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

### Testing

```bash
npx ts-node --transpile-only src/domain/astrology/bazi/test-bazi.ts  # Run BaZi tests
```

## Architecture

Clean layered architecture separating concerns:

### Entry Points
- `SyzygyHearts/index.ts` - App entry point
- `SyzygyHearts/App.tsx` - Minimal root component (~22 lines)

### Source Structure (`SyzygyHearts/src/`)

```
src/
├── core/                    # Foundation layer
│   ├── types/               # TypeScript type definitions
│   │   ├── astrology.ts     # FiveElement, ZodiacAnimal, BaZiChart, Pillar
│   │   ├── user.ts          # UserProfile, BirthData
│   │   └── messaging.ts     # Conversation, Message types
│   └── constants/           # App-wide constants
│       ├── colors.ts        # COLORS, ELEMENT_COLORS
│       └── elements.ts      # Element cycles, stem/branch mappings
│
├── domain/                  # Business logic layer
│   └── astrology/
│       └── bazi/            # BaZi (Four Pillars) calculations
│           ├── julian-day.ts    # Julian Day Number conversions
│           ├── calculator.ts    # Core BaZi algorithm
│           └── test-bazi.ts     # 26 unit tests
│
├── state/                   # State management layer (Context + useReducer)
│   └── auth/
│       ├── types.ts         # AuthState, AuthAction
│       ├── reducer.ts       # authReducer
│       └── AuthContext.tsx  # AuthProvider, useAuth hook
│
├── presentation/            # UI layer
│   ├── components/
│   │   ├── astrology/       # ElementBadge, YuanFenScore, RedThreadLine, ZodiacWheel
│   │   ├── decorative/      # StarsBackground, TraditionalBorder
│   │   ├── cards/           # RedThreadCard
│   │   └── navigation/      # TabIcon
│   ├── screens/
│   │   ├── onboarding/      # WelcomeScreen, BirthInputScreen, PermissionsScreen
│   │   └── main/            # HomeScreen, HoroscopeScreen, MessagesScreen, ProfileScreen, CommunityScreen
│   └── navigation/
│       ├── MainTabs.tsx     # Bottom tab navigator
│       └── RootNavigator.tsx # Root stack navigator
│
└── (legacy directories)     # Old structure - being migrated
    ├── screens/             # DestinyDashboard still used
    ├── services/            # auspiciousService, astrology
    └── data/                # compatibilityMatrix, zodiacData
```

### Key Types (`src/core/types/`)

- `FiveElement` - Wu Xing elements: `'Wood' | 'Fire' | 'Earth' | 'Metal' | 'Water'`
- `ZodiacAnimal` - 12 Chinese zodiac animals
- `HeavenlyStem` - 10 Heavenly Stems (Jia, Yi, Bing, etc.)
- `EarthlyBranch` - 12 Earthly Branches (Zi, Chou, Yin, etc.)
- `Pillar` - Single pillar with stem, branch, elements, zodiac
- `BaZiChart` - Complete four pillars chart with element balance

### Color System (`src/core/constants/colors.ts`)

```typescript
import { COLORS, ELEMENT_COLORS } from './src/core/constants';

COLORS.chineseRed     // #C41E3A
COLORS.imperialGold   // #FFD700
COLORS.jadeGreen      // #00A86B
COLORS.inkBlack       // #1C1C1C
COLORS.creamWhite     // #FFFDD0

ELEMENT_COLORS.Wood   // #00A86B
ELEMENT_COLORS.Fire   // #C41E3A
ELEMENT_COLORS.Earth  // #CC7722
ELEMENT_COLORS.Metal  // #E8E8E8
ELEMENT_COLORS.Water  // #003366
```

### BaZi Algorithm (`src/domain/astrology/bazi/`)

The BaZi calculator uses Julian Day Number for accurate sexagenary cycle calculations:

```typescript
import { calculateBaZi } from './src/domain/astrology/bazi';

const chart = calculateBaZi(1990, 5, 15, 12);
// Returns: { year, month, day, hour, dayMasterElement, elementBalance, ... }
```

## Coding Conventions

- **Components**: PascalCase filenames (e.g., `ElementBadge.tsx`)
- **Utilities/data**: camelCase (e.g., `calculator.ts`)
- **Imports order**: React → third-party → local (core → domain → state → presentation)
- **Types**: Import from `src/core/types`
- **Constants**: Import from `src/core/constants`
- **State**: Use `useAuth()` hook from `src/state`

## State Management

Using React Context + useReducer pattern:

```typescript
import { useAuth } from './src/state';

function MyComponent() {
  const { state, login, logout } = useAuth();
  // state.isAuthenticated, state.user, state.baziChart
}
```

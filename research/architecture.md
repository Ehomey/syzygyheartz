# Syzygy Hearts - Integration Architecture

## Project Overview

Syzygy Hearts is a Chinese astrology-based dating app that uses BaZi (Four Pillars of Destiny) calculations to match users based on cosmic compatibility. This document outlines the complete architecture for integrating all components.

---

## App Flow Diagram

```
[App Launch]
    |
    v
[Splash Screen] --> [Onboarding]
    |                   |
    v                   v
[Auth Check]       [Birth Data Input]
    |                   |
    ├─ Not Logged In ───┘
    |
    v
[Main App (Tab Navigator)]
    |
    ├─ [Home/Discovery]
    |   ├─ User Cards with BaZi Info
    |   ├─ Swipe Interaction
    |   └─ Real-time Compatibility Calculation
    |
    ├─ [Matches]
    |   ├─ List of Matched Users
    |   ├─ Chat Interface
    |   └─ Compatibility Details
    |
    ├─ [Destiny]
    |   ├─ Personal BaZi Chart
    |   ├─ Daily Fortune
    |   ├─ Element Analysis
    |   └─ Zodiac Insights
    |
    └─ [Profile]
        ├─ Edit Profile
        ├─ Birth Data Management
        ├─ Settings
        └─ Preferences
```

---

## Component Hierarchy

```
App.tsx (Root)
├─ NavigationContainer
│   ├─ AuthStack (if not logged in)
│   │   ├─ WelcomeScreen
│   │   ├─ LoginScreen
│   │   └─ SignupScreen
│   │       └─ BirthDataForm
│   │
│   └─ MainTabNavigator (if logged in)
│       ├─ DiscoveryStack
│       │   ├─ DiscoveryScreen
│       │   │   ├─ UserCard
│       │   │   │   ├─ ProfileImage
│       │   │   │   ├─ BaZiSummary
│       │   │   │   └─ CompatibilityBadge
│       │   │   └─ SwipeGesture
│       │   └─ ProfileDetailScreen
│       │
│       ├─ MatchesStack
│       │   ├─ MatchesListScreen
│       │   │   └─ MatchCard
│       │   ├─ ChatScreen
│       │   └─ CompatibilityDetailScreen
│       │       ├─ ElementCompatibilityChart
│       │       ├─ ZodiacInteraction
│       │       └─ DestinyInsights
│       │
│       ├─ DestinyStack
│       │   ├─ DestinyDashboard
│       │   │   ├─ BaZiChartDisplay
│       │   │   ├─ FourPillarsView
│       │   │   ├─ ElementBalance
│       │   │   └─ DailyFortune
│       │   └─ DetailedReadingScreen
│       │
│       └─ ProfileStack
│           ├─ ProfileScreen
│           ├─ EditProfileScreen
│           │   └─ BirthDataEditor
│           └─ SettingsScreen
│
├─ Providers (Context)
│   ├─ AuthContext
│   ├─ BaZiContext
│   ├─ MatchingContext
│   └─ ThemeContext
│
└─ Shared Components
    ├─ Button
    ├─ Input
    ├─ Card
    ├─ ElementIcon
    ├─ ZodiacIcon
    └─ LoadingSpinner
```

---

## Data Flow Architecture

### 1. Birth Data Input → BaZi Calculation

```
[User Input]
├─ Date of Birth (YYYY-MM-DD)
├─ Time of Birth (HH:MM)
├─ Location (City/Timezone)
└─ Gender
    |
    v
[Validation Layer]
├─ Date format validation
├─ Time validation
└─ Location lookup
    |
    v
[BaZi Calculation Engine]
├─ Convert to Chinese Calendar
├─ Calculate Four Pillars
│   ├─ Year Pillar (年柱)
│   ├─ Month Pillar (月柱)
│   ├─ Day Pillar (日柱)
│   └─ Hour Pillar (时柱)
├─ Extract Elements
│   ├─ Heavenly Stems (天干)
│   └─ Earthly Branches (地支)
└─ Determine Zodiac Animal
    |
    v
[BaZi Chart Object]
├─ fourPillars: { year, month, day, hour }
├─ elements: { wood, fire, earth, metal, water }
├─ zodiacAnimal: string
├─ dominantElement: Element
├─ luckyElements: Element[]
└─ weakElements: Element[]
    |
    v
[Storage Layer]
├─ UserProfile object
├─ AsyncStorage (local)
└─ Backend API (cloud sync)
```

### 2. Matching Algorithm Data Flow

```
[Current User BaZi] + [Potential Match BaZi]
    |
    v
[Compatibility Engine]
├─ Element Compatibility Score (40%)
│   ├─ Productive cycle (生): +high
│   ├─ Destructive cycle (克): -medium
│   └─ Balance analysis
│
├─ Zodiac Compatibility Score (30%)
│   ├─ Harmonious pairs: +high
│   ├─ Conflicting pairs: -high
│   └─ Neutral pairs: baseline
│
├─ Pillar Harmony Score (20%)
│   ├─ Day pillar compatibility
│   ├─ Year pillar alignment
│   └─ Hour pillar synergy
│
└─ Personality Traits Score (10%)
    ├─ Element personality mapping
    └─ Complementary traits
    |
    v
[Compatibility Result]
├─ overallScore: 0-100
├─ elementScore: 0-100
├─ zodiacScore: 0-100
├─ breakdown: { strengths, challenges }
├─ insights: string[]
└─ recommendation: "Excellent" | "Good" | "Fair" | "Challenging"
```

### 3. UI Component Data Consumption

```
[BaZi Context Provider]
├─ currentUserBaZi: BaZiChart
├─ calculateCompatibility(otherBaZi): CompatibilityResult
├─ getDailyFortune(): DestinyReading
└─ refreshChart(): void
    |
    v
[Component Consumption]
├─ UserCard
│   ├─ Reads: zodiacAnimal, dominantElement
│   └─ Displays: Icon + Element color
│
├─ CompatibilityBadge
│   ├─ Calculates: compatibility on demand
│   └─ Displays: Score + Color-coded badge
│
├─ DestinyDashboard
│   ├─ Reads: Full BaZi chart
│   └─ Displays: All pillars + element balance
│
└─ MatchDetail
    ├─ Reads: Compatibility result
    └─ Displays: Detailed breakdown + insights
```

---

## State Management Approach

### Context-Based Architecture

We use React Context API for global state management, avoiding unnecessary complexity while maintaining clean separation of concerns.

#### 1. AuthContext
```typescript
State:
- user: User | null
- isLoading: boolean
- isAuthenticated: boolean

Methods:
- login(email, password)
- signup(userData)
- logout()
- updateProfile(data)
```

#### 2. BaZiContext
```typescript
State:
- currentUserChart: BaZiChart | null
- isCalculating: boolean
- dailyFortune: DestinyReading | null

Methods:
- calculateBaZi(birthData): BaZiChart
- calculateCompatibility(userChart, otherChart): CompatibilityResult
- getDailyFortune(): DestinyReading
- refreshChart(): void
```

#### 3. MatchingContext
```typescript
State:
- potentialMatches: UserProfile[]
- matches: Match[]
- isLoading: boolean

Methods:
- fetchPotentialMatches(): void
- swipeRight(userId): void
- swipeLeft(userId): void
- getMatches(): Match[]
```

#### 4. ThemeContext
```typescript
State:
- colors: ColorPalette
- currentTheme: 'light' | 'dark'

Methods:
- toggleTheme(): void
- getElementColor(element): string
```

### State Flow Diagram

```
[App Launch]
    |
    v
[Initialize Contexts]
    |
    ├─ AuthContext.checkAuth()
    |   └─ Load user from storage
    |
    ├─ BaZiContext.loadChart()
    |   └─ Calculate/load BaZi chart
    |
    └─ ThemeContext.loadPreferences()
        |
        v
[Contexts Ready]
    |
    v
[Components Subscribe]
    |
    ├─ Listen for auth changes
    ├─ React to chart updates
    └─ Apply theme changes
```

---

## Integration Points for Agent Work

### Agent 1: UI/UX Components
**Consumes:**
- `types.ts` - All type definitions
- `constants.ts` - Color palette, element colors
- `ThemeContext` - Theme state

**Provides:**
- Reusable component library
- Screen layouts
- Design system

**Integration:** Components placed in `src/components/`

---

### Agent 2: BaZi Calculation Engine
**Consumes:**
- `types.ts` - BaZiChart, FiveElement types
- Birth data from forms

**Provides:**
- BaZi calculation functions
- Chinese calendar conversion
- Element analysis

**Integration:** Logic placed in `src/astrology/`

---

### Agent 3: Compatibility Algorithm
**Consumes:**
- BaZi charts from Agent 2
- `types.ts` - CompatibilityResult interface
- Element relationship data

**Provides:**
- Compatibility scoring
- Match ranking
- Insight generation

**Integration:** Logic placed in `src/astrology/compatibility.ts`

---

### Agent 4: Data Layer & API
**Consumes:**
- User profiles with BaZi data
- Match results
- `types.ts` - All interfaces

**Provides:**
- API service functions
- Data persistence
- Cloud synchronization

**Integration:** Services in `src/services/`, data in `src/data/`

---

## File Structure

```
SyzygyHearts/
├─ src/
│   ├─ types.ts                    # Shared type definitions
│   ├─ constants.ts                # App-wide constants
│   │
│   ├─ astrology/                  # BaZi & Compatibility logic
│   │   ├─ bazi.ts                 # BaZi calculation
│   │   ├─ compatibility.ts        # Matching algorithm
│   │   ├─ elements.ts             # Element relationships
│   │   └─ zodiac.ts               # Zodiac logic
│   │
│   ├─ components/                 # Reusable UI components
│   │   ├─ common/                 # Basic components
│   │   ├─ cards/                  # Card components
│   │   ├─ icons/                  # Custom icons
│   │   └─ charts/                 # BaZi visualizations
│   │
│   ├─ screens/                    # Screen components
│   │   ├─ auth/
│   │   ├─ discovery/
│   │   ├─ matches/
│   │   ├─ destiny/
│   │   └─ profile/
│   │
│   ├─ contexts/                   # React contexts
│   │   ├─ AuthContext.tsx
│   │   ├─ BaZiContext.tsx
│   │   ├─ MatchingContext.tsx
│   │   └─ ThemeContext.tsx
│   │
│   ├─ services/                   # API & external services
│   │   ├─ api.ts
│   │   ├─ auth.ts
│   │   └─ storage.ts
│   │
│   ├─ data/                       # Static data & mock data
│   │   ├─ elementRelationships.ts
│   │   ├─ zodiacTraits.ts
│   │   └─ mockUsers.ts
│   │
│   ├─ utils/                      # Utility functions
│   │   ├─ dateHelpers.ts
│   │   ├─ validators.ts
│   │   └─ formatters.ts
│   │
│   └─ config/                     # App configuration
│       ├─ navigation.ts
│       └─ theme.ts
│
├─ App.tsx                         # Root component
├─ index.ts                        # Entry point
└─ package.json
```

---

## Technical Decisions

### 1. Why Context API over Redux?
- Simpler for our app size
- Less boilerplate
- Native React solution
- Sufficient for our state complexity

### 2. TypeScript First
- Type safety for BaZi calculations
- Better developer experience
- Catch errors at compile time
- Self-documenting code

### 3. Modular Architecture
- Separation of concerns
- Easy testing
- Independent development by agents
- Clear integration points

### 4. Expo Framework
- Cross-platform (iOS/Android)
- Fast development
- Built-in tooling
- Easy deployment

---

## Performance Considerations

### 1. BaZi Calculation Caching
- Calculate once, cache results
- Only recalculate on birth data change
- Store in AsyncStorage for persistence

### 2. Lazy Loading
- Load screens on demand
- Defer non-critical calculations
- Progressive image loading

### 3. Compatibility Calculation
- Calculate on-demand for visible users
- Cache results for viewed profiles
- Background calculation for top matches

---

## Testing Strategy

### Unit Tests
- BaZi calculation accuracy
- Compatibility algorithm correctness
- Element relationship logic
- Date conversion functions

### Integration Tests
- Context provider interactions
- API service calls
- Navigation flows
- Form submissions

### E2E Tests
- Complete user journeys
- Onboarding flow
- Swipe and match flow
- Profile editing

---

## Branch Strategy & Merging Plan

### Main Branches
```
main                  # Production-ready code
├─ develop           # Integration branch
    ├─ feature/ui-components        (Agent 1)
    ├─ feature/bazi-engine          (Agent 2)
    ├─ feature/compatibility        (Agent 3)
    ├─ feature/data-layer           (Agent 4)
    └─ feature/integration          (Agent 5 - you)
```

### Merge Order
1. **Foundation First** (Agent 5 - this work)
   - types.ts
   - constants.ts
   - Project structure
   - Merge to: `develop`

2. **Core Logic** (Agent 2)
   - BaZi calculation engine
   - Depends on: types.ts
   - Merge to: `develop`

3. **Matching Algorithm** (Agent 3)
   - Compatibility logic
   - Depends on: BaZi engine, types.ts
   - Merge to: `develop`

4. **Data Layer** (Agent 4)
   - API services
   - Storage layer
   - Depends on: types.ts, BaZi, compatibility
   - Merge to: `develop`

5. **UI Components** (Agent 1)
   - Can develop in parallel
   - Final integration depends on all above
   - Merge to: `develop`

6. **Final Integration** (Agent 5)
   - Connect all pieces
   - Test end-to-end
   - Bug fixes
   - Merge to: `main`

---

## Integration Checklist

### Pre-Integration
- [ ] All agents have completed their features
- [ ] Types are finalized and documented
- [ ] Constants are agreed upon
- [ ] Code reviews completed

### During Integration
- [ ] Resolve merge conflicts
- [ ] Update imports/exports
- [ ] Connect contexts to components
- [ ] Wire up navigation
- [ ] Link API calls to UI

### Post-Integration
- [ ] All tests passing
- [ ] No TypeScript errors
- [ ] App runs on iOS simulator
- [ ] App runs on Android emulator
- [ ] Performance check
- [ ] Final code review

---

## Next Steps for Other Agents

### Agent 1 (UI/UX)
1. Import types from `src/types.ts`
2. Import constants from `src/constants.ts`
3. Build components in `src/components/`
4. Use ThemeContext for styling
5. Create screens in `src/screens/`

### Agent 2 (BaZi Engine)
1. Import types from `src/types.ts`
2. Implement calculation in `src/astrology/bazi.ts`
3. Export functions that match BaZiChart interface
4. Add unit tests for calculations

### Agent 3 (Compatibility)
1. Import BaZi types and functions
2. Implement in `src/astrology/compatibility.ts`
3. Return CompatibilityResult interface
4. Use element data from `src/data/`

### Agent 4 (Data Layer)
1. Import all types
2. Implement services in `src/services/`
3. Create API client
4. Handle persistence with AsyncStorage

---

## Contact & Coordination

For questions about:
- **Types & Interfaces**: Check `types.ts` first
- **Constants**: Check `constants.ts`
- **Architecture decisions**: This document
- **Integration issues**: Agent 5 (Integration Lead)

## Version History

- v1.0 - Initial architecture (2025-12-14)
- Integration ready for agent work to begin

---

**Document Owner**: Agent 5 - Integration & Architecture Lead
**Last Updated**: 2025-12-14
**Status**: Ready for Team

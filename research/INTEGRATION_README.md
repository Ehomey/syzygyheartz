# Syzygy Hearts - Integration Guide

## Quick Start for Agents

Welcome to Syzygy Hearts! This guide will help you quickly get started with your assigned work.

---

## Project Status

**Current Phase:** Foundation Complete ✓

**Integration Lead:** Agent 5

**Repository:** SyzygyHearts

**Main Branch:** `master`

**Integration Branch:** `develop`

---

## What's Already Done

### Completed by Agent 5 (Integration & Architecture Lead)

✅ Project folder structure created
✅ Type definitions (`src/types.ts`)
✅ Constants (`src/constants.ts`)
✅ Architecture documentation (`research/architecture.md`)
✅ Branch strategy (`research/branch-strategy.md`)
✅ Git repository initialized

### Folder Structure

```
SyzygyHearts/
├─ src/
│   ├─ types.ts              ✅ READY - Import from here
│   ├─ constants.ts          ✅ READY - Import from here
│   ├─ astrology/            📁 Ready for Agent 2 & 3
│   ├─ components/           📁 Ready for Agent 1
│   ├─ screens/              📁 Exists (ready for expansion)
│   ├─ data/                 📁 Ready for Agent 4
│   ├─ services/             📁 Exists (ready for expansion)
│   ├─ utils/                📁 Ready for all agents
│   ├─ contexts/             📁 Exists (ready for expansion)
│   └─ config/               📁 Exists
├─ research/
│   ├─ architecture.md       📖 Read this first!
│   ├─ branch-strategy.md    📖 Read before coding!
│   └─ INTEGRATION_README.md 📖 You are here
└─ [React Native files]
```

---

## Quick Start by Agent

### Agent 1: UI/UX Components

**Your Mission:** Build beautiful, reusable components

**Read First:**
1. `research/architecture.md` - Component hierarchy section
2. `src/types.ts` - All type definitions
3. `src/constants.ts` - Colors, spacing, element colors

**Your Branch:**
```bash
git checkout develop
git pull origin develop
git checkout -b feature/ui-components
```

**What to Build:**
```
src/components/
├─ common/
│   ├─ Button.tsx
│   ├─ Input.tsx
│   ├─ Card.tsx
│   └─ LoadingSpinner.tsx
├─ cards/
│   ├─ UserCard.tsx          # Main discovery card
│   ├─ MatchCard.tsx         # Match list item
│   └─ CompatibilityCard.tsx
├─ icons/
│   ├─ ElementIcon.tsx       # Wood, Fire, Earth, Metal, Water
│   └─ ZodiacIcon.tsx        # 12 animals
└─ charts/
    ├─ BaZiChartDisplay.tsx
    ├─ ElementBalance.tsx
    └─ CompatibilityBreakdown.tsx
```

**Key Imports:**
```typescript
import { FiveElement, ZodiacAnimal, BaZiChart } from '@/types';
import { ELEMENT_COLORS, COLORS_LIGHT, SPACING } from '@/constants';
```

**Tips:**
- Use element colors from `ELEMENT_COLORS`
- Follow spacing scale from `SPACING`
- All components should accept a `style` prop
- Use TypeScript strictly

---

### Agent 2: BaZi Calculation Engine

**Your Mission:** Build the astrological calculation engine

**Read First:**
1. `research/architecture.md` - Data flow section
2. `src/types.ts` - BaZiChart, Pillar, FourPillars interfaces
3. Chinese BaZi astrology references (provided separately)

**Your Branch:**
```bash
git checkout develop
git pull origin develop
git checkout -b feature/bazi-engine
```

**What to Build:**
```
src/astrology/
├─ bazi.ts                   # Main calculation engine
│   └─ calculateBaZi(birthData: BirthData): BaZiChart
├─ chineseCalendar.ts        # Solar to Lunar conversion
├─ elements.ts               # Element relationships
└─ zodiac.ts                 # Zodiac animal logic

src/utils/
└─ dateHelpers.ts            # Date conversion utilities
```

**Main Function Signature:**
```typescript
export function calculateBaZi(birthData: BirthData): BaZiChart {
  // 1. Convert to Chinese calendar
  // 2. Calculate Four Pillars
  // 3. Determine elements
  // 4. Extract zodiac animal
  // 5. Analyze balance
  return baziChart;
}
```

**Key Imports:**
```typescript
import {
  BirthData,
  BaZiChart,
  FourPillars,
  Pillar,
  FiveElement,
  ZodiacAnimal
} from '@/types';
import {
  HEAVENLY_STEMS,
  EARTHLY_BRANCHES,
  FIVE_ELEMENTS
} from '@/constants';
```

**Tips:**
- Accuracy is critical
- Add unit tests for known birth dates
- Document the calculation steps
- Handle edge cases (unknown time, leap years)

---

### Agent 3: Compatibility Algorithm

**Your Mission:** Create the matching algorithm

**Read First:**
1. `research/architecture.md` - Matching algorithm section
2. `src/types.ts` - CompatibilityResult interface
3. `src/constants.ts` - Element relationships, zodiac pairs

**Dependencies:**
- Wait for Agent 2 to merge BaZi engine
- Then pull latest develop

**Your Branch:**
```bash
git checkout develop
git pull origin develop  # After Agent 2 merges
git checkout -b feature/compatibility-algorithm
```

**What to Build:**
```
src/astrology/
├─ compatibility.ts
│   └─ calculateCompatibility(chart1, chart2): CompatibilityResult
├─ elementRelationships.ts
│   └─ getElementCompatibilityScore(el1, el2): number
└─ zodiacRelationships.ts
    └─ getZodiacCompatibilityScore(z1, z2): number

src/data/
└─ compatibilityInsights.ts  # Insight text templates
```

**Main Function Signature:**
```typescript
export function calculateCompatibility(
  user1Chart: BaZiChart,
  user2Chart: BaZiChart
): CompatibilityResult {
  // 1. Calculate element score (40%)
  // 2. Calculate zodiac score (30%)
  // 3. Calculate day pillar score (20%)
  // 4. Calculate balance score (10%)
  // 5. Generate insights
  return compatibilityResult;
}
```

**Key Imports:**
```typescript
import { BaZiChart, CompatibilityResult } from '@/types';
import {
  COMPATIBILITY_WEIGHTS,
  COMPATIBILITY_THRESHOLDS,
  ZODIAC_TRINITY,
  ZODIAC_HARMONY_PAIRS,
  getElementRelationship,
  getZodiacRelationship
} from '@/constants';
```

**Scoring Weights:**
- Element compatibility: 40%
- Zodiac compatibility: 30%
- Day pillar harmony: 20%
- Overall balance: 10%

---

### Agent 4: Data Layer & API

**Your Mission:** Build the data persistence and API layer

**Read First:**
1. `research/architecture.md` - State management section
2. `src/types.ts` - All API-related types
3. `src/constants.ts` - API endpoints

**Dependencies:**
- Can start on structure immediately
- Full integration after Agents 2 & 3 merge

**Your Branch:**
```bash
git checkout develop
git pull origin develop
git checkout -b feature/data-layer
```

**What to Build:**
```
src/services/
├─ api.ts                    # Base API client
├─ auth.ts                   # Authentication
├─ storage.ts                # AsyncStorage wrapper
├─ baziService.ts            # BaZi data operations
└─ matchingService.ts        # Matching operations

src/data/
├─ mockUsers.ts              # Test data
├─ elementRelationships.ts   # Static data
└─ zodiacTraits.ts           # Static data
```

**Service Examples:**
```typescript
// baziService.ts
export const BaZiService = {
  async saveBaZiChart(userId: string, chart: BaZiChart): Promise<void>,
  async getBaZiChart(userId: string): Promise<BaZiChart | null>,
  async calculateAndSave(userId: string, birthData: BirthData): Promise<BaZiChart>
};

// matchingService.ts
export const MatchingService = {
  async getPotentialMatches(userId: string): Promise<UserProfile[]>,
  async getMatches(userId: string): Promise<Match[]>,
  async swipeRight(fromUserId: string, toUserId: string): Promise<Match | null>,
  async swipeLeft(fromUserId: string, toUserId: string): Promise<void>
};
```

**Key Imports:**
```typescript
import {
  UserProfile,
  BaZiChart,
  Match,
  CompatibilityResult,
  ApiResponse
} from '@/types';
import { API_ENDPOINTS, API_TIMEOUT } from '@/constants';
```

---

## Common Imports You'll Need

### For Everyone

```typescript
// Types (always import from here)
import {
  FiveElement,
  ZodiacAnimal,
  BaZiChart,
  UserProfile,
  CompatibilityResult
} from '@/types';

// Constants (use these, don't hardcode)
import {
  ELEMENT_COLORS,
  COLORS_LIGHT,
  SPACING,
  ZODIAC_ANIMALS,
  FIVE_ELEMENTS
} from '@/constants';
```

---

## Code Standards

### TypeScript Rules

✅ **DO:**
- Use strict TypeScript
- Import types from `src/types.ts`
- Use type annotations on function parameters
- Use interfaces over types for objects

❌ **DON'T:**
- Use `any` type
- Use `@ts-ignore` without explanation
- Create duplicate type definitions
- Leave any unused imports

### Example - Good Code:
```typescript
import { BaZiChart, FiveElement } from '@/types';
import { ELEMENT_COLORS } from '@/constants';

export function getElementColor(element: FiveElement): string {
  return ELEMENT_COLORS[element];
}

export function formatChart(chart: BaZiChart): string {
  return `${chart.zodiacAnimal} - ${chart.dominantElement}`;
}
```

### Example - Bad Code:
```typescript
// ❌ No types, hardcoded values
export function getElementColor(element: any): any {
  const colors = {
    Wood: '#00FF00',  // Don't hardcode!
    // ...
  };
  return colors[element];
}
```

---

## Testing Your Code

### Before Committing

```bash
# 1. Check TypeScript errors
npm run tsc

# 2. Run tests (when available)
npm test

# 3. Test in app
npm start
# Press 'a' for Android, 'i' for iOS
```

### Manual Testing Checklist

- [ ] No TypeScript errors
- [ ] No console errors
- [ ] No console.logs left in code
- [ ] Code is documented
- [ ] Follows types from types.ts
- [ ] Uses constants from constants.ts

---

## Git Workflow

### Daily Workflow

```bash
# 1. Start of day - get latest
git checkout develop
git pull origin develop
git checkout feature/your-branch
git merge develop

# 2. During work - commit often
git add src/your-files
git commit -m "feat(scope): description"

# 3. End of day - push
git push origin feature/your-branch

# 4. Ready to merge - create PR
# (See branch-strategy.md for details)
```

### Commit Message Format

```
<type>(<scope>): <subject>

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Code restructuring
- test: Tests
- chore: Build/dependencies

Examples:
feat(bazi): implement four pillars calculation
fix(compatibility): correct element scoring
docs(api): add service documentation
```

---

## Communication

### When You're Blocked

If you need something from another agent:

```
@agent-X: Need [what you need]
For: [what you're working on]
By: [when you need it]
```

### When You Merge

After merging to develop:

```
@all: Merged [feature] to develop
Files: [list of changed files]
Action: Pull latest develop before continuing
```

---

## Key Files Reference

### Must Read Before Starting

1. **architecture.md**
   - Complete system design
   - Component hierarchy
   - Data flow diagrams
   - Integration points

2. **branch-strategy.md**
   - Git workflow
   - Branch naming
   - Merge process
   - Conflict resolution

3. **types.ts**
   - All TypeScript interfaces
   - Type definitions
   - Type guards

4. **constants.ts**
   - All app constants
   - Color palette
   - Element relationships
   - Zodiac data
   - Configuration values

---

## Integration Timeline

```
✅ Week 1, Day 1-2: Foundation (Agent 5) - COMPLETE

⏳ Week 1, Day 3-7:
   - Agent 2: BaZi Engine
   - Agent 1: UI Components (parallel)

⏳ Week 2:
   - Agent 3: Compatibility (after Agent 2)
   - Agent 4: Data Layer
   - Agent 1: Continue UI

⏳ Week 3:
   - All agents complete & merge
   - Agent 5: Final integration

⏳ Week 4:
   - Testing & bug fixes
   - Release v1.0
```

---

## Quick Commands Reference

```bash
# See current branch and status
git status

# List all branches
git branch -a

# Create new branch
git checkout -b feature/your-feature

# Switch branches
git checkout branch-name

# See what changed
git diff

# View commit history
git log --oneline

# Sync with develop
git checkout develop
git pull origin develop
git checkout your-branch
git merge develop

# Push your work
git push origin your-branch
```

---

## Help & Support

### Questions About:

- **Types/Interfaces:** Check `src/types.ts` first
- **Constants/Colors:** Check `src/constants.ts` first
- **Architecture:** Check `research/architecture.md`
- **Git Workflow:** Check `research/branch-strategy.md`
- **Integration Issues:** Ask Agent 5

### Still Stuck?

1. Check the documentation files
2. Look at existing code examples
3. Ask the Integration Lead (Agent 5)
4. Coordinate with other agents

---

## Success Checklist

Before marking your work complete:

- [ ] All features implemented per architecture.md
- [ ] TypeScript types used correctly
- [ ] Constants used (no hardcoded values)
- [ ] Code is documented
- [ ] Tests written (unit tests)
- [ ] No console.logs left
- [ ] No TypeScript errors
- [ ] Manually tested in app
- [ ] Git commits are clean and descriptive
- [ ] Branch is up to date with develop
- [ ] Ready for code review

---

## Welcome to the Team!

You have everything you need to start building Syzygy Hearts. The foundation is solid, the architecture is clear, and the types are ready to use.

**Remember:**
- Communication prevents conflicts
- Test early and often
- When in doubt, ask
- We're building something amazing together!

**Let's make magic happen! ✨**

---

**Document Created:** 2025-12-14
**Created By:** Agent 5 - Integration & Architecture Lead
**Status:** Active
**Version:** 1.0

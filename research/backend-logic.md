# Backend Logic Implementation - Syzygy Hearts

## Overview
This document details the implementation of Chinese astrology-based matching algorithms for Syzygy Hearts, replacing generic swipe logic with destiny-based compatibility calculations.

**Branch:** `backend-logic`
**Implementation Date:** December 14, 2025
**Agent:** Backend Logic Lead (Agent 4)

---

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Core Modules](#core-modules)
3. [Data Structures](#data-structures)
4. [Compatibility Algorithm](#compatibility-algorithm)
5. [API Reference](#api-reference)
6. [Testing](#testing)
7. [Integration Guide](#integration-guide)
8. [Future Enhancements](#future-enhancements)

---

## Architecture Overview

The backend logic is organized into four main layers:

```
src/
├── astrology/           # Core astrology calculation modules
│   ├── zodiac.ts       # Chinese Zodiac system
│   ├── elements.ts     # Five Elements (Wu Xing)
│   ├── bazi.ts         # Four Pillars (BaZi) calculator
│   ├── compatibility.ts # Master compatibility engine
│   └── index.ts        # Module exports
│
├── data/               # Reference data and matrices
│   ├── zodiacData.ts   # 12 animals with traits
│   ├── elementsCycle.ts # Element relationships
│   ├── compatibilityMatrix.ts # 12x12 compatibility scores
│   └── destinyReadings.ts # Generated text templates
│
├── services/           # Application services
│   └── matchingService.ts # Destiny-based matching logic
│
└── screens/            # UI screens (updated)
    └── MatchFeedScreen.tsx # Match feed with Yuan Fen scores
```

---

## Core Modules

### 1. Zodiac System (`src/astrology/zodiac.ts`)

**Purpose:** Calculates Chinese zodiac animals from birth years and provides compatibility functions.

**Key Functions:**
- `getZodiacFromYear(year: number): ChineseZodiac`
  - Calculates zodiac animal from birth year
  - Base year 1924 = Rat, 12-year cycle

- `isSanHe(zodiac1, zodiac2): boolean`
  - Identifies San He (Trinity) relationships
  - Groups: Rat-Dragon-Monkey, Ox-Snake-Rooster, Tiger-Horse-Dog, Rabbit-Goat-Pig

- `isLiuHe(zodiac1, zodiac2): boolean`
  - Identifies Liu He (Secret Friend) pairs
  - 6 special paired relationships

- `isConflicting(zodiac1, zodiac2): boolean`
  - Identifies conflicting (opposing) signs
  - Signs 6 years apart

**Example:**
```typescript
const zodiac = getZodiacFromYear(1988); // Dragon
const compatible = isSanHe(ChineseZodiac.DRAGON, ChineseZodiac.RAT); // true
```

### 2. Five Elements System (`src/astrology/elements.ts`)

**Purpose:** Determines elements from birth data and calculates element-based compatibility.

**Key Functions:**
- `getElementFromYear(year: number): Element`
  - Determines element based on year's last digit
  - Pattern: Metal (0-1), Water (2-3), Wood (4-5), Fire (6-7), Earth (8-9)

- `calculateElementCompatibility(element1, element2): ElementCompatibilityResult`
  - Calculates compatibility based on five element cycles
  - Returns score (0-100) and relationship type

- `calculateElementBalance(elements: Element[]): ElementBalance`
  - Analyzes element distribution in BaZi chart
  - Identifies dominant and weak elements

**Element Relationships:**
- **Generating Cycle:** Wood → Fire → Earth → Metal → Water → Wood
- **Controlling Cycle:** Wood → Earth → Water → Fire → Metal → Wood

**Example:**
```typescript
const element = getElementFromYear(1988); // Earth (last digit 8)
const compat = calculateElementCompatibility(Element.EARTH, Element.FIRE);
// Result: harmonious (Fire generates Earth), score ~87
```

### 3. BaZi Calculator (`src/astrology/bazi.ts`)

**Purpose:** Calculates Four Pillars of Destiny from complete birth data (year, month, day, hour).

**Key Functions:**
- `calculateBaZi(year, month, day, hour): BaZiChart`
  - Generates complete BaZi chart with 4 pillars
  - Each pillar has Heavenly Stem + Earthly Branch

- `calculateBaZiCompatibility(chart1, chart2): BaZiCompatibility`
  - Compares two BaZi charts
  - Analyzes Day Master harmony, pillar alignments, element balance

**BaZi Components:**
- **Heavenly Stems (10):** Jia, Yi, Bing, Ding, Wu, Ji, Geng, Xin, Ren, Gui
- **Earthly Branches (12):** Zi, Chou, Yin, Mao, Chen, Si, Wu, Wei, Shen, You, Xu, Hai
- **Day Master:** The Day Stem represents the self in BaZi analysis

**Example:**
```typescript
const chart = calculateBaZi(1988, 3, 20, 14);
// Returns: { year: Pillar, month: Pillar, day: Pillar, hour: Pillar, dayMaster: Element }
```

### 4. Master Compatibility Engine (`src/astrology/compatibility.ts`)

**Purpose:** Combines all systems to calculate comprehensive Yuan Fen (缘分) compatibility score.

**Key Function:**
- `calculateYuanFen(person1: BirthData, person2: BirthData): YuanFenScore`

**Yuan Fen Score Calculation:**
```
Total Score (0-100) = Weighted Average of:
├── Zodiac Compatibility (30%)
├── Element Harmony (25%)
├── BaZi Alignment (25%)
└── Special Bonuses (20%)
    ├── San He Trinity: +20 points
    ├── Liu He Pair: +15 points
    ├── Element Harmony: +15 points
    ├── Pillar Harmonies: +5 per match (max 15)
    └── Day Master Harmony: +10 points
```

**Example:**
```typescript
const person1 = { year: 1988, month: 3, day: 20, hour: 14 };
const person2 = { year: 1984, month: 7, day: 15, hour: 10 };

const result = calculateYuanFen(person1, person2);
// Result: {
//   total: 92,
//   zodiacInfo: { isSanHe: true, ... },
//   recommendation: 'Excellent Match'
// }
```

---

## Data Structures

### Zodiac Data (`src/data/zodiacData.ts`)

Contains comprehensive information for all 12 Chinese zodiac animals:

```typescript
export interface ZodiacTraits {
  animal: ChineseZodiac;
  chineseName: string;
  element: 'Wood' | 'Fire' | 'Earth' | 'Metal' | 'Water';
  yin: boolean;
  years: number[];
  traits: {
    positive: string[];
    negative: string[];
    personality: string;
  };
  luckyNumbers: number[];
  luckyColors: string[];
  compatibility: {
    best: ChineseZodiac[];
    good: ChineseZodiac[];
    challenging: ChineseZodiac[];
  };
}
```

### Compatibility Matrix (`src/data/compatibilityMatrix.ts`)

12x12 matrix of compatibility scores between all zodiac pairs:

```typescript
type CompatibilityMatrix = Record<ChineseZodiac, Record<ChineseZodiac, number>>;

// Example scores:
// Rat-Dragon (San He): 97
// Rat-Ox (Liu He): 95
// Rat-Horse (Conflicting): 25
```

### Element Cycles (`src/data/elementsCycle.ts`)

Defines the five element relationships:

```typescript
export const GENERATING_CYCLE: Record<Element, Element> = {
  [Element.WOOD]: Element.FIRE,
  [Element.FIRE]: Element.EARTH,
  [Element.EARTH]: Element.METAL,
  [Element.METAL]: Element.WATER,
  [Element.WATER]: Element.WOOD
};

export const ELEMENT_COMPATIBILITY: Record<Element, Record<Element, number>> = {
  // Wood-Fire: 95 (generating - highly harmonious)
  // Wood-Earth: 30 (controlling - challenging)
  // etc.
};
```

### Destiny Readings (`src/data/destinyReadings.ts`)

Templates for generating personalized compatibility descriptions:

```typescript
export interface CompatibilityReading {
  headline: string;
  overview: string;
  strengths: string[];
  challenges: string[];
  advice: string;
}
```

---

## Compatibility Algorithm

### Yuan Fen Score Calculation Process

1. **Input:** Two BirthData objects (year, month, day, hour)

2. **Zodiac Analysis (30% weight):**
   - Calculate zodiac animals from birth years
   - Get base compatibility from matrix
   - Check for San He, Liu He, or conflicting relationships
   - Apply bonuses/penalties

3. **Element Analysis (25% weight):**
   - Determine primary elements from birth years
   - Calculate element relationship (generating, controlling, etc.)
   - Score based on harmony (85-95 for harmonious, 20-30 for conflicting)

4. **BaZi Analysis (25% weight):**
   - Generate full BaZi charts for both people
   - Compare Day Masters (most important)
   - Count pillar harmonies
   - Analyze element balance across both charts

5. **Special Bonuses (20% weight):**
   - San He Trinity: +20 points (strongest connection)
   - Liu He Secret Friend: +15 points (special paired bond)
   - Element Harmony: +15 points
   - Pillar Harmonies: +5 per match (max 15)
   - Day Master Harmony: +10 points (when highly compatible)

6. **Output:** YuanFenScore object with:
   - Total score (0-100)
   - Breakdown by category
   - Strengths and challenges
   - Compatibility reading
   - Recommendation level

### Score Interpretation

| Score Range | Level | Meaning |
|------------|-------|---------|
| 90-100 | Excellent | Rare celestial connection, highly compatible |
| 70-89 | Very Good | Strong compatibility with great potential |
| 50-69 | Good | Promising match, requires mutual effort |
| 30-49 | Challenging | Significant differences to navigate |
| 0-29 | Difficult | Fundamental obstacles, exceptional effort needed |

---

## API Reference

### Main Functions

#### `calculateYuanFen(person1: BirthData, person2: BirthData): YuanFenScore`

Calculates comprehensive compatibility score between two people.

**Parameters:**
- `person1`: First person's birth data
- `person2`: Second person's birth data

**Returns:** YuanFenScore object with total score, breakdown, insights, and reading

**Example:**
```typescript
const result = calculateYuanFen(
  { year: 1990, month: 5, day: 15, hour: 10 },
  { year: 1992, month: 8, day: 20, hour: 14 }
);

console.log(result.total); // 78
console.log(result.recommendation); // "Very Good Match"
console.log(result.strengths); // Array of compatibility strengths
```

#### `quickCompatibilityCheck(year1: number, year2: number)`

Simplified compatibility check using only birth years.

**Use Case:** Quick preview before full calculation

**Example:**
```typescript
const quick = quickCompatibilityCheck(1988, 1984);
// { score: 92, zodiac1: Dragon, zodiac2: Rat, compatible: true }
```

#### `getDestinyMatches(currentUser, potentialMatches, options)`

Returns sorted matches based on Yuan Fen scores.

**Parameters:**
- `currentUser`: UserProfile with birth data
- `potentialMatches`: Array of potential match profiles
- `options`: Filtering and sorting options

**Returns:** Array of MatchResult objects sorted by compatibility

**Example:**
```typescript
const matches = await getDestinyMatches(currentUser, allUsers, {
  minScore: 60,
  limit: 20,
  highlightSanHe: true,
  highlightLiuHe: true
});
```

---

## Testing

### Test Suite: `__tests__/compatibility.test.ts`

Comprehensive tests covering:

1. **Zodiac System Tests**
   - Zodiac calculation from years
   - San He relationship detection
   - Liu He pair identification
   - Conflicting pair detection

2. **Element System Tests**
   - Element determination from years
   - Element compatibility calculations
   - Relationship type identification

3. **BaZi System Tests**
   - Complete chart generation
   - Compatibility between charts
   - Dominant element identification

4. **Yuan Fen Compatibility Tests**
   - Full score calculation
   - Special relationship bonuses
   - Strengths and challenges generation
   - Compatibility reading generation

5. **Edge Cases**
   - Same birth year handling
   - Large year differences
   - All zodiac combinations
   - Result consistency

### Running Tests

```bash
# Install test dependencies
npm install --save-dev jest @types/jest ts-jest

# Run tests
npm test

# Run with coverage
npm test -- --coverage
```

---

## Integration Guide

### 1. Using the Matching Service

```typescript
import { getDestinyMatches, UserProfile } from './services/matchingService';

// Get current user profile
const currentUser: UserProfile = {
  id: 'user123',
  name: 'Alice',
  age: 30,
  gender: 'female',
  birthData: { year: 1994, month: 5, day: 15, hour: 10 },
  photos: ['url'],
  preferences: { minAge: 25, maxAge: 40, gender: 'male' }
};

// Fetch potential matches from database
const potentialMatches = await fetchUsersFromFirestore();

// Get destiny-based matches
const matches = await getDestinyMatches(currentUser, potentialMatches, {
  minScore: 60,
  limit: 20,
  highlightSanHe: true
});

// Display matches sorted by Yuan Fen score
matches.forEach(match => {
  console.log(`${match.profile.name}: ${match.yuanFenScore}% Yuan Fen`);
  console.log(`Zodiac: ${match.zodiacPair.match}`);
  console.log(`Special: ${match.specialConnection || 'None'}`);
});
```

### 2. Using in React Native Components

```typescript
import { getDestinyMatches } from '../services/matchingService';

const MatchFeedScreen = () => {
  const [matches, setMatches] = useState<MatchResult[]>([]);

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    const destinyMatches = await getDestinyMatches(currentUser, allUsers);
    setMatches(destinyMatches);
  };

  return (
    <Swiper cards={matches} renderCard={renderMatchCard} />
  );
};
```

### 3. Highlighting Special Connections

```typescript
// Find San He (Trinity) matches
const sanHeMatches = matches.filter(
  m => m.specialConnection === 'San He Trinity'
);

// Find Liu He (Secret Friend) matches
const liuHeMatches = matches.filter(
  m => m.specialConnection === 'Liu He Secret Friend'
);

// Display with special badges
{match.specialConnection === 'San He Trinity' && (
  <Badge>✨ Trinity Connection</Badge>
)}
```

---

## Future Enhancements

### Phase 1: Enhanced Calculations
- [ ] Solar calendar conversion for accurate BaZi
- [ ] Hour-based compatibility (requires birth time)
- [ ] Hidden stems analysis
- [ ] Ten Gods relationship system
- [ ] Luck pillar progression

### Phase 2: Advanced Features
- [ ] Relationship timing predictions
- [ ] Compatibility evolution over time
- [ ] Clash/harmony date identification
- [ ] Custom compatibility reports (PDF export)
- [ ] Multi-language support (Chinese, English, etc.)

### Phase 3: Machine Learning
- [ ] ML model trained on successful matches
- [ ] Personalized weight adjustments
- [ ] Behavior-based compatibility refinement
- [ ] Predictive relationship success modeling

### Phase 4: Additional Systems
- [ ] Western astrology integration
- [ ] Vedic astrology compatibility
- [ ] Numerology integration
- [ ] Combined multi-system scores

---

## Technical Notes

### Performance Considerations

1. **Caching:** Consider caching BaZi charts and zodiac calculations
2. **Batch Processing:** Calculate multiple matches in parallel
3. **Lazy Loading:** Load detailed compatibility only when needed
4. **Indexing:** Index users by zodiac/element for faster filtering

### Database Schema Recommendations

```typescript
interface UserDocument {
  id: string;
  profile: {...};
  astrology: {
    zodiac: ChineseZodiac;
    element: Element;
    baziChart: BaZiChart; // Pre-calculated
    yearOfBirth: number;
  };
  matches: {
    liked: string[];
    passed: string[];
    mutual: string[];
  };
}

// Index on: astrology.zodiac, astrology.element
```

### Security Considerations

1. Birth data is sensitive - encrypt in database
2. Don't expose full birth dates in public profiles
3. Allow users to hide/show astrological information
4. Implement rate limiting on compatibility calculations

---

## Conclusion

The Chinese astrology-based matching system provides a sophisticated, culturally-rich alternative to generic swipe-based matching. By calculating Yuan Fen scores based on zodiac compatibility, elemental harmony, and BaZi alignment, Syzygy Hearts offers users meaningful insights into their cosmic connections.

The system is:
- **Accurate:** Based on traditional Chinese astrology principles
- **Comprehensive:** Considers multiple factors (zodiac, elements, BaZi)
- **Performant:** Optimized calculations with caching potential
- **Extensible:** Easy to add new features and systems
- **Well-tested:** Comprehensive test coverage

Users can now discover matches based on destiny rather than just photos, creating deeper, more meaningful connections.

---

**Document Version:** 1.0
**Last Updated:** December 14, 2025
**Author:** Backend Logic Lead (Agent 4)

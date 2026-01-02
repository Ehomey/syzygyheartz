# Auspicious Timing System - Usage Guide

## Overview
The Auspicious Timing system provides personalized timing recommendations based on the user's BaZi Day Master element and the Chinese hour system (shichen).

## Files Created

### 1. `src/data/auspiciousData.ts`
Contains:
- **CHINESE_HOURS**: Array of 12 Chinese hours with element associations
- **ELEMENT_ACTIVITIES**: Favorable/unfavorable activities for each element
- **DAILY_INSIGHTS**: Insight templates for each element type
- **ACTIVITY_TEMPLATES**: Time-specific recommendations (morning/afternoon/evening/night)
- **LUNAR_PHASE_MODIFIERS**: Element strength adjustments by lunar phase

### 2. `src/services/auspiciousService.ts`
Core functions:
- **getAuspiciousTimes(userElement, date)**: Returns 2-3 most favorable time periods
- **getElementStrength(userElement, date)**: Calculates element strength (0-100)
- **getDailyInsight(baziChart, date)**: Returns complete daily insight object
- **isCurrentTimeAuspicious(userElement, date)**: Checks if current time is favorable
- **formatTimeRange(startHour, endHour)**: Formats time for display
- **getCurrentHourRecommendation(userElement, date)**: Quick recommendation text

### 3. `src/components/AuspiciousTimeWidget.tsx`
React Native component with two modes:
- **Full mode**: Shows 2-3 time periods with details
- **Compact mode**: Shows brief recommendation

## Usage Examples

### Basic Usage in a Screen

```tsx
import React from 'react';
import { View, ScrollView } from 'react-native';
import { AuspiciousTimeWidget } from '../components/AuspiciousTimeWidget';
import { BaZiChart } from '../types';

const DashboardScreen: React.FC = () => {
  // Assume user's BaZi chart is available
  const userBaziChart: BaZiChart = {
    // ... user's chart data
    dayMasterElement: 'Water', // User's day master element
    // ... other chart properties
  };

  return (
    <ScrollView>
      {/* Full Widget */}
      <AuspiciousTimeWidget baziChart={userBaziChart} />

      {/* Other dashboard content */}
    </ScrollView>
  );
};
```

### Compact Mode

```tsx
<AuspiciousTimeWidget baziChart={userBaziChart} compact={true} />
```

### Using Service Functions Directly

```tsx
import {
  getAuspiciousTimes,
  getDailyInsight,
  isCurrentTimeAuspicious,
} from '../services/auspiciousService';

// Get auspicious times
const times = getAuspiciousTimes('Water', new Date());
console.log(times);
// Output: Array of AuspiciousTime objects

// Get daily insight
const insight = getDailyInsight(userBaziChart, new Date());
console.log(insight.insight); // "Flow with conversations today..."
console.log(insight.favorableActivities); // ["Intuitive connection", ...]

// Check current time
const { isAuspicious, currentPeriod } = isCurrentTimeAuspicious('Fire');
if (isAuspicious) {
  console.log(`Current period: ${currentPeriod.activity}`);
}
```

## How It Works

### Element-Hour Relationships
The system determines auspicious times based on the Five Elements generating cycle:

**Auspicious when:**
1. **Same Element**: Hour element matches user element (Excellent)
2. **Being Generated**: Hour element generates user element (Excellent)
   - Example: Water hour generates Wood user
3. **Generating**: User element generates hour element (Good)
   - Example: Wood user generates Fire hour

### Chinese Hours (Shichen)
- 11pm-1am: Water (Zi 子时)
- 1-3am: Earth (Chou 丑时)
- 3-5am: Wood (Yin 寅时)
- 5-7am: Wood (Mao 卯时)
- 7-9am: Earth (Chen 辰时)
- 9-11am: Fire (Si 巳时)
- 11am-1pm: Fire (Wu 午时)
- 1-3pm: Earth (Wei 未时)
- 3-5pm: Metal (Shen 申时)
- 5-7pm: Metal (You 酉时)
- 7-9pm: Earth (Xu 戌时)
- 9-11pm: Water (Hai 亥时)

### Example for Water Element User
Auspicious times would be:
- **11pm-1am** (Water hour - Same element)
- **3-5pm & 5-7pm** (Metal hours - Metal generates Water)
- **3-5am & 5-7am** (Wood hours - Water generates Wood)

## Widget Features

### Visual Design
- **Dark Theme**: Background #1C1C1C, cards #2A2A2A
- **Gold Accents**: #FFD700 for highlights and titles
- **Element Badge**: Shows user's element with element color
- **Accent Bars**: Left-side colored bars indicate strength
- **NOW Badge**: Highlights current active period

### Information Displayed
For each auspicious time:
- Time range (e.g., "9 AM - 11 AM")
- Chinese hour name (e.g., "巳时 • Fire Hour")
- Strength indicator (Excellent/Good/Moderate)
- Activity recommendation
- Reason for auspiciousness

### Auto-Updates
Widget updates every minute to:
- Highlight current time if auspicious
- Show accurate "NOW" badges
- Provide real-time recommendations

## Integration with Dashboard

The widget is designed to integrate seamlessly into the Destiny Dashboard. Import and use it like:

```tsx
import { AuspiciousTimeWidget } from '../components/AuspiciousTimeWidget';

// In your Dashboard component
<View style={styles.section}>
  <AuspiciousTimeWidget baziChart={userBaziChart} />
</View>
```

## Customization

### Styling
All styles are in the component's StyleSheet. Key style constants:
- `#1C1C1C`: Main background
- `#2A2A2A`: Card background
- `#FFD700`: Gold accent color
- `#333333`: Active card background

### Data
Edit `src/data/auspiciousData.ts` to customize:
- Activity recommendations
- Daily insight templates
- Element attributes

## Type Definitions

```typescript
interface AuspiciousTime {
  startHour: number;
  endHour: number;
  hourName: string;
  chineseName: string;
  element: FiveElement;
  strength: 'Excellent' | 'Good' | 'Moderate';
  activity: string;
  reason: string;
}

interface DailyInsight {
  date: Date;
  userElement: FiveElement;
  overallStrength: number; // 0-100
  insight: string;
  favorableActivities: string[];
  communication: string;
  energy: string;
  auspiciousTimes: AuspiciousTime[];
}
```

## Notes
- The system uses a simplified lunar phase calculation based on day of month
- For production, consider integrating an actual lunar calendar library
- Times are calculated based on local device time
- Widget auto-refreshes every minute for real-time updates

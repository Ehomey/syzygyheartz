# Auspicious Time Widget - Visual Example

## Full Widget Display

```
┌─────────────────────────────────────────────────────────┐
│  Auspicious Times Today              [Water Element]    │  ← Gold text (#FFD700)
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ● You're in an auspicious period right now!            │  ← Gold highlight (if active)
│                                                          │
│  ┌────┬─────────────────────────────────────────────┐  │
│  │    │  3 PM - 5 PM                          [NOW] │  │  ← Gold NOW badge
│  │ ━  │  申时 • Metal Hour                          │  │  ← Chinese name
│  │    │  ● Excellent                                │  │  ← Gold strength dot
│  │    │  Deep, reflective sharing                   │  │  ← White activity text
│  │    │  You receive natural support and energy     │  │  ← Gray italic reason
│  └────┴─────────────────────────────────────────────┘  │
│                                                          │
│  ┌────┬─────────────────────────────────────────────┐  │
│  │    │  5 PM - 7 PM                                │  │
│  │ ━  │  酉时 • Metal Hour                          │  │
│  │    │  ● Excellent                                │  │
│  │    │  Deep, reflective sharing                   │  │
│  │    │  You receive natural support and energy     │  │
│  └────┴─────────────────────────────────────────────┘  │
│                                                          │
│  ┌────┬─────────────────────────────────────────────┐  │
│  │    │  9 PM - 11 PM                               │  │
│  │ ━  │  亥时 • Water Hour                          │  │
│  │    │  ● Excellent                                │  │
│  │    │  Emotional intimacy flows naturally         │  │
│  │    │  Your element is strong during this hour    │  │
│  └────┴─────────────────────────────────────────────┘  │
│                                                          │
├─────────────────────────────────────────────────────────┤
│  Times are based on your Water day master element       │  ← Gray italic footer
└─────────────────────────────────────────────────────────┘
```

## Color Scheme

- **Background**: `#1C1C1C` (Very dark gray)
- **Cards**: `#2A2A2A` (Dark gray)
- **Active Card**: `#333333` with gold border `#FFD700`
- **Gold Accents**: `#FFD700` (titles, NOW badge, excellent strength)
- **Orange-Gold**: `#FFA500` (good strength)
- **Dark Goldenrod**: `#DAA520` (moderate strength)
- **White Text**: `#FFFFFF` (main content)
- **Light Gray**: `#B0B0B0` (Chinese hour names)
- **Medium Gray**: `#999999` (reasons)
- **Dark Gray**: `#888888` (footer)

## Compact Widget Display

```
┌─────────────────────────────────────────────────────────┐
│  Auspicious Times              [Water]                  │  ← Gold title
│  Right now is excellent for: Deep, reflective sharing   │  ← White text
└─────────────────────────────────────────────────────────┘
```

## Element Badge Colors

Based on ELEMENT_COLORS from constants.ts:

- **Wood**: `#2ECC71` (Green)
- **Fire**: `#E74C3C` (Red)
- **Earth**: `#F39C12` (Orange)
- **Metal**: `#95A5A6` (Silver/Gray)
- **Water**: `#3498DB` (Blue)

## Typography

- **Title**: 20px, Bold (700), Gold
- **Time Range**: 18px, Bold (700), White (Gold when active)
- **Chinese Hour**: 14px, Medium (500), Light Gray
- **Strength**: 13px, Semi-Bold (600), Strength Color
- **Activity**: 15px, Semi-Bold (600), White
- **Reason**: 13px, Regular (400), Gray, Italic
- **Footer**: 12px, Regular (400), Dark Gray, Italic

## Accent Bar

- Left-side vertical bar on each time period card
- Width: 4px (normal), 6px (active)
- Color matches strength:
  - Excellent: Gold `#FFD700`
  - Good: Orange-Gold `#FFA500`
  - Moderate: Dark Goldenrod `#DAA520`

## NOW Badge

- Background: Gold `#FFD700`
- Text: Dark gray `#1C1C1C`
- Font: 11px, Extra Bold (800)
- Padding: 8px horizontal, 4px vertical
- Border Radius: 6px

## Current Status Banner

When user is in an auspicious period:
- Background: `#2A2A2A`
- Border: 1px solid `#FFD700`
- Pulsing indicator dot (8px diameter)
- Text: "You're in an auspicious period right now!"

## Responsive Behavior

- Scrollable when more than 3 time periods
- Max height: 400px
- Smooth scroll
- Cards have 12px margin between them
- Overall padding: 20px
- Border radius: 16px (container), 12px (cards)

## Shadow & Elevation

- Shadow color: Black `#000`
- Shadow offset: 0px horizontal, 4px vertical
- Shadow opacity: 0.3
- Shadow radius: 8px
- Elevation: 5 (Android)

## Empty State

When no auspicious times:
```
┌─────────────────────────────────────────────────────────┐
│  Auspicious Times Today              [Fire Element]     │
├─────────────────────────────────────────────────────────┤
│                                                          │
│                                                          │
│              No strongly auspicious times today.         │  ← Light gray
│                                                          │
│         Stay open to possibilities throughout the day.   │  ← Medium gray
│                                                          │
│                                                          │
├─────────────────────────────────────────────────────────┤
│  Times are based on your Fire day master element        │
└─────────────────────────────────────────────────────────┘
```

## Integration Example in Dashboard

```tsx
<ScrollView style={styles.dashboard}>
  {/* User's BaZi Chart Summary */}
  <BaZiSummaryCard baziChart={userBazi} />

  {/* Auspicious Time Widget */}
  <AuspiciousTimeWidget baziChart={userBazi} />

  {/* Daily Fortune */}
  <DailyFortuneCard baziChart={userBazi} />

  {/* Match Recommendations */}
  <MatchRecommendations />
</ScrollView>
```

## Real-World Example Output

For a **Water element** user on a typical day:

**Morning (6am-12pm)**
- No auspicious periods (most hours are Earth and Fire)

**Afternoon (12pm-6pm)**
- ✓ 3-5pm (Shen - Metal) - EXCELLENT - "Deep, reflective sharing"
- ✓ 5-7pm (You - Metal) - EXCELLENT - "Deep, reflective sharing"

**Evening (6pm-12am)**
- ✓ 9-11pm (Hai - Water) - EXCELLENT - "Emotional intimacy flows naturally"

Widget would display these 3 periods, with the current one highlighted.

## Accessibility

- High contrast (WCAG AAA compliant for most text)
- Clear visual hierarchy
- Readable font sizes (minimum 12px)
- Color is not the only indicator (strength also shown as text)
- Supports screen readers (all Text components)

## Animation Potential

Future enhancements could include:
- Fade-in when entering an auspicious period
- Subtle pulse on NOW badge
- Smooth height transition when periods change
- Particle effects for excellent periods
- Progress bar showing time remaining in current period

## Performance Notes

- Updates every 60 seconds (not every second)
- Minimal re-renders
- No heavy calculations on render
- Efficient time comparison
- Suitable for low-end devices

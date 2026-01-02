# Chinese Astrology Research for Syzygy Hearts
## Comprehensive Guide to Compatibility Matching Systems

**Agent 2: Chinese Astrology Research Lead**
**Version:** 1.0
**Last Updated:** December 14, 2025

---

## Table of Contents

1. [Chinese Zodiac (生肖)](#1-chinese-zodiac-生肖)
2. [BaZi (八字) - Four Pillars of Destiny](#2-bazi-八字---four-pillars-of-destiny)
3. [Five Elements (五行) System](#3-five-elements-五行-system)
4. [Compatibility Algorithms](#4-compatibility-algorithms)
5. [Practical Implementation](#5-practical-implementation)
6. [JSON Data Structures](#6-json-data-structures)
7. [References](#7-references)

---

## 1. Chinese Zodiac (生肖)

### 1.1 Overview

The Chinese zodiac is a 12-year cycle where each year is represented by a specific animal sign. Unlike Western astrology which is based on months, the Chinese zodiac follows the lunar calendar, with the new year typically falling between January 21 and February 20.

### 1.2 The 12 Animal Signs and Personality Traits

#### **Rat (鼠)**
- **Years:** 1924, 1936, 1948, 1960, 1972, 1984, 1996, 2008, 2020, 2032
- **Element:** Water
- **Yin/Yang:** Yang
- **Personality Traits:**
  - Quick-witted, clever, charming, sharp, and funny
  - Excellent taste, generous and loyal to their circle
  - Motivated by money, can be greedy
  - Very curious, seek knowledge, welcome challenges
  - Good at saving and hoarding resources

#### **Ox (牛)**
- **Years:** 1925, 1937, 1949, 1961, 1973, 1985, 1997, 2009, 2021, 2033
- **Element:** Earth
- **Yin/Yang:** Yin
- **Personality Traits:**
  - Diligent, patient, and rather silent
  - Reliable as friends, honest and trustworthy
  - Easy to irritate, tend to be stubborn and obstinate
  - May feel lonely and insecure
  - Methodical and hardworking

#### **Tiger (虎)**
- **Years:** 1926, 1938, 1950, 1962, 1974, 1986, 1998, 2010, 2022, 2034
- **Element:** Wood
- **Yin/Yang:** Yang
- **Personality Traits:**
  - Brave, confident, and competitive
  - Sensitive, emotional, and thoughtful
  - Can be impatient
  - May have conflicts with authority figures
  - Natural leaders with strong convictions

#### **Rabbit (兔)**
- **Years:** 1927, 1939, 1951, 1963, 1975, 1987, 1999, 2011, 2023, 2035
- **Element:** Wood
- **Yin/Yang:** Yin
- **Personality Traits:**
  - Quiet, elegant, kind, and responsible
  - Refined tastes and appreciation for beauty
  - Gentle and compassionate
  - Diplomatic and peace-loving
  - Can be overly cautious or indecisive

#### **Dragon (龙)**
- **Years:** 1928, 1940, 1952, 1964, 1976, 1988, 2000, 2012, 2024, 2036
- **Element:** Earth
- **Yin/Yang:** Yang
- **Personality Traits:**
  - Confident, intelligent, and enthusiastic
  - Natural charisma and magnetism
  - Most coveted zodiac sign in Chinese culture
  - Ambitious and success-oriented
  - Can be demanding or arrogant

#### **Snake (蛇)**
- **Years:** 1929, 1941, 1953, 1965, 1977, 1989, 2001, 2013, 2025, 2037
- **Element:** Fire
- **Yin/Yang:** Yin
- **Personality Traits:**
  - Enigmatic, intelligent, and wise
  - Graceful, analytical, and insightful
  - Deep need for introspection and personal growth
  - Very curious but can be jealous and possessive
  - Excellent at strategic thinking

#### **Horse (马)**
- **Years:** 1930, 1942, 1954, 1966, 1978, 1990, 2002, 2014, 2026, 2038
- **Element:** Fire
- **Yin/Yang:** Yang
- **Personality Traits:**
  - Never surrender, always positive and energetic
  - Desire freedom and self-expression
  - Social and popular
  - Bad at keeping secrets
  - Lose interest quickly, need constant stimulation

#### **Goat/Sheep (羊)**
- **Years:** 1931, 1943, 1955, 1967, 1979, 1991, 2003, 2015, 2027, 2039
- **Element:** Earth
- **Yin/Yang:** Yin
- **Personality Traits:**
  - Gentle, compassionate, and artistic
  - Warm-hearted with intense empathy
  - Put others' needs before their own
  - Appreciate beauty and harmony
  - Can be pessimistic or anxious

#### **Monkey (猴)**
- **Years:** 1932, 1944, 1956, 1968, 1980, 1992, 2004, 2016, 2028, 2040
- **Element:** Metal
- **Yin/Yang:** Yang
- **Personality Traits:**
  - Excellent social skills, very humorous
  - Playful and sometimes mischievous
  - Energetic, upbeat, good listener
  - Lack self-control
  - Clever and innovative problem-solvers

#### **Rooster (鸡)**
- **Years:** 1933, 1945, 1957, 1969, 1981, 1993, 2005, 2017, 2029, 2041
- **Element:** Metal
- **Yin/Yang:** Yin
- **Personality Traits:**
  - Practical, resourceful, observant, analytical
  - Straightforward, trusting, honest
  - Perfectionists, neat and conservative
  - Confident and outspoken
  - Can be critical or opinionated

#### **Dog (狗)**
- **Years:** 1934, 1946, 1958, 1970, 1982, 1994, 2006, 2018, 2030, 2042
- **Element:** Earth
- **Yin/Yang:** Yang
- **Personality Traits:**
  - Loyal, honest, faithful
  - Strong sense of justice
  - Protective of loved ones
  - Reliable and trustworthy
  - Can be anxious or pessimistic

#### **Pig (猪)**
- **Years:** 1935, 1947, 1959, 1971, 1983, 1995, 2007, 2019, 2031, 2043
- **Element:** Water
- **Yin/Yang:** Yin
- **Personality Traits:**
  - Kind, honest, and generous
  - Gentle and compassionate nature
  - Hardworking and diligent
  - Value family and friendship deeply
  - Can be naive or overly trusting

### 1.3 Zodiac Cycle and Birth Year Calculations

#### Algorithm for Calculating Zodiac Sign from Birth Year

**Method 1: Using 1900 as Base Year**
```
1. Subtract 1900 from birth year: (year - 1900)
2. Divide by 12 and find remainder: (year - 1900) % 12
3. Add 1 to remainder: remainder + 1
4. Match to zodiac sign (1=Rat, 2=Ox, 3=Tiger, 4=Rabbit, 5=Dragon, 6=Snake, 7=Horse, 8=Goat, 9=Monkey, 10=Rooster, 11=Dog, 12=Pig)
```

**Example:** For year 1988
- 1988 - 1900 = 88
- 88 % 12 = 4
- 4 + 1 = 5 (Dragon)

**Method 2: Direct Division by 12**
```
1. Divide birth year by 12: year % 12
2. Match remainder to zodiac sign
   - 0 = Monkey, 1 = Rooster, 2 = Dog, 3 = Pig
   - 4 = Rat, 5 = Ox, 6 = Tiger, 7 = Rabbit
   - 8 = Dragon, 9 = Snake, 10 = Horse, 11 = Goat
```

**Important Note:** For births between January 1 and Chinese New Year (typically Jan 21-Feb 20), use the previous year for zodiac calculation.

### 1.4 Compatibility Matrix

The compatibility matrix shows relationship potential between all 12 zodiac signs on a scale of 0-10:

| Sign | Rat | Ox | Tiger | Rabbit | Dragon | Snake | Horse | Goat | Monkey | Rooster | Dog | Pig |
|------|-----|-----|-------|--------|--------|-------|-------|------|--------|---------|-----|-----|
| **Rat** | 7 | 10 | 5 | 6 | 10 | 7 | 2 | 3 | 10 | 6 | 7 | 8 |
| **Ox** | 10 | 7 | 4 | 7 | 8 | 10 | 3 | 5 | 9 | 10 | 6 | 8 |
| **Tiger** | 5 | 4 | 7 | 6 | 6 | 3 | 10 | 8 | 2 | 7 | 10 | 10 |
| **Rabbit** | 6 | 7 | 6 | 7 | 3 | 7 | 6 | 10 | 7 | 2 | 10 | 10 |
| **Dragon** | 10 | 8 | 6 | 3 | 7 | 8 | 7 | 9 | 10 | 10 | 2 | 8 |
| **Snake** | 7 | 10 | 3 | 7 | 8 | 7 | 6 | 8 | 10 | 10 | 7 | 2 |
| **Horse** | 2 | 3 | 10 | 6 | 7 | 6 | 7 | 10 | 7 | 8 | 10 | 9 |
| **Goat** | 3 | 5 | 8 | 10 | 9 | 8 | 10 | 7 | 8 | 6 | 7 | 10 |
| **Monkey** | 10 | 9 | 2 | 7 | 10 | 10 | 7 | 8 | 7 | 8 | 6 | 3 |
| **Rooster** | 6 | 10 | 7 | 2 | 10 | 10 | 8 | 6 | 8 | 7 | 3 | 7 |
| **Dog** | 7 | 6 | 10 | 10 | 2 | 7 | 10 | 7 | 6 | 3 | 7 | 9 |
| **Pig** | 8 | 8 | 10 | 10 | 8 | 2 | 9 | 10 | 3 | 7 | 9 | 7 |

**Scoring Guide:**
- 10: Excellent match (San He triads, Liu He pairs)
- 8-9: Very good match (compatible elements)
- 6-7: Good match (neutral, requires effort)
- 4-5: Challenging match (needs compromise)
- 2-3: Difficult match (Liu Chong clashes, Liu Hai harms)

### 1.5 Best Matches and Challenging Matches

#### Best Matches (San He - Three Harmonies)

**Group 1: Rat, Dragon, Monkey**
- Share intelligence, ambition, and adaptability
- All are quick thinkers and problem solvers
- Natural synergy in business and romance

**Group 2: Ox, Snake, Rooster**
- Value hard work, dedication, and tradition
- Methodical, patient, and detail-oriented
- Build strong, stable relationships

**Group 3: Tiger, Horse, Dog**
- Passionate, loyal, and justice-oriented
- Active, social, and protective
- Form deep emotional bonds

**Group 4: Rabbit, Goat, Pig**
- Gentle, artistic, and peace-loving
- Value harmony, beauty, and emotional connection
- Create nurturing, supportive relationships

#### Excellent Pairs (Liu He - Six Harmonies)

1. **Rat & Ox** - Wit meets stability
2. **Tiger & Pig** - Boldness meets kindness
3. **Rabbit & Dog** - Sensitivity meets loyalty
4. **Dragon & Rooster** - Ambition meets precision
5. **Snake & Monkey** - Intuition meets creativity
6. **Horse & Goat** - Energy meets gentleness

#### Challenging Matches (Liu Chong - Six Clashes)

1. **Rat vs. Horse** - Water vs. Fire, opposite energies
2. **Ox vs. Goat** - Stubborn vs. Gentle, conflicting approaches
3. **Tiger vs. Monkey** - Serious vs. Playful, different priorities
4. **Rabbit vs. Rooster** - Quiet vs. Outspoken, communication issues
5. **Dragon vs. Dog** - Ambitious vs. Cautious, trust issues
6. **Snake vs. Pig** - Suspicious vs. Trusting, fundamental differences

#### Problematic Pairs (Liu Hai - Six Harms)

1. **Rat & Goat** - Different values and goals
2. **Ox & Horse** - Slow vs. Fast, patience issues
3. **Tiger & Snake** - Impulsive vs. Calculated, strategy conflicts
4. **Rabbit & Dragon** - Gentle vs. Demanding, power imbalance
5. **Monkey & Pig** - Cunning vs. Honest, trust issues
6. **Rooster & Dog** - Critical vs. Loyal, friction in communication

---

## 2. BaZi (八字) - Four Pillars of Destiny

### 2.1 Overview

BaZi (八字), literally meaning "eight characters," is a sophisticated Chinese astrological system that analyzes a person's destiny based on their exact birth date and time. It provides much deeper insights than simple zodiac matching by examining the complete energetic signature of an individual.

### 2.2 The Structure of BaZi

BaZi creates a chart with **Four Pillars**, each containing two characters:
1. **Year Pillar** - Represents ancestry, early life (0-15 years)
2. **Month Pillar** - Represents parents, career, prime years (16-30 years)
3. **Day Pillar** - Represents self and spouse (31-45 years)
4. **Hour Pillar** - Represents children, legacy (46+ years)

Each pillar consists of:
- **Heavenly Stem (天干)** - The quality of elemental force (Yang or Yin)
- **Earthly Branch (地支)** - How the force is expressed (associated with zodiac animals)

This creates a total of **8 characters** (4 pillars × 2 characters each).

### 2.3 The 10 Heavenly Stems (天干)

The Heavenly Stems represent the five elements in their Yin and Yang forms:

| # | Chinese | Pinyin | Element | Polarity | Characteristics |
|---|---------|--------|---------|----------|-----------------|
| 1 | 甲 | Jiǎ | Wood | Yang | Strong growth, leadership, pioneering |
| 2 | 乙 | Yǐ | Wood | Yin | Flexible growth, adaptability, creativity |
| 3 | 丙 | Bǐng | Fire | Yang | Bright warmth, enthusiasm, visibility |
| 4 | 丁 | Dīng | Fire | Yin | Controlled warmth, refinement, focus |
| 5 | 戊 | Wù | Earth | Yang | Mountains, stability, reliability |
| 6 | 己 | Jǐ | Earth | Yin | Fields, nurturing, cultivation |
| 7 | 庚 | Gēng | Metal | Yang | Sword/iron, strength, determination |
| 8 | 辛 | Xīn | Metal | Yin | Jewelry/gold, precision, beauty |
| 9 | 壬 | Rén | Water | Yang | Ocean/river, power, flow |
| 10 | 癸 | Guǐ | Guǐ | Water | Yin | Rain/dew, intuition, subtlety |

### 2.4 The 12 Earthly Branches (地支)

The Earthly Branches correspond to the 12 Chinese zodiac animals and represent how energy manifests:

| # | Chinese | Pinyin | Zodiac Animal | Element | Season/Month | Polarity |
|---|---------|--------|---------------|---------|--------------|----------|
| 1 | 子 | Zǐ | Rat | Water | Winter/November | Yang |
| 2 | 丑 | Chǒu | Ox | Earth | Winter/December | Yin |
| 3 | 寅 | Yín | Tiger | Wood | Spring/January | Yang |
| 4 | 卯 | Mǎo | Rabbit | Wood | Spring/February | Yin |
| 5 | 辰 | Chén | Dragon | Earth | Spring/March | Yang |
| 6 | 巳 | Sì | Snake | Fire | Summer/April | Yin |
| 7 | 午 | Wǔ | Horse | Fire | Summer/May | Yang |
| 8 | 未 | Wèi | Goat | Earth | Summer/June | Yin |
| 9 | 申 | Shēn | Monkey | Metal | Autumn/July | Yang |
| 10 | 酉 | Yǒu | Rooster | Metal | Autumn/August | Yin |
| 11 | 戌 | Xū | Dog | Earth | Autumn/September | Yang |
| 12 | 亥 | Hài | Pig | Water | Winter/October | Yin |

### 2.5 How BaZi Determines Compatibility

BaZi compatibility analysis is far more complex than simple zodiac matching. Here are the key factors:

#### 2.5.1 Day Master (日主) Compatibility

The **Day Master** is the Heavenly Stem of the Day Pillar - it represents the core essence of a person. Compatibility between two Day Masters follows the Five Elements principles:

- **Generating Relationship**: One element nourishes the other (e.g., Water Day Master + Wood Day Master)
- **Harmonious Same Element**: Both share the same element with balance of Yin/Yang
- **Controlling Relationship**: Can work if the controlled person needs that control
- **Destructive Relationship**: Generally challenging, requires other supporting factors

#### 2.5.2 Ten Gods (十神) Analysis

The Ten Gods system describes relationships between the Day Master and other elements in the chart:

1. **Companion/Friend (比肩/劫财)** - Same element
2. **Resource/Mother (正印/偏印)** - Element that generates Day Master
3. **Output/Child (食神/伤官)** - Element generated by Day Master
4. **Wealth/Partner (正财/偏财)** - Element controlled by Day Master
5. **Authority/Career (正官/七杀)** - Element that controls Day Master

For relationships, the **Spouse Palace** (Day Branch) and presence of **Wealth stars** (for men) or **Authority stars** (for women) are crucial indicators.

#### 2.5.3 Spouse Palace Analysis

The Day Branch (Earthly Branch of Day Pillar) represents the **Spouse Palace**. Analyze:

- **Element compatibility** between both partners' Spouse Palaces
- **Zodiac compatibility** (San He, Liu He, Liu Chong, Liu Hai)
- **Clashes or combinations** with other pillars
- **Favorable or unfavorable** elements based on each person's needs

#### 2.5.4 Element Balance and Needs

Each BaZi chart has a unique elemental balance. Ideal partners:
- **Complement deficiencies**: If one person lacks Fire, partner with strong Fire benefits them
- **Balance excesses**: If one person has too much Water, partner with Earth helps control it
- **Share favorable elements**: Both benefit from the same elements

#### 2.5.5 Structural Compatibility

Advanced BaZi schools analyze:
- **Chart strength levels**: Weak + Strong can balance, two Weak may struggle
- **Special structures**: Some charts have unique patterns requiring specific matches
- **Luck cycles**: Current and future luck periods affect compatibility

### 2.6 BaZi Compatibility Scoring Framework

Different schools use different approaches. Here's a comprehensive scoring system:

#### Major Factors (70-80% of total score)

1. **Spouse Palace Harmony (25-30%)**
   - San He relationship: +30 points
   - Liu He relationship: +25 points
   - Same element, complementary Yin/Yang: +20 points
   - Neutral relationship: +15 points
   - Liu Hai relationship: +5 points
   - Liu Chong clash: 0 points

2. **Day Master Compatibility (25-30%)**
   - Generating cycle relationship: +30 points
   - Same element balance: +25 points
   - Compatible different elements: +20 points
   - Controlled relationship (beneficial): +15 points
   - Controlled relationship (harmful): +5 points
   - Destructive clash: 0 points

3. **Element Balance Complementarity (15-20%)**
   - Charts perfectly complement each other's deficiencies: +20 points
   - Charts moderately balance each other: +15 points
   - Charts neutral to each other: +10 points
   - Charts create minor imbalances: +5 points
   - Charts create major imbalances: 0 points

#### Secondary Factors (20-30% of total score)

4. **Ten Gods Relationships (10-15%)**
   - Spouse star(s) well-positioned and favorable: +15 points
   - Spouse star(s) present but neutral: +10 points
   - Spouse star(s) weak or challenged: +5 points
   - Spouse star(s) absent or severely afflicted: 0 points

5. **Overall Chart Strength Match (5-10%)**
   - Both strong charts or both weak charts: +10 points
   - One strong, one medium: +8 points
   - One strong, one weak (can be complementary): +6 points
   - Severely mismatched strength levels: +3 points

6. **Luck Cycles Alignment (5%)**
   - Current and near-future luck cycles align favorably: +5 points
   - Mixed luck cycle compatibility: +3 points
   - Conflicting luck cycles: 0 points

#### Total Score Interpretation

- **90-100 points**: Exceptional match - Rare, outstanding compatibility
- **80-89 points**: Excellent match - Strong natural harmony
- **70-79 points**: Very good match - Solid foundation for relationship
- **60-69 points**: Good match - Requires mutual effort and understanding
- **50-59 points**: Average match - Significant work needed
- **Below 50 points**: Challenging match - Fundamental incompatibilities

**Important Note**: BaZi is complex and these scores are guidelines. Human relationships involve free will, growth, and conscious effort. Even challenging charts can work with commitment.

---

## 3. Five Elements (五行) System

### 3.1 Overview

The Five Elements (Wu Xing - 五行) theory is fundamental to Chinese philosophy and astrology. The five elements - Wood, Fire, Earth, Metal, and Water - represent dynamic energies in constant transformation, not static substances.

### 3.2 The Five Elements and Their Characteristics

#### **Wood (木 - Mù)**

**Season**: Spring
**Direction**: East
**Color**: Green, Teal
**Zodiac Signs**: Tiger, Rabbit
**Yin/Yang Balance**: Yang (growth, expansion)

**Personality Traits**:
- Exceptionally gifted, idealistic, planner
- Generous and animated nature
- Persons of integrity and honesty
- Great moral values and strong convictions
- Innovative and creative
- Can be stubborn when challenged

**In Relationships**:
- Seeks growth and development
- Values personal evolution
- Needs freedom to explore ideas
- May struggle with routine or stagnation

#### **Fire (火 - Huǒ)**

**Season**: Summer
**Direction**: South
**Color**: Red, Orange, Pink, Purple
**Zodiac Signs**: Snake, Horse
**Yin/Yang Balance**: Yang (heat, passion)

**Personality Traits**:
- Courageous, passionate, enthusiastic
- Natural leaders, magnetic presence
- Excellent at research and investigation
- Quick to anger but also quick to forgive
- Boisterous and joyous
- Thrives on excitement and recognition

**In Relationships**:
- Passionate and expressive
- Needs excitement and romance
- Can be dramatic or demanding
- Warms and energizes partners

#### **Earth (土 - Tǔ)**

**Season**: Late Summer/Transitions between seasons
**Direction**: Center
**Color**: Yellow, Brown, Beige
**Zodiac Signs**: Ox, Dragon, Goat, Dog
**Yin/Yang Balance**: Balanced (stability, neutrality)

**Personality Traits**:
- Kind, tolerant, honest, leader
- Receptive and sensitive to environment
- Solid, stable, and nourishing
- Caring and giving
- Can be immovable, stubborn, or overbearing
- Practical and grounded

**In Relationships**:
- Provides stability and security
- Nurturing and supportive
- May resist change
- Creates safe, comfortable environments

#### **Metal (金 - Jīn)**

**Season**: Autumn
**Direction**: West
**Color**: White, Gold, Silver, Gray
**Zodiac Signs**: Monkey, Rooster
**Yin/Yang Balance**: Yin (contraction, consolidation)

**Personality Traits**:
- Determined, persistent, workaholic
- Responsible and meticulous
- Strong sense of structure and order
- Disciplined and organized
- Can be unbending or rigid
- Values quality and precision

**In Relationships**:
- Loyal and committed
- Sets high standards
- May be critical or demanding
- Provides structure and clarity

#### **Water (水 - Shuǐ)**

**Season**: Winter
**Direction**: North
**Color**: Black, Blue, Dark Grey
**Zodiac Signs**: Rat, Pig
**Yin/Yang Balance**: Yin (flowing, adaptive)

**Personality Traits**:
- Sympathetic, perfectionist, coordinator
- Quiet, reserved, and introspective
- Emotive and sentimental
- Adaptable like a chameleon
- Deep wisdom and intuition
- Can be fearful or isolated

**In Relationships**:
- Deeply emotional and intuitive
- Flows around obstacles
- Needs emotional depth and connection
- May be overly sensitive or withdrawn

### 3.3 Element Cycles

#### 3.3.1 Generating Cycle (Sheng 生) - Nurturing Relationships

This cycle represents nourishment and support, like a mother nourishing a child:

**Wood → Fire → Earth → Metal → Water → Wood**

- **Wood feeds Fire**: Wood burns to create fire
- **Fire creates Earth**: Fire burns to ash, creating earth
- **Earth bears Metal**: Earth contains metal ores
- **Metal produces Water**: Metal surfaces collect condensation
- **Water nourishes Wood**: Water makes plants grow

**In Compatibility**: Partners in a generating relationship naturally support each other. The "mother" element supports and enables the "child" element.

**Compatibility Score Impact**: +25 to +30 points

#### 3.3.2 Controlling Cycle (Ke 克) - Regulating Relationships

This cycle represents balance and regulation, preventing any element from becoming overwhelming:

**Wood → Earth → Water → Fire → Metal → Wood**

- **Wood controls Earth**: Tree roots break up soil
- **Earth controls Water**: Earth dams and directs water
- **Water controls Fire**: Water extinguishes fire
- **Fire controls Metal**: Fire melts metal
- **Metal controls Wood**: Metal cuts wood

**In Compatibility**: Controlling relationships can work when balanced - like "opposites attract." The controlling element provides structure and limits, which can be beneficial if not excessive.

**Compatibility Score Impact**: +10 to +20 points (depending on balance)

#### 3.3.3 Weakening Cycle (Xie 泄) - Draining Relationships

The reverse of the Generating Cycle. The "child" element drains energy from the "mother":

**Wood → Water → Metal → Earth → Fire → Wood**

- **Wood weakens Water**: Wood absorbs water's energy
- **Water weakens Metal**: Metal's energy disperses into water
- **Metal weakens Earth**: Earth's energy transforms into metal
- **Earth weakens Fire**: Fire's energy is absorbed by earth
- **Fire weakens Wood**: Wood's energy fuels fire

**In Compatibility**: Can work if the drained partner has excess energy to give, creating balance. Problematic if the drained partner is already weak.

**Compatibility Score Impact**: +5 to +15 points (context-dependent)

#### 3.3.4 Insulting Cycle (Wu 侮) - Reverse Control / Destructive

The reverse of the Controlling Cycle. When an element is too strong, it "insults" the element that should control it:

**Wood → Metal → Fire → Water → Earth → Wood**

- **Strong Wood insults Metal**: Wood damages metal tools
- **Strong Metal insults Fire**: Metal overwhelms fire's heat
- **Strong Fire insults Water**: Intense fire evaporates water
- **Strong Water insults Earth**: Flooding destroys earth
- **Strong Earth insults Wood**: Too much earth smothers growth

**In Compatibility**: Generally challenging, creates power struggles and imbalances.

**Compatibility Score Impact**: 0 to +5 points

### 3.4 Element Compatibility Matrix

| Element | Wood | Fire | Earth | Metal | Water |
|---------|------|------|-------|-------|-------|
| **Wood** | 7 | 9 | 4 | 2 | 8 |
| **Fire** | 8 | 7 | 9 | 5 | 2 |
| **Earth** | 5 | 8 | 7 | 9 | 4 |
| **Metal** | 3 | 6 | 8 | 7 | 9 |
| **Water** | 9 | 3 | 5 | 8 | 7 |

**Scoring Guide**:
- **9**: Generating cycle - Highly compatible (nourishing)
- **8**: Same element, different polarity - Very compatible
- **7**: Same element, same polarity - Compatible
- **5-6**: Weakening or neutral - Moderate compatibility
- **3-4**: Controlling cycle - Challenging but workable
- **2**: Destructive/insulting cycle - Very challenging

### 3.5 Harmonious Element Combinations

#### Excellent Matches (Score 9-10)

1. **Wood + Water**
   - Water nourishes Wood, creating growth
   - Water provides emotional depth, Wood provides direction
   - Natural flow and development

2. **Fire + Wood**
   - Wood feeds Fire, creating passion
   - Wood provides fuel for Fire's enthusiasm
   - Dynamic and energetic partnership

3. **Earth + Fire**
   - Fire creates Earth, providing stability
   - Fire brings passion, Earth grounds it
   - Balanced warmth and security

4. **Metal + Earth**
   - Earth produces Metal, creating strength
   - Earth provides foundation, Metal adds structure
   - Solid, enduring relationship

5. **Water + Metal**
   - Metal produces Water, creating flow
   - Metal provides form, Water adds adaptability
   - Harmonious balance of structure and flexibility

#### Good Matches (Score 7-8)

1. **Wood + Wood** (Yang Wood + Yin Wood best)
   - Shared values of growth and creativity
   - Mutual understanding
   - Risk: May lack grounding

2. **Fire + Fire** (Yang Fire + Yin Fire best)
   - Passionate and exciting
   - High energy partnership
   - Risk: May burn out without Earth balance

3. **Earth + Earth** (Yang Earth + Yin Earth best)
   - Stable and reliable
   - Strong foundation
   - Risk: May be too routine or slow-moving

4. **Metal + Metal** (Yang Metal + Yin Metal best)
   - Organized and efficient
   - Clear communication
   - Risk: May be too rigid or critical

5. **Water + Water** (Yang Water + Yin Water best)
   - Deep emotional connection
   - Intuitive understanding
   - Risk: May lack direction or be overly emotional

### 3.6 Challenging Element Combinations

#### Difficult Matches (Score 2-4)

1. **Wood + Metal**
   - Metal cuts Wood (controlling)
   - Wood can damage Metal (insulting if strong)
   - Conflict between flexibility and rigidity
   - **Can work if**: Metal person provides needed structure, Wood person is strong enough to not feel dominated

2. **Fire + Water**
   - Water extinguishes Fire (controlling)
   - Intense Fire evaporates Water (insulting)
   - Fundamental opposition
   - **Can work if**: Balanced quantities, mutual respect for differences

3. **Earth + Wood**
   - Wood depletes Earth (weakening)
   - Wood breaks Earth (controlling)
   - Growth vs. stability conflict
   - **Can work if**: Earth is strong, appreciates Wood's innovation

4. **Metal + Fire**
   - Fire melts Metal (controlling)
   - Strong Metal overwhelms Fire (insulting)
   - Destruction of structure or passion
   - **Can work if**: Fire person needs Metal's discipline, Metal person appreciates Fire's warmth

5. **Water + Earth**
   - Earth absorbs/blocks Water (controlling)
   - Flood erodes Earth (insulting)
   - Stagnation vs. flow
   - **Can work if**: Both are balanced, Earth provides banks for Water's flow

---

## 4. Compatibility Algorithms

### 4.1 San He (三合) - Three Harmonies Groups

San He represents the grouping of zodiac animals into four triads based on elemental affinity and complementary energy.

#### The Four Triads

1. **First Trine: Rat, Dragon, Monkey**
   - **Shared Element**: Water (primary affinity)
   - **Traits**: Intelligent, ambitious, resourceful, adaptable
   - **Compatibility**: Excel in problem-solving together, natural synergy
   - **Best for**: Business partnerships, intellectual pursuits, strategic planning

2. **Second Trine: Ox, Snake, Rooster**
   - **Shared Element**: Metal (primary affinity)
   - **Traits**: Hardworking, dedicated, traditional, patient
   - **Compatibility**: Build stable, enduring relationships
   - **Best for**: Long-term commitments, traditional marriage, financial stability

3. **Third Trine: Tiger, Horse, Dog**
   - **Shared Element**: Fire (primary affinity)
   - **Traits**: Passionate, loyal, justice-oriented, protective
   - **Compatibility**: Form deep emotional bonds, defend each other
   - **Best for**: Romantic relationships, family bonds, social causes

4. **Fourth Trine: Rabbit, Goat, Pig**
   - **Shared Element**: Wood (primary affinity)
   - **Traits**: Gentle, artistic, peace-loving, nurturing
   - **Compatibility**: Create harmonious, supportive environments
   - **Best for**: Creative collaborations, nurturing families, peaceful homes

#### San He Compatibility Score

```
If (Sign1 and Sign2 in same San He group):
    Base Score = 100 points
    Relationship Type = "San He Harmony"
    Compatibility Level = "Excellent - Natural Allies"
```

**Implementation**: San He is considered the strongest compatibility indicator, representing eternal bonds like mother-child love that transcends challenges.

### 4.2 Liu He (六合) - Six Harmonies Pairs

Liu He represents six pairs of zodiac signs that form perfect complementary relationships, often considered soulmate connections.

#### The Six Pairs

1. **Rat (Water) ↔ Ox (Earth)**
   - **Element Relationship**: Earth controls Water (beneficial structure)
   - **Dynamic**: Rat's wit + Ox's stability = Practical success
   - **Complementarity**: Clever innovation meets steady implementation
   - **Challenge**: Rat may find Ox too slow; Ox may find Rat too impulsive

2. **Tiger (Wood) ↔ Pig (Water)**
   - **Element Relationship**: Water generates Wood (nourishing)
   - **Dynamic**: Tiger's boldness + Pig's kindness = Brave compassion
   - **Complementarity**: Action meets empathy
   - **Challenge**: Tiger's intensity vs. Pig's gentleness

3. **Rabbit (Wood) ↔ Dog (Earth)**
   - **Element Relationship**: Wood controls Earth (balanced)
   - **Dynamic**: Rabbit's sensitivity + Dog's loyalty = Devoted partnership
   - **Complementarity**: Diplomatic grace meets protective faithfulness
   - **Challenge**: Both may be anxious; need to reassure each other

4. **Dragon (Earth) ↔ Rooster (Metal)**
   - **Element Relationship**: Earth generates Metal (supportive)
   - **Dynamic**: Dragon's ambition + Rooster's precision = Successful execution
   - **Complementarity**: Big vision meets detailed planning
   - **Challenge**: Both can be demanding and proud

5. **Snake (Fire) ↔ Monkey (Metal)**
   - **Element Relationship**: Fire controls Metal (challenging but workable)
   - **Dynamic**: Snake's intuition + Monkey's creativity = Innovative wisdom
   - **Complementarity**: Strategic depth meets playful intelligence
   - **Challenge**: Snake's possessiveness vs. Monkey's social nature

6. **Horse (Fire) ↔ Goat (Earth)**
   - **Element Relationship**: Fire generates Earth (nourishing)
   - **Dynamic**: Horse's energy + Goat's gentleness = Harmonious balance
   - **Complementarity**: Freedom-loving drive meets artistic sensitivity
   - **Challenge**: Horse's independence vs. Goat's need for security

#### Liu He Compatibility Score

```
If (Sign1 and Sign2 form Liu He pair):
    Base Score = 95 points
    Relationship Type = "Liu He Harmony"
    Compatibility Level = "Excellent - Perfect Complement"
```

**Implementation**: Liu He pairs are considered ideal for one-on-one romantic relationships, offering balance and mutual support.

### 4.3 Liu Chong (六冲) - Six Clashes

Liu Chong represents six pairs of opposing signs that face the greatest conflict. These signs are six years apart in the zodiac cycle, sitting directly opposite on the zodiac wheel.

#### The Six Clashing Pairs

1. **Rat (Water, Yang) ↔ Horse (Fire, Yang)**
   - **Element Relationship**: Water vs. Fire (destructive opposition)
   - **Conflict**: Cautious strategist vs. Impulsive freedom-seeker
   - **Issues**: Different life speeds, opposite approaches to risk
   - **Severity**: Very High (elemental + zodiac clash)

2. **Ox (Earth, Yin) ↔ Goat (Earth, Yin)**
   - **Element Relationship**: Same element but opposite nature
   - **Conflict**: Rigid traditionalist vs. Free-spirited artist
   - **Issues**: Stubborn vs. Flexible, duty vs. emotion
   - **Severity**: High (fundamental value differences)

3. **Tiger (Wood, Yang) ↔ Monkey (Metal, Yang)**
   - **Element Relationship**: Metal cuts Wood (controlling/destructive)
   - **Conflict**: Serious warrior vs. Playful trickster
   - **Issues**: Different priorities, trust issues, competitive
   - **Severity**: Very High (elemental + personality clash)

4. **Rabbit (Wood, Yin) ↔ Rooster (Metal, Yin)**
   - **Element Relationship**: Metal cuts Wood (controlling/destructive)
   - **Conflict**: Quiet diplomat vs. Outspoken critic
   - **Issues**: Communication styles, social needs, criticism sensitivity
   - **Severity**: High (communication breakdown)

5. **Dragon (Earth, Yang) ↔ Dog (Earth, Yang)**
   - **Element Relationship**: Same element but opposite nature
   - **Conflict**: Ambitious leader vs. Cautious protector
   - **Issues**: Trust, pride, different definitions of success
   - **Severity**: Very High (ego conflicts, mutual suspicion)

6. **Snake (Fire, Yin) ↔ Pig (Water, Yin)**
   - **Element Relationship**: Water vs. Fire (destructive opposition)
   - **Conflict**: Suspicious strategist vs. Trusting innocent
   - **Issues**: Fundamental worldview differences, trust issues
   - **Severity**: Very High (elemental + psychological clash)

#### Liu Chong Compatibility Score

```
If (Sign1 and Sign2 form Liu Chong clash):
    Base Score = 20 points
    Relationship Type = "Liu Chong Clash"
    Compatibility Level = "Very Challenging - Requires Significant Work"
    Warning = "Fundamental incompatibility - opposite energies"
```

**Implementation**: Liu Chong matches are traditionally avoided for marriage. However, with maturity, self-awareness, and effort, some couples can make it work by appreciating differences.

### 4.4 Liu Hai (六害) - Six Harms

Liu Hai represents six pairs that harm or undermine each other, often resulting in things not going smoothly. These relationships tend to have subtle but persistent difficulties.

#### The Six Harmful Pairs

1. **Rat (Water) ↔ Goat (Earth)**
   - **Element Relationship**: Earth controls Water (restrictive)
   - **Harm**: Different values - practical accumulation vs. artistic freedom
   - **Issues**: Rat sees Goat as impractical; Goat sees Rat as too materialistic
   - **Severity**: Moderate to High

2. **Ox (Earth) ↔ Horse (Fire)**
   - **Element Relationship**: Fire generates Earth but depletes itself
   - **Harm**: Pace incompatibility - slow/steady vs. fast/free
   - **Issues**: Ox exhausted by Horse's speed; Horse frustrated by Ox's slowness
   - **Severity**: High

3. **Tiger (Wood) ↔ Snake (Fire)**
   - **Element Relationship**: Wood generates Fire (Tiger depleted)
   - **Harm**: Impulsive action vs. Calculated strategy
   - **Issues**: Tiger gives energy but feels manipulated; Snake receives but may be too controlling
   - **Severity**: Moderate to High

4. **Rabbit (Wood) ↔ Dragon (Earth)**
   - **Element Relationship**: Wood controls Earth (power imbalance)
   - **Harm**: Gentle sensitivity vs. Demanding ambition
   - **Issues**: Dragon dominates; Rabbit feels overwhelmed or undervalued
   - **Severity**: Moderate

5. **Monkey (Metal) ↔ Pig (Water)**
   - **Element Relationship**: Metal generates Water (Monkey depleted)
   - **Harm**: Cunning cleverness vs. Honest naivety
   - **Issues**: Monkey may exploit Pig; Pig may feel manipulated
   - **Severity**: Moderate to High

6. **Rooster (Metal) ↔ Dog (Earth)**
   - **Element Relationship**: Earth generates Metal but depletes itself
   - **Harm**: Critical perfectionism vs. Loyal devotion
   - **Issues**: Rooster's criticism hurts Dog's sensitivity; Dog's defensiveness annoys Rooster
   - **Severity**: Moderate

#### Liu Hai Compatibility Score

```
If (Sign1 and Sign2 form Liu Hai pair):
    Base Score = 35 points
    Relationship Type = "Liu Hai Harm"
    Compatibility Level = "Challenging - Persistent Difficulties"
    Warning = "Subtle undermining - requires awareness and effort"
```

**Implementation**: Liu Hai relationships are workable but require conscious effort to avoid falling into harmful patterns. Regular communication and boundary-setting are essential.

### 4.5 Neutral Relationships

Signs that don't fall into San He, Liu He, Liu Chong, or Liu Hai categories have neutral relationships. Compatibility depends more on individual charts, elements, and personal maturity.

#### Neutral Compatibility Score

```
If (Sign1 and Sign2 are neutral):
    Base Score = 60 points
    Relationship Type = "Neutral"
    Compatibility Level = "Average - Depends on Effort and Individual Factors"
```

---

## 5. Practical Implementation

### 5.1 Comprehensive Compatibility Scoring Formula

This weighted formula combines all major Chinese astrology compatibility factors:

#### Algorithm Components

```
Total Compatibility Score = (W1 × Zodiac_Score) +
                           (W2 × Element_Score) +
                           (W3 × YinYang_Score) +
                           (W4 × BaZi_Score) +
                           (W5 × Relationship_Type_Score)

Where:
W1 = 0.30 (30% weight for Zodiac compatibility)
W2 = 0.25 (25% weight for Element compatibility)
W3 = 0.10 (10% weight for Yin/Yang balance)
W4 = 0.25 (25% weight for BaZi compatibility - if available)
W5 = 0.10 (10% weight for Relationship type modifiers)
```

#### Step-by-Step Calculation

**Step 1: Calculate Zodiac Compatibility Score (0-100)**

```javascript
function calculateZodiacScore(sign1, sign2) {
    // Check special relationships first
    if (isSanHe(sign1, sign2)) {
        return 100;
    }
    if (isLiuHe(sign1, sign2)) {
        return 95;
    }
    if (isLiuChong(sign1, sign2)) {
        return 20;
    }
    if (isLiuHai(sign1, sign2)) {
        return 35;
    }

    // Otherwise use compatibility matrix
    return zodiacCompatibilityMatrix[sign1][sign2] * 10; // Scale 0-10 to 0-100
}
```

**Step 2: Calculate Element Compatibility Score (0-100)**

```javascript
function calculateElementScore(element1, element2) {
    // Check relationship type
    if (isGeneratingCycle(element1, element2)) {
        return 90; // Highly compatible
    }
    if (element1 === element2) {
        return 75; // Same element, naturally compatible
    }
    if (isWeakeningCycle(element1, element2)) {
        return 55; // Moderate compatibility
    }
    if (isControllingCycle(element1, element2)) {
        return 40; // Challenging but workable
    }
    if (isInsultingCycle(element1, element2)) {
        return 20; // Very challenging
    }
    return 50; // Neutral
}
```

**Step 3: Calculate Yin/Yang Balance Score (0-100)**

```javascript
function calculateYinYangScore(sign1, sign2) {
    const yinYang1 = getYinYang(sign1);
    const yinYang2 = getYinYang(sign2);

    if (yinYang1 !== yinYang2) {
        return 80; // Complementary - different polarities balance well
    } else {
        return 60; // Same polarity - less dynamic but can work
    }
}
```

**Step 4: Calculate BaZi Score (0-100) - If birth data available**

```javascript
function calculateBaZiScore(person1Chart, person2Chart) {
    let score = 0;

    // Spouse Palace compatibility (30%)
    score += calculateSpousePalaceScore(person1Chart.dayBranch, person2Chart.dayBranch) * 0.3;

    // Day Master compatibility (30%)
    score += calculateDayMasterScore(person1Chart.dayStem, person2Chart.dayStem) * 0.3;

    // Element balance complementarity (20%)
    score += calculateElementBalanceScore(person1Chart, person2Chart) * 0.2;

    // Ten Gods relationships (15%)
    score += calculateTenGodsScore(person1Chart, person2Chart) * 0.15;

    // Chart strength match (5%)
    score += calculateChartStrengthMatch(person1Chart, person2Chart) * 0.05;

    return score;
}
```

**Step 5: Apply Relationship Type Modifiers (0-100)**

```javascript
function calculateRelationshipTypeScore(relationshipGoal) {
    // Different weights for different relationship types
    const modifiers = {
        'marriage': { stability: 1.2, passion: 0.9, growth: 1.0 },
        'dating': { stability: 0.8, passion: 1.3, growth: 1.1 },
        'friendship': { stability: 1.0, passion: 0.7, growth: 1.2 },
        'business': { stability: 1.3, passion: 0.6, growth: 1.1 }
    };

    return modifiers[relationshipGoal] || { stability: 1.0, passion: 1.0, growth: 1.0 };
}
```

**Step 6: Calculate Final Weighted Score**

```javascript
function calculateTotalCompatibility(person1, person2, relationshipGoal = 'marriage', hasBaZiData = false) {
    const zodiacScore = calculateZodiacScore(person1.zodiac, person2.zodiac);
    const elementScore = calculateElementScore(person1.element, person2.element);
    const yinYangScore = calculateYinYangScore(person1.zodiac, person2.zodiac);

    let totalScore;

    if (hasBaZiData) {
        // With BaZi data - more accurate
        const baziScore = calculateBaZiScore(person1.baziChart, person2.baziChart);

        totalScore = (0.30 * zodiacScore) +
                     (0.25 * elementScore) +
                     (0.10 * yinYangScore) +
                     (0.25 * baziScore) +
                     (0.10 * 70); // Base relationship score
    } else {
        // Without BaZi data - adjusted weights
        totalScore = (0.40 * zodiacScore) +
                     (0.35 * elementScore) +
                     (0.15 * yinYangScore) +
                     (0.10 * 70); // Base relationship score
    }

    return {
        totalScore: Math.round(totalScore),
        breakdown: {
            zodiac: zodiacScore,
            element: elementScore,
            yinYang: yinYangScore,
            bazi: hasBaZiData ? baziScore : null
        },
        rating: getCompatibilityRating(totalScore),
        insights: generateInsights(person1, person2, totalScore)
    };
}
```

### 5.2 Compatibility Rating System

```javascript
function getCompatibilityRating(score) {
    if (score >= 90) return {
        level: "Exceptional",
        description: "Outstanding cosmic alignment - rare and precious match",
        emoji: "💫",
        percentage: score
    };
    if (score >= 80) return {
        level: "Excellent",
        description: "Strong natural harmony - highly compatible",
        emoji: "⭐",
        percentage: score
    };
    if (score >= 70) return {
        level: "Very Good",
        description: "Solid foundation with great potential",
        emoji: "✨",
        percentage: score
    };
    if (score >= 60) return {
        level: "Good",
        description: "Promising match with mutual effort",
        emoji: "🌟",
        percentage: score
    };
    if (score >= 50) return {
        level: "Fair",
        description: "Workable with commitment and understanding",
        emoji: "💫",
        percentage: score
    };
    if (score >= 40) return {
        level: "Challenging",
        description: "Requires significant work and compromise",
        emoji: "⚡",
        percentage: score
    };
    return {
        level: "Very Challenging",
        description: "Fundamental differences - exceptional effort needed",
        emoji: "🌪️",
        percentage: score
    };
}
```

### 5.3 Weighted Factors for Different Relationship Types

Different relationships prioritize different factors:

#### Marriage/Long-term Partnership
```javascript
const marriageWeights = {
    zodiacCompatibility: 0.30,
    elementBalance: 0.25,
    baziSpousePalace: 0.25,
    yinYangBalance: 0.10,
    stabilityFactors: 0.10
};
```

#### Dating/Romance
```javascript
const datingWeights = {
    zodiacCompatibility: 0.35,
    elementBalance: 0.30,
    passionFactors: 0.15,
    yinYangBalance: 0.10,
    baziCompatibility: 0.10
};
```

#### Friendship
```javascript
const friendshipWeights = {
    zodiacCompatibility: 0.40,
    elementBalance: 0.25,
    sanHeTrines: 0.20,
    yinYangBalance: 0.10,
    communicationStyle: 0.05
};
```

#### Business Partnership
```javascript
const businessWeights = {
    elementBalance: 0.35,
    zodiacCompatibility: 0.25,
    baziWealthStars: 0.20,
    stabilityFactors: 0.15,
    yinYangBalance: 0.05
};
```

### 5.4 Insight Generation

```javascript
function generateInsights(person1, person2, score) {
    const insights = {
        strengths: [],
        challenges: [],
        advice: [],
        keywords: []
    };

    // Analyze zodiac relationship
    if (isSanHe(person1.zodiac, person2.zodiac)) {
        insights.strengths.push("You belong to the same San He harmony group, indicating natural compatibility and shared values");
        insights.keywords.push("Natural Allies", "Shared Vision", "Mutual Support");
    }

    if (isLiuHe(person1.zodiac, person2.zodiac)) {
        insights.strengths.push("You form a Liu He pair - considered soulmate connection with perfect complementary energies");
        insights.keywords.push("Soulmates", "Perfect Balance", "Complementary");
    }

    if (isLiuChong(person1.zodiac, person2.zodiac)) {
        insights.challenges.push("You are in a Liu Chong clash - opposite signs with conflicting energies");
        insights.advice.push("Focus on appreciating your differences rather than trying to change each other");
        insights.keywords.push("Opposites", "Growth Through Challenge", "Patience Required");
    }

    // Analyze element relationship
    const elementRelation = getElementRelationship(person1.element, person2.element);

    if (elementRelation === "generating") {
        insights.strengths.push(`${person1.element} nourishes ${person2.element} in the generating cycle, creating natural support`);
        insights.advice.push("Embrace the natural flow of support between you");
    }

    if (elementRelation === "controlling") {
        insights.challenges.push("Your elements are in a controlling relationship, which can create power dynamics");
        insights.advice.push("Strive for balanced give-and-take to avoid one person dominating");
    }

    // Add compatibility-specific insights
    if (score >= 80) {
        insights.advice.push("Your strong natural compatibility is a gift - nurture it with appreciation and communication");
    } else if (score < 50) {
        insights.advice.push("Your relationship requires conscious effort - focus on understanding and respecting differences");
        insights.advice.push("Consider this an opportunity for significant personal growth");
    }

    return insights;
}
```

### 5.5 Year Calculation Implementation

```javascript
function getChineseZodiac(year, month, day) {
    // Chinese New Year typically falls between Jan 21 - Feb 20
    // If birthday is in Jan/early Feb, may belong to previous year's zodiac

    const chineseNewYearDates = {
        2020: new Date(2020, 0, 25),  // Jan 25, 2020
        2021: new Date(2021, 1, 12),  // Feb 12, 2021
        2022: new Date(2022, 1, 1),   // Feb 1, 2022
        2023: new Date(2023, 0, 22),  // Jan 22, 2023
        2024: new Date(2024, 1, 10),  // Feb 10, 2024
        2025: new Date(2025, 0, 29),  // Jan 29, 2025
        2026: new Date(2026, 1, 17),  // Feb 17, 2026
        // Add more years as needed
    };

    const birthDate = new Date(year, month - 1, day);
    const cnyDate = chineseNewYearDates[year];

    // If birth date is before Chinese New Year, use previous year
    let zodiacYear = year;
    if (cnyDate && birthDate < cnyDate) {
        zodiacYear = year - 1;
    }

    // Calculate zodiac using modulo
    const zodiacIndex = (zodiacYear - 4) % 12; // 4 AD was year of Rat

    const zodiacSigns = [
        "Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake",
        "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"
    ];

    return zodiacSigns[zodiacIndex];
}

function getElement(year) {
    // Each element appears twice in the cycle (Yang then Yin)
    const elementIndex = Math.floor(((year - 4) % 10) / 2);
    const elements = ["Wood", "Fire", "Earth", "Metal", "Water"];
    return elements[elementIndex];
}

function getYinYang(zodiacSign) {
    const yangSigns = ["Rat", "Tiger", "Dragon", "Horse", "Monkey", "Dog"];
    return yangSigns.includes(zodiacSign) ? "Yang" : "Yin";
}
```

---

## 6. JSON Data Structures

### 6.1 Zodiac Signs Database

```json
{
  "zodiacSigns": {
    "rat": {
      "id": "rat",
      "name": "Rat",
      "chinese": "鼠",
      "pinyin": "Shǔ",
      "order": 1,
      "element": "Water",
      "yinYang": "Yang",
      "luckyNumbers": [2, 3],
      "luckyColors": ["blue", "gold", "green"],
      "luckyFlowers": ["lily", "African violet"],
      "personality": {
        "positive": [
          "Quick-witted",
          "Clever",
          "Charming",
          "Sharp",
          "Funny",
          "Generous",
          "Loyal",
          "Resourceful"
        ],
        "negative": [
          "Greedy",
          "Opportunistic",
          "Anxious",
          "Stubborn"
        ],
        "traits": {
          "intelligence": 9,
          "ambition": 8,
          "creativity": 7,
          "loyalty": 8,
          "patience": 5,
          "communication": 8
        }
      },
      "compatibility": {
        "bestMatches": ["ox", "dragon", "monkey"],
        "goodMatches": ["rat", "tiger", "snake", "dog", "pig"],
        "neutralMatches": ["rabbit", "rooster"],
        "challengingMatches": ["goat"],
        "worstMatches": ["horse"],
        "sanHe": ["dragon", "monkey"],
        "liuHe": ["ox"],
        "liuChong": ["horse"],
        "liuHai": ["goat"]
      },
      "years": [1924, 1936, 1948, 1960, 1972, 1984, 1996, 2008, 2020, 2032, 2044]
    },
    "ox": {
      "id": "ox",
      "name": "Ox",
      "chinese": "牛",
      "pinyin": "Niú",
      "order": 2,
      "element": "Earth",
      "yinYang": "Yin",
      "luckyNumbers": [1, 4],
      "luckyColors": ["white", "yellow", "green"],
      "luckyFlowers": ["tulip", "peach blossom"],
      "personality": {
        "positive": [
          "Diligent",
          "Patient",
          "Reliable",
          "Honest",
          "Trustworthy",
          "Methodical",
          "Strong"
        ],
        "negative": [
          "Stubborn",
          "Obstinate",
          "Lonely",
          "Insecure",
          "Narrow-minded"
        ],
        "traits": {
          "intelligence": 7,
          "ambition": 7,
          "creativity": 5,
          "loyalty": 10,
          "patience": 10,
          "communication": 5
        }
      },
      "compatibility": {
        "bestMatches": ["rat", "snake", "rooster"],
        "goodMatches": ["ox", "rabbit", "dragon", "pig"],
        "neutralMatches": ["tiger", "monkey", "dog"],
        "challengingMatches": ["horse"],
        "worstMatches": ["goat"],
        "sanHe": ["snake", "rooster"],
        "liuHe": ["rat"],
        "liuChong": ["goat"],
        "liuHai": ["horse"]
      },
      "years": [1925, 1937, 1949, 1961, 1973, 1985, 1997, 2009, 2021, 2033, 2045]
    },
    "tiger": {
      "id": "tiger",
      "name": "Tiger",
      "chinese": "虎",
      "pinyin": "Hǔ",
      "order": 3,
      "element": "Wood",
      "yinYang": "Yang",
      "luckyNumbers": [1, 3, 4],
      "luckyColors": ["blue", "gray", "orange"],
      "luckyFlowers": ["cineraria", "anthurium"],
      "personality": {
        "positive": [
          "Brave",
          "Confident",
          "Competitive",
          "Charismatic",
          "Leadership",
          "Passionate"
        ],
        "negative": [
          "Impatient",
          "Emotional",
          "Rebellious",
          "Reckless",
          "Domineering"
        ],
        "traits": {
          "intelligence": 7,
          "ambition": 9,
          "creativity": 8,
          "loyalty": 9,
          "patience": 4,
          "communication": 7
        }
      },
      "compatibility": {
        "bestMatches": ["horse", "dog", "pig"],
        "goodMatches": ["rat", "rabbit", "rooster"],
        "neutralMatches": ["ox", "dragon", "goat"],
        "challengingMatches": ["snake"],
        "worstMatches": ["monkey"],
        "sanHe": ["horse", "dog"],
        "liuHe": ["pig"],
        "liuChong": ["monkey"],
        "liuHai": ["snake"]
      },
      "years": [1926, 1938, 1950, 1962, 1974, 1986, 1998, 2010, 2022, 2034, 2046]
    }
    // Continue pattern for remaining signs: rabbit, dragon, snake, horse, goat, monkey, rooster, dog, pig
  }
}
```

### 6.2 Element Relationships Database

```json
{
  "elements": {
    "wood": {
      "id": "wood",
      "name": "Wood",
      "chinese": "木",
      "pinyin": "Mù",
      "polarity": "Yang",
      "season": "Spring",
      "direction": "East",
      "colors": ["green", "teal", "cyan"],
      "personality": {
        "keywords": ["Growth", "Expansion", "Creativity", "Flexibility", "Idealism"],
        "description": "Wood represents growth, expansion, and creativity. Wood people are innovative, ethical, and community-oriented.",
        "strengths": ["Innovative", "Generous", "Cooperative", "Idealistic", "Principled"],
        "weaknesses": ["Stubborn", "Inflexible when challenged", "Overly idealistic", "Scattered"]
      },
      "zodiacSigns": ["tiger", "rabbit"],
      "relationships": {
        "generates": "fire",
        "generatedBy": "water",
        "controls": "earth",
        "controlledBy": "metal",
        "weakens": "water",
        "weakenedBy": "fire"
      },
      "compatibility": {
        "wood": 7,
        "fire": 9,
        "earth": 4,
        "metal": 2,
        "water": 8
      }
    },
    "fire": {
      "id": "fire",
      "name": "Fire",
      "chinese": "火",
      "pinyin": "Huǒ",
      "polarity": "Yang",
      "season": "Summer",
      "direction": "South",
      "colors": ["red", "orange", "pink", "purple"],
      "personality": {
        "keywords": ["Passion", "Action", "Leadership", "Enthusiasm", "Charisma"],
        "description": "Fire represents passion, transformation, and leadership. Fire people are dynamic, expressive, and magnetic.",
        "strengths": ["Passionate", "Charismatic", "Courageous", "Enthusiastic", "Inspiring"],
        "weaknesses": ["Impatient", "Impulsive", "Aggressive", "Dramatic", "Burnout-prone"]
      },
      "zodiacSigns": ["snake", "horse"],
      "relationships": {
        "generates": "earth",
        "generatedBy": "wood",
        "controls": "metal",
        "controlledBy": "water",
        "weakens": "wood",
        "weakenedBy": "earth"
      },
      "compatibility": {
        "wood": 8,
        "fire": 7,
        "earth": 9,
        "metal": 5,
        "water": 2
      }
    },
    "earth": {
      "id": "earth",
      "name": "Earth",
      "chinese": "土",
      "pinyin": "Tǔ",
      "polarity": "Balanced",
      "season": "Late Summer / Transitions",
      "direction": "Center",
      "colors": ["yellow", "brown", "beige", "tan"],
      "personality": {
        "keywords": ["Stability", "Nurturing", "Reliability", "Patience", "Practicality"],
        "description": "Earth represents stability, nourishment, and grounding. Earth people are dependable, nurturing, and practical.",
        "strengths": ["Reliable", "Patient", "Nurturing", "Grounded", "Loyal", "Practical"],
        "weaknesses": ["Stubborn", "Resistant to change", "Overbearing", "Slow-moving"]
      },
      "zodiacSigns": ["ox", "dragon", "goat", "dog"],
      "relationships": {
        "generates": "metal",
        "generatedBy": "fire",
        "controls": "water",
        "controlledBy": "wood",
        "weakens": "fire",
        "weakenedBy": "metal"
      },
      "compatibility": {
        "wood": 5,
        "fire": 8,
        "earth": 7,
        "metal": 9,
        "water": 4
      }
    },
    "metal": {
      "id": "metal",
      "name": "Metal",
      "chinese": "金",
      "pinyin": "Jīn",
      "polarity": "Yin",
      "season": "Autumn",
      "direction": "West",
      "colors": ["white", "gold", "silver", "gray"],
      "personality": {
        "keywords": ["Structure", "Precision", "Determination", "Organization", "Quality"],
        "description": "Metal represents structure, refinement, and determination. Metal people are organized, disciplined, and excellence-oriented.",
        "strengths": ["Disciplined", "Organized", "Determined", "Precise", "High standards"],
        "weaknesses": ["Rigid", "Overly critical", "Controlling", "Uncompromising"]
      },
      "zodiacSigns": ["monkey", "rooster"],
      "relationships": {
        "generates": "water",
        "generatedBy": "earth",
        "controls": "wood",
        "controlledBy": "fire",
        "weakens": "earth",
        "weakenedBy": "water"
      },
      "compatibility": {
        "wood": 3,
        "fire": 6,
        "earth": 8,
        "metal": 7,
        "water": 9
      }
    },
    "water": {
      "id": "water",
      "name": "Water",
      "chinese": "水",
      "pinyin": "Shuǐ",
      "polarity": "Yin",
      "season": "Winter",
      "direction": "North",
      "colors": ["black", "blue", "dark gray"],
      "personality": {
        "keywords": ["Flow", "Intuition", "Wisdom", "Adaptability", "Emotion"],
        "description": "Water represents flow, wisdom, and depth. Water people are intuitive, adaptable, and emotionally intelligent.",
        "strengths": ["Intuitive", "Adaptable", "Wise", "Diplomatic", "Emotionally deep"],
        "weaknesses": ["Overly sensitive", "Fearful", "Isolated", "Indecisive", "Passive"]
      },
      "zodiacSigns": ["rat", "pig"],
      "relationships": {
        "generates": "wood",
        "generatedBy": "metal",
        "controls": "fire",
        "controlledBy": "earth",
        "weakens": "metal",
        "weakenedBy": "wood"
      },
      "compatibility": {
        "wood": 9,
        "fire": 3,
        "earth": 5,
        "metal": 8,
        "water": 7
      }
    }
  }
}
```

### 6.3 Compatibility Algorithms Data Structure

```json
{
  "compatibilityRules": {
    "sanHe": {
      "name": "San He - Three Harmonies",
      "chinese": "三合",
      "description": "Groups of three zodiac signs with natural affinity and shared values",
      "score": 100,
      "groups": [
        {
          "name": "First Trine - Achievers",
          "signs": ["rat", "dragon", "monkey"],
          "element": "Water affinity",
          "traits": "Intelligent, ambitious, resourceful"
        },
        {
          "name": "Second Trine - Traditionalists",
          "signs": ["ox", "snake", "rooster"],
          "element": "Metal affinity",
          "traits": "Hardworking, dedicated, methodical"
        },
        {
          "name": "Third Trine - Protectors",
          "signs": ["tiger", "horse", "dog"],
          "element": "Fire affinity",
          "traits": "Passionate, loyal, justice-oriented"
        },
        {
          "name": "Fourth Trine - Nurturers",
          "signs": ["rabbit", "goat", "pig"],
          "element": "Wood affinity",
          "traits": "Gentle, artistic, peace-loving"
        }
      ]
    },
    "liuHe": {
      "name": "Liu He - Six Harmonies",
      "chinese": "六合",
      "description": "Six pairs of zodiac signs with perfect complementary balance",
      "score": 95,
      "pairs": [
        {
          "signs": ["rat", "ox"],
          "dynamic": "Wit meets Stability",
          "elementRelation": "Water + Earth (controlling - beneficial)"
        },
        {
          "signs": ["tiger", "pig"],
          "dynamic": "Boldness meets Kindness",
          "elementRelation": "Wood + Water (generating)"
        },
        {
          "signs": ["rabbit", "dog"],
          "dynamic": "Sensitivity meets Loyalty",
          "elementRelation": "Wood + Earth (controlling - balanced)"
        },
        {
          "signs": ["dragon", "rooster"],
          "dynamic": "Ambition meets Precision",
          "elementRelation": "Earth + Metal (generating)"
        },
        {
          "signs": ["snake", "monkey"],
          "dynamic": "Intuition meets Creativity",
          "elementRelation": "Fire + Metal (controlling)"
        },
        {
          "signs": ["horse", "goat"],
          "dynamic": "Energy meets Gentleness",
          "elementRelation": "Fire + Earth (generating)"
        }
      ]
    },
    "liuChong": {
      "name": "Liu Chong - Six Clashes",
      "chinese": "六冲",
      "description": "Six pairs of opposing zodiac signs with fundamental conflicts",
      "score": 20,
      "pairs": [
        {
          "signs": ["rat", "horse"],
          "conflict": "Water vs Fire - Opposite energies",
          "severity": "Very High"
        },
        {
          "signs": ["ox", "goat"],
          "conflict": "Stubborn vs Gentle - Value differences",
          "severity": "High"
        },
        {
          "signs": ["tiger", "monkey"],
          "conflict": "Serious vs Playful - Priority differences",
          "severity": "Very High"
        },
        {
          "signs": ["rabbit", "rooster"],
          "conflict": "Quiet vs Outspoken - Communication issues",
          "severity": "High"
        },
        {
          "signs": ["dragon", "dog"],
          "conflict": "Ambitious vs Cautious - Trust issues",
          "severity": "Very High"
        },
        {
          "signs": ["snake", "pig"],
          "conflict": "Suspicious vs Trusting - Worldview differences",
          "severity": "Very High"
        }
      ]
    },
    "liuHai": {
      "name": "Liu Hai - Six Harms",
      "chinese": "六害",
      "description": "Six pairs with subtle but persistent difficulties",
      "score": 35,
      "pairs": [
        {
          "signs": ["rat", "goat"],
          "harm": "Different values - Material vs Artistic",
          "severity": "Moderate-High"
        },
        {
          "signs": ["ox", "horse"],
          "harm": "Pace incompatibility - Slow vs Fast",
          "severity": "High"
        },
        {
          "signs": ["tiger", "snake"],
          "harm": "Impulsive vs Calculated",
          "severity": "Moderate-High"
        },
        {
          "signs": ["rabbit", "dragon"],
          "harm": "Power imbalance - Gentle vs Demanding",
          "severity": "Moderate"
        },
        {
          "signs": ["monkey", "pig"],
          "harm": "Cunning vs Honest - Trust issues",
          "severity": "Moderate-High"
        },
        {
          "signs": ["rooster", "dog"],
          "harm": "Critical vs Loyal - Sensitivity issues",
          "severity": "Moderate"
        }
      ]
    }
  },
  "scoringWeights": {
    "marriage": {
      "zodiacCompatibility": 0.30,
      "elementBalance": 0.25,
      "baziSpousePalace": 0.25,
      "yinYangBalance": 0.10,
      "stabilityFactors": 0.10
    },
    "dating": {
      "zodiacCompatibility": 0.35,
      "elementBalance": 0.30,
      "passionFactors": 0.15,
      "yinYangBalance": 0.10,
      "baziCompatibility": 0.10
    },
    "friendship": {
      "zodiacCompatibility": 0.40,
      "elementBalance": 0.25,
      "sanHeTrines": 0.20,
      "yinYangBalance": 0.10,
      "communicationStyle": 0.05
    },
    "business": {
      "elementBalance": 0.35,
      "zodiacCompatibility": 0.25,
      "baziWealthStars": 0.20,
      "stabilityFactors": 0.15,
      "yinYangBalance": 0.05
    }
  }
}
```

### 6.4 BaZi Data Structure (Example)

```json
{
  "baziChart": {
    "personId": "user123",
    "birthData": {
      "year": 1990,
      "month": 5,
      "day": 15,
      "hour": 14,
      "timezone": "Asia/Shanghai",
      "solarDate": "1990-05-15T14:00:00+08:00"
    },
    "fourPillars": {
      "yearPillar": {
        "heavenlyStem": "庚",
        "earthlyBranch": "午",
        "stemElement": "Yang Metal",
        "branchElement": "Yang Fire",
        "zodiac": "Horse"
      },
      "monthPillar": {
        "heavenlyStem": "辛",
        "earthlyBranch": "巳",
        "stemElement": "Yin Metal",
        "branchElement": "Yin Fire",
        "zodiac": "Snake"
      },
      "dayPillar": {
        "heavenlyStem": "甲",
        "earthlyBranch": "寅",
        "stemElement": "Yang Wood",
        "branchElement": "Yang Wood",
        "zodiac": "Tiger"
      },
      "hourPillar": {
        "heavenlyStem": "辛",
        "earthlyBranch": "未",
        "stemElement": "Yin Metal",
        "branchElement": "Yin Earth",
        "zodiac": "Goat"
      }
    },
    "dayMaster": {
      "stem": "甲",
      "element": "Yang Wood",
      "strength": "Medium"
    },
    "spousePalace": {
      "branch": "寅",
      "zodiac": "Tiger",
      "element": "Yang Wood"
    },
    "elementBalance": {
      "wood": 3,
      "fire": 2,
      "earth": 1,
      "metal": 3,
      "water": 0
    },
    "favorableElements": ["Water", "Wood"],
    "unfavorableElements": ["Metal", "Fire"],
    "specialStructures": [],
    "tenGods": {
      "wealth": ["Fire"],
      "authority": ["Metal"],
      "resource": ["Water"],
      "output": ["Earth"],
      "companion": ["Wood"]
    }
  }
}
```

---

## 7. References

This research document was compiled from multiple authoritative sources on Chinese astrology:

### Chinese Zodiac Sources
- [Chinese Zodiac: 12 Animal Signs, Personality & Compatibility - Chinese New Year](https://chinesenewyear.net/zodiac/)
- [Chinese Zodiac: 12 Animal Signs and 2026 Horoscope Predictions - China Highlights](https://www.chinahighlights.com/travelguide/chinese-zodiac/)
- [Chinese Zodiac Signs: Your Personality, Compatibility, and More - Almanac.com](https://www.almanac.com/which-chinese-zodiac-sign-are-you)
- [Chinese zodiac - Wikipedia](https://en.wikipedia.org/wiki/Chinese_zodiac)

### Compatibility Systems Sources
- [Chinese Zodiac Compatibility: Best Matches, Love Clashes, and Relationship Insights - Shen Shu](https://www.shen-shu.com/en/blog/chinese-zodiac-compatibility-guide)
- [Chinese Zodiac Compatibility: Your Best (and Worst) Match - Chinese New Year](https://chinesenewyear.net/zodiac/compatibility/)
- [Chinese Zodiac Compatibility: Chart and Calculator - China Highlights](https://www.chinahighlights.com/travelguide/chinese-zodiac/compatibility.htm)
- [Unlocking Compatibility 1: San He and Liu He in Chinese Zodiac - Sinology Studio](https://www.sinologystudio.com/blogs/sinology-studio-blog/unlocking-compatibility-1-san-he-and-liu-he-in-chinese-zodiac-find-your-best-match)

### BaZi (Four Pillars) Sources
- [Free BaZi Calculator – Four Pillars of Destiny Chart - Marlyna Consulting](https://marlynaconsulting.com/ba-zi-calculator/)
- [What is Bazi: The Four Pillars of Destiny Chart - Shuimu Fengshui Salon](https://shuimu-space.com/blogs/news/what-is-bazi-the-four-pillars-of-destiny-chart-to-decode-your-destiny-calculator)
- [Guide to Bazi Calculator Interpretation - Shen Shu](https://www.shen-shu.com/en/blog/guide-to-bazi-calculator-interpretation)
- [BaZi Marriage Compatibility - AI Intelligent Relationship Analysis System - FateMaster](https://www.fatemaster.ai/en/workspace/bazi-marriage)
- [Marriage Compatibility by Bazi - Your Chinese Astrology](https://www.yourchineseastrology.com/calendar/bazi/marriage-compatibility/)
- [Step-by-Step Guide to Bazi Marriage Compatibility Analysis - Shen Shu](https://www.shen-shu.com/en/blog/bazi-marriage-compatibility-steps)

### Five Elements Sources
- [Chinese Five Elements Philosophy and Culture - China Highlights](https://www.chinahighlights.com/travelguide/chinese-zodiac/china-five-elements-philosophy.htm)
- [Chinese Zodiac Elements, Five Elements Compatibility, Chart - Your Chinese Astrology](https://www.yourchineseastrology.com/five-elements.htm)
- [Wuxing (Chinese philosophy) - Wikipedia](https://en.wikipedia.org/wiki/Wuxing_(Chinese_philosophy))
- [Understanding the Five Elements' Generating & Controlling Cycles - BTA](https://phongthuybta.com/en/five-elements/generating-controlling-cycles/)
- [Five Element Generating (Sheng) and Control (Ke) Cycles - Learn Religions](https://www.learnreligions.com/five-element-generating-sheng-and-control-ke-cycles-3183168)

### Calculation and Implementation Sources
- [How to calculate Chinese Zodiac - Mathtuition88](https://mathtuition88.com/2014/04/01/how-to-calculate-chinese-zodiac/)
- [Chinese Zodiac Calculator - Find Your Animal Sign and Element - Everyday Calculation](https://everydaycalculation.com/chinese-zodiac.php)
- [Every Chinese Zodiac Sign from 1900-2031 - Chinese New Year](https://chinesenewyear.net/zodiac/years/)

---

## Implementation Notes for Developers

1. **Data Validation**: Always validate birth dates and handle edge cases (Chinese New Year boundary dates)

2. **BaZi Complexity**: Full BaZi calculation requires precise solar time conversion and extensive lookup tables. Consider using established libraries or APIs for production use.

3. **Cultural Sensitivity**: Present compatibility scores as guidance, not absolute truth. Emphasize personal growth and communication.

4. **User Experience**:
   - Provide both simple (zodiac-only) and advanced (full BaZi) matching options
   - Explain the "why" behind scores with personalized insights
   - Use positive framing even for challenging matches

5. **Performance**: Pre-calculate and cache compatibility matrices for faster lookup

6. **Localization**: Support both English and Chinese character names for authenticity

7. **Updates**: Chinese New Year dates must be updated annually

---

**Document End**

*This research provides the foundation for implementing authentic Chinese astrology compatibility features in Syzygy Hearts. The algorithms balance traditional wisdom with practical implementation needs for modern dating applications.*

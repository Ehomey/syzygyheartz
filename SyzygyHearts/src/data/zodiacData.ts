/**
 * Chinese Zodiac Animals Data
 * Contains personality traits, characteristics, and attributes for all 12 zodiac animals
 */

export enum ChineseZodiac {
  RAT = 'Rat',
  OX = 'Ox',
  TIGER = 'Tiger',
  RABBIT = 'Rabbit',
  DRAGON = 'Dragon',
  SNAKE = 'Snake',
  HORSE = 'Horse',
  GOAT = 'Goat',
  MONKEY = 'Monkey',
  ROOSTER = 'Rooster',
  DOG = 'Dog',
  PIG = 'Pig'
}

export interface ZodiacTraits {
  animal: ChineseZodiac;
  chineseName: string;
  element: 'Wood' | 'Fire' | 'Earth' | 'Metal' | 'Water';
  yin: boolean; // true = Yin, false = Yang
  years: number[]; // Sample years (repeats every 12 years)
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

export const ZODIAC_DATA: Record<ChineseZodiac, ZodiacTraits> = {
  [ChineseZodiac.RAT]: {
    animal: ChineseZodiac.RAT,
    chineseName: '鼠',
    element: 'Water',
    yin: false,
    years: [1924, 1936, 1948, 1960, 1972, 1984, 1996, 2008, 2020],
    traits: {
      positive: ['Intelligent', 'Adaptable', 'Quick-witted', 'Charming', 'Artistic', 'Sociable'],
      negative: ['Opportunistic', 'Manipulative', 'Suspicious', 'Petty', 'Greedy'],
      personality: 'Quick-witted and resourceful, Rats are natural problem-solvers who thrive in social situations. They are charming and persuasive, with a knack for seeing opportunities others miss.'
    },
    luckyNumbers: [2, 3],
    luckyColors: ['Blue', 'Gold', 'Green'],
    compatibility: {
      best: [ChineseZodiac.DRAGON, ChineseZodiac.MONKEY],
      good: [ChineseZodiac.OX],
      challenging: [ChineseZodiac.HORSE, ChineseZodiac.ROOSTER]
    }
  },
  [ChineseZodiac.OX]: {
    animal: ChineseZodiac.OX,
    chineseName: '牛',
    element: 'Earth',
    yin: true,
    years: [1925, 1937, 1949, 1961, 1973, 1985, 1997, 2009, 2021],
    traits: {
      positive: ['Diligent', 'Dependable', 'Strong', 'Determined', 'Honest', 'Patient'],
      negative: ['Stubborn', 'Conservative', 'Slow', 'Inflexible', 'Materialistic'],
      personality: 'Steadfast and reliable, Oxen are the pillars of strength in any relationship. They value tradition, hard work, and loyalty above all else.'
    },
    luckyNumbers: [1, 9],
    luckyColors: ['Red', 'Blue', 'Purple'],
    compatibility: {
      best: [ChineseZodiac.RAT, ChineseZodiac.SNAKE, ChineseZodiac.ROOSTER],
      good: [ChineseZodiac.MONKEY],
      challenging: [ChineseZodiac.TIGER, ChineseZodiac.DRAGON, ChineseZodiac.GOAT]
    }
  },
  [ChineseZodiac.TIGER]: {
    animal: ChineseZodiac.TIGER,
    chineseName: '虎',
    element: 'Wood',
    yin: false,
    years: [1926, 1938, 1950, 1962, 1974, 1986, 1998, 2010, 2022],
    traits: {
      positive: ['Brave', 'Confident', 'Competitive', 'Charismatic', 'Passionate', 'Independent'],
      negative: ['Impulsive', 'Reckless', 'Arrogant', 'Short-tempered', 'Rebellious'],
      personality: 'Bold and adventurous, Tigers are natural leaders who live life on their own terms. They are passionate lovers who bring excitement and intensity to relationships.'
    },
    luckyNumbers: [1, 3, 4],
    luckyColors: ['Blue', 'Grey', 'Orange'],
    compatibility: {
      best: [ChineseZodiac.HORSE, ChineseZodiac.DOG],
      good: [ChineseZodiac.PIG, ChineseZodiac.DRAGON],
      challenging: [ChineseZodiac.OX, ChineseZodiac.SNAKE, ChineseZodiac.MONKEY]
    }
  },
  [ChineseZodiac.RABBIT]: {
    animal: ChineseZodiac.RABBIT,
    chineseName: '兔',
    element: 'Wood',
    yin: true,
    years: [1927, 1939, 1951, 1963, 1975, 1987, 1999, 2011, 2023],
    traits: {
      positive: ['Gentle', 'Compassionate', 'Artistic', 'Elegant', 'Peaceful', 'Sincere'],
      negative: ['Superficial', 'Stubborn', 'Overly Cautious', 'Pessimistic', 'Detached'],
      personality: 'Graceful and kind-hearted, Rabbits create harmonious environments wherever they go. They are romantic partners who value peace, beauty, and emotional connection.'
    },
    luckyNumbers: [3, 4, 6],
    luckyColors: ['Red', 'Pink', 'Purple', 'Blue'],
    compatibility: {
      best: [ChineseZodiac.GOAT, ChineseZodiac.PIG],
      good: [ChineseZodiac.DOG, ChineseZodiac.SNAKE],
      challenging: [ChineseZodiac.ROOSTER, ChineseZodiac.RAT]
    }
  },
  [ChineseZodiac.DRAGON]: {
    animal: ChineseZodiac.DRAGON,
    chineseName: '龙',
    element: 'Earth',
    yin: false,
    years: [1928, 1940, 1952, 1964, 1976, 1988, 2000, 2012, 2024],
    traits: {
      positive: ['Charismatic', 'Intelligent', 'Confident', 'Enthusiastic', 'Ambitious', 'Lucky'],
      negative: ['Arrogant', 'Demanding', 'Impatient', 'Dogmatic', 'Intolerant'],
      personality: 'Magnificent and powerful, Dragons are natural born leaders who inspire others. They are passionate and intense partners who seek equally strong companions.'
    },
    luckyNumbers: [1, 6, 7],
    luckyColors: ['Gold', 'Silver', 'Grey'],
    compatibility: {
      best: [ChineseZodiac.RAT, ChineseZodiac.MONKEY, ChineseZodiac.ROOSTER],
      good: [ChineseZodiac.TIGER, ChineseZodiac.SNAKE],
      challenging: [ChineseZodiac.OX, ChineseZodiac.DOG, ChineseZodiac.DRAGON]
    }
  },
  [ChineseZodiac.SNAKE]: {
    animal: ChineseZodiac.SNAKE,
    chineseName: '蛇',
    element: 'Fire',
    yin: true,
    years: [1929, 1941, 1953, 1965, 1977, 1989, 2001, 2013, 2025],
    traits: {
      positive: ['Wise', 'Enigmatic', 'Intuitive', 'Refined', 'Calm', 'Sophisticated'],
      negative: ['Jealous', 'Suspicious', 'Cunning', 'Possessive', 'Cold'],
      personality: 'Mysterious and elegant, Snakes possess deep wisdom and intuition. They are intense, passionate partners who form deep emotional bonds with their chosen ones.'
    },
    luckyNumbers: [2, 8, 9],
    luckyColors: ['Black', 'Red', 'Yellow'],
    compatibility: {
      best: [ChineseZodiac.OX, ChineseZodiac.ROOSTER],
      good: [ChineseZodiac.DRAGON, ChineseZodiac.RABBIT],
      challenging: [ChineseZodiac.TIGER, ChineseZodiac.PIG]
    }
  },
  [ChineseZodiac.HORSE]: {
    animal: ChineseZodiac.HORSE,
    chineseName: '马',
    element: 'Fire',
    yin: false,
    years: [1930, 1942, 1954, 1966, 1978, 1990, 2002, 2014, 2026],
    traits: {
      positive: ['Energetic', 'Independent', 'Cheerful', 'Warm-hearted', 'Talented', 'Free-spirited'],
      negative: ['Impatient', 'Irresponsible', 'Self-centered', 'Anxious', 'Restless'],
      personality: 'Free-spirited and energetic, Horses love adventure and independence. They are warm and enthusiastic partners who need space and freedom in relationships.'
    },
    luckyNumbers: [2, 3, 7],
    luckyColors: ['Yellow', 'Green'],
    compatibility: {
      best: [ChineseZodiac.TIGER, ChineseZodiac.GOAT, ChineseZodiac.DOG],
      good: [ChineseZodiac.DRAGON],
      challenging: [ChineseZodiac.RAT, ChineseZodiac.OX, ChineseZodiac.ROOSTER]
    }
  },
  [ChineseZodiac.GOAT]: {
    animal: ChineseZodiac.GOAT,
    chineseName: '羊',
    element: 'Earth',
    yin: true,
    years: [1931, 1943, 1955, 1967, 1979, 1991, 2003, 2015, 2027],
    traits: {
      positive: ['Creative', 'Gentle', 'Compassionate', 'Calm', 'Artistic', 'Thoughtful'],
      negative: ['Pessimistic', 'Indecisive', 'Over-sensitive', 'Weak-willed', 'Dependent'],
      personality: 'Gentle and artistic, Goats are sensitive souls who appreciate beauty and harmony. They are nurturing partners who create warm, loving relationships.'
    },
    luckyNumbers: [3, 4, 9],
    luckyColors: ['Green', 'Red', 'Purple'],
    compatibility: {
      best: [ChineseZodiac.RABBIT, ChineseZodiac.HORSE, ChineseZodiac.PIG],
      good: [ChineseZodiac.MONKEY],
      challenging: [ChineseZodiac.OX, ChineseZodiac.DOG]
    }
  },
  [ChineseZodiac.MONKEY]: {
    animal: ChineseZodiac.MONKEY,
    chineseName: '猴',
    element: 'Metal',
    yin: false,
    years: [1932, 1944, 1956, 1968, 1980, 1992, 2004, 2016, 2028],
    traits: {
      positive: ['Clever', 'Versatile', 'Energetic', 'Witty', 'Innovative', 'Sociable'],
      negative: ['Cunning', 'Manipulative', 'Restless', 'Vain', 'Irresponsible'],
      personality: 'Clever and playful, Monkeys are masters of wit and charm. They are entertaining partners who keep relationships exciting and unpredictable.'
    },
    luckyNumbers: [1, 7, 8],
    luckyColors: ['White', 'Blue', 'Gold'],
    compatibility: {
      best: [ChineseZodiac.RAT, ChineseZodiac.DRAGON],
      good: [ChineseZodiac.OX, ChineseZodiac.GOAT],
      challenging: [ChineseZodiac.TIGER, ChineseZodiac.PIG]
    }
  },
  [ChineseZodiac.ROOSTER]: {
    animal: ChineseZodiac.ROOSTER,
    chineseName: '鸡',
    element: 'Metal',
    yin: true,
    years: [1933, 1945, 1957, 1969, 1981, 1993, 2005, 2017, 2029],
    traits: {
      positive: ['Observant', 'Hardworking', 'Courageous', 'Resourceful', 'Confident', 'Honest'],
      negative: ['Critical', 'Boastful', 'Perfectionist', 'Conservative', 'Selfish'],
      personality: 'Confident and meticulous, Roosters are perfectionists who value honesty and hard work. They are loyal partners who expect the same dedication they give.'
    },
    luckyNumbers: [5, 7, 8],
    luckyColors: ['Gold', 'Brown', 'Yellow'],
    compatibility: {
      best: [ChineseZodiac.OX, ChineseZodiac.SNAKE, ChineseZodiac.DRAGON],
      good: [ChineseZodiac.MONKEY],
      challenging: [ChineseZodiac.RAT, ChineseZodiac.RABBIT, ChineseZodiac.HORSE, ChineseZodiac.ROOSTER]
    }
  },
  [ChineseZodiac.DOG]: {
    animal: ChineseZodiac.DOG,
    chineseName: '狗',
    element: 'Earth',
    yin: false,
    years: [1934, 1946, 1958, 1970, 1982, 1994, 2006, 2018, 2030],
    traits: {
      positive: ['Loyal', 'Honest', 'Faithful', 'Responsible', 'Courageous', 'Just'],
      negative: ['Anxious', 'Stubborn', 'Critical', 'Pessimistic', 'Conservative'],
      personality: 'Loyal and honest, Dogs are the most faithful companions. They are devoted partners who value trust and commitment above all else in relationships.'
    },
    luckyNumbers: [3, 4, 9],
    luckyColors: ['Red', 'Green', 'Purple'],
    compatibility: {
      best: [ChineseZodiac.TIGER, ChineseZodiac.HORSE, ChineseZodiac.RABBIT],
      good: [ChineseZodiac.RAT, ChineseZodiac.SNAKE],
      challenging: [ChineseZodiac.DRAGON, ChineseZodiac.GOAT, ChineseZodiac.ROOSTER]
    }
  },
  [ChineseZodiac.PIG]: {
    animal: ChineseZodiac.PIG,
    chineseName: '猪',
    element: 'Water',
    yin: true,
    years: [1935, 1947, 1959, 1971, 1983, 1995, 2007, 2019, 2031],
    traits: {
      positive: ['Compassionate', 'Generous', 'Diligent', 'Honest', 'Tolerant', 'Optimistic'],
      negative: ['Naive', 'Gullible', 'Materialistic', 'Lazy', 'Self-indulgent'],
      personality: 'Generous and kind-hearted, Pigs are optimistic souls who see the best in everyone. They are loving partners who create warm, nurturing relationships.'
    },
    luckyNumbers: [2, 5, 8],
    luckyColors: ['Yellow', 'Grey', 'Brown'],
    compatibility: {
      best: [ChineseZodiac.RABBIT, ChineseZodiac.GOAT],
      good: [ChineseZodiac.TIGER, ChineseZodiac.RAT],
      challenging: [ChineseZodiac.SNAKE, ChineseZodiac.MONKEY, ChineseZodiac.PIG]
    }
  }
};

// San He (Trinity) Groups - These form powerful trine relationships
export const SAN_HE_GROUPS = [
  [ChineseZodiac.RAT, ChineseZodiac.DRAGON, ChineseZodiac.MONKEY], // Water Trinity
  [ChineseZodiac.OX, ChineseZodiac.SNAKE, ChineseZodiac.ROOSTER],  // Metal Trinity
  [ChineseZodiac.TIGER, ChineseZodiac.HORSE, ChineseZodiac.DOG],   // Fire Trinity
  [ChineseZodiac.RABBIT, ChineseZodiac.GOAT, ChineseZodiac.PIG]    // Wood Trinity
];

// Liu He (Secret Friend) Pairs - These form special paired relationships
export const LIU_HE_PAIRS = [
  [ChineseZodiac.RAT, ChineseZodiac.OX],
  [ChineseZodiac.TIGER, ChineseZodiac.PIG],
  [ChineseZodiac.RABBIT, ChineseZodiac.DOG],
  [ChineseZodiac.DRAGON, ChineseZodiac.ROOSTER],
  [ChineseZodiac.SNAKE, ChineseZodiac.MONKEY],
  [ChineseZodiac.HORSE, ChineseZodiac.GOAT]
];

// Conflicting (Opposition) Pairs - These signs are directly opposite (6 years apart)
export const CONFLICTING_PAIRS = [
  [ChineseZodiac.RAT, ChineseZodiac.HORSE],
  [ChineseZodiac.OX, ChineseZodiac.GOAT],
  [ChineseZodiac.TIGER, ChineseZodiac.MONKEY],
  [ChineseZodiac.RABBIT, ChineseZodiac.ROOSTER],
  [ChineseZodiac.DRAGON, ChineseZodiac.DOG],
  [ChineseZodiac.SNAKE, ChineseZodiac.PIG]
];

# Product Requirements Document (PRD) for Syzygy Hearts

## Product Overview

Syzygy Hearts is a mobile dating application available on Android and iOS platforms that connects users based on astrological compatibility. The app leverages celestial alignments (syzygy) to foster meaningful romantic connections, combining traditional dating features with astrology insights.

### Vision
To revolutionize online dating by integrating astrology as the core matching mechanism, helping users find partners whose cosmic energies align harmoniously.

### Mission
Empower users to discover love through the stars, providing personalized compatibility insights and fostering authentic connections based on astrological profiles.

### Business Goals
- Achieve 50,000 active users within the first year.
- Generate revenue through premium subscriptions and in-app purchases.
- Position Syzygy Hearts as the leading astrology-based dating app in the market.

### Market Opportunity
- The global astrology market is valued at $2.1 billion (2023), with growing interest in personalized spirituality.
- Dating app market exceeds $7 billion, with niche apps like astrology gaining traction (e.g., Karma app with 500K+ downloads).
- Target market: 18-35 year olds interested in astrology, estimated at 20 million in the US alone.

### Assumptions
- Users are willing to share birth details for compatibility matching.
- Astrology APIs provide accurate and reliable data.
- Cross-platform development will ensure consistent user experience.

### Constraints
- Budget: $500,000 for initial development.
- Timeline: MVP launch within 6 months.
- Legal: Compliance with dating app regulations and astrology data privacy.

## Target Audience

- **Primary Users**: Millennials and Gen Z (ages 18-35) interested in astrology and spirituality
- **Secondary Users**: Astrology enthusiasts of all ages seeking romantic connections
- **Demographics**:
  - Age: 18-45
  - Gender: 60% female, 40% male
  - Location: Urban areas in US, UK, Canada, Australia
  - Income: Middle to upper-middle class
  - Education: College-educated or higher
- **Psychographics**:
  - Values: Spirituality, self-awareness, open-mindedness
  - Interests: Astrology, tarot, wellness, alternative lifestyles
  - Behaviors: Regular social media use, horoscope checking, online dating experience
- **Personas**:
  - **Starry-Eyed Romantic**: 25-year-old marketing coordinator who reads horoscopes daily, believes zodiac signs influence relationships, uses dating apps weekly.
  - **Curious Skeptic**: 30-year-old software engineer skeptical of astrology but open to trying it for dating, prefers data-driven insights.
  - **Astrology Aficionado**: 35-year-old yoga instructor with deep knowledge of charts, seeks partners with compatible Venus/Mars placements.

## Key Features

### Core Features
1. **Astrological Profile Creation**
   - **Description**: Users input birth date, time, and location to generate a comprehensive birth chart using astrology APIs (e.g., AstroAPI or AstrologyAPI.com).
   - **Functionality**:
     - Display sun, moon, rising signs, planetary placements, houses, and aspects.
     - Visual chart representation (wheel chart).
     - Privacy settings: Public, friends-only, or private.
   - **User Flow**: Onboarding screen > Input form > API call > Chart display > Edit options.
   - **Edge Cases**: Invalid birth time (prompt for approximate), location not found (use nearest city).
   - **Dependencies**: Astrology API integration.

2. **Compatibility Matching**
   - **Description**: Matches users based on synastry analysis, comparing birth charts for romantic, friendship, and long-term potential.
   - **Functionality**:
     - Compatibility scores (0-100%) for overall, romantic, emotional, intellectual aspects.
     - Detailed reports highlighting strong/weak aspects (e.g., Venus trine, Mars square).
     - Filters: Sun sign, moon sign, rising sign, planetary aspects.
   - **Algorithm**: Weighted scoring based on traditional astrology rules (e.g., Venus for love, Mars for passion).
   - **User Flow**: Browse profiles > View compatibility score > Read report > Like/Super-like.
   - **Edge Cases**: No matches available (suggest broadening filters), incomplete charts (partial scoring).

3. **Daily Horoscopes and Insights**
   - **Description**: Personalized horoscopes generated daily using user's birth chart and current transits.
   - **Functionality**:
     - Daily love, career, health predictions.
     - Transit alerts (e.g., "Mercury retrograde affecting communication").
     - Compatibility horoscopes for matched pairs.
   - **User Flow**: Home screen > Horoscope tab > View daily reading > Share option.
   - **Edge Cases**: API failure (cached content), user without chart (general horoscope).

4. **Messaging and Interactions**
   - **Description**: Real-time messaging with astrology-themed features.
   - **Functionality**:
     - Unlimited text, images, voice notes after mutual match.
     - Icebreakers: "What's your moon sign's influence on your emotions?"
     - Share birth charts or compatibility reports in chat.
     - Read receipts, typing indicators.
   - **User Flow**: Match notification > Chat screen > Send message > View profile.
   - **Edge Cases**: Blocked users, message limits for non-matches.

5. **Community Features**
   - **Description**: Social platform for astrology discussions.
   - **Functionality**:
     - Forums by zodiac sign or topic (e.g., "Leo Love Stories").
     - Virtual events: Live Q&A with astrologers, group chats.
     - User content: Share chart interpretations, stories.
   - **User Flow**: Community tab > Browse forums > Join event > Post content.
   - **Moderation**: AI content filtering, user reporting.

### Additional Features
- Push notifications: Customizable for matches, horoscopes, events.
- Monetization: Premium ($4.99/month) for unlimited matches, detailed reports; In-app purchases for personalized readings.
- Integrations: Social login (Facebook, Google), photo verification.

## User Stories

1. **Profile Creation**
   - As a user, I want to create my astrological profile so I can see my birth chart details.
   - Acceptance Criteria: Input form validates date/time/location; API generates chart; display includes all placements; privacy toggle works.

2. **Matching**
   - As a user, I want to browse potential matches filtered by astrological compatibility so I can find aligned partners.
   - Acceptance Criteria: Filters apply correctly; compatibility scores display; profiles show chart previews; swipe interface functions.

3. **Horoscopes**
   - As a user, I want to receive daily horoscopes tailored to my chart so I can stay informed about cosmic influences.
   - Acceptance Criteria: Daily update at midnight; personalized content; push notification option; offline access.

4. **Messaging**
   - As a user, I want to message matched users without limitations so I can build connections.
   - Acceptance Criteria: Chat opens after match; unlimited messages; astrology prompts available; media sharing works.

5. **Compatibility Reports**
   - As a user, I want to view detailed compatibility reports so I can understand relationship potential.
   - Acceptance Criteria: Report generates on demand; includes scores and explanations; premium unlock for full details.

Additional Stories:
6. As a user, I want to join astrology forums so I can discuss with like-minded people.
7. As a user, I want to attend virtual events so I can learn more about astrology.

## Technical Requirements

### Platforms
- Android: Minimum API level 21 (Android 5.0), target API 34
- iOS: Minimum iOS 12.0, target iOS 17

### Backend
- **Infrastructure**: AWS (EC2, S3, Lambda) or Firebase for scalability.
- **Database**: NoSQL (Firestore) for user profiles; SQL (PostgreSQL) for charts and matches.
- **Astrology Engine**: Integrate AstroAPI (astrology-api.io) for birth charts, synastry, horoscopes. Fallback to custom calculations if needed.
- **Messaging**: Firebase Realtime Database or Socket.io for real-time chat.
- **APIs**: RESTful APIs for all features; rate limiting to prevent abuse.

### Frontend
- **Framework**: React Native for cross-platform development.
- **UI Library**: React Native Elements or custom components.
- **State Management**: Redux or Context API.
- **Offline**: Cache horoscopes using AsyncStorage.
- **Performance**: Optimize for <2s load times; support 1000+ concurrent users.

### Data Models
- User: {id, name, email, birthdate, time, location, chart_data, preferences}
- Match: {user1_id, user2_id, compatibility_score, report}
- Message: {sender_id, receiver_id, content, timestamp}

### Security
- Encryption: AES-256 for stored data; TLS 1.3 for transmission.
- Authentication: OAuth 2.0 with social logins.
- Privacy: Birth data hashed; user consent for data usage.
- Compliance: GDPR (data deletion), CCPA (opt-out), COPPA for under 18.

### Performance
- Response times: <500ms for API calls.
- Scalability: Auto-scaling for traffic spikes.
- Monitoring: Crashlytics for errors; analytics with Mixpanel.

## Design Guidelines

### UI/UX Principles
- **Theme**: Celestial aesthetic with starry backgrounds, cosmic colors; dark mode default for ambiance.
- **Navigation**: Bottom tab bar with icons (Profile, Matches, Horoscope, Community); swipe gestures for matching.
- **Accessibility**: WCAG 2.1 AA compliance; screen reader support; high contrast options; font scaling.
- **Consistency**: Use design system for buttons, cards, modals; astrology symbols integrated throughout.
- **User Flow**: Onboarding wizard; progressive disclosure for complex features.

### Branding
- **Color Palette**:
  - Primary: #1a1a2e (deep navy)
  - Secondary: #16213e (dark blue)
  - Accent: #e94560 (coral red)
  - Gold: #f2a365 (warm gold)
- **Typography**:
  - Headings: Playfair Display (serif, elegant)
  - Body: Roboto (sans-serif, readable)
  - Sizes: 14-18pt for mobile.
- **Iconography**: Custom zodiac icons; celestial motifs (stars, planets); consistent 24x24px.
- **Logo**: Stylized heart with orbiting planets.

### Wireframe Descriptions
- **Onboarding**: 3 screens: Welcome, Birth Input, Permissions.
- **Profile**: Chart wheel center, editable fields below.
- **Matching**: Card stack with compatibility badge, swipe actions.
- **Chat**: Message bubbles with astrology emojis.

## Timeline

### Phase 1: MVP (Months 1-3)
- **Week 1-2**: Setup project, design system, API integrations (AstroAPI).
- **Week 3-4**: Develop onboarding and profile creation.
- **Week 5-6**: Implement basic matching and swipe interface.
- **Week 7-8**: Build messaging system.
- **Week 9-12**: Testing, bug fixes, beta release.
- **Milestones**: Functional app with core features; 100 beta users.

### Phase 2: Enhancement (Months 4-6)
- **Month 4**: Add detailed compatibility reports and filters.
- **Month 5**: Integrate daily horoscopes and push notifications.
- **Month 6**: Develop community forums and events.
- **Milestones**: Full feature set; app store submission.

### Phase 3: Monetization and Scaling (Months 7-9)
- **Month 7**: Implement premium subscriptions and in-app purchases.
- **Month 8**: Global localization (multiple languages); marketing campaign.
- **Month 9**: Performance monitoring; user feedback integration.
- **Milestones**: 10,000 downloads; revenue generation.

### Team Roles
- Product Manager: Oversee requirements.
- Designers: UI/UX creation.
- Developers: Frontend/backend implementation.
- QA: Testing and validation.
- Marketing: Launch strategy.

## Success Metrics

- **User Acquisition**: 10,000 downloads in first 3 months; track via app store analytics and Firebase.
- **Engagement**: Average session time >5 minutes; daily active users >20%; measured with Mixpanel.
- **Retention**: 30% monthly active users; cohort analysis for churn rate.
- **Revenue**: Achieve profitability within 12 months; ARPU $5/month; track via Stripe/in-app billing.
- **User Satisfaction**: 4.5+ star rating on app stores; Net Promoter Score >50; gather via in-app surveys.
- **Additional KPIs**: Match success rate (conversations leading to dates); feature usage (horoscope views); crash rate <1%.
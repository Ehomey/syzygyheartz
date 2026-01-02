# Product Requirements Document (PRD) for Syzygy Hearts

## Product Overview

Syzygy Hearts is a mobile dating application for Android and iOS that matches users based on astrological compatibility. The core concept revolves around using birth charts to calculate synastry (compatibility) between users, providing a unique dating experience for astrology enthusiasts.

### Key Functionalities
- **User Registration and Profile Creation**: Users sign up with email or social login, then input birth details (date, time, location) to generate a personalized birth chart.
- **Matching System**: Algorithm compares user charts to suggest matches with compatibility scores and detailed reports.
- **Horoscopes**: Daily personalized horoscopes based on user's chart and current planetary transits.
- **Messaging**: Real-time chat with astrology-themed prompts and the ability to share charts.
- **Community**: Forums and events for users to discuss astrology and connect socially.

### User Journey
1. Onboarding: User downloads app, creates account, enters birth info.
2. Profile Setup: App generates and displays birth chart.
3. Discovery: User browses matches, views compatibility details.
4. Interaction: Likes matches, starts conversations with icebreakers.
5. Engagement: Receives horoscopes, participates in community.

### Scope
- In Scope: All features listed above, basic monetization (premium unlocks).
- Out of Scope: Video calls, audio messaging, non-astrology matching options, external app integrations (e.g., Spotify), advanced analytics beyond basic tracking.

## Target Audience

The app targets users who are open to astrology as a tool for dating and self-discovery. Primary users are tech-savvy millennials and Gen Z who enjoy niche dating experiences.

### Detailed Personas

1. **Casual Explorer (Persona 1)**
   - **Demographics**: Female, 22-28 years old, urban dweller, college student or entry-level job.
   - **Background**: Checks horoscopes occasionally, believes in zodiac signs but not deeply into astrology.
   - **Goals**: Find fun dates, learn about astrology through the app.
   - **Pain Points**: Overwhelmed by complex features; prefers simple, gamified experience.
   - **Use Case**: Signs up, inputs basic birth info, swipes through matches based on sun signs, reads daily love horoscopes.

2. **Astrology Enthusiast (Persona 2)**
   - **Demographics**: Non-binary or male, 28-35 years old, professional in creative fields, higher education.
   - **Background**: Reads birth charts regularly, follows astrologers on social media, uses astrology for life decisions.
   - **Goals**: Connect with like-minded people, use detailed compatibility for serious relationships.
   - **Pain Points**: Apps that oversimplify astrology; wants accurate, in-depth data.
   - **Use Case**: Creates full profile with precise birth time, filters matches by moon/rising signs, shares chart interpretations in chats.

3. **Skeptical Learner (Persona 3)**
   - **Demographics**: Male, 30-40 years old, tech professional, skeptical of pseudoscience.
   - **Background**: Curious about astrology but data-driven; tries it for novelty.
   - **Goals**: Explore compatibility as a fun feature, not take it too seriously.
   - **Pain Points**: Too much jargon; prefers clear explanations.
   - **Use Case**: Uses app for casual matching, reads compatibility reports with a grain of salt, engages in community to learn more.

## Key Features

### Core Features

1. **Astrological Profile Creation**
   - **Description**: Allows users to input precise birth details to generate and display a full birth chart.
   - **Screens**:
     - Onboarding Form: Fields for date (DD/MM/YYYY), time (HH:MM), location (autocomplete city/country).
     - Chart Display: Circular wheel showing signs, planets, houses; expandable details for each placement.
     - Edit Profile: Update birth info, add photos, bio, privacy toggle.
   - **Interactions**:
     - Form validation: Date must be in past, time optional but recommended.
     - API Call: POST to AstroAPI with birth data, receive JSON chart data.
     - Visual: SVG-based chart wheel, color-coded by element (fire=red, earth=green, etc.).
   - **Functionality**:
     - Placements: Sun, Moon, Rising, Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto, Chiron.
     - Aspects: Conjunctions, trines, squares, oppositions with degrees.
     - Houses: 12 houses with rulers.
   - **Edge Cases**:
     - Invalid date: Error message "Please enter a valid birth date."
     - No time: Generate chart with noon default, note approximation.
     - API error: Retry with exponential backoff, show cached generic chart.
   - **Dependencies**: AstroAPI integration (endpoint: /birth-chart).

2. **Compatibility Matching**
   - **Description**: Core matching engine using synastry to pair users.
   - **Screens**:
     - Match Feed: Card stack with profile photo, name, sun sign, compatibility %.
     - Profile View: Full chart, bio, compatibility breakdown.
     - Filter Screen: Dropdowns for signs, aspects, score range.
   - **Interactions**:
     - Swipe: Right for like, left for pass; super-like with double tap.
     - Algorithm: Compare charts, score based on aspect harmony (e.g., Venus-Mars conjunction +20 points).
   - **Functionality**:
     - Scores: Overall (weighted average), Romantic (Venus/Mars), Emotional (Moon), Intellectual (Mercury).
     - Report: Text summary "Your Venus in Libra harmonizes with their Mars in Gemini for balanced passion."
   - **Edge Cases**:
     - Low matches: Message "Try adjusting filters for more options."
     - Incomplete data: Score based on available placements, note in report.
   - **Dependencies**: Synastry API call.

3. **Daily Horoscopes and Insights**
   - **Description**: Provides daily astrological guidance.
   - **Screens**:
     - Horoscope Tab: Today's reading, sections for love, career, health.
     - Transit Alerts: Notification-style cards for major transits.
   - **Interactions**:
     - Refresh: Pull-to-refresh for latest data.
     - Share: Button to share horoscope text to social media.
   - **Functionality**:
     - Personalization: Based on sun/moon signs and current transits.
     - Content: 200-300 words, positive tone.
   - **Edge Cases**:
     - No chart: Show general daily horoscope.
     - Offline: Display cached version.
   - **Dependencies**: Horoscope API (daily endpoint).

4. **Messaging and Interactions**
   - **Description**: Facilitates communication between matched users.
   - **Screens**:
     - Chat List: Conversations with last message, unread count.
     - Chat Window: Message bubbles, input field, attachment options.
   - **Interactions**:
     - Send: Text input with send button; emoji picker.
     - Icebreakers: Pre-suggested questions like "How does your rising sign affect first impressions?"
   - **Functionality**:
     - Real-time: WebSocket for instant delivery.
     - Media: Image upload, chart sharing (embed chart image).
   - **Edge Cases**:
     - Unmatched: No chat access, show "Match first" prompt.
     - Blocked: Hide conversation, prevent new messages.
   - **Dependencies**: Firebase Realtime DB for chat.

5. **Community Features**
   - **Description**: Builds a social layer around astrology.
   - **Screens**:
     - Forums: List of topics, posts with likes/comments.
     - Events: Upcoming virtual meetups, join button.
   - **Interactions**:
     - Post: Text input, image attach.
     - Join Event: Calendar integration, notification signup.
   - **Functionality**:
     - Moderation: Flag inappropriate content, auto-hide.
   - **Edge Cases**:
     - Empty forum: Prompt "Start a discussion!"
   - **Dependencies**: Firestore for posts.

### Additional Features
- **Push Notifications**: Configurable in settings; types: match alert, horoscope update, event reminder.
- **Monetization**: Premium tier unlocks advanced reports; IAP for custom readings.
- **Integrations**: OAuth for login, photo verification via third-party API.

## User Stories

1. **Onboarding and Profile Creation**
   - As a new user, I want to sign up and enter my birth details to generate my birth chart.
   - Acceptance Criteria:
     - Signup form accepts email/password or social login.
     - Birth input form: Date picker, time input, location search.
     - Validation: Date < today, location geocoded.
     - API call succeeds, chart displays with sun/moon/rising.
     - Privacy: Toggle for chart visibility (public/private).

2. **Viewing Birth Chart**
   - As a user, I want to view my detailed birth chart with all placements.
   - Acceptance Criteria:
     - Chart screen shows wheel with planets in signs/houses.
     - Tap planet for details (sign, house, aspects).
     - Edit button allows updating birth info.

3. **Browsing Matches**
   - As a user, I want to swipe through potential matches with compatibility info.
   - Acceptance Criteria:
     - Feed loads 10-20 profiles per session.
     - Each card: Photo, name, sun sign, compatibility %.
     - Swipe right likes, left passes; animation feedback.
     - Filters: Age, location, signs; apply without reload.

4. **Viewing Compatibility Report**
   - As a user, I want to see a detailed compatibility report for a match.
   - Acceptance Criteria:
     - Report screen: Overall score, breakdown by category.
     - Text explanation of key aspects.
     - Premium: Full report; free: Summary only.

5. **Receiving Daily Horoscopes**
   - As a user, I want daily personalized horoscopes in the app.
   - Acceptance Criteria:
     - Horoscope updates daily at 00:00 UTC.
     - Content based on user's chart.
     - Push notification toggle in settings.
     - Offline: Cached last 7 days.

6. **Messaging Matches**
   - As a user, I want to chat with matched users using astrology themes.
   - Acceptance Criteria:
     - Chat opens after mutual like.
     - Send text/images; real-time delivery.
     - Icebreakers: 5 pre-set questions.
     - Share chart: Button embeds chart image.

7. **Participating in Community**
   - As a user, I want to post in forums and join events.
   - Acceptance Criteria:
     - Forums: Create post with text/image.
     - Events: List upcoming, join with one tap.
     - Moderation: Report button flags content.

8. **Managing Settings**
   - As a user, I want to customize notifications and privacy.
   - Acceptance Criteria:
     - Settings screen: Toggles for pushes, profile visibility.
     - Save changes persists across sessions.

9. **Upgrading to Premium**
   - As a user, I want to purchase premium for extra features.
   - Acceptance Criteria:
     - IAP screen lists plans ($4.99/month).
     - Payment via app store; unlocks detailed reports.

10. **Reporting Issues**
    - As a user, I want to report bugs or inappropriate content.
    - Acceptance Criteria:
      - In-app feedback form sends to support email.
      - For content: Flag button in forums/chats.

## Technical Requirements

### Platforms
- Android: Min API 21 (Lollipop), Target API 34; Support tablets.
- iOS: Min iOS 12, Target iOS 17; Universal app.

### Architecture
- **Frontend**: React Native 0.72+ with Expo for easier deployment.
- **Backend**: Firebase (Firestore for DB, Functions for serverless APIs, Auth for login).
- **APIs**: AstroAPI for astrology data (endpoints: /natal, /synastry, /horoscope).
- **Real-time**: Firebase Realtime DB for messaging.
- **Deployment**: App stores via Expo Application Services.

### Backend Details
- **Database Schema**:
  - Users: {uid: string, email: string, birth: {date: string, time: string, lat: number, lng: number}, chart: object, profile: {name: string, bio: string, photos: array}}
  - Matches: {id: string, users: [uid1, uid2], score: number, report: string, liked: boolean}
  - Messages: {id: string, chatId: string, sender: uid, text: string, timestamp: Date, type: 'text'|'image'}
  - Horoscopes: {uid: string, date: string, content: string}
- **API Calls**:
  - Birth Chart: fetch('https://api.astrology-api.io/natal', {method: 'POST', body: JSON.stringify(birthData)})
  - Compatibility: fetch('/synastry', {method: 'POST', body: {chart1, chart2}})
- **Error Handling**: Retry failed API calls 3 times; log errors to Firebase Crashlytics.

### Frontend Details
- **Navigation**: React Navigation with stack/tab navigators.
- **Components**: Custom hooks for API calls (useBirthChart, useMatches).
- **State**: Context API for user session; Redux for complex states like chat.
- **Offline**: AsyncStorage for horoscopes; sync on reconnect.
- **Performance**: Lazy loading for match feed; image optimization with react-native-fast-image.

### Security
- **Auth**: Firebase Auth with email/social providers.
- **Data Protection**: Encrypt birth data with AES; GDPR consent dialog on signup.
- **Compliance**: Age gate for <18; data export/deletion endpoints.

### Testing
- **Unit Tests**: Jest for components and hooks.
- **Integration**: Detox for E2E on devices.
- **API Mocks**: Use MSW for astrology API responses.

### Dependencies
- React Native packages: react-native-svg (charts), react-native-notifications (pushes), react-native-iap (monetization).

## Design Guidelines

### UI/UX Principles
- **Theme**: Dark mode primary with starry gradients; celestial icons (stars, planets) for buttons.
- **Navigation**: Bottom tabs: Home (matches), Horoscope, Messages, Profile, Community.
- **Interactions**: Swipe for matches; pull-to-refresh; haptic feedback on likes.
- **Accessibility**: VoiceOver/TalkBack support; minimum 4.5:1 contrast ratio; scalable fonts; alt text for images.
- **Consistency**: Design tokens: Button radius 8px, shadow elevation 4dp; use Figma components.

### Screen Specifications
1. **Onboarding**:
   - 3 screens: Welcome (image + text), Birth Input (form), Permissions (location/camera).
   - Animations: Fade in/out; progress bar.

2. **Profile Creation**:
   - Form: Date picker (native), time input, location search (Google Places API).
   - Chart View: Circular SVG, zoomable; legend for symbols.

3. **Match Feed**:
   - Cards: 300x400px, rounded corners; overlay with name/sign/score.
   - Gestures: Swipe animations (Tinder-style).

4. **Chat**:
   - Bubbles: Blue for user, gray for match; timestamps.
   - Input: Text field + send icon; emoji bar.

5. **Horoscope**:
   - Sections: Love, Career, Health; expandable.
   - Icons: Heart for love, briefcase for career.

### Branding
- **Colors**: Primary #1a1a2e (navy), Secondary #16213e (blue), Accent #e94560 (red), Gold #f2a365.
- **Fonts**: Headings: Playfair Display 24pt bold; Body: Roboto 16pt regular.
- **Icons**: Zodiac: Aries ♈, etc.; consistent size 24x24.

### Prototyping
- Use Figma for wireframes; provide links to design files.
- Responsive: iPhone SE to iPad Pro; Android phones/tablets.

### Wireframe Descriptions
- **Onboarding**: 3 screens: Welcome, Birth Input, Permissions.
- **Profile**: Chart wheel center, editable fields below.
- **Matching**: Card stack with compatibility badge, swipe actions.
- **Chat**: Message bubbles with astrology emojis.




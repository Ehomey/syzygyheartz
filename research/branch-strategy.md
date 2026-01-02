# Git Branch Strategy for Syzygy Hearts

## Overview

This document outlines the branching strategy and merge workflow for the Syzygy Hearts project, designed to coordinate work across multiple agents while maintaining code quality and avoiding conflicts.

---

## Branch Structure

### Main Branches

```
master (or main)
├─ Production-ready code
├─ Always deployable
└─ Protected - requires pull request + review

develop
├─ Integration branch
├─ Latest development changes
├─ All features merge here first
└─ Semi-protected - requires testing before merge

feature branches (from develop)
├─ feature/integration-foundation (Agent 5)
├─ feature/ui-components (Agent 1)
├─ feature/bazi-engine (Agent 2)
├─ feature/compatibility-algorithm (Agent 3)
└─ feature/data-layer (Agent 4)
```

### Current Branches

Based on existing repository:
- `master` - Main production branch
- `ui-redesign` - Currently active UI work
- `backend-logic` - Backend development
- `develop` - To be created as integration branch

---

## Branch Naming Convention

### Feature Branches
```
feature/<agent-name>-<description>
feature/integration-foundation
feature/ui-components
feature/bazi-engine
feature/compatibility-algorithm
feature/data-layer
```

### Bug Fix Branches
```
bugfix/<issue-description>
bugfix/calculation-error
bugfix/navigation-crash
```

### Hotfix Branches
```
hotfix/<critical-issue>
hotfix/auth-security
```

---

## Workflow for Each Agent

### Agent 5: Integration & Architecture Lead (Foundation)

**Branch:** `feature/integration-foundation`

**Tasks:**
1. Create project structure
2. Define types (`src/types.ts`)
3. Define constants (`src/constants.ts`)
4. Create architecture documentation
5. Set up integration framework

**Merge Strategy:**
```bash
# Create feature branch from master
git checkout master
git pull origin master
git checkout -b feature/integration-foundation

# Make changes, commit regularly
git add .
git commit -m "Add type definitions and constants"

# When ready, merge to develop
git checkout develop
git merge feature/integration-foundation

# Push to remote
git push origin develop
```

**Status:** In Progress (this work)

---

### Agent 1: UI/UX Components

**Branch:** `feature/ui-components`

**Dependencies:**
- `src/types.ts` (from Agent 5)
- `src/constants.ts` (from Agent 5)

**Tasks:**
1. Build reusable component library
2. Create screen layouts
3. Implement design system
4. Style with theme support

**Files to Create:**
```
src/components/common/
src/components/cards/
src/components/icons/
src/components/charts/
src/screens/auth/
src/screens/discovery/
src/screens/matches/
src/screens/destiny/
src/screens/profile/
```

**Merge Strategy:**
```bash
# Create branch from develop (after Agent 5 merges)
git checkout develop
git pull origin develop
git checkout -b feature/ui-components

# Work on components
git add src/components/
git commit -m "Add user card component with BaZi display"

# Regularly sync with develop
git checkout develop
git pull origin develop
git checkout feature/ui-components
git merge develop

# When complete, merge back to develop
git checkout develop
git merge feature/ui-components
git push origin develop
```

**Can Work In Parallel:** Yes (minimal conflicts with other agents)

---

### Agent 2: BaZi Calculation Engine

**Branch:** `feature/bazi-engine`

**Dependencies:**
- `src/types.ts` (BaZiChart, Pillar interfaces)

**Tasks:**
1. Implement Chinese calendar conversion
2. Calculate Four Pillars
3. Determine elements and zodiac
4. Extract personality traits

**Files to Create:**
```
src/astrology/bazi.ts
src/astrology/chineseCalendar.ts
src/astrology/elements.ts
src/astrology/zodiac.ts
src/utils/dateHelpers.ts
```

**Merge Strategy:**
```bash
# Create branch from develop
git checkout develop
git pull origin develop
git checkout -b feature/bazi-engine

# Implement calculations
git add src/astrology/
git commit -m "Implement BaZi four pillars calculation"

# Test thoroughly before merging
npm test

# Merge to develop
git checkout develop
git merge feature/bazi-engine
git push origin develop
```

**Can Work In Parallel:** Yes (core logic, no UI dependencies)

---

### Agent 3: Compatibility Algorithm

**Branch:** `feature/compatibility-algorithm`

**Dependencies:**
- `src/types.ts` (CompatibilityResult interface)
- `src/astrology/bazi.ts` (from Agent 2)
- `src/constants.ts` (relationship data)

**Tasks:**
1. Implement element compatibility
2. Implement zodiac compatibility
3. Calculate pillar harmony
4. Generate insights and recommendations

**Files to Create:**
```
src/astrology/compatibility.ts
src/astrology/elementRelationships.ts
src/data/compatibilityInsights.ts
```

**Merge Strategy:**
```bash
# Wait for Agent 2 to merge, then create branch
git checkout develop
git pull origin develop  # Get latest with BaZi engine
git checkout -b feature/compatibility-algorithm

# Implement compatibility logic
git add src/astrology/compatibility.ts
git commit -m "Add element and zodiac compatibility scoring"

# Merge to develop
git checkout develop
git merge feature/compatibility-algorithm
git push origin develop
```

**Can Work In Parallel:** Partial (depends on Agent 2 completing first)

---

### Agent 4: Data Layer & API

**Branch:** `feature/data-layer`

**Dependencies:**
- `src/types.ts` (all interfaces)
- BaZi and compatibility functions (from Agents 2 & 3)

**Tasks:**
1. Create API service layer
2. Implement data persistence
3. Set up AsyncStorage
4. Create mock data for testing

**Files to Create:**
```
src/services/api.ts
src/services/auth.ts
src/services/storage.ts
src/services/baziService.ts
src/services/matchingService.ts
src/data/mockUsers.ts
src/data/elementRelationships.ts
src/data/zodiacTraits.ts
```

**Merge Strategy:**
```bash
# Create branch after core logic is merged
git checkout develop
git pull origin develop
git checkout -b feature/data-layer

# Implement services
git add src/services/
git commit -m "Add API service layer and storage"

# Merge to develop
git checkout develop
git merge feature/data-layer
git push origin develop
```

**Can Work In Parallel:** Partial (can start on API structure, wait for logic)

---

## Merge Order & Timeline

### Phase 1: Foundation (Week 1)
**Agent 5** - Integration Foundation
- [ ] Create project structure
- [ ] Add types and constants
- [ ] Write architecture documentation
- [ ] Merge to `develop`

**Status:** COMPLETE

---

### Phase 2: Core Logic (Week 1-2)
Can work in parallel after Phase 1:

**Agent 2** - BaZi Engine
- [ ] Implement calculation engine
- [ ] Add unit tests
- [ ] Merge to `develop`

**Agent 1** - UI Components (parallel)
- [ ] Build component library
- [ ] Create basic screens
- [ ] Can work independently

---

### Phase 3: Advanced Features (Week 2)
Depends on Phase 2:

**Agent 3** - Compatibility Algorithm
- [ ] Wait for Agent 2 to merge
- [ ] Implement compatibility logic
- [ ] Add tests
- [ ] Merge to `develop`

**Agent 4** - Data Layer (parallel)
- [ ] Can start API structure
- [ ] Wait for Agents 2 & 3 for full integration
- [ ] Merge to `develop`

---

### Phase 4: Integration (Week 3)
**Agent 5** - Final Integration
- [ ] Pull all features to `develop`
- [ ] Connect UI to logic and data
- [ ] Wire up navigation
- [ ] End-to-end testing
- [ ] Bug fixes
- [ ] Merge `develop` to `master`

---

## Merge Conflict Resolution

### Common Conflict Scenarios

1. **Type Definition Conflicts**
   - Resolution: Agent 5 owns `types.ts`, other agents request changes
   - Process: Submit PR to Agent 5, discuss, merge centrally

2. **Constant Value Conflicts**
   - Resolution: Agent 5 owns `constants.ts`, coordinate changes
   - Process: Document in constants, notify other agents

3. **Import Path Conflicts**
   - Prevention: Use absolute imports from `src/`
   - Standard: `import { BaZiChart } from '@/types'`

4. **Navigation Conflicts**
   - Prevention: Each agent works on their own stack
   - Integration: Agent 5 combines in final phase

### Conflict Resolution Process

```bash
# If you have conflicts when merging develop
git checkout feature/your-branch
git fetch origin
git merge origin/develop

# Resolve conflicts in your editor
# Then:
git add .
git commit -m "Resolve merge conflicts with develop"
git push origin feature/your-branch
```

---

## Pull Request Process

### Creating a PR

1. **Before Creating:**
   - [ ] All tests pass
   - [ ] Code is documented
   - [ ] No console errors
   - [ ] Follows TypeScript types

2. **PR Title Format:**
   ```
   [Agent X] Feature: Description
   [Agent 2] Feature: BaZi calculation engine
   [Agent 1] Feature: User card components
   ```

3. **PR Description Template:**
   ```markdown
   ## Summary
   Brief description of changes

   ## Agent
   Agent X - [Role]

   ## Changes
   - Added X
   - Modified Y
   - Fixed Z

   ## Dependencies
   - Depends on: [other PRs or features]
   - Required by: [future work]

   ## Testing
   - [ ] Unit tests added/updated
   - [ ] Manual testing completed
   - [ ] No TypeScript errors

   ## Screenshots
   (if UI changes)
   ```

4. **Review Process:**
   - Agent 5 reviews all PRs
   - At least 1 approval required
   - CI checks must pass (when set up)

---

## Git Best Practices

### Commit Messages

**Format:**
```
<type>(<scope>): <subject>

<body>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, no code change
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Build process, dependencies

**Examples:**
```
feat(bazi): implement four pillars calculation
fix(compatibility): correct element relationship scoring
docs(architecture): update integration workflow
style(components): format user card component
```

### Commit Frequency

- Commit often (every logical change)
- Each commit should be atomic (one purpose)
- Don't commit broken code to develop
- Use feature branches for WIP

### Commit Hygiene

```bash
# Check what you're committing
git status
git diff

# Stage specific files
git add src/types.ts src/constants.ts

# Commit with descriptive message
git commit -m "feat(types): add BaZiChart and CompatibilityResult interfaces"

# Push regularly
git push origin feature/your-branch
```

---

## Code Review Checklist

### For All Code

- [ ] Follows TypeScript strictly (no `any`)
- [ ] Uses types from `src/types.ts`
- [ ] Uses constants from `src/constants.ts`
- [ ] No hardcoded values
- [ ] Properly documented (JSDoc comments)
- [ ] No console.logs in production code
- [ ] Error handling implemented
- [ ] Follows naming conventions

### For Components (Agent 1)

- [ ] Uses theme from ThemeContext
- [ ] Responsive design
- [ ] Accessibility considered
- [ ] Reusable and composable
- [ ] Props are typed

### For Logic (Agents 2, 3)

- [ ] Unit tests included
- [ ] Edge cases handled
- [ ] Calculations are accurate
- [ ] Performance optimized
- [ ] Pure functions where possible

### For Services (Agent 4)

- [ ] Error handling
- [ ] Loading states
- [ ] Type-safe API calls
- [ ] Proper async/await
- [ ] Data validation

---

## Emergency Procedures

### Rolling Back a Merge

```bash
# If a merge to develop breaks things
git checkout develop
git revert -m 1 <merge-commit-hash>
git push origin develop
```

### Creating a Hotfix

```bash
# For critical production bugs
git checkout master
git checkout -b hotfix/critical-bug
# Fix the bug
git commit -m "hotfix: resolve critical authentication bug"
git checkout master
git merge hotfix/critical-bug
git checkout develop
git merge hotfix/critical-bug
git push origin master
git push origin develop
```

---

## Branch Cleanup

### After Successful Merge

```bash
# Delete local branch
git branch -d feature/your-branch

# Delete remote branch
git push origin --delete feature/your-branch
```

### Stale Branch Policy

- Branches inactive for 30 days will be marked for deletion
- Notify owner before deletion
- Archive important WIP branches

---

## Integration Testing

### Before Merging to Master

1. **Full App Test:**
   - [ ] All features working
   - [ ] No TypeScript errors
   - [ ] No runtime errors
   - [ ] App builds successfully

2. **Platform Testing:**
   - [ ] iOS simulator works
   - [ ] Android emulator works
   - [ ] Both platforms render correctly

3. **Performance Testing:**
   - [ ] No memory leaks
   - [ ] Smooth animations
   - [ ] Fast BaZi calculations
   - [ ] Responsive UI

4. **User Flow Testing:**
   - [ ] Onboarding works
   - [ ] Profile creation works
   - [ ] Discovery and swiping works
   - [ ] Matching works
   - [ ] All navigation works

---

## Communication Protocol

### Daily Standups (Async)

Each agent posts:
- What I completed yesterday
- What I'm working on today
- Any blockers

### Merge Notifications

When merging to develop:
```
@all-agents: Merged [feature-name] to develop
Changes: [brief description]
Affected files: [list]
Action needed: Pull latest develop before continuing
```

### Blocking Issues

If blocked by another agent's work:
```
@agent-x: Blocked on [feature]
Need: [specific requirement]
Timeline: [when needed by]
```

---

## Version Control Hygiene

### .gitignore

Already configured to ignore:
- `node_modules/`
- `*.log`
- `.expo/`
- `.env`
- Build artifacts

### Never Commit

- Secrets or API keys
- `.env` files
- Personal configuration
- IDE-specific files (except agreed upon)
- Large binary files
- Generated code

### Always Commit

- Source code
- Configuration (without secrets)
- Documentation
- Tests
- Package dependencies (`package.json`)

---

## Success Criteria

### Feature Branch Ready to Merge

- [ ] All acceptance criteria met
- [ ] Tests written and passing
- [ ] Code reviewed
- [ ] Documentation updated
- [ ] No merge conflicts
- [ ] Builds successfully
- [ ] No breaking changes (or documented)

### Develop Ready to Merge to Master

- [ ] All features integrated
- [ ] Full test suite passing
- [ ] E2E tests passing
- [ ] Performance acceptable
- [ ] Documentation complete
- [ ] Release notes prepared
- [ ] Stakeholder approval

---

## Tools & Commands Reference

### Useful Git Commands

```bash
# View commit history
git log --oneline --graph --all

# Show changes in a commit
git show <commit-hash>

# Compare branches
git diff develop..feature/your-branch

# Stash changes temporarily
git stash
git stash pop

# Cherry-pick a commit
git cherry-pick <commit-hash>

# View remote branches
git branch -r

# Fetch without merging
git fetch origin

# Reset to remote state (CAREFUL!)
git reset --hard origin/develop
```

### Branch Status Commands

```bash
# See all branches and their status
git branch -vv

# See which branches are merged
git branch --merged develop

# See unmerged branches
git branch --no-merged develop
```

---

## Timeline Overview

```
Week 1:
├─ Agent 5: Foundation ✓ (COMPLETE)
├─ Agent 2: Start BaZi engine
└─ Agent 1: Start UI components

Week 2:
├─ Agent 2: Complete & merge BaZi
├─ Agent 3: Start compatibility (after Agent 2)
├─ Agent 4: Start data layer
└─ Agent 1: Continue UI

Week 3:
├─ Agent 3: Complete & merge compatibility
├─ Agent 4: Complete & merge data layer
├─ Agent 1: Complete & merge UI
└─ Agent 5: Begin final integration

Week 4:
├─ Agent 5: Integration & testing
├─ All agents: Bug fixes
└─ Release v1.0 to master
```

---

## Contact & Coordination

**Integration Lead:** Agent 5
**Responsibilities:**
- Approve all merges to develop
- Resolve merge conflicts
- Maintain types.ts and constants.ts
- Final integration and testing

**For Questions:**
- Types/Constants: Ask Agent 5
- BaZi Logic: Ask Agent 2
- Compatibility: Ask Agent 3
- API/Data: Ask Agent 4
- UI/Components: Ask Agent 1

---

## Document History

- **v1.0** - 2025-12-14 - Initial branch strategy
- Created by: Agent 5 - Integration & Architecture Lead
- Status: Active

---

**Remember:** Good communication prevents merge conflicts. When in doubt, ask before pushing!

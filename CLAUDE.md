# CLAUDE.md — Multia Marketplace Template

This file provides guidance for AI assistants working with this codebase.

**Last verified:** 2026-09-01 (Expo SDK 57). If the dependency versions in `package.json` are newer than this date suggests, prefer the actual manifest over anything written here.

## Project Overview

Multia is a marketplace app template built with Expo, NativeWind (TailwindCSS), and TypeScript. It is a **front-end template**: all data (products, chats, orders, profiles) is local mock/demo content. There is no backend integration — authentication, chat, checkout, and orders are UI flows for you to connect to your own services.

## Tech Stack

- **Framework**: React Native 0.86 + Expo SDK 57
- **Styling**: NativeWind v4 (TailwindCSS v3)
- **Navigation**: Expo Router (file-based) — drawer + tabs
- **Icons**: Lucide React Native (`lucide-react-native`)
- **Charts**: react-native-chart-kit, victory-native
- **Maps**: react-native-maps
- **Language**: TypeScript

Not included (despite what older docs may have said): Supabase, RevenueCat, i18n/locales, push-notification backend. Do not add these dependencies unless explicitly asked.

## Project Structure

```
/app
  /_layout.tsx              # Root layout with providers
  /(drawer)/                # Drawer navigator
    /(tabs)/                # Tab screens (index, search, chat, orders, bookmarks,
                            #   profile, dashboard, analytics, provider-orders)
  /screens/                 # Feature screens (product-detail, checkout, login, ...)
    /admin/                 # Business-mode screens
    /chat/                  # Chat detail
    /profile/               # Profile subscreens
  /contexts/                # ThemeContext, ThemeColors, DrawerContext, BusinesModeContext
  /hooks/                   # useCollapsibleHeader, useThemedNavigation

/components                 # 40+ core UI components (Button, Card, Header, ...)
  /forms/                   # Input, Select, Checkbox, DatePicker, Slider, Switch, ...
  /layout/                  # Section, Divider, Grid, List, ListItem, Spacer, Stack

/utils                      # useShadow (getShadow), color-theme, date, BackHandlerManager
/lib                        # utils.ts (cn helper)
/assets                     # Images, fonts
```

Note: contexts and hooks live under `/app/contexts` and `/app/hooks` — import as `@/app/contexts/...` and `@/app/hooks/...`.

## Commands

```bash
npm install            # Install dependencies (.npmrc sets legacy-peer-deps)
npx expo start -c      # Start dev server (clean cache)
npx tsc --noEmit       # Type check
npm run lint           # ESLint + Prettier check
npm run format         # ESLint --fix + Prettier --write
```

---

## Critical Rules

### 1. Always Use ThemedText (with exceptions)

Use `ThemedText` for normal text content:

```typescript
import ThemedText from '@/components/ThemedText';
<ThemedText className="text-lg font-bold">Title</ThemedText>
```

**Exception:** text on a fixed background (image overlays, fixed-color surfaces) may use raw `Text` with explicit colors (`text-white`, `text-black`).

### 2. Always Use Theme Colors

**NEVER** hardcode colors. Use theme-aware classes and `useThemeColors()`:

```typescript
// ✅
<View className="bg-background border-border">
<ThemedText className="text-lg">Title</ThemedText>
import useThemeColors from '@/app/contexts/ThemeColors';
const colors = useThemeColors();
<Icon color={colors.icon} />

// ❌
<View style={{ backgroundColor: '#ffffff' }}>
```

Available theme color classes (defined in `utils/color-theme.ts`):

```
background   - Main background
secondary    - Cards, elevated surfaces
text         - Primary text (via ThemedText)
subtext      - Muted/secondary text
border       - Borders and dividers
highlight    - Accent/brand color (#0EA5E9)
primary      - Black (light) / White (dark)
invert       - White (light) / Black (dark)
darker       - Darker backgrounds
state        - Pressed/hover state overlays
```

**Changing theme colors requires updating TWO files** to keep Tailwind and JS in sync:
1. `/utils/color-theme.ts` — CSS variables for Tailwind classes
2. `/app/contexts/ThemeColors.tsx` — JS values for `useThemeColors()`

### 3. Use Existing Components First

**ALWAYS** check `/components` before creating new ones. Try variants/props before writing custom UI. Common mappings:

| UI Need | Use Component |
|---------|---------------|
| Cards with images | `Card` (default export) |
| Buttons/CTAs | `Button` (named export: `{ Button }`) |
| Horizontal scroll | `CardScroller` (named export) |
| List items/settings | `ListLink` |
| Collapsible content | `Expandable` |
| Image sliders | `ImageCarousel` |
| Tags/filters | `Chip` (named export) |
| User photos | `Avatar` |
| Form inputs | `/components/forms`: `Input`, `Select`, `Switch`, `Selectable`, `Checkbox`, `Counter`, `DatePicker`, `TimePicker`, `Slider`, `FormTabs` |
| Section headers | `Section` (from `/components/layout/Section`) |
| Star ratings | `Review`, `ShowRating` |
| Bottom sheets | `ActionSheetThemed` |
| Multi-step flows | `MultiStep` |
| Skeletons/loading | `SkeletonLoader`, `PageLoader` |
| Business/customer toggle | `BusinessSwitch` |

When props are in doubt, read the component source — every component is a single well-typed file in `/components`.

### 4. Always Use CardScroller for Horizontal Scrolling

**NEVER** create custom horizontal ScrollViews:

```typescript
import { CardScroller } from '@/components/CardScroller';

<CardScroller space={12}>
  {items.map(item => <Card key={item.id} {...item} />)}
</CardScroller>
```

Do NOT add `allUrl` ("See all" link) unless explicitly requested.

### 5. Always Add Header to Screens

```typescript
import Header from '@/components/Header';

<Header title="Screen Title" rightComponents={[<Icon key="icon" name="Bell" />]} />
```

- **Tab screens** (`/(drawer)/(tabs)/`): no back button
- **Nested screens** (`/screens/`): always `showBackButton`
- Always add a contextual right icon (Search/Bell/Cart/Share/Settings as appropriate)
- Use the `default` variant unless a transparent/blurred header is explicitly requested

### 6. Always Use ActionSheetThemed

Never use raw `ActionSheet` from `react-native-actions-sheet` — `ActionSheetThemed` wraps it with theme-aware background and consistent styling:

```typescript
import ActionSheetThemed from '@/components/ActionSheetThemed';
import { ActionSheetRef } from 'react-native-actions-sheet';

const sheetRef = useRef<ActionSheetRef>(null);
<ActionSheetThemed ref={sheetRef} gestureEnabled>
  <View className="px-6 pt-4 pb-4">{/* content */}</View>
</ActionSheetThemed>
```

### 7. LinearGradient Requires Inline Styles

`expo-linear-gradient` does NOT support className. Use inline styles on the gradient itself; children can use Tailwind classes normally.

### 8. Use NativeWind Classes Over Inline Styles

Only use the `style` prop for animated/dynamic values. All static layout goes in `className`.

### 9. Shadows

Use the shadow utility — a plain function, not a hook:

```typescript
import { shadowPresets } from '@/utils/useShadow';   // presets: small, medium, large, card
<View style={shadowPresets.card} className="bg-secondary rounded-xl">

import getShadow from '@/utils/useShadow';           // custom shadows
<View style={getShadow({ elevation: 10 })}>
```

(`useShadow` is a deprecated alias of `getShadow` kept for backwards compatibility.)

### 10. Create Inline Components for Repetitive UI

When a screen repeats the same JSX block (cards, rows, badges), define a small inline component at the top of the screen file instead of duplicating JSX.

### 11. Creating New Components

Follow existing conventions: TypeScript props interface, `useThemeColors()` for JS colors, `ThemedText` for text, `className`/`style` passthrough props, PascalCase filenames.

---

## Spacing Standards

```typescript
<View className="px-global">   // Screen horizontal padding (16px)
```

`ThemedScroller` (from `@/components/ThemeScroller`) already includes `px-global` — do NOT add it again to its children. Standard scale: `gap-2/3/4`, `p-4`, `py-3`, `mb-4`. When stacking multiple `Section`s, use `mt-10` minimum between them.

---

## State Management

```typescript
// Theme (light/dark)
import { useTheme } from '@/app/contexts/ThemeContext';
const { theme, toggleTheme } = useTheme();

// Theme colors as JS values
import useThemeColors from '@/app/contexts/ThemeColors';
const colors = useThemeColors();

// Business/customer mode switch
import { useBusinessMode } from '@/app/contexts/BusinesModeContext';

// Drawer state
import { useDrawer } from '@/app/contexts/DrawerContext';
```

(Verify hook names against the context source files before use — there is no AuthContext or payment context in this template.)

---

## Navigation

```typescript
import { Link } from 'expo-router';
import { router } from 'expo-router';

router.push('/screens/product-detail');
router.push({ pathname: '/screens/product-detail', params: { id } });
```

Many components (`Button`, `Card`, `ListLink`) accept an `href` prop directly.

---

## Screen Layout Pattern

```typescript
import Header from '@/components/Header';
import ThemedScroller from '@/components/ThemeScroller';
import Section from '@/components/layout/Section';

export default function MyScreen() {
  return (
    <>
      <Header showBackButton title="Screen Title" rightComponents={[<Icon key="share" name="Share" />]} />
      <ThemedScroller className="flex-1 bg-background">
        <Section title="Section" className="mt-4 mb-4">
          {/* content — no px-global needed, ThemedScroller handles it */}
        </Section>
      </ThemedScroller>
    </>
  );
}
```

---

## Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `Button.tsx`, `CardScroller.tsx` |
| Screens | kebab-case | `product-detail.tsx`, `user-profile.tsx` |
| Hooks | camelCase with `use` | `useCollapsibleHeader` |
| Contexts | PascalCase + Context | `ThemeContext.tsx` |

---

## Mock Data & Placeholder Content

- All feature data is hardcoded/mock — replace with your own data layer before release.
- Some screens use remote placeholder images (e.g. stock/mock image URLs). Replace these with your own assets before shipping.
- Login/signup screens are UI-only; wire them to your own auth provider.

---

## Testing Checklist

Before submitting changes:

1. [ ] TypeScript compiles (`npx tsc --noEmit`)
2. [ ] Lint passes (`npm run lint`)
3. [ ] Works in light and dark mode
4. [ ] No hardcoded colors
5. [ ] Uses ThemedText and existing components
6. [ ] Follows naming conventions

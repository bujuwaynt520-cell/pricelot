# PROJECT_MASTER

## Project Vision

PriceLot is an independent trading portal designed to combine market intelligence, trading education, utilities, and actionable market data in a single Next.js app. The project is built to support forex and precious metals traders with: 

- real-time market dashboards,
- risk and position sizing calculators,
- economic event analysis,
- structured gold trading content,
- SEO-ready pages for discoverability and shareability.

## Current Verified Phases

1. Core portal infrastructure
   - Next.js App Router with app-level metadata and root layout.
   - Global navigation and shared client layout.
   - Static site generation support for dynamic gold and economic calendar content.

2. Trading utilities and calculators
   - `/tools` calculator hub with a position sizing / risk sizing calculator.
   - Additional tool modules in `src/components/tools` for lot sizing, pip value, position sizing, and risk/reward calculations.

3. Market data dashboards
   - Economic calendar visualization and REST API support.
   - Currency strength meter dashboard.
   - Forex heat map dashboard.
   - Market sessions tracker.
   - News hub and curated market commentary.

4. Gold Hub implementation
   - Dedicated gold content hub with nested strategy, article, and academy routes.
   - Gold Hub service data driving structured content.

## Folder Structure

- `app/`
  - Next.js App Router pages, layouts, and client components.
  - `app/components/` shared UI pieces like navigation, footer, SEO configurator, economic calendar widget.
  - `app/tools/` primary tools page and embedded calculator UI.
  - `app/lib/` content data and service modules.
  - `app/gold/` gold hub content, including nested academy, articles, and strategies.
  - `app/api/economic-calendar/route.ts` economic calendar API route.
  - `app/sitemap.ts` sitemap generation logic.

- `src/`
  - Legacy React app UI components, including a separate trading tools hub and calculator components.
  - `src/components/tools/` helper calculators.

- Root files
  - `package.json` build and dev commands
  - `next.config.js`, `tsconfig.json`, `vite.config.ts`, `postcss.config.js`
  - `server.ts` custom server bundling logic.

## Route Structure

Verified application routes from `.next/types/routes.d.ts` and the `app/` folder:

- `/`
- `/academy`
- `/academy/[id]`
- `/articles`
- `/articles/[slug]`
- `/authors/[id]`
- `/brokers`
- `/brokers/[id]`
- `/categories/[id]`
- `/currency-strength`
- `/economic-calendar`
- `/economic-calendar/[slug]`
- `/forex-heatmap`
- `/glossary`
- `/glossary/[id]`
- `/gold`
- `/gold/academy/[slug]`
- `/gold/articles/[slug]`
- `/gold/strategies/[slug]`
- `/market-sessions`
- `/news`
- `/news/[slug]`
- `/strategies`
- `/strategies/[id]`
- `/tags/[tag]`
- `/tools`

API route:

- `/api/economic-calendar`

## Build Commands

- `npm run build`
  - Runs `next build`
  - Bundles `server.ts` with `esbuild` to `dist/server.cjs`

- `npm run clean`
  - Removes `dist` and `.next`

## Development Commands

- `npm run dev`
  - Starts the app with `tsx server.ts`

- `npm run lint`
  - Runs `tsc --noEmit`

## SEO Architecture

- Root metadata defined in `app/layout.tsx`.
- Client-side dynamic SEO logic implemented in `app/components/SEOConfigurator.tsx`.
- SEOConfigurator derives title, description, keywords, canonical URL, and JSON-LD from the current route.
- Route-specific metadata rules exist for:
  - brokers
  - strategies
  - academy
  - glossary
  - tools
  - articles
  - economic calendar
- JSON-LD schema types include `WebSite`, `Review`, `HowTo`, `Course`, `DefinedTerm`, `Article`, `Event`, `CollectionPage`, and `WebApplication`.
- Canonical URLs, open-graph metadata, and keyword sets are generated per view.

## Trading Tools Implemented

- Primary `/tools` page and calculator hub.
- `app/tools/CalculatorTool.tsx` — Risk & Position Sizing Calculator.
- `src/components/tools/LotSizeCalculator.tsx` — lot-sizing tool.
- `src/components/tools/PipCalculator.tsx` — pip valuation calculator.
- `src/components/tools/PositionSizeCalculator.tsx` — position size calculator.
- `src/components/tools/RiskRewardCalculator.tsx` — risk/reward calculator.
- `src/components/TradingToolsHub.tsx` — dashboard navigation for tool tabs.

## Market Data Features Implemented

- Economic Calendar
  - Client-side calendar UI in `app/components/EconomicCalendarComponent.tsx`.
  - Filter by date, currency, impact, and search.
  - CSV export and event subscription CTA.
  - Event detail pages at `/economic-calendar/[slug]`.
  - API-backed event feed via `/api/economic-calendar`.

- Currency Strength
  - `/currency-strength` page and client component.
  - Strength ranking, top gainers, top losers, and visualization from `app/lib/services/currencyStrength.ts`.

- Forex Heat Map
  - `/forex-heatmap` page with matrix view.
  - Client-side heat map logic in `app/forex-heatmap/HeatMapClient.tsx`.
  - Service data from `app/lib/services/forexHeatmap.ts`.

- Market Sessions
  - `/market-sessions` page with session tracker.
  - Client component `app/market-sessions/SessionTrackerClient.tsx`.

- News Hub
  - `/news` page and listing client.
  - Article detail pages at `/news/[slug]`.

## Gold Hub Implementation

- Dedicated gold content hub at `/gold`.
- Nested gold content routes:
  - `/gold/academy/[slug]`
  - `/gold/articles/[slug]`
  - `/gold/strategies/[slug]`
- Gold Hub data and sample content provided by `app/lib/services/goldHub.ts`.
- Uses SEO-friendly metadata and breadcrumbs for gold-specific learning and trading strategy content.

## Current Roadmap

- Stabilize and centralize SEO metadata further into route-level metadata exports.
- Migrate or consolidate legacy `src/` tool components into the main `app/` route structure if needed.
- Add live data integration for:
  - economic event feeds
  - currency strength sources
  - forex heat map price updates
  - news feed and market alerts
- Expand Gold Hub content with additional strategy and academy lessons.
- Introduce deeper analytics for `tools` usage and calendar filters.
- Add formal route-level error handling and fallback pages for missing dynamic resources.

---

> This document was generated from the current repository structure, route definitions, package scripts, and verified app metadata.

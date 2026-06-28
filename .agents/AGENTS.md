# PriceLot Project Constitution & Agent Instructions

This document serves as the permanent constitution, engineering standard, and workspace instruction set for the PriceLot repository. Every AI agent and developer participating in this workspace must adhere to the rules, design frameworks, and architectural patterns defined herein.

---

## 1. Company Vision & Core Mission

### Core Mission
PriceLot exists to become the world's most comprehensive financial education, market intelligence, and trading knowledge platform. 
Our objective is not simply to teach Forex, but to build the single destination where anyone—from complete beginners to professional traders and investors—can learn, analyze markets, use powerful tools, and make informed financial decisions. PriceLot must eventually become the first website people think of whenever they want to learn anything related to:
* Forex & Gold
* Stocks, Indices, & Commodities
* Cryptocurrency
* Futures, Options, ETFs, & Bonds
* Macroeconomics, Investing, & Personal Finance

### Unique Value Proposition (UVP)
PriceLot is **not** an Investopedia clone; it is built to compete directly with it while delivering significantly more value. Compared to Investopedia, PriceLot provides:
* Deeper, institutional-level trading academies alongside highly beginner-friendly, progressive explanations.
* Interactive calculators, live market dashboards, real-time economic calendars, and trading journals.
* AI-powered learning assistants, personalized learning paths, interactive simulations, and strategy libraries.
* Superior SEO architecture, faster loading speeds, a modern premium SaaS design system, and continuous content expansion.
* Community features, broker reviews/comparisons, and downloadable resources.

The goal is simple: If someone has to choose between PriceLot and Investopedia, PriceLot should always provide more value.

---

## 2. Business & Traffic Goals

### Short-Term Goals (Next 3–6 Months)
* **Version 1 Completion**: Build out thousands of educational pages, a massive glossary, and complete academies for Forex, Gold, Crypto, Indices, Commodities, Stocks, Investing, and Personal Finance.
* **Core Utilities**: Ensure functional risk calculators, economic calendars, and live market dashboards are fully operational.
* **Technical Quality**: Deliver optimized SEO, a mobile-first responsive layout, lightning-fast rendering speed, and a production-ready deployable application.

### Medium-Term Goals (1–2 Years)
* **Search Authority**: Rank for thousands of high-traffic financial keywords, build backlinks, and become an authority website in Google Search.
* **Scale**: Grow to millions of monthly organic visitors.
* **Platform Expansion**: Support multiple languages, premium memberships, user accounts (with learning progress tracking), advanced courses, custom trading journals, and mobile applications.

### Traffic Strategy
* Traffic is primarily organic and SEO-driven. Every page must be mathematically and structurally optimized to rank. High content and tool quality drive backlinks and authority.

---

## 3. Target Audience & Knowledge Levels

### Audience Segments
PriceLot serves all financial knowledge levels, including:
* Complete beginners, self-taught retail traders, and long-term investors.
* Intermediate and advanced day-traders, scalpers, swing traders, and prop-firm challenge participants.
* Academic students and financial enthusiasts.

### Pedagogical Approach ("Structure, not luck")
* **No Assumptions**: Never assume users understand financial terminology.
* **Layered Explanations**: Start with highly accessible, beginner-friendly explanations before progressively introducing intermediate, advanced, and professional-level concepts.
* **Practical Application**: Ground all theoretical education with practical examples, real-world data, and interactive learning tools.

---

## 4. Monetization Strategy

### Phase 1 (Version 1 - 100% Free)
* Focus entirely on maximizing organic search traffic.
* **Revenue channels**:
  * Programmatic display ads (initially Google AdSense; transitioning to premium networks like Mediavine or Raptive as traffic scales).
  * High-value affiliate partnerships with regulated brokers, proprietary trading firms, and charting/financial software platforms.
  * Affiliate recommendations for educational books, VPS providers, and trading tools.

### Phase 2 (Premium Features)
* Add-on monetization options (without locking V1 educational content behind a paywall):
  * Premium memberships & certification programs.
  * Advanced academies & premium market research reports.
  * AI-powered premium tutors, custom portfolio tracking, and premium trading journals.

### UX vs. Monetization Balance
* User experience is the priority. The platform must never look like an "ad site."
* Ads must be integrated professionally and naturally.
* Affiliate disclosures must be completely transparent, compliant, and trustworthy. Recommendations must always prioritize user benefit over commissions. Long-term trust is far more valuable than short-term affiliate income.

---

## 5. Technical Architecture

### Frontend Stack
* **Framework**: Next.js App Router (Standard Foundation).
* **Consolidation**: Fully commit to the Next.js App Router. The legacy Vite/React Single Page Application (`src/`) directory is deprecated and must be removed to avoid duplication and maintenance drift.

### Data & Content Layer
* **Phase 1 (Static-First)**: Hardcoded TypeScript seed files (e.g., `app/data.ts`) are acceptable to accelerate initial V1 velocity.
* **Transition Ready**: Decouple business logic and component rendering from the data access layer. Design data interfaces and service modules so that replacing static data with PostgreSQL + Prisma ORM requires minimal code modification in Phase 2.
* **Scale-Minded Data Routing**: As data sets expand, avoid `O(n)` linear scans on requests. Implement indexing maps or simple key-value structures where appropriate to avoid client and server-side latency.

### Live Market Data Abstraction
* **Provider-Agnostic**: Abstract all data ingestion services (Forex, Gold, stocks, calendars, heat maps). Data provider APIs must be wrapped in generic service interfaces so that changing vendors, caching layers, or moving to real-time WebSockets does not require rebuilding front-end components.
* **Cost Efficiency**: Maximize free APIs and public sources for V1.

### Server & Deployment
* **Hosting Portability**: Keep the code deployable on Vercel, VPS environments (via Docker, PM2, or custom Node wrappers), or traditional cloud providers without vendor lock-in.
* **Express Wrapper**: Keep the custom Express server wrapper (`server.ts`) only if it provides active benefits for custom routing, WebSockets, or caching. To maintain V1's low-cost objectives, the app must remain natively deployable on standard free serverless platforms (like Vercel) without depending on the Express wrapper.

---

## 6. Design System & Visual Language

### Theme & Branding
* **Modern SaaS Aesthetic**: Design for a premium, world-class UI resembling modern SaaS products (e.g., Apple, Stripe, Linear, Vercel) rather than standard legacy financial portals.
* **Mode Support**: Support both Light Mode and Dark Mode with persistent client state memory.
* **Asset Class Color Accents**: Apply subtle visual accents for asset sub-hubs (which must never overpower the overall layout):
  * Forex → Emerald Green
  * Gold → Gold
  * Crypto → Purple
  * Stocks → Blue
  * Commodities → Orange
  * Indices → Cyan

### Interactivity & Layout
* **Micro-interactions**: Incorporate smooth hover states, soft transitions, skeleton loaders, card elevation depth, animated charts, and numbers.
* **Editorial Reading Layout**: Individual content and academy articles must have spacious, highly readable layouts focusing on typography, clear margins, and strong visual hierarchy.
* **Terminal Dashboards**: Data dashboards (calendars, heatmaps) should represent professional financial terminals, combining high information density with beginner-friendly toggle controls.

---

## 7. SEO & Content Organization

### Routing Structure
* Maintain stable, nested hierarchical URLs (e.g., `/academy/forex/what-is-leverage`, `/glossary/pip`, `/calculators/position-sizing`). Avoid breaking changes; use 301 redirects if slugs must change.

### Internal Knowledge Graph
* Construct a highly interconnected internal linking network:
  * Articles and news must link to glossary definition cards.
  * Glossary terms must link to relevant academy courses.
  * Academy lessons must cross-link to relevant calculators.

### Structured Schemas (JSON-LD)
* Dynamic, comprehensive structured data is a core architecture requirement. Render the appropriate schema automatically:
  * `Article` and `NewsArticle` for dynamic editorial feeds.
  * `HowTo` or `Course` for structured academy guides.
  * `DefinedTerm` for glossary terms.
  * `Event` for economic calendar occurrences.
  * `Review`, `BreadcrumbList`, and `WebApplication` for tools.

### Topical Silos
* Group resources into authority hubs (Forex, Gold, Crypto, etc.). Each hub must combine guides, relevant tools, calculators, glossaries, strategies, and FAQs to establish search engine E-E-A-T.

### Indexing Strategy
* Maximize search engine discoverability. Provide XML sitemaps, clean pagination (with canonical elements), RSS feeds where appropriate, proper robots directives, and prevent duplicate content.

---

## 8. AI Strategy & Grounding

### Purpose
* AI serves to enhance learning, personalize education, and assist navigation—not to replace high-quality, authoritative static content.

### Grounding & Safety
* Finance demands absolute accuracy. AI responses must be strictly grounded in PriceLot's internal data.
* **Order of Grounding**: (1) Academy, (2) Glossary, (3) Articles, (4) Verified Data.
* The AI must never hallucinate financial facts or advice and must distinguish clearly between educational facts, predictions, market analysis, and opinions.

### UX Touchpoints
* AI should appear throughout the website naturally (e.g., "Explain with AI" on glossary cards, "Summarize this lesson", or a persistent assistant helper).

---

## 9. Development Rules & Coding Standards

### Code Architecture
* **React Server Components (RSC)**: RSC is the default. Only use Client Components (`"use client"`) when handling interactive state, browser APIs, animations, or dynamic client charts.
* **Separation of Concerns**: UI components handle presentation only. Business logic belongs in service modules, custom hooks, or utility files.
* **Error & Loading States**: Match routes with `loading.tsx` (skeleton screens), `error.tsx` (helpful error boundaries), and `not-found.tsx` to prevent blank viewports.

### TypeScript Rules
* **Strict Type Safety**: Absolutely no `any`. Declare explicit return types for functions in core services, utilities, and API routes. Use interfaces for all APIs and data transfers.
* **Validation**: Implement runtime checks (e.g., Zod) for env configs, user inputs, and external API responses.

### Styling & Logging
* **Tailwind v4 Utility-first**: Avoid duplicating long utility sequences. Build structured layouts and configure global CSS tokens/variables inside `globals.css` where necessary.
* **Centralized Logger**: All console logging must go through a custom logging service to facilitate future production monitoring hooks. Avoid scattered `console.log` statements.

### Testing Priority
* Establish automated unit tests for:
  1. Calculator math and financial formulas.
  2. Core business/analytical services.
  3. Dynamic SEO and metadata generators.

---

## 10. Git, Deployment, & Compliance

### Version Control
* Direct work on `main` is permitted for solo/AI velocity.
* Architecture must support structured branching when scaling contributors: `feature/`, `bugfix/`, `hotfix/`, `refactor/`, `release/`.
* Commit messages must follow Conventional Commits (e.g., `feat(tools): add lot size calculator`).

### Quality Gate
* All pull requests and commits must compile, pass TypeScript types check (`tsc --noEmit`), pass linting checks, and compile the production build successfully before deploy.

### Compliance & Disclaimers
* Display appropriate financial warning disclaimers site-wide (e.g., "Trading involves risk," "Not investment advice").
* Structure privacy layers to accommodate GDPR/CCPA compliance (cookie consent and user preference tracking) as the user base expands.

---

## 11. Permanent Engineering Principles

These rules apply to every development session without exception:

1. **Never expose secrets**: API keys, tokens, credentials, environment variables, and sensitive configuration must never be committed into Git or exposed to the client. Keep them strictly in `.env.local` or environment configurations.
2. **Architecture before implementation**: When a task could significantly affect architecture, database design, routing, SEO, AI systems, or scalability, explain the proposed approach and wait for approval before implementing.
3. **Eliminate legacy code**: The legacy Vite SPA in `src/` is deprecated. Do not add new features or edit it. The permanent frontend architecture is Next.js App Router (`app/`).
4. **AI safety**: Whenever the AI assistant cannot confidently answer using PriceLot's verified knowledge base, it must clearly state that instead of inventing/hallucinating an answer.
5. **Calculator integrity**: Financial calculators are critical systems. Any calculator modification must preserve mathematical correctness and should be validated using unit tests before completion.
6. **SEO-first development**: Every new page, component, feature, or route should improve the website's SEO rather than simply adding functionality.
7. **Performance budget**: Never introduce unnecessary JavaScript, dependencies, or rendering complexity. Always consider performance impact before introducing new libraries.
8. **Accessibility**: Every user-facing feature should meet modern accessibility standards (WCAG) wherever practical.
9. **Documentation**: Major architectural systems must always be documented for future developers.
10. **Code reuse**: Never duplicate logic. Always search the existing codebase before creating new utilities, services, hooks, or components.
11. **Security**: Follow secure development practices. Validate external inputs. Avoid unnecessary attack surfaces. Never trust client-provided data.
12. **Scalability**: Assume PriceLot will eventually contain millions of pages, millions of users, and millions of monthly visitors. Design systems and data structures accordingly.
13. **Quality over speed**: Fast development is important, but maintainability and correctness always take priority over shortcuts. Never write temporary code that becomes permanent.
14. **Long-term vision**: Every implementation decision should move PriceLot closer to becoming the world's leading financial education platform.
15. **Never build a feature in isolation**: Every feature must integrate naturally into the overall PriceLot ecosystem, maintain a consistent design system, and reuse existing components.

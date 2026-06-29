# PriceLot Architecture

## Overview

PriceLot is built as a modular educational platform.

The system is designed so that every feature can grow independently while sharing common infrastructure.

The application is built using:

* Next.js
* TypeScript
* React
* TailwindCSS

The architecture emphasizes:

* Reusability
* Scalability
* Maintainability
* Centralized business logic

---

# High-Level Structure

PriceLot consists of multiple major systems.

## Academy

Contains:

* Lessons
* Courses
* Learning Paths
* Quizzes
* Progress Tracking
* XP System
* Achievements
* Recommendations

---

## Content Engines

Examples include:

* Lesson Engine
* Course Engine
* Search Engine
* Path Engine
* Content Engine

Each engine owns its own:

* Types
* Utilities
* Data
* Rendering logic

---

## Registries

Registries provide centralized indexes.

Examples:

* Lesson Registry
* Recommendation Registry

Registries should be the single source of truth.

---

## Student System

Tracks:

* Completed lessons
* XP
* Achievements
* Learning streak
* Bookmarks
* Recent activity
* Learning progress

---

## Recommendation System

Generates related content based on:

* Tags
* Categories
* Learning history

---

## Search System

Provides global search across:

* Lessons
* Courses
* Glossary
* Brokers
* News
* Tools
* Future content

---

## Hub Pages

Dedicated knowledge hubs for:

* Forex
* Gold
* Crypto
* Commodities
* Indices

Each hub should eventually function as a complete learning center.

---

## Services

Business logic belongs inside services.

Examples:

* Market Data
* News
* SEO
* Taxonomy
* Internal Links
* Monetization

Components should never duplicate business logic.

---

# Components

Components should remain presentational whenever possible.

Business logic should stay inside:

* engines
* services
* hooks
* utilities

---

# Folder Philosophy

Every major subsystem should have a clear responsibility.

Example:

app/
lib/
components/
hooks/
public/
docs/
assets/
design/
prompts/

No folder should become a dumping ground.

---

# Reuse First

Before creating:

* new component
* new hook
* new utility
* new engine

Always check whether something similar already exists.

Avoid duplication.

---

# Future Expansion

The architecture should support future additions such as:

* AI Tutor
* Mobile App
* Premium Membership
* Community
* Trading Simulator
* Journaling
* Portfolio Tracking
* Broker Reviews
* Economic Intelligence
* AI Video Lessons

These should plug into the existing architecture rather than replacing it.

---

# Guiding Principle

Every new feature should improve the platform without increasing unnecessary complexity.

Simple systems that scale are preferred over clever systems that are difficult to maintain.

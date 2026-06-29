# PriceLot Coding Standards

## Purpose

This document defines the coding standards that every contributor and AI coding assistant must follow when working on PriceLot.

The goal is consistency, maintainability, and scalability.

---

# General Principles

* Prefer readability over clever code.
* Every feature should be reusable whenever practical.
* Avoid duplicated logic.
* Build for long-term maintenance.

---

# Language

Always use:

* TypeScript
* React
* Next.js App Router

Avoid JavaScript unless absolutely necessary.

---

# Components

Components should be:

* Small
* Focused
* Reusable

Large components should be broken into smaller pieces.

Presentation components should avoid business logic whenever possible.

---

# Business Logic

Business logic belongs inside:

* lib/
* services/
* engines/
* hooks/

Never duplicate business logic inside React components.

---

# File Naming

Use consistent names.

Examples:

LessonTemplate.tsx

LessonQuiz.tsx

LessonProgress.tsx

BookmarkButton.tsx

achievementEngine.ts

recommendationEngine.ts

---

# Imports

Prefer path aliases.

Example:

import LessonTemplate from "@/app/components/LessonTemplate";

instead of long relative imports whenever practical.

---

# Types

Every complex object should have a TypeScript interface or type.

Avoid using "any".

---

# Styling

Use TailwindCSS.

Avoid inline styles except when values must be dynamic.

Prefer utility classes over custom CSS.

---

# Comments

Write comments only when they explain intent.

Avoid comments that merely describe obvious code.

Good:

// Prevent duplicate lesson completion

Bad:

// Increment x by one

---

# Error Handling

Handle errors gracefully.

Do not allow the application to crash because optional data is missing.

Use sensible defaults.

---

# Reuse Before Creating

Before creating:

* component
* hook
* utility
* engine
* service

Always search the project to determine whether something similar already exists.

---

# Documentation

Major systems should always have documentation.

New engines should be accompanied by:

* Types
* Utilities
* Documentation when appropriate

---

# Performance

Prefer:

* lazy loading
* memoization where useful
* server components when appropriate
* optimized images
* code splitting

Avoid unnecessary re-renders.

---

# Accessibility

Interactive elements should:

* have accessible labels
* support keyboard navigation
* use semantic HTML

---

# Testing Mindset

Every feature should be written as though it will eventually be tested.

Avoid tightly coupled code.

---

# Final Rule

Whenever multiple valid solutions exist, choose the solution that makes the project easier to understand six months from now.

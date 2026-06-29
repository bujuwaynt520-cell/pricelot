# Cursor Rules for PriceLot

## Purpose

This document defines how Cursor should behave while working on the PriceLot codebase.

These rules take priority over convenience.

The objective is to preserve quality, maintainability, and consistency across the project.

---

# Rule 1

Never remove existing functionality unless explicitly instructed.

Always preserve working features.

---

# Rule 2

Before creating:

* component
* hook
* utility
* service
* engine
* registry

Search the existing codebase first.

Reuse before creating.

---

# Rule 3

Do not duplicate business logic.

Business logic belongs inside:

* lib/
* services/
* engines/
* hooks/

---

# Rule 4

Always preserve the project architecture described in Architecture.md.

New features should integrate into the existing system rather than bypass it.

---

# Rule 5

Prefer extending existing systems over replacing them.

Avoid unnecessary rewrites.

---

# Rule 6

Every new feature should be production-ready.

Do not generate placeholder implementations unless explicitly requested.

---

# Rule 7

Every lesson should integrate with:

* Progress System
* XP System
* Achievement System
* Recommendation System
* Bookmark System
* Recent Activity System

unless the user explicitly says otherwise.

---

# Rule 8

Whenever new educational content is created:

* register it
* make it searchable
* connect recommendations
* connect navigation

Content should never exist in isolation.

---

# Rule 9

Never introduce breaking changes without explaining them first.

If a safer migration exists, choose it.

---

# Rule 10

Prefer TypeScript types over "any".

Maintain strong typing throughout the project.

---

# Rule 11

Optimize for performance.

Prefer:

* lazy loading
* dynamic imports
* reusable components
* code splitting

Avoid unnecessary rendering.

---

# Rule 12

Maintain consistent UI.

Follow BrandGuide.md.

Do not introduce conflicting design styles.

---

# Rule 13

Whenever multiple implementation choices exist:

Choose the solution that:

* scales better
* is easier to maintain
* reduces duplicated code

---

# Rule 14

Whenever adding new files:

Place them inside the correct subsystem.

Do not create random folders.

---

# Rule 15

Keep documentation updated whenever major architecture changes occur.

---

# Rule 16

When uncertain,

ask questions rather than making assumptions.

---

# Rule 17

Always think several steps ahead.

Avoid building temporary solutions that will require complete replacement later.

---

# Rule 18

Treat PriceLot as a long-term platform expected to contain:

* thousands of lessons
* thousands of images
* thousands of videos
* millions of users

Design accordingly.

---

# Final Rule

Every improvement should make PriceLot easier to expand, easier to maintain, and more valuable to learners.

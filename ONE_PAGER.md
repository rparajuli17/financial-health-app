# Project 1 — Personal Financial Health App (One-Pager)

**Author:** Ram Parajuli · **Date:** Nov 14, 2026 · **Status:** Phase 0 — pre-build
**Purpose of this document:** Lock what we're building and why, before any code. This becomes the repo README's foundation and the interview script for the project.

---

## 1. The problem

Most people (starting with me) can't answer three simple questions about their own money in under a minute:

1. What did I earn vs. spend **this week**?
2. Where is my spending quietly leaking?
3. Is my salary split the way I *intended* — investing, emergency fund, travel, fun — or just whatever was left over?

Banking apps show transactions, not health. Budgeting apps are either manual spreadsheets in disguise or require handing your bank credentials to a third party. I want a weekly, private, opinionated snapshot — built from scratch as a portfolio project that also happens to be genuinely useful.

## 2. Who it's for

- **v1:** a single user (me) dogfooding it on real finances every week.
- **Design constraint:** build it as if others will use it — real accounts, real auth, no hardcoded personal data — because that's what makes it a resume project and not a script.

## 3. What the app does (the weekly loop)

1. **Capture** — manual transaction entry first (income + expenses, categorized). Imports come later; v1 keeps scope honest.
2. **Weekly dashboard** — earned vs. spent for the week, category breakdown, and trend vs. previous weeks. This is the home screen and the product's core moment.
3. **Allocation engine** — salary in → target percentages out: investing, emergency fund, trips/travel, discretionary, essentials. The app tracks *actuals vs. targets* and shows drift, week over week.
4. **Recommendations engine** — rules first, cleverness later. v1 ships 5–6 hard rules that produce *specific, named* suggestions, e.g.:
   - a category running above its 8-week average,
   - subscription creep (new recurring charges, price increases, likely-unused subscriptions),
   - discretionary spending over its target %,
   - duplicate/overlapping services,
   - savings rate below target two weeks running.

## 4. Authentication — the differentiator

This is where the project stops being "another finance app." The identity design is deliberate, and it's the part I can speak to with professional depth:

1. **Signup:** the user creates an account with a **password** (properly hashed server-side) — the bootstrap credential.
2. **First login:** the user is prompted to **enroll a passkey**. The private key is generated and kept **on-device only, never in the cloud**; the server stores only the public key and credential ID. Day-to-day sign-in is the passkey from then on.
3. **Recovery / new-device rebinding:** guarded by **Entrust's ATO (Account Takeover) product — biometric identity verification** that must pass before a new passkey can be bound to the account. This is stronger than passkeys alone: a stolen password can't be used to enroll an attacker's passkey, because recovery requires proving you are the account owner, biometrically.

Built against Entrust's public trial/developer access — no employer systems, no internal code, no client data.

## 5. Architecture sketch (stack decided in Step 3)

- **Client:** mobile app (the weekly check-in is a phone moment).
- **API:** small backend service; the server is authoritative for all money math.
- **Data:** relational store server-side (users, credentials, transactions, categories, allocation targets); local on-device cache.
- **Leaning:** TypeScript end-to-end (React Native + Node API) or Flutter + a small Node/Python API; PostgreSQL server-side, SQLite on-device. The final pick — and the written reasoning — is Step 3, because "why this stack" is an interview question.
- **Non-negotiable:** the calculation engines (allocations, recommendations) are pure, unit-tested logic, separated from UI and storage.

## 6. Explicit non-goals (v1)

- No bank-account linking / Plaid-style sync (manual entry first — privacy and scope).
- No payments, transfers, or money movement of any kind.
- No multi-user / family sharing.
- No ML-driven advice — deterministic rules I can explain line by line.
- No use of any employer-internal systems or data.

## 7. Build sequence

12 steps, already planned: one-pager → Antigravity + GitHub setup → stack pick → hello-world end-to-end → password auth → passkey enrollment → ATO recovery → data model + entry → weekly dashboard → allocation engine → recommendations engine → tests, README, demo, resume bullets.

## 8. What "done" looks like

- I use it weekly on my real finances (dogfooding is the acceptance test).
- A 2-minute demo: signup → passkey enrollment → enter a week of transactions → dashboard → allocation drift → one recommendation firing.
- A README with an architecture diagram that a hiring manager can understand in 60 seconds.
- Resume bullets that name real engineering: WebAuthn/passkey flows, biometric identity verification for account recovery, rules-engine design, tested financial calculations.

## 9. Open decisions

- [ ] App name (working title: *Financial Health App*)
- [ ] Final stack (Step 3)
- [x] Repo visibility: **public from day one** (decided Nov 14, 2026 — a portfolio project's history is part of the evidence; corollary rule: never commit real personal financial data, use sample data only)

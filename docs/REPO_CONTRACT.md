# Danielmercede.com Repo Contract

Date: 2026-06-30

Status: binding repo-local contract.

## Current Name

- `danielmercede.com`

## Recommended Name

- `danielmercede.com`

## Role

- `web`

## Purpose

`danielmercede.com` is the source for `www.danielmercede.com`, a static
long-form biographical and contextual personal-brand site for Dan Mercede.

It provides context, not promotion. It is not a portfolio, product site,
business system, platform surface, or marketing repo.

## Owns

- the single-page biography UI and print/PDF surface
- canonical biography copy in `bioContent.mjs`
- body-bake output logic for crawlable static HTML
- SEO scaffolding, structured data, sitemap, robots, favicons, and static assets
- image metadata and repo-local Vite/React build configuration

## Does Not Own

- the primary `danmercede.com` identity hub
- affiliated product, platform, or business surfaces referenced for context
- OIA booking-flow ownership beyond an external CTA link
- backend APIs, runtime services, or shared infra
- governance, runtime, or OAC business canon
- deploy-provider configuration outside this static-site repo

## Allowed Dependencies

- static React, Vite, TypeScript, Tailwind CDN, fonts, and site assets
- links to related personal-brand and affiliated business domains for context
- estate doctrine from `orion-estate-audit`
- the personal-brand family contract and canonical-home registry row

## Forbidden Logic / Forbidden Ownership

- turning biography content into product, platform, or commercial workflow canon
- adding backend/runtime ownership or secret-bearing integrations
- duplicating or overriding the primary identity hub
- treating linked affiliated systems as owned by this repo
- relying on inert template env defines as active API integrations

## PR Reject Rules

- reject PRs that make this repo a product, portfolio, runtime, or infra owner
- reject PRs that move OIA, Cosmocrat, ReplyBy, ATS, or OAC ownership here
- reject PRs that add secret-bearing client-side build defines
- reject PRs that break crawlable body-bake, SEO, sitemap, or canonical behavior

## Verification

For docs-only contract changes:

```bash
git diff --check
```

For implementation changes, follow `AGENTS.md`; this repo declares `npm run
build`, `npm run dev`, and `npm run preview` but has no test or lint scripts.

## Basis

- `AGENTS.md`
- `README.md`
- `bioContent.mjs`
- `components/Biography.tsx`
- `scripts/bakeBody.mjs`
- `index.html`
- `repos/repo_contract_registry_20260317.csv` in
  `OrionArchitekton/orion-estate-audit`
- `architecture/repo_contracts/dan_mercede_personal_brand_repo_contract_20260318.md`
  in `OrionArchitekton/orion-estate-audit`

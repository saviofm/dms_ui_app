# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start                    # Local dev with Fiori Launchpad preview (test/flp.html)
npm run start-noflp          # Local dev without FLP wrapper
npm run lint                 # ESLint validation
npm run unit-test            # QUnit unit tests (test/unit/unitTests.qunit.html)
npm run int-test             # OPA integration tests (test/integration/opaTests.qunit.html)
npm run build                # Production build → dist/
npm run build:cf             # Cloud Foundry preload build
npm run build:mta            # Package as MTA archive for BTP deployment
npm run deploy               # Deploy to SAP BTP via Fiori tools
```

## Architecture

This is a **SAP Fiori UI5 v1.148.0** application that acts as a shell wrapping the SAP ECM (Enterprise Content Management) reusable admin component (`com.sap.ecm.reuse.admin`). The app itself is intentionally thin — most functionality lives in the ECM component it hosts.

**MVC structure:**
- Views are XML-based (`webapp/view/`)
- `App.view.xml` → root shell container
- `dms_ui.view.xml` → hosts the ECM admin component via `<core:ComponentContainer>` with lazy loading
- Controllers are minimal; `dms_ui.controller.js` only handles the component creation lifecycle event
- The only model is a device model (for responsive breakpoints) created in `Component.js`

**Component loading:**
`Component.js` configures UI5 loader paths to resolve the ECM reuse component, then the view lazy-loads it with `destinationPath: "/api"` as its backend entry point.

**Routing:** Single route (`Routedms_ui`) with pattern `:?query:` — no multi-page navigation.

## SAP BTP Deployment

The app deploys as a **Multi-Target Application (MTA)** to SAP BTP Cloud Foundry with three modules:

| Module | Role |
|--------|------|
| `dmsuiapp-approuter` | Entry point; NodeJS approuter handling auth & routing |
| `dmsuiapp` | Built UI5 app hosted in HTML5 Application Repository |
| `dmsuiapp-destination-content` | Configures BTP destinations |

**Route flow (xs-app.json):**
- `/api/*` → ECM service (OAuth2 token forwarding)
- `/resources/*`, `/test-resources/*` → UI5 CDN (unauthenticated)
- `/*` → HTML5 apps repo (XSUAA auth)

**Backend:** The ECM service proxied at `/api` connects to SAP Document Management (`sdibackend` destination → `https://api-sdm-di.cfapps.us10.hana.ondemand.com`).

**BTP services required:** `xsuaa`, `destination`, `html5-apps-repo`, `document-management-standard-service`.

## i18n

Translation files are in `webapp/i18n/`. Supported locales: default (no suffix), `en`, `pt`, `pt_BR`. The resource bundle ID is `dmsuiapp.i18n.i18n`.

## Linting

ESLint is configured via `eslint.config.mjs` using `@sap-ux/eslint-plugin-fiori-tools`. Run `npm run lint` before committing.

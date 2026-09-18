# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Automated test suite (`npm test`): Jasmine specs running in Node against a
  jsdom DOM, covering the choropleth, bubble, legend, arc, and plugin-system
  behaviour of `src/js/datamaps.js`.
- Coverage tracking with `nyc` and enforced thresholds (lines/statements/
  functions >= 40%, branches >= 25%).
- ESLint configuration (`npm run lint`) scoped to first-party code; vendored
  libraries under `src/js/components/` are excluded.
- GitHub Actions CI (`.github/workflows/ci.yml`) running lint, test, and build
  on every push and pull request, plus a Dependabot config for npm updates.
- `package-lock.json` for reproducible installs (`npm ci`).
- `CONTRIBUTING.md`, `.env.example`, and this changelog.

### Fixed

- `draw()` no longer assigns to an undeclared `hoverover` global.
- `val()` no longer assigns to the undeclared `optionsValues` variable.
- The IE-detection guard in `handleGeographyConfig` now actually tests
  `navigator.userAgent` instead of the regex object itself.
- The remote-data path calls `Datamap.prototype.updateChoropleth` instead of the
  undefined `Datamaps` reference, which previously threw in CommonJS/Node
  environments.
- The grunt `clean` task path typo (`.dist/` -> `dist/`).

### Changed

- Development tooling upgraded to versions that install and run on modern Node
  (grunt 1.x, ESLint 8, Jasmine 5, jsdom, nyc). Runtime dependencies (`d3`,
  `topojson`) are unchanged.
- The PhantomJS-based `grunt jasmine` task was replaced by the Node-based
  Jasmine runner; the legacy HTML runners under `src/tests/` remain for
  reference.

## [0.4.0] - 2015-09-17

See the [git history](https://github.com/PreCogSecurity/datamaps/commits/master)
for changes in this and earlier releases.
# Contributing to Datamaps

Thanks for taking the time to contribute! Datamaps is a small, dependency-light
client-side mapping library, and the bar for contributions is intentionally low.

## Getting started

1. Fork the repository and clone your fork.
2. Install dependencies:

   ```sh
   npm ci
   ```

   `npm ci` installs the exact versions recorded in `package-lock.json`. If you
   are changing dependencies, use `npm install` instead and commit the updated
   lockfile.

3. Run the checks before opening a PR:

   ```sh
   npm run lint   # ESLint over first-party source and tests
   npm test       # Jasmine specs with nyc coverage (threshold enforced)
   npm run build  # grunt build: inline TopoJSON, minify, copy to dist/
   ```

## Running the tests

The test suite runs in Node against a jsdom DOM, so no browser or PhantomJS is
required:

```sh
npm test
```

The suite lives in `test/spec/` and is bootstrapped by `test/helpers/setup.js`,
which loads `src/js/datamaps.js` together with the real `d3` / `topojson`
runtime dependencies and the TopoJSON data from `src/js/data/`. Coverage is
collected with `nyc`; the configured thresholds in `package.json` fail the run
if coverage drops below them.

The legacy Jasmine 1.2 HTML runners under `src/tests/` are kept for historical
reference only; they are not part of the automated suite.

## PR expectations

* Ship each feature or fix in its own small commit (or PR) **together with the
  tests that pin the new behaviour**. A change without a test will not be
  merged.
* Do not run the `grunt build` task or submit built files in your PR; the
  maintainers regenerate `dist/` on release.
* Have an example in `src/examples` if you are adding a new feature. Copy an
  existing feature `.html` file to start.
* Keep commits focused: do not mix formatting changes, refactors, and features
  in a single commit.
* Run `npm run lint` and `npm test` locally and make sure both pass.

## Code layout

* `src/js/datamaps.js` — the entire library: the `Datamap` constructor, the
  choropleth/bubble/arc/label/legend/graticule plugins, and the plugin system
  (`addPlugin`, `addLayer`).
* `src/js/data/` — TopoJSON map data inlined into the built files by the grunt
  `replace` task.
* `src/js/components/` — vendored third-party libraries (`d3`, `topojson`).
  Do not edit these; they are pinned copies used by the examples.
* `test/` — the automated Node-based Jasmine suite.
* `dist/` — generated build output (do not edit by hand).

## Vendored code

`src/js/components/` contains vendored copies of d3 and topojson that the
examples load directly. They are excluded from lint and coverage. If you need a
newer version of a vendored library, update the copy in a dedicated commit and
note it in the PR description.
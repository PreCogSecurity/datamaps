// Test environment bootstrap.
//
// datamaps.js is a browser IIFE that reads `window.d3` / `window.topojson` at
// load time and falls back to CommonJS `require` when available.  We install a
// jsdom window plus the real runtime dependencies before loading the source so
// the constructor and all rendering functions behave the way they do in a
// browser.
var jsdom = require('jsdom');

var dom = new jsdom.JSDOM(
  '<!DOCTYPE html><html><head></head><body>' +
  '<div id="container" style="width:660px;height:350px"></div>' +
  '</body></html>'
);

global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
global.Element = dom.window.Element;
global.SVGElement = dom.window.SVGElement;

var d3 = require('d3');
var topojson = require('topojson');

dom.window.d3 = d3;
dom.window.topojson = topojson;
global.d3 = d3;
global.topojson = topojson;

var Datamap = require('../../src/js/datamaps.js');

// The source ships with `__WORLD__` / `__USA__` placeholders that the grunt
// `replace` task inlines during `grunt build`; load the real TopoJSON for tests.
var worldTopo = require('../../src/js/data/world.topo.json');
var usaTopo   = require('../../src/js/data/usa.topo.json');

Datamap.prototype.worldTopo = worldTopo;
Datamap.prototype.usaTopo   = usaTopo;

global.Datamap   = Datamap;
global.worldTopo = worldTopo;
global.usaTopo   = usaTopo;

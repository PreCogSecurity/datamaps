describe('Datamap plugins', function() {
  var container;

  beforeEach(function() {
    container = document.createElement('div');
    container.style.width  = '660px';
    container.style.height = '350px';
    document.body.appendChild(container);
  });

  afterEach(function() {
    document.body.removeChild(container);
  });

  function makeMap() {
    return new Datamap({
      element: container,
      scope: 'world',
      width: 660,
      height: 350,
      geographyConfig: { popupOnHover: false, highlightOnHover: false }
    });
  }

  it('addPlugin registers a callable method on the prototype', function() {
    var map = makeMap();
    var called = false;
    map.addPlugin('custom', function() { called = true; });
    expect(typeof map.custom).toEqual('function');
    map.custom([1, 2, 3]);
    expect(called).toBe(true);
  });

  it('addLayer appends a <g> element with the requested class', function() {
    var map = makeMap();
    var layer = map.addLayer('my-layer');
    expect(map.svg.select('g.my-layer').size()).toEqual(1);
    expect(layer.attr('class')).toEqual('my-layer');
  });

  it('latLngToXY projects coordinates to an [x, y] pair', function() {
    var map = makeMap();
    var xy = map.latLngToXY(0, 0);
    expect(xy.length).toEqual(2);
    expect(typeof xy[0]).toEqual('number');
    expect(typeof xy[1]).toEqual('number');
  });

  it('legend renders entries for each fill key', function() {
    var map = new Datamap({
      element: container,
      scope: 'world',
      width: 660,
      height: 350,
      geographyConfig: { popupOnHover: false, highlightOnHover: false },
      fills: { HIGH: '#afafaf', LOW: '#123456', defaultFill: 'green' }
    });
    map.legend({ legendTitle: 'Legend' });
    var legend = d3.select(container).select('.datamaps-legend');
    expect(legend.size()).toEqual(1);
    expect(legend.selectAll('dd').size()).toEqual(2);
  });

  it('arc throws when data is not an array', function() {
    var map = makeMap();
    expect(function() { map.arc({}); }).toThrow();
  });

  it('draw returns the instance with a valid svg', function() {
    var map = makeMap();
    expect(map.svg).toBeDefined();
    expect(map.svg.size()).toEqual(1);
  });

  it('constructor exposes the default options on the instance', function() {
    var map = makeMap();
    expect(map.options.scope).toEqual('world');
    expect(map.options.fills.defaultFill).toEqual('#ABDDA4');
    expect(map.options.geographyConfig.hideAntarctica).toBe(true);
  });

  it('constructor merges user options over the defaults', function() {
    var map = new Datamap({
      element: container,
      scope: 'usa',
      width: 660,
      height: 350,
      fills: { defaultFill: 'red' }
    });
    expect(map.options.scope).toEqual('usa');
    expect(map.options.fills.defaultFill).toEqual('red');
  });
});

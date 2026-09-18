describe('Bubbles', function() {
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

  function makeMap(overrides) {
    var opts = {
      element: container,
      scope: 'world',
      width: 660,
      height: 350,
      geographyConfig: { popupOnHover: false, highlightOnHover: false },
      fills: {
        RUS: '#9467bd',
        USA: '#1f77b4',
        defaultFill: '#EDDC4E'
      }
    };
    if (overrides) {
      for (var key in overrides) {
        if (overrides.hasOwnProperty(key)) {
          opts[key] = overrides[key];
        }
      }
    }
    return new Datamap(opts);
  }

  it('renders one circle per bubble', function() {
    var map = makeMap();
    map.bubbles([
      { name: 'b1', radius: 10, latitude: 50.07,  longitude: 78.43,  fillKey: 'RUS' },
      { name: 'b2', radius: 20, latitude: 33.40,  longitude: -106.28, fillKey: 'USA' }
    ], { animate: false });
    expect(map.svg.selectAll('circle.datamaps-bubble').size()).toEqual(2);
  });

  it('applies the fillKey colour and explicit radius', function() {
    var map = makeMap();
    map.bubbles([
      { name: 'b1', radius: 10, latitude: 50.07, longitude: 78.43, fillKey: 'RUS' }
    ], { animate: false });
    var circle = map.svg.select('circle.datamaps-bubble');
    expect(circle.attr('r')).toEqual('10');
    expect(circle.style('fill')).toEqual('#9467bd');
  });

  it('falls back to defaultFill when no fillKey matches', function() {
    var map = makeMap();
    map.bubbles([
      { name: 'b1', radius: 10, latitude: 50.07, longitude: 78.43 }
    ], { animate: false });
    expect(map.svg.select('circle.datamaps-bubble').style('fill')).toEqual('#EDDC4E');
  });

  it('throws when the first argument is not an array', function() {
    var map = makeMap();
    expect(function() { map.bubbles({}); }).toThrow();
  });

  it('removes bubbles that are absent from a subsequent call', function(done) {
    var map = makeMap();
    map.bubbles([
      { name: 'b1', radius: 10, latitude: 50.07, longitude: 78.43, fillKey: 'RUS' },
      { name: 'b2', radius: 20, latitude: 33.40, longitude: -106.28, fillKey: 'USA' }
    ], { animate: false });

    // re-draw with only b1 — b2 should be removed after the exit transition
    map.bubbles([
      { name: 'b1', radius: 10, latitude: 50.07, longitude: 78.43, fillKey: 'RUS' }
    ], { animate: false });

    setTimeout(function() {
      expect(map.svg.selectAll('circle.datamaps-bubble').size()).toEqual(1);
      done();
    }, 700);
  });
});

describe('Choropleth', function() {
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
      geographyConfig: {
        popupOnHover: false,
        highlightOnHover: false
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

  it('renders one path per world feature (minus Antarctica by default)', function() {
    var map = makeMap();
    var expected = topojson.feature(worldTopo, worldTopo.objects.world).features
      .filter(function(f) { return f.id !== 'ATA'; })
      .length;
    expect(map.svg.selectAll('path.datamaps-subunit').size()).toEqual(expected);
  });

  it('applies the fillKey colour from the fills option', function() {
    var map = makeMap({
      fills: {
        HIGH: '#afafaf',
        LOW:  '#123456',
        defaultFill: 'green'
      },
      data: {
        USA: { fillKey: 'HIGH' },
        IRL: { fillKey: 'LOW' }
      }
    });
    expect(map.svg.select('path.USA').style('fill')).toEqual('#afafaf');
    expect(map.svg.select('path.IRL').style('fill')).toEqual('#123456');
  });

  it('applies defaultFill when the country has no fillKey', function() {
    var map = makeMap({
      fills: { defaultFill: 'green' },
      data:  { USA: { fillKey: 'HIGH' } }
    });
    expect(map.svg.select('path.CAN').style('fill')).toEqual('green');
  });

  it('hides Antarctica when hideAntarctica is true (default)', function() {
    var map = makeMap();
    expect(map.svg.select('path.ATA').size()).toEqual(0);
  });

  it('keeps Antarctica when hideAntarctica is false', function() {
    var map = makeMap({
      geographyConfig: {
        popupOnHover: false,
        highlightOnHover: false,
        hideAntarctica: false
      }
    });
    expect(map.svg.select('path.ATA').size()).toEqual(1);
  });

  it('updateChoropleth persists new data on the map instance', function() {
    var map = makeMap({
      fills: { HIGH: '#afafaf', LOW: '#123456', defaultFill: 'green' },
      data:  { USA: { fillKey: 'HIGH' } }
    });
    map.updateChoropleth({ USA: { fillKey: 'LOW' } });
    expect(map.options.data.USA.fillKey).toEqual('LOW');
  });

  it('updateChoropleth transitions the fill colour', function(done) {
    var map = makeMap({
      fills: { HIGH: '#afafaf', LOW: '#123456', defaultFill: 'green' },
      data:  { USA: { fillKey: 'HIGH' } }
    });
    map.updateChoropleth({ USA: { fillKey: 'LOW' } });
    setTimeout(function() {
      expect(map.svg.select('path.USA').style('fill')).toEqual('#123456');
      done();
    }, 600);
  });
});

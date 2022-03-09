'use strict';

var TRKPT_DIST_THRESHOLD = 10.0;

var map;
var path_source;
var waypoint_source;

function parseGpxData(xml) {
  var result = {
    segments: [],
    waypoints: []
  }
  $('trkseg', xml).each(function() {
    var this_seg = [];
    $('trkpt', this).each(function() {
      var trkpt = $(this);
      this_seg.push({
        lat: parseFloat(trkpt.attr('lat')),
        lon: parseFloat(trkpt.attr('lon'))
      });
    });
    result.segments.push(this_seg);
  });
  $('wpt', xml).each(function() {
    var wpt = $(this);
    result.waypoints.push({
      lat: wpt.attr('lat'),
      lon: wpt.attr('lon'),
      name: $('name', wpt).text(),
      desc: $('desc', wpt).text()
    });
  });
  return result;
}

function convertPathSegments(segments) {
  return segments.reduce(function(result, segment) {
    result.push(new ol.Feature(segment.reduce(function(line, point) {
      line.appendCoordinate(ol.proj.fromLonLat([ point.lon, point.lat ]));
      return line;
    }, new ol.geom.LineString([]))));
    return result;
  }, []);
}

var path_source = new ol.source.Vector({
  wrapX: false
});

var path_layer = new ol.layer.Vector({
  source: path_source,
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: '#5874bf',
      width: 4
    })
  })
});

map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM({
        url: 'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png'
      })
    }),
    path_layer
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([0.0, 0.0]),
    zoom: 2,
    zoomFactor: 1.1,
    minZoom: 0,
    maxZoom: 100
  }),
  controls: ol.control.defaults({
    attributionOptions: {
      collapsible: false
    }
  }),
});

window.showOnMap = async (xml) => {
  return new Promise((resolve) => {
    var data = parseGpxData($.parseXML(xml))
    path_source.clear()
    path_source.addFeatures(convertPathSegments(data.segments))
    map.getView().fit(path_source.getExtent(), {
      padding: [
        20, 20, 20, 20
      ]
    })

    map.once('rendercomplete', function() {
      const mapCanvas = document.createElement('canvas')
      const size = map.getSize()
      mapCanvas.width = size[0]
      mapCanvas.height = size[1]
      const mapContext = mapCanvas.getContext('2d')

      Array.prototype.forEach.call(
        document.querySelectorAll('.ol-layer canvas'),
        function (canvas) {
          if (canvas.width > 0) {
            var opacity = canvas.parentNode.style.opacity
            mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity)
            var transform = canvas.style.transform

            // Get the transform parameters from the style's transform matrix
            var matrix = transform
              .match(/^matrix\(([^\(]*)\)$/)[1]
              .split(',')
              .map(Number);
            // Apply the transform to the export map context

            CanvasRenderingContext2D.prototype.setTransform.apply(
              mapContext,
              matrix
            )
            mapContext.drawImage(canvas, 0, 0)

            resolve(mapCanvas.toDataURL())
          }
        }
      )
    })
  })
}

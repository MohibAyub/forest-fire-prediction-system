/**
 * Adds a  draggable marker to the map..
 *
 * @param {H.Map} map                      A HERE Map instance within the
 *                                         application
 * @param {H.mapevents.Behavior} behavior  Behavior implements
 *                                         default interactions for pan/zoom
 */
 function addDraggableMarker(map, behavior){

    var marker = new H.map.Marker({lat: 41.9, lng: -6.85}, {
      // mark the object as volatile for the smooth dragging
      volatility: true
    });
    // Ensure that the marker can receive drag events
    marker.draggable = true;
    map.addObject(marker);
  
    // disable the default draggability of the underlying map
    // and calculate the offset between mouse and target's position
    // when starting to drag a marker object:
    map.addEventListener('dragstart', function(ev) {
      var target = ev.target,
          pointer = ev.currentPointer;
      if (target instanceof H.map.Marker) {
        var targetPosition = map.geoToScreen(target.getGeometry());
        target['offset'] = new H.math.Point(pointer.viewportX - targetPosition.x, pointer.viewportY - targetPosition.y);
        behavior.disable();
      }
    }, false);
  
  
    // re-enable the default draggability of the underlying map
    // when dragging has completed
    map.addEventListener('dragend', function(ev) {
      var target = ev.target;
      if (target instanceof H.map.Marker) {
        behavior.enable();
      }
    }, false);
  
    // Listen to the drag event and move the position of the marker
    // as necessary
     map.addEventListener('drag', function(ev) {
      var target = ev.target,
          pointer = ev.currentPointer;
      if (target instanceof H.map.Marker) {
        target.setGeometry(map.screenToGeo(pointer.viewportX - target['offset'].x, pointer.viewportY - target['offset'].y));
      }
    }, false);
  }

  function addCircleToMap(map){
    map.addObject(new H.map.Circle(
      // The central point of the circle
      {lat: 41.887388, lng: -6.738568},
      // The radius of the circle in meters
      5500,
      {
        style: {
          strokeColor: 'rgba(255, 0, 0, 0.6)', // Color of the perimeter
          lineWidth: 2,
          fillColor: 'rgba(255, 0, 0, 0.5)'  // Color of the circle
        }
      }
    ));
  }

  function addCircleToMap1(map){
    map.addObject(new H.map.Circle(
      // The central point of the circle
      {lat: 41.888149, lng: -6.924434},
      // The radius of the circle in meters
      2500,
      {
        style: {
          strokeColor: 'rgba(255, 0, 0, 0.6)', // Color of the perimeter
          lineWidth: 2,
          fillColor: 'rgba(255, 140, 0, 0.5)'  // Color of the circle
        }
      }
    ));
  }

  /**
   * Boilerplate map initialization code starts below:
   */
  
  //Step 1: initialize communication with the platform
  // In your own code, replace variable window.apikey with your own apikey
  var platform = new H.service.Platform({
    apikey: 'VrDmv9xAspWPn-zW1InzjKF-NmIQ8AjWc_DNK2noemQ'
  });
  var defaultLayers = platform.createDefaultLayers();
  
  //Step 2: initialize a map - this map is centered over Boston
  var map = new H.Map(document.getElementById('map'),
    defaultLayers.vector.normal.map, {
    center: {lat: 41.9, lng: -6.85},
    zoom: 11,
    pixelRatio: window.devicePixelRatio || 1
  });
  // add a resize listener to make sure that the map occupies the whole container
  window.addEventListener('resize', () => map.getViewPort().resize());
  
  //Step 3: make the map interactive
  // MapEvents enables the event system
  // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
  var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
  
  // Step 4: Create the default UI:
  var ui = H.ui.UI.createDefault(map, defaultLayers, 'en-US');
  
  // Add the click event listener.
  addDraggableMarker(map, behavior);
  addCircleToMap(map);
  addCircleToMap1(map);
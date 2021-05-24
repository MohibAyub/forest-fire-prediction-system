 function addDraggableMarker(map, behavior){

    var marker = new H.map.Marker({lat: 41.9, lng: -6.85}, {
      volatility: true
    });
    
    marker.draggable = true;
    map.addObject(marker);
  
    map.addEventListener('dragstart', function(ev) {
      var target = ev.target,
          pointer = ev.currentPointer;
      if (target instanceof H.map.Marker) {
        var targetPosition = map.geoToScreen(target.getGeometry());
        target['offset'] = new H.math.Point(pointer.viewportX - targetPosition.x, pointer.viewportY - targetPosition.y);
        behavior.disable();
      }
    }, false);
  
  
    map.addEventListener('dragend', function(ev) {
      var target = ev.target;
      if (target instanceof H.map.Marker) {
        behavior.enable();
      }

      alert("Coordinates: " + marker.getPosition().lat + "," + " " + marker.getPosition().lng);

    }, false);
  
     map.addEventListener('drag', function(ev) {
      var target = ev.target,
          pointer = ev.currentPointer;
      if (target instanceof H.map.Marker) {
        target.setGeometry(map.screenToGeo(pointer.viewportX - target['offset'].x, pointer.viewportY - target['offset'].y));
      }
    }, false);
    
    const button = document.getElementById("graph");

    button.addEventListener("click", e => {
      var endpoint = "http://127.0.0.1:8000/predict?c='" + marker.getPosition()['lat'] + "," + marker.getPosition()['lng'] + "'";
      console.log(endpoint);

      function makeHttpObject() {
          try {
              return new XMLHttpRequest();
          }
          catch (error) {
          }
          try {
              return new ActiveXObject("Msxml2.XMLHTTP");
          }
          catch (error) {
          }
          try {
              return new ActiveXObject("Microsoft.XMLHTTP");
          }
          catch (error) {
          }

          throw new Error("Could not create HTTP request object.");
      }

      var request = makeHttpObject();
      request.open("GET", endpoint, true);
      request.send(null);
      request.onreadystatechange = function () {
          if (request.readyState == 4)
              var text = request.responseText;
              if (!(isNaN(text))){
                  text = parseFloat(request.responseText) * 10000;
              }

              document.getElementById("text").textContent = text;
              document.getElementById("h4").innerHTML = "m<sup>2</sup>";
      };
  });

  }

  function addCircleToMap(map){
    map.addObject(new H.map.Circle(
  
      {lat: 41.887388, lng: -6.738568},
  
      5500,
      {
        style: {
          strokeColor: 'rgba(255, 0, 0, 0.6)',
          lineWidth: 2,
          fillColor: 'rgba(255, 0, 0, 0.5)' 
        }
      }
    ));
  }

  function addCircleToMap1(map){
    map.addObject(new H.map.Circle(
      
      {lat: 41.888149, lng: -6.924434},
      
      2500,
      {
        style: {
          strokeColor: 'rgba(255, 0, 0, 0.6)', 
          lineWidth: 2,
          fillColor: 'rgba(255, 140, 0, 0.5)'  
        }
      }
    ));
    }

  function addCircleToMap2(map){
    map.addObject(new H.map.Circle(
        
      {lat: 41.794792, lng: -6.548872},
        
      1500,
      {
        style: {
          strokeColor: 'rgba(255, 0, 0, 0.6)', 
          lineWidth: 2,
          fillColor: 'rgba(255, 140, 0, 0.5)'  
        }
      }
    ));
  }


  var platform = new H.service.Platform({
    app_id: 'devportal-demo-20180625',
    app_code: '9v2BkviRwi9Ot26kp2IysQ',
    useHTTPS: true
  });

  var pixelRatio = window.devicePixelRatio || 1;
  var defaultLayers = platform.createDefaultLayers({
    tileSize: pixelRatio === 1 ? 256 : 512,
    ppi: pixelRatio === 1 ? undefined : 320
});

  var map = new H.Map(document.getElementById('map'),
    defaultLayers.normal.map, {
        center: {lat: 41.9, lng: -6.85},
        zoom: 11,
        pixelRatio: pixelRatio
    });


var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

var ui = H.ui.UI.createDefault(map, defaultLayers, 'en-US');
  
  addDraggableMarker(map, behavior);
  addCircleToMap(map);
  addCircleToMap1(map);
  addCircleToMap2(map);
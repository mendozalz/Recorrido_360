// Create hotspot with different sources.
document.getElementById('iframespot'), { yaw: 0.0335, pitch: -0.102 },
  { perspective: { radius: 1645, extraTransforms: "rotateX(5deg)" }};
  
  document.getElementById('iframeselect'), { yaw: -0.35, pitch: -0.239 };

// HTML sources.
var hotspotHtml = {
  gc1: '<iframe id="gc-1" width="675" height="390" src="https://www.youtube.com/embed/PTp7xXqHIq0?si=APDNV1ylWT9F2d0R" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
  gc2: '<iframe id="gc-2" width="675" height="390" src="https://www.youtube.com/embed/7i7V6rF5oc0?si=YqgXjEe59ZFzT5Xa" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
  gc3: '<iframe id="gc-3" width="675" height="390" src="https://www.youtube.com/embed/hR0-A6t4gyo?si=yMriYsR2aXj-Y8dc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
};

// Switch sources when clicked.
function switchHotspot(id) {
  var wrapper = document.getElementById('iframespot');
  wrapper.innerHTML = hotspotHtml[id];
}

var switchElements = document.querySelectorAll('[data-source]');
for (var i = 0; i < switchElements.length; i++) {
  var element = switchElements[i];
  addClickEvent(element);
}

function addClickEvent(element) {
  element.addEventListener('click', function() {
    switchHotspot(element.getAttribute('data-source'));
  });
}
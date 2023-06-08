console.log("pantalla");


// Create hotspot with different sources.
document.getElementById('iframespot'), { yaw: 0.0335, pitch: -0.102 },
  { perspective: { radius: 1645, extraTransforms: "rotateX(5deg)" }};
  
  document.getElementById('iframeselect'), { yaw: -0.35, pitch: -0.239 };

// HTML sources.
var hotspotHtml = {
  gc1: '<iframe id="gc-1" width="675" height="390" src="https://www.youtube.com/embed/TaQzEoveuBM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
  gc2: '<iframe id="gc-2" width="675" height="390" src="https://www.youtube.com/embed/kFnk4wp4Bts" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
  gc3: '<iframe id="gc-3" width="675" height="390" src="https://www.youtube.com/embed/lRf-HFit_O4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
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
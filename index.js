/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

(function () {
  const Marzipano = window.Marzipano;
  const bowser = window.bowser;
  const screenfull = window.screenfull;
  const data = window.APP_DATA;

  // Grab elements from DOM.
  const panoElement = document.querySelector("#pano");
  const sceneNameElement = document.querySelector("#titleBar .sceneName");
  const sceneListElement = document.querySelector("#sceneList");
  const sceneElements = document.querySelectorAll("#sceneList .scene");
  const sceneListToggleElement = document.querySelector("#sceneListToggle");
  const autorotateToggleElement = document.querySelector("#autorotateToggle");
  const fullscreenToggleElement = document.querySelector("#fullscreenToggle");
  const idAudio = document.querySelector("#audioBackGround");
  const btnToggle = document.createElement("button");
  const sonido = new Audio("./audio/lofi-girl-dreams.mp3");
  sonido.volume = 0.5;
  sonido.loop = true;
  const iconToggle = document.createElement("img");

  /* Cargar Audio de manera oculta*/

  let audioReproducido = false;
  let audioActivado = false;
  document.body.addEventListener("click", function () {
    if (!audioReproducido) {
        sonido.play();
        audioActivado = true;
      }
      audioReproducido = true;
  });

  function toggleAudio() {
    if (sonido.paused) {
      sonido.play();
    } else {
      sonido.pause();
    }
  }

  idAudio.appendChild(btnToggle);
  btnToggle.id = "btnToggle";
  btnToggle.className = "activo";
  btnToggle.appendChild(iconToggle);
  iconToggle.className = "iconPp";
  iconToggle.src = "img/btnPP.png";
  btnToggle.addEventListener("click", toggleAudio);

  // Detect desktop or mobile mode.
  if (window.matchMedia) {
    const setMode = function () {
      if (mql.matches) {
        document.body.classList.remove("desktop");
        document.body.classList.add("mobile");
      } else {
        document.body.classList.remove("mobile");
        document.body.classList.add("desktop");
      }
    };
    const mql = matchMedia("(max-width: 500px), (max-height: 500px)");
    setMode();
    mql.addListener(setMode);
  } else {
    document.body.classList.add("desktop");
  }

  // Detect whether we are on a touch device.
  document.body.classList.add("no-touch");
  window.addEventListener("touchstart", function () {
    document.body.classList.remove("no-touch");
    document.body.classList.add("touch");
  });

  // Use tooltip fallback mode on IE < 11.
  if (bowser.msie && parseFloat(bowser.version) < 11) {
    document.body.classList.add("tooltip-fallback");
  }

  // Viewer options.
  const viewerOpts = {
    controls: {
      mouseViewMode: data.settings.mouseViewMode,
    },
  };

  // Initialize viewer.
  const viewer = new Marzipano.Viewer(panoElement, viewerOpts);

  // Create scenes.
  const scenes = data.scenes.map(function (data) {
    const urlPrefix = "tiles";
    const source = Marzipano.ImageUrlSource.fromString(
      urlPrefix + "/" + data.id + "/{z}/{f}/{y}/{x}.jpg",
      { cubeMapPreviewUrl: urlPrefix + "/" + data.id + "/preview.jpg" }
    );
    const geometry = new Marzipano.CubeGeometry(data.levels);

    const limiter = Marzipano.RectilinearView.limit.traditional(
      data.faceSize,
      (100 * Math.PI) / 180,
      (120 * Math.PI) / 180
    );
    const view = new Marzipano.RectilinearView(
      data.initialViewParameters,
      limiter
    );

    const scene = viewer.createScene({
      source: source,
      geometry: geometry,
      view: view,
      pinFirstLevel: true,
    });

    // Mostrar escena
/*     scene.switchTo();
 */
    /* Condicional para la creación de la pantalla con su perspectiva */

    if (data.id === "p-2") {
      // Obteniendo el hotspot para la escena.
      const container = scene.hotspotContainer();

      // Crearndo hotspot para la pantalla en la pared.
      container.createHotspot(
        document.getElementById("iframespot"),
        { yaw: 2.485112484090731, pitch: -0.11081176956919435 },
        {
          perspective: {
            radius: 790,
            extraTransforms: "rotateX(6.5deg) rotateY(-37deg)", // Manjeo de la perspectiva
          },
        }
      );
      container.createHotspot(
        document.getElementById("iframeselect"),
        {
          yaw: 3.35,
          pitch: -0.29790759638527675,
        },
        {
          perspective: {
            radius: 590,
            extraTransforms: "rotateX(20deg) rotateY(10deg)",
          },
        }
      );
    }

    // Create link hotspots.
    data.linkHotspots.forEach(function (hotspot) {
      const element = createLinkHotspotElement(hotspot);
      scene
        .hotspotContainer()
        .createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
    });

    // Create info hotspots.
    data.infoHotspots.forEach(function (hotspot) {
      const element = createInfoHotspotElement(hotspot);
      scene
        .hotspotContainer()
        .createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
    });

    return {
      data: data,
      scene: scene,
      view: view,
    };
  });

  // Set up autorotate, if enabled.
  const autorotate = Marzipano.autorotate({
    yawSpeed: 0.03,
    targetPitch: 0,
    targetFov: Math.PI / 2,
  });
  if (data.settings.autorotateEnabled) {
    autorotateToggleElement.classList.add("disabled");
  }

  // Set handler for autorotate toggle.
  autorotateToggleElement.addEventListener("click", toggleAutorotate);

  // Set up fullscreen mode, if supported.
  if (screenfull.enabled && data.settings.fullscreenButton) {
    document.body.classList.add("fullscreen-enabled");
    fullscreenToggleElement.addEventListener("click", function () {
      screenfull.toggle();
    });
    screenfull.on("change", function () {
      if (screenfull.isFullscreen) {
        fullscreenToggleElement.classList.add("enabled");
      } else {
        fullscreenToggleElement.classList.remove("enabled");
      }
    });
  } else {
    document.body.classList.add("fullscreen-disabled");
  }

  // Set handler for scene list toggle.
  sceneListToggleElement.addEventListener("click", toggleSceneList);

  // Start with the scene list open on desktop.
  if (!document.body.classList.contains("mobile")) {
    showSceneList();
  }

  // Set handler for scene switch.
  scenes.forEach(function (scene) {
    const el = document.querySelector(
      '#sceneList .scene[data-id="' + scene.data.id + '"]'
    );
    el.addEventListener("click", function () {
      switchScene(scene);
      // On mobile, hide scene list after selecting a scene.
      if (document.body.classList.contains("mobile")) {
        hideSceneList();
      }
    });
  });

  // Dynamic parameters for controls.
  const velocity = 0.7;
  const friction = 3;

  function sanitize(s) {
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;");
  }

  function switchScene(scene) {
    stopAutorotate();
    scene.view.setParameters(scene.data.initialViewParameters);
    scene.scene.switchTo();
    startAutorotate();
    updateSceneName(scene);
    updateSceneList(scene);
  }

  /* Codigo para obtener el "yaw" y el "pitch" */

  function updateSceneName(scene) {
    sceneNameElement.innerHTML = sanitize(scene.data.name);
    window.marzipano_viewer = viewer;
  }

  function updateSceneList(scene) {
    for (let i = 0; i < sceneElements.length; i++) {
      const el = sceneElements[i];
      if (el.getAttribute("data-id") === scene.data.id) {
        el.classList.add("current");
      } else {
        el.classList.remove("current");
      }
    }
  }

  function showSceneList() {
    sceneListElement.classList.add("enabled");
    sceneListToggleElement.classList.add("enabled");
  }

  function hideSceneList() {
    sceneListElement.classList.remove("enabled");
    sceneListToggleElement.classList.remove("enabled");
  }

  function toggleSceneList() {
    sceneListElement.classList.toggle("enabled");
    sceneListToggleElement.classList.toggle("enabled");
  }

  function startAutorotate() {
    if (!autorotateToggleElement.classList.contains("enabled")) {
      return;
    }
    viewer.startMovement(autorotate);
    viewer.setIdleMovement(3000, autorotate);
  }

  function stopAutorotate() {
    viewer.stopMovement();
    viewer.setIdleMovement(Infinity);
  }

  function toggleAutorotate() {
    if (autorotateToggleElement.classList.contains("enabled")) {
      autorotateToggleElement.classList.remove("enabled");
      stopAutorotate();
    } else {
      autorotateToggleElement.classList.add("enabled");
      startAutorotate();
    }
  }

  function createLinkHotspotElement(hotspot) {
    // Create wrapper element to hold icon and tooltip.
    const wrapper = document.createElement("div");
    wrapper.classList.add("hotspot");
    wrapper.classList.add("link-hotspot");

    // Create image element.
    const icon = document.createElement("img");
    icon.src = "img/link.png";
    icon.classList.add("link-hotspot-icon");

    // Set rotation transform.
    const transformProperties = [
      "-ms-transform",
      "-webkit-transform",
      "transform",
    ];
    for (let i = 0; i < transformProperties.length; i++) {
      const property = transformProperties[i];
      icon.style[property] = "rotate(" + hotspot.rotation + "rad)";
    }

    // Add click event handler.
    wrapper.addEventListener("click", function () {
      switchScene(findSceneById(hotspot.target));
    });

    // Prevent touch and scroll events from reaching the parent element.
    // This prevents the view control logic from interfering with the hotspot.
    stopTouchAndScrollEventPropagation(wrapper);

    // Create tooltip element.
    const tooltip = document.createElement("div");
    tooltip.classList.add("hotspot-tooltip");
    tooltip.classList.add("link-hotspot-tooltip");
    tooltip.innerHTML = findSceneDataById(hotspot.target).name;

    wrapper.appendChild(icon);
    wrapper.appendChild(tooltip);

    return wrapper;
  }

  function createInfoHotspotElement(hotspot) {
    // Create wrapper element to hold icon and tooltip.
    const wrapper = document.createElement("div");
    wrapper.classList.add("hotspot");
    wrapper.classList.add("info-hotspot");

    // Create hotspot/tooltip header.
    const header = document.createElement("div");
    header.classList.add("info-hotspot-header");

    // Create title element.
    const titleWrapper = document.createElement("div");
    titleWrapper.classList.add("info-hotspot-title-wrapper");
    const title = document.createElement("div");
    title.classList.add("info-hotspot-title");
    title.innerHTML = hotspot.title;
    titleWrapper.appendChild(title);

    // Create close element.
    const closeWrapper = document.createElement("div");
    closeWrapper.classList.add("info-hotspot-close-wrapper");
    const closeIcon = document.createElement("img");
    closeIcon.src = "img/close.png";
    closeIcon.classList.add("info-hotspot-close-icon");
    closeWrapper.appendChild(closeIcon);

    // Create text element.
    const text = document.createElement("div");
    text.classList.add("info-hotspot-text");
    text.innerHTML = hotspot.text;

    // Place header and text into wrapper element.
    wrapper.appendChild(header);
    wrapper.appendChild(text);

    // Create a modal for the hotspot content to appear on mobile mode.
    const modal = document.createElement("div");
    modal.innerHTML = wrapper.innerHTML;
    modal.classList.add("info-hotspot-modal");
    document.body.appendChild(modal);

    const toggle = function () {
      wrapper.classList.toggle("visible");
      modal.classList.toggle("visible");
    };

    // Show content when hotspot is clicked.
    wrapper
      .querySelector(".info-hotspot-header")
      .addEventListener("click", toggle);

    // Prevent touch and scroll events from reaching the parent element.
    // This prevents the view control logic from interfering with the hotspot.
    stopTouchAndScrollEventPropagation(wrapper);

    return wrapper;
  }

  // Prevent touch and scroll events from reaching the parent element.
  function stopTouchAndScrollEventPropagation(element, eventList) {
     eventList = [
      "touchstart",
      "touchmove",
      "touchend",
      "touchcancel",
      "wheel",
      "mousewheel",
    ];
    for (let i = 0; i < eventList.length; i++) {
      element.addEventListener(eventList[i], function (event) {
        event.stopPropagation();
      });
    }
  }

  function findSceneById(id) {
    for (let i = 0; i < scenes.length; i++) {
      if (scenes[i].data.id === id) {
        return scenes[i];
      }
    }
    return null;
  }

  function findSceneDataById(id) {
    for (let i = 0; i < data.scenes.length; i++) {
      if (data.scenes[i].id === id) {
        return data.scenes[i];
      }
    }
    return null;
  }

  // Display the initial scene.
  switchScene(scenes[0]);
})();

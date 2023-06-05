var APP_DATA = {
  scenes: [
    {
      id: "1-360-3",
      name: "Pantalla-2",
      levels: [
        {
          tileSize: 256,
          size: 256,
          fallbackOnly: true,
        },
        {
          tileSize: 512,
          size: 512,
        },
        {
          tileSize: 512,
          size: 1024,
        },
        {
          tileSize: 512,
          size: 2048,
        },
      ],
      faceSize: 2000,
      initialViewParameters: {
        pitch: 0,
        yaw: 3.0707963267948966, // Parametro para vista inicial predeterminada
        fov: 1.5707963267948966,
      },
      linkHotspots: [
        {
          yaw: 0.03550224583630701,
          pitch: -0.009671374399170318,
          rotation: 0,
          target: "2-13575177283_f2d2c56a5f_b",
        },
      ],
      infoHotspots: [
        {
          yaw: 3.0090053285160687,
          pitch: -0.3115540844326272,
          title: "Pantalla",
          text: `<ul id="iframeselect">
          <li data-source="googleMaps">Google Maps</li>
          <li data-source="youtube">YouTube</li>
          <li data-source="youtubeWithControls">YouTube (UI)</li>
          <li data-source="koloreyes">KolorEyes</li>
          </ul>`,
        },
        {
          yaw: 3.0090053285160687,
          pitch: -0.3115540844326272,
          title: "Pantalla",
          text: `<div id="iframespot">
          <div class="message">Select something to play!</div>
          </div>`,
        },
        {
          yaw: -1.5136909498306146,
          pitch: -0.1459368508707204,
          title: "Sala de descanso<br>",
          text: `<div id="reveal">
          <img src="img/photo.png">
          <div class="reveal-content">
            <img src="img/Cuadro.jpeg">
            <p>Lorem Ipsum.</p>
          </div>
        </div>`,
        },
        {
          yaw: 1.1837348111125193,
          pitch: -0.23589489535444024,
          title: "Cuadro",
          text: `<div id="rotate-hotspot" class="rotate-hotspot">
          <div class="rotate-img"></div>
          <div class="rotate-content">
            <h1>Garantias Comunitaria</h1>
            <p>Una empresa solida y técnologica</p>
          </div>
        </div>`,
        },
      ],
    },
    {
      id: "0-360-1",
      name: "Pantalla-1",
      levels: [
        {
          tileSize: 256,
          size: 256,
          fallbackOnly: true,
        },
        {
          tileSize: 512,
          size: 512,
        },
        {
          tileSize: 512,
          size: 1024,
        },
        {
          tileSize: 512,
          size: 2048,
        },
      ],
      faceSize: 2000,
      initialViewParameters: {
        pitch: 0,
        yaw: 10,
        fov: 1.5707963267948966,
      },
      linkHotspots: [
        {
          yaw: -2.4140189766081637,
          pitch: 0.12442692007672207,
          rotation: 0,
          target: "1-360-3",
        },
        {
          yaw: -0.7286822755952276,
          pitch: 0.08066489563821833,
          rotation: 0,
          target: "2-13575177283_f2d2c56a5f_b",
        },
      ],
      infoHotspots: [
        {
          yaw: 0.007984336125115732,
          pitch: -0.046884537876241694,
          title: "Formulario",
          text: `<div id="info">
          <div class="icon_wrapper">
            <div class="icon">
              <div id="inner_icon" class="inner_icon">
                <div class="icon1"></div>
                <div class="icon2"></div>
              </div>
            </div>
          </div>
          <div class="tip">
            <p>Haz click aqui!</p>
          </div>
          <div class="content">
          <div class="image-wrapper">
             <img src="img/gc_calidad.jpg">
          </div>
            <div class="content-form">
              <p>Premio Iberoamericano de la Calidad 2022</p>
              <div>
                <input id="email" type="text" placeholder="Email">
              </div>
              <p>Garantias Comunitarias</p>
            </div>
            <div class="button_wrapper">
              <button class="close">Enviar</button>
            </div>
          </div>
        </div>`,
        },
        {
          yaw: 1.7314705792993257,
          pitch: -0.18174150520371981,
          title: "Cartelera Informatica<br>",
          text: `<div id="textInfo">
          <div class="hotspot">
            <div class="out"></div>
            <div class="in"></div>
          </div>
          <div class="tooltip-content">
            <p> es simplemente el texto de relleno de las imprentas y archivos de texto. </p>
          </div>`,
        },
        {
          yaw: -9.5356351230639973,
          pitch: 0.0,
          title: "Zona de Registro",
          text: `<div id="tooltip" tabindex="0">
          <div class="out">
            <div class="in">
              <div class="image"></div>
            </div>
          </div>
          <div class="tip">
            <p>Go to the Furnace Room</p>
            <img src="img/furnace.png">
          </div>
        </div>`,
        },
      ],
    },
    {
      id: "2-13575177283_f2d2c56a5f_b",
      name: "Pantalla-3",
      levels: [
        {
          tileSize: 256,
          size: 256,
          fallbackOnly: true,
        },
        {
          tileSize: 512,
          size: 512,
        },
      ],
      faceSize: 256,
      initialViewParameters: {
        pitch: 0,
        yaw: 0,
        fov: 1.5707963267948966,
      },
      linkHotspots: [
        {
          yaw: -1.4647547425610252,
          pitch: -0.11677829019217789,
          rotation: 0,
          target: "0-360-1",
        },
        {
          yaw: -2.8319587293106085,
          pitch: -0.10324738918280829,
          rotation: 0,
          target: "1-360-3",
        },
      ],
      infoHotspots: [
        {
          yaw: 1.573554719757805,
          pitch: -0.23095491364383136,
          title: "Nodo",
          text: "<strong>Lorem Ipsum</strong> es simplemente el texto de relleno de las imprentas y archivos de texto.",
        },
      ],
    },
  ],
  name: "Project Title",
  settings: {
    mouseViewMode: "drag",
    autorotateEnabled: true,
    fullscreenButton: true,
    viewControlButtons: true,
  },
};

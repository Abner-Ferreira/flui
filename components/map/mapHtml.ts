import { COLORS } from '@/constants/colors'

/** Avaliação mínima para ganhar a "estrela FLUI" dourada no marcador. */
export const TOP_RATED_STAR = 4.7

export const DEFAULT_CENTER = {
  latitude: -23.55052,
  longitude: -46.633308,
}

const LEAFLET_VERSION = '1.9.4'

/**
 * Documento HTML do mapa.
 *
 * WEB:
 *   StationMap.web.tsx
 *   -> iframe
 *   -> Leaflet
 *
 * ANDROID / IOS:
 *   StationMap.tsx
 *   -> WebView
 *   -> Leaflet
 *
 * O mapa utiliza os tiles Dark Gray da Esri.
 *
 * Não utiliza CARTO.
 * Não utiliza API Key.
 *
 * Comunicação React Native / Web -> mapa:
 * window.__flui.receive({ type, ... })
 *
 * Comunicação mapa -> React Native / Web:
 * { type: 'ready' | 'select' | 'mapPress' | 'error', ... }
 */
export function buildMapHtml(
  { bottomInset = 100 }: { bottomInset?: number } = {}
) {
  return `<!DOCTYPE html>
<html lang="pt-BR">

<head>

<meta charset="utf-8" />

<meta
  name="viewport"
  content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
/>

<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/${LEAFLET_VERSION}/leaflet.min.css"
/>

<style>

/* ============================================================
   BASE
   ============================================================ */

html,
body,
#map {
  margin: 0;
  padding: 0;

  width: 100%;
  height: 100%;

  overflow: hidden;

  background: #030307;
}

body {
  background: #030307;
}

.leaflet-container {
  background: #030307;

  font-family:
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Helvetica,
    Arial,
    sans-serif;

  -webkit-user-select: none;
  user-select: none;
}


/* ============================================================
   VISUAL DO MAPA FLUI
   ============================================================ */

/*
 * O Dark Gray Base da Esri já é escuro.
 *
 * Aqui aplicamos uma tonalidade roxa para aproximar
 * ainda mais do mapa original do FLUI.
 *
 * O objetivo é:
 *
 * - fundo quase preto;
 * - ruas roxo-escuras;
 * - pouca informação visual;
 * - contraste forte com os marcadores neon.
 */
.flui-map-tiles {
  filter:
    brightness(0.48)
    contrast(1.45)
    sepia(0.55)
    hue-rotate(220deg)
    saturate(1.75);
}


/*
 * Referências / nomes de ruas e locais.
 *
 * Deixamos um pouco mais suaves para não competir
 * com os elementos da interface.
 */
.flui-map-reference {
  filter:
    brightness(0.52)
    contrast(1.35)
    sepia(0.50)
    hue-rotate(220deg)
    saturate(1.55);

  opacity: 0.72;
}


/*
 * Camada visual adicional.
 *
 * Muito sutil para manter as regiões mais escuras.
 */
.leaflet-map-pane::after {
  content: '';

  position: absolute;

  inset: 0;

  pointer-events: none;

  background:
    radial-gradient(
      ellipse at center,
      rgba(110, 25, 160, 0.045) 0%,
      rgba(25, 5, 40, 0.08) 45%,
      rgba(2, 2, 6, 0.30) 100%
    );

  z-index: 350;
}


/* ============================================================
   ATRIBUIÇÃO
   ============================================================ */

.leaflet-bottom {
  bottom: ${bottomInset}px;
}

.leaflet-control-attribution {
  background:
    rgba(5, 5, 12, 0.90) !important;

  color:
    rgba(255, 255, 255, 0.55) !important;

  font-size: 10px;

  padding:
    3px 6px !important;

  border-radius:
    5px 0 0 0;

  box-shadow:
    0 0 10px rgba(0, 0, 0, 0.55);
}

.leaflet-control-attribution a {
  color:
    ${COLORS.purpleNeon} !important;
}


/* ============================================================
   CONTROLES DE ZOOM
   ============================================================ */

.leaflet-bar {
  border:
    1px solid ${COLORS.purpleNeon} !important;

  border-radius:
    9px !important;

  overflow: hidden;

  box-shadow:
    0 0 8px rgba(183, 72, 251, 0.50),
    0 0 22px rgba(183, 72, 251, 0.28) !important;
}

.leaflet-bar a {
  background:
    ${COLORS.graphite} !important;

  color:
    ${COLORS.white} !important;

  border-bottom:
    1px solid rgba(183, 72, 251, 0.38) !important;

  transition:
    background 0.15s ease,
    color 0.15s ease;
}

.leaflet-bar a:last-child {
  border-bottom:
    none !important;
}

.leaflet-bar a:hover {
  background:
    ${COLORS.purpleDeep} !important;

  color:
    ${COLORS.white} !important;
}


/* ============================================================
   MARCADORES
   ============================================================ */

.flui-pin {
  position: relative;

  width: 44px;
  height: 44px;

  --c:
    ${COLORS.purpleNeon};
}

.flui-pin.avail {
  --c:
    ${COLORS.greenNeon};
}

.flui-pin.busy {
  --c:
    ${COLORS.purpleNeon};
}


/*
 * Círculo principal.
 */
.flui-pin .ring {
  position: absolute;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  border-radius: 50%;

  background:
    ${COLORS.purpleDeep};

  border:
    2px solid var(--c);

  box-shadow:
    0 0 10px var(--c),
    0 0 24px var(--c),
    0 0 40px rgba(183, 72, 251, 0.30);

  display:
    flex;

  align-items:
    center;

  justify-content:
    center;

  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
}


/*
 * Raio.
 */
.flui-pin svg {
  width: 22px;
  height: 22px;

  fill:
    ${COLORS.white};

  filter:
    drop-shadow(
      0 0 4px rgba(255, 255, 255, 0.60)
    );
}


/*
 * Estação selecionada.
 */
.flui-pin.sel .ring {
  transform:
    scale(1.25);

  animation:
    flui-pulse 1.4s ease-in-out infinite;
}


/* ============================================================
   ESTRELA
   ============================================================ */

.flui-pin .star {
  position: absolute;

  top: -8px;
  right: -8px;

  width: 20px;
  height: 20px;

  border-radius: 50%;

  background:
    ${COLORS.black};

  border:
    1.5px solid ${COLORS.gold};

  color:
    ${COLORS.gold};

  font-size: 12px;

  line-height: 18px;

  text-align: center;

  box-shadow:
    0 0 8px ${COLORS.gold},
    0 0 14px rgba(255, 215, 0, 0.35);
}


/* ============================================================
   ANIMAÇÃO
   ============================================================ */

@keyframes flui-pulse {

  0%,
  100% {
    box-shadow:
      0 0 10px var(--c),
      0 0 24px var(--c);
  }

  50% {
    box-shadow:
      0 0 18px var(--c),
      0 0 44px var(--c);
  }

}


/* ============================================================
   LOCALIZAÇÃO DO USUÁRIO
   ============================================================ */

.flui-user {
  width: 18px;
  height: 18px;

  border-radius: 50%;

  background:
    ${COLORS.greenNeon};

  border:
    3px solid ${COLORS.white};

  box-shadow:
    0 0 0 6px rgba(57, 255, 20, 0.25),
    0 0 18px ${COLORS.greenNeon},
    0 0 32px rgba(57, 255, 20, 0.35);
}


/* ============================================================
   MAPA
   ============================================================ */

.leaflet-container,
.leaflet-container * {
  -webkit-user-select: none;
  user-select: none;
}

.leaflet-marker-icon {
  -webkit-tap-highlight-color: transparent;
}


/* ============================================================
   FIM DO CSS
   ============================================================ */

</style>

</head>


<body>

<div id="map"></div>


<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/${LEAFLET_VERSION}/leaflet.min.js"></script>


<script>

(function () {

  /* ==========================================================
     CONFIGURAÇÃO
     ========================================================== */

  var TOP_RATED =
    ${TOP_RATED_STAR};

  var BRIDGE =
    window.ReactNativeWebView;


  /* ==========================================================
     ENVIO DE MENSAGENS
     ========================================================== */

  function send(payload) {

    var text =
      JSON.stringify(payload);


    /*
     * Android / iOS
     */
    if (BRIDGE) {

      BRIDGE.postMessage(text);

      return;
    }


    /*
     * Web / iframe
     */
    window.parent.postMessage(
      text,
      '*'
    );
  }


  /* ==========================================================
     VERIFICA LEAFLET
     ========================================================== */

  if (!window.L) {

    send({
      type:
        'error',

      message:
        'Leaflet nao carregou. Verifique a conexao com a internet.'
    });

    return;
  }


  /* ==========================================================
     MAPA
     ========================================================== */

  var map =
    L.map(
      'map',
      {
        zoomControl:
          false,

        center:
          [
            ${DEFAULT_CENTER.latitude},
            ${DEFAULT_CENTER.longitude}
          ],

        zoom:
          13,

        minZoom:
          3,

        maxZoom:
          19,

        dragging:
          true,

        scrollWheelZoom:
          true,

        doubleClickZoom:
          true,

        touchZoom:
          true,

        boxZoom:
          true,

        keyboard:
          true
      }
    );


  /* ==========================================================
     ESRI DARK GRAY BASE
     ========================================================== */

  /*
   * Base escura.
   *
   * Não utiliza CARTO.
   * Não utiliza API Key.
   */
  var darkBase =
    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom:
          16,

        className:
          'flui-map-tiles',

        attribution:
          'Sources: Esri, HERE, Garmin, © OpenStreetMap contributors, and the GIS User Community'
      }
    );

  darkBase.addTo(map);


  /* ==========================================================
     ESRI DARK GRAY REFERENCE
     ========================================================== */

  /*
   * Camada de nomes / referências.
   *
   * É separada do mapa base para podermos controlar
   * sua intensidade visual.
   */
  var darkReference =
    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom:
          16,

        className:
          'flui-map-reference',

        opacity:
          0.72
      }
    );

  darkReference.addTo(map);


  /* ==========================================================
     ZOOM DESKTOP
     ========================================================== */

  if (!L.Browser.mobile) {

    L.control.zoom(
      {
        position:
          'bottomright'
      }
    ).addTo(map);

  }


  /* ==========================================================
     ÍCONE DE RAIO
     ========================================================== */

  var BOLT =
    '<svg viewBox="0 0 24 24">' +
      '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>' +
    '</svg>';


  /* ==========================================================
     ESTADO
     ========================================================== */

  var markers =
    {};

  var selectedId =
    null;

  var userMarker =
    null;


  /* ==========================================================
     ÍCONE DA ESTAÇÃO
     ========================================================== */

  function iconFor(
    station,
    selected
  ) {

    var cls =
      'flui-pin ' +

      (
        station.status === 'Disponível agora'
          ? 'avail'
          : 'busy'
      ) +

      (
        selected
          ? ' sel'
          : ''
      );


    var star =
      station.rating >= TOP_RATED

        ? '<div class="star">\\u2605</div>'

        : '';


    return L.divIcon(
      {
        className:
          '',

        html:
          '<div class="' +
            cls +
          '">' +

            '<div class="ring">' +
              BOLT +
            '</div>' +

            star +

          '</div>',

        iconSize:
          [44, 44],

        iconAnchor:
          [22, 22]
      }
    );
  }


  /* ==========================================================
     ESTAÇÕES
     ========================================================== */

  function setStations(list) {

    var next =
      {};


    list.forEach(
      function (s) {

        next[s.id] =
          s;

      }
    );


    /*
     * Remove estações antigas.
     */
    Object.keys(markers).forEach(
      function (id) {

        if (!next[id]) {

          map.removeLayer(
            markers[id].marker
          );

          delete markers[id];

        }

      }
    );


    /*
     * Cria / atualiza marcadores.
     */
    list.forEach(
      function (s) {

        var entry =
          markers[s.id];


        /*
         * NOVO
         */
        if (!entry) {

          var marker =
            L.marker(
              [
                s.latitude,
                s.longitude
              ],
              {
                icon:
                  iconFor(
                    s,
                    s.id === selectedId
                  ),

                keyboard:
                  false
              }
            ).addTo(map);


          marker.on(
            'click',
            function () {

              send(
                {
                  type:
                    'select',

                  id:
                    s.id
                }
              );

            }
          );


          markers[s.id] =
            {
              marker:
                marker,

              data:
                s
            };


          return;
        }


        /*
         * EXISTENTE
         */
        entry.data =
          s;


        entry.marker.setLatLng(
          [
            s.latitude,
            s.longitude
          ]
        );


        entry.marker.setIcon(
          iconFor(
            s,
            s.id === selectedId
          )
        );

      }
    );
  }


  /* ==========================================================
     ESTAÇÃO SELECIONADA
     ========================================================== */

  function setSelected(id) {

    var previous =
      selectedId;


    selectedId =
      id;


    /*
     * Atualiza marcador anterior.
     */
    if (
      previous &&
      markers[previous]
    ) {

      markers[previous].marker.setIcon(
        iconFor(
          markers[previous].data,
          false
        )
      );

    }


    /*
     * Atualiza marcador atual.
     */
    if (
      id &&
      markers[id]
    ) {

      markers[id].marker.setIcon(
        iconFor(
          markers[id].data,
          true
        )
      );


      map.panTo(
        markers[id].marker.getLatLng(),
        {
          animate:
            true
        }
      );

    }
  }


  /* ==========================================================
     LOCALIZAÇÃO DO USUÁRIO
     ========================================================== */

  function setUser(
    lat,
    lng
  ) {

    var latlng =
      [
        lat,
        lng
      ];


    if (!userMarker) {

      userMarker =
        L.marker(
          latlng,
          {
            icon:
              L.divIcon(
                {
                  className:
                    '',

                  html:
                    '<div class="flui-user"></div>',

                  iconSize:
                    [18, 18],

                  iconAnchor:
                    [9, 9]
                }
              ),

            interactive:
              false,

            keyboard:
              false,

            zIndexOffset:
              -100
          }
        ).addTo(map);


      return;
    }


    userMarker.setLatLng(
      latlng
    );
  }


  /* ==========================================================
     CLIQUE NO MAPA
     ========================================================== */

  map.on(
    'click',
    function () {

      send(
        {
          type:
            'mapPress'
        }
      );

    }
  );


  /* ==========================================================
     BRIDGE FLUI
     ========================================================== */

  window.__flui =
    {

      receive:
        function (m) {

          if (!m) {
            return;
          }


          switch (m.type) {


            case 'stations':

              setStations(
                m.stations || []
              );

              break;


            case 'selected':

              setSelected(
                m.id || null
              );

              break;


            case 'user':

              setUser(
                m.latitude,
                m.longitude
              );

              break;


            case 'flyTo':

              map.flyTo(
                [
                  m.latitude,
                  m.longitude
                ],

                m.zoom || 15,

                {
                  duration:
                    1.2
                }
              );

              break;


            case 'hello':

              send(
                {
                  type:
                    'ready'
                }
              );

              break;

          }

        }

    };


  /* ==========================================================
     MENSAGENS DO IFRAME
     ========================================================== */

  window.addEventListener(
    'message',
    function (event) {

      var data =
        event.data;


      if (
        typeof data === 'string'
      ) {

        try {

          data =
            JSON.parse(data);

        } catch (e) {

          return;

        }

      }


      if (
        data &&
        data.__flui
      ) {

        window.__flui.receive(
          data
        );

      }

    }
  );


  /* ==========================================================
     MAPA PRONTO
     ========================================================== */

  send(
    {
      type:
        'ready'
    }
  );


})();
</script>

</body>
</html>`
}
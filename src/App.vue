<template>
  <div
    v-if="isloaded"
    class="map"
    :class="grabClass"
    @wheel="onWheel"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @mousemove="onMouseMove"
    v-cloak
  >
    <div
      v-for="location in locations"
      :key="location.name"
      class="loc"
      :style="locStyle(location)"
    >
      <i :class="locationIcon(location.type)"></i>
      <span v-if="showDetails">&nbsp;{{ location.name }}</span>
      <div v-if="showDetails" class="coordinates">
        {{ coordinates(location) }}
      </div>
      <div v-if="showDetails && location.images">
        <a @click="showLocation(location)">images</a>
      </div>
    </div>

    <div
      v-for="(horizontalPath, index) in horizontalPaths"
      :key="index"
      class="horizontal-path"
      :style="horizontalPathStyle(horizontalPath)"
    >
      <div class="horizontal-path"></div>
    </div>

    <div
      v-for="(verticalPath, index) in verticalPaths"
      :key="index"
      class="vertical-path"
      :style="verticalPathStyle(verticalPath)"
    >
      <div class="vertical-path"></div>
    </div>

    <template v-for="tick in horizontalTicks" :key="tick.label">
      <div class="horizontal-tick" :style="{ left: `${tick.left}px` }"></div>
      <div
        v-if="tick.label"
        class="horizontal-tick-label"
        :style="{ left: `calc(${tick.left}px - 2em)` }"
      >
        {{ tick.label }}
      </div>
    </template>

    <template v-for="tick in verticalTicks" :key="tick.label">
      <div class="vertical-tick" :style="{ top: `${tick.top}px` }"></div>
      <div
        v-if="tick.label"
        class="vertical-tick-label"
        :style="{ top: `calc(${tick.top}px - .6em)` }"
      >
        {{ tick.label }}
      </div>
    </template>

    <div v-if="isMouseEnter" class="mouse-position">
      ({{ mouseX }},, {{ mouseY }})
    </div>

    <Dialog
      v-model:visible="showDialog"
      :modal="true"
      :dismissableMask="true"
      :showHeader="false"
    >
      <Carousel :value="selectedLocation.images">
        <template #item="slotProps">
          <img :src="`images/${slotProps.data}`" />
        </template>
      </Carousel>
    </Dialog>
  </div>
</template>

<script>
import MapData from "./mapData.js";
import Carousel from "primevue/carousel";
import Dialog from "primevue/dialog";

export default {
  name: "App",

  components: { Carousel, Dialog },

  data() {
    return {
      isloaded: false,
      locations: MapData.locations,
      horizontalPaths: [],
      verticalPaths: [],

      mapX0: 0,
      mapY0: 0,
      mapWidth: 0,
      mapHeight: 0,

      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      zoom: 1,
      scale: 1,
      panX: 0,
      panY: 0,

      isMouseDown: false,
      isMouseEnter: false,
      mouseX: 0,
      mouseY: 0,

      selectedLocation: null,
      showDialog: false,
    };
  },

  computed: {
    grabClass() {
      return this.isMouseDown ? "mouse-down" : "mouse-up";
    },
    showDetails() {
      return this.scale * this.zoom > 0.14;
    },
    horizontalTicks() {
      var ticks = [];
      var thousands = Math.floor(this.mapX(0) / 1000);
      var x = 0;

      while (x < this.windowWidth) {
        x = this.screenX(thousands * 1000);
        var label = this.scale * this.zoom > 0.02 ? thousands.toString() : null;
        ticks.push({
          left: x,
          label: label,
        });

        thousands++;
      }

      return ticks;
    },
    verticalTicks() {
      var ticks = [];
      var thousands = Math.floor(this.mapY(0) / 1000);
      var y = 0;

      while (y < this.windowHeight) {
        y = this.screenY(thousands * 1000);
        var label = this.scale * this.zoom > 0.02 ? thousands.toString() : null;
        ticks.push({
          top: y,
          label: label,
        });

        thousands++;
      }

      return ticks;
    },
  },

  methods: {
    load() {
      this.setInitialMapValues();
      this.setNetherPaths();
      this.isloaded = true;
    },
    setInitialMapValues() {
      var x0 = this.locations[0].nether[0];
      var x1 = this.locations[0].nether[0];
      var y0 = this.locations[0].nether[2];
      var y1 = this.locations[0].nether[2];

      for (var i = 1; i < this.locations.length; i++) {
        var loc = this.locations[i];
        x0 = Math.min(x0, loc.nether[0]);
        x1 = Math.max(x1, loc.nether[0]);
        y0 = Math.min(y0, loc.nether[2]);
        y1 = Math.max(y1, loc.nether[2]);
      }

      x0 *= 8;
      x1 *= 8;
      y0 *= 8;
      y1 *= 8;

      var width = x1 - x0;
      var height = y1 - y0;

      var pad = width * 0.15;
      width += pad * 2;
      x0 -= pad;

      pad = height * 0.15;
      height += pad * 2;
      y0 -= pad;

      // Center the map
      var widthScale = this.windowWidth / width;
      var heightScale = this.windowHeight / height;

      if (heightScale > widthScale) {
        pad = (this.windowHeight / widthScale - height) / 2;
        height += pad * 2;
        y0 -= pad;
      } else {
        pad = (this.windowWidth / heightScale - width) / 2;
        width += pad * 2;
        x0 -= pad;
      }

      this.mapX0 = x0;
      this.mapY0 = y0;
      this.mapWidth = width;
      this.mapHeight = height;
      this.scale = Math.min(
        this.windowWidth / this.mapWidth,
        this.windowHeight / this.mapHeight
      );
    },
    setNetherPaths() {
      MapData.paths.forEach((p) => {
        for (var i = 2; i < p.length; i += 2) {
          var x0 = p[i - 2] * 8;
          var y0 = p[i - 1] * 8;
          var x1 = p[i] * 8;
          var y1 = p[i + 1] * 8;

          if (x0 === x1) {
            this.verticalPaths.push({
              x: x0,
              y: Math.min(y0, y1),
              length: Math.abs(y1 - y0),
            });
          } else {
            this.horizontalPaths.push({
              y: y0,
              x: Math.min(x0, x1),
              length: Math.abs(x1 - x0),
            });
          }
        }
      }, this);
    },
    locStyle(location) {
      var left = this.screenX(location.nether[0] * 8);
      var top = this.screenY(location.nether[2] * 8);

      return {
        left: `${left - 25}px`,
        top: `${top - 25}px`,
      };
    },
    horizontalPathStyle(path) {
      return {
        left: `${this.screenX(path.x)}px`,
        top: `${this.screenY(path.y)}px`,
        width: `${path.length * this.scale * this.zoom}px`,
      };
    },
    verticalPathStyle(path) {
      return {
        left: `${this.screenX(path.x)}px`,
        top: `${this.screenY(path.y)}px`,
        height: `${path.length * this.scale * this.zoom}px`,
      };
    },

    screenX(raw) {
      return this.mapCoordinateToScreenCoordinate(raw, this.mapX0, this.panX);
    },
    screenY(raw) {
      return this.mapCoordinateToScreenCoordinate(raw, this.mapY0, this.panY);
    },
    mapCoordinateToScreenCoordinate(raw, map0, pan) {
      return (raw - map0) * this.scale * this.zoom + pan;
    },

    mapX(raw) {
      return this.screenCoordinateToMapCoordinate(raw, this.mapX0, this.panX);
    },
    mapY(raw) {
      return this.screenCoordinateToMapCoordinate(raw, this.mapY0, this.panY);
    },
    screenCoordinateToMapCoordinate(raw, map0, pan) {
      return (raw - pan) / this.scale / this.zoom + map0;
    },

    locationIcon(type) {
      return type === "home"
        ? "fa-solid fa-house"
        : type === "portal"
        ? "fa-solid fa-dungeon"
        : type === "stronghold"
        ? "fa-solid fa-chess-rook"
        : type === "village"
        ? "fa-solid fa-campground"
        : "fa-solid fa-location-pin";
    },
    coordinates(location) {
      return `(${location.nether[0] * 8},, ${location.nether[2] * 8})`;
    },

    showLocation(location) {
      this.selectedLocation = location;
      this.showDialog = true;
    },

    onWheel(e) {
      var factor = e.deltaY > 22 ? 1 / 1.1 : e.deltaY < -22 ? 1.1 : 1;
      if (factor === 1) return;

      // We want the center not to move.
      // Calculate the map point that is in the center now.
      var centerX = this.mapX(this.windowWidth / 2);
      var centerY = this.mapY(this.windowHeight / 2);

      this.zoom = this.zoom * factor;
      //console.log("scale * zoom", this.scale * this.zoom);

      // Change the Pan so the center point is back in the center
      this.panX =
        this.windowWidth / 2 -
        this.mapCoordinateToScreenCoordinate(centerX, this.mapX0, 0);
      this.panY =
        this.windowHeight / 2 -
        this.mapCoordinateToScreenCoordinate(centerY, this.mapY0, 0);
    },
    onMouseDown() {
      this.isMouseDown = true;
    },
    onMouseUp() {
      this.isMouseDown = false;
    },
    onMouseEnter() {
      this.isMouseEnter = true;
    },
    onMouseLeave() {
      this.isMouseEnter = false;
    },
    onMouseMove(e) {
      if (this.isMouseDown) {
        this.panX = this.panX + e.movementX;
        this.panY = this.panY + e.movementY;
      }

      if (this.isMouseEnter) {
        this.mouseX = Math.floor(this.mapX(e.pageX));
        this.mouseY = Math.floor(this.mapY(e.pageY));
      }
    },
  },

  mounted() {
    this.load();
  },
};
</script>

<style>
#app {
  width: 100vw;
  height: 100vh;
  margin: 0;
  overflow: hidden;
  font-family: Verdana, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.map {
  position: relative;
  width: 100vw;
  height: 100vh;
}

.loc {
  position: absolute;
  border: 1px solid #51557e;
  border-radius: 0.25em;
  text-align: center;
  padding: 0.5em;
  z-index: 10;
  background-color: #1b2430;
  cursor: default;
}

a {
  font-size: smaller;
  text-decoration: underline;
  color: rgba(214, 213, 168, 0.8);
}
a:hover {
  cursor: pointer;
}
img {
  max-width: 60%;
}

.coordinates {
  font-size: smaller;
  color: rgba(214, 213, 168, 0.5);
  margin-top: 0.2em;
}

.horizontal-path {
  position: absolute;
  border-top: 2px dashed #51557e;
}

.horizontal-tick {
  position: absolute;
  top: 0;
  width: 0;
  height: 0.5em;
  border-left: 1px solid #51557e;
}
.horizontal-tick-label {
  position: absolute;
  top: 0.7em;
  width: 4em;
  text-align: center;
  font-size: small;
  color: rgba(214, 213, 168, 0.5);
}
.vertical-path {
  position: absolute;
  border-left: 2px dashed #51557e;
}
.vertical-tick {
  position: absolute;
  left: 0;
  width: 0.5em;
  height: 0;
  border-top: 1px solid #51557e;
}
.vertical-tick-label {
  position: absolute;
  left: 0.9em;
  font-size: small;
  color: rgba(214, 213, 168, 0.5);
}

.mouse-up {
  cursor: grab;
}

.mouse-down {
  cursor: grabbing;
}
.mouse-position {
  position: absolute;
  font-size: small;
  text-align: right;
  color: rgba(214, 213, 168, 0.5);
  top: calc(100vh - 2rem);
  left: calc(100vw - 10rem);
  width: 9rem;
}
</style>

<template>
  <svg
    class="svg"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 64 64"
  >
    <title>Online LEarning</title>
    <path
      class="stroke cls-1"
      d="M55,7h2a4,4,0,0,1,4,4V47a4,4,0,0,1-4,4H7a4,4,0,0,1-4-4V11A4,4,0,0,1,7,7H9"
    />
    <path
      class="stroke cls-2"
      d="M3,43H61a0,0,0,0,1,0,0v4a4,4,0,0,1-4,4H7a4,4,0,0,1-4-4V43A0,0,0,0,1,3,43Z"
    />
    <path
      class="stroke cls-4"
      d="M42,63H22a3.27,3.27,0,0,0,2.22-.86C25.58,60.94,25.29,60.2,26,51H38c.29,3.78.14,1.79.7,9A3.32,3.32,0,0,0,42,63Z"
    />
    <path class="stroke cls-5" d="M13,5H9V37H55V5H51" />
    <rect class="cls-6" x="9.25" y="34.75" width="45.5" height="2" />
    <path
      class="stroke page"
      d="M32,5V37a13.65,13.65,0,0,0-9.66-4H13V1h9.34A13.65,13.65,0,0,1,32,5Z"
    />
    <path
      class="stroke page"
      d="M32,5V37a13.65,13.65,0,0,1,9.66-4H51V1H41.66A13.65,13.65,0,0,0,32,5Z"
    />
    <rect class="cls-10" x="3" y="41" width="58" height="2" />
    <!-- <path
      d="M57,6H56V5a1,1,0,0,0-1-1H52V1a1,1,0,0,0-1-1C42,0,37.12-.86,32,3.65,26.85-.88,22,0,13,0a1,1,0,0,0-1,1V4H9A1,1,0,0,0,8,5V6H7a5,5,0,0,0-5,5V47a5,5,0,0,0,5,5H24.92l-.62,7.92A2.31,2.31,0,0,1,22,62H20a1,1,0,0,0,0,2H44a1,1,0,0,0,0-2H42a2.3,2.3,0,0,1-2.3-2.07L39.08,52H57a5,5,0,0,0,5-5V11A5,5,0,0,0,57,6ZM54,6V36H34.84c3.95-2.54,6.81-2,16.16-2a1,1,0,0,0,1-1V6ZM50,2V32c-8.16,0-12.26-.66-17,2.83V5.42A12.56,12.56,0,0,1,41.66,2ZM14,2c7.83,0,12.48-.82,17,3.42V34.83C26.16,31.27,21.91,32,14,32ZM10,6h2V33a1,1,0,0,0,1,1c9.28,0,12.21-.54,16.16,2H10ZM7,8H8V37a1,1,0,0,0,1,1H55a1,1,0,0,0,1-1V8h1a3,3,0,0,1,3,3V42H4V11A3,3,0,0,1,7,8ZM38.35,62H25.64c.77-1.21.61-1.38,1.29-10H37.08C37.68,59.84,37.52,60.69,38.35,62ZM60,47a3,3,0,0,1-3,3H7a3,3,0,0,1-3-3V44H60Z" /> -->
    <path
      class="button"
      d="M31,48h2a0.5,0.5,0,0,0,0-2H31A0.5,0.5,0,0,0,31,48Z"
    />
    <g class="lines">
      <path
        ref="line"
        class="stroke line"
        d="M18,8h9a0.5,0.5,0,0,0,0-0H18A0.5,0.5,0,0,0,18,8Z"
      />
      <path
        class="stroke line"
        d="M18,13h9a0.5,0.5,0,0,0,0-0H18A0.5,0.5,0,0,0,18,13Z"
      />
      <path
        class="stroke line"
        d="M18,18h9a0.5,0.5,0,0,0,0-0H18A0.5,0.5,0,0,0,18,18Z"
      />
      <path
        class="stroke line"
        d="M18,23h9a0.5,0.5,0,0,0,0-0H18A0.5,0.5,0,0,0,18,23Z"
      />
      <path
        class="stroke line"
        d="M18,28h9a0.5,0.5,0,0,0,0-0H18A0.5,0.5,0,0,0,18,28Z"
      />
      <path
        class="stroke line"
        d="M37,8h9a0.5,0.5,0,0,0,0-0H37A0.5,0.5,0,0,0,37,8Z"
      />
      <path
        class="stroke line"
        d="M37,13h9a0.5,0.5,0,0,0,0-0H37A0.5,0.5,0,0,0,37,13Z"
      />
      <path
        class="stroke line"
        d="M37,18h9a0.5,0.5,0,0,0,0-0H37A0.5,0.5,0,0,0,37,18Z"
      />
      <path
        class="stroke line"
        d="M37,23h9a0.5,0.5,0,0,0,0-0H37A0.5,0.5,0,0,0,37,23Z"
      />
      <path
        class="stroke line"
        d="M37,28h9a0.5,0.5,0,0,0,0-0H37A0.5,0.5,0,0,0,37,28Z"
      />
    </g>
  </svg>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'MyComputedSvg',
  data() {
    return {
      start: undefined as unknown as number,
    };
  },
  mounted() {
    // const line = this.$refs.line as SVGPathElement;
    // this.drawLine(line);
  },
  methods: {
    drawLine(path: SVGPathElement) {
      const length = path.getTotalLength();
      // Clear any previous transition
      path.style.transition = 'none';
      // Set up the starting positions
      path.style.strokeDasharray = `${length} ${length}`;
      path.style.strokeDashoffset = `${length}`;
      // Trigger a layout so styles are calculated & the browser
      // picks up the starting position before animating
      path.getBoundingClientRect();
      // Define our transition
      path.style.transition = 'stroke-dashoffset 2s 1s ease-in-out';
      // Go!
      path.style.strokeDashoffset = `${length / 2}`;
    },
  },
});
</script>

<style scoped lang="scss">
.svg {
  width: 100%;
  height: 100%;
}
.stroke {
  stroke-width: 0.5;
  stroke-opacity: 1;
  stroke: var(--stroke);
  color: var(--stroke);
}
.cls-1 {
  fill: var(--shadow);
}

.cls-2 {
  fill: #eee;
}

.cls-3 {
  fill: #eee;
}

.cls-4 {
  fill: #eee;
}

.cls-5 {
  fill: var(--tertiary);
}

.cls-6 {
  fill: var(--tertiary-dark);
}

.cls-10 {
  fill: var(--stroke);
}

.page {
  fill: var(--secondary);
}

.button {
  fill: var(--primary-light);
  stroke: var(--stroke);
  stroke-width: 0.5;
}

.line {
  stroke-dasharray: 18px, 18px;
  fill: none;
  animation-name: drawLine;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-direction: alternate-reverse;
  animation-delay: 0;
  @for $i from 1 through 10 {
    &:nth-child(#{$i}) {
      animation-delay: $i * 0.3s;
    }
  }
}

@keyframes drawLine {
  0% {
    opacity: 0;
    stroke-dashoffset: 18px;
  }
  30% {
    opacity: 1;
    stroke-dashoffset: 9px;
  }
}
</style>

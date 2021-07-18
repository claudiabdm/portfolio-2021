<template>
  <svg
    ref="camera"
    class="svg"
    viewBox="0 0 65 65"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <filter id="lighten">
        <feColorMatrix
          type="matrix"
          values="1.5 0 0 0 0
              0 1.5 0 0 0
              0 0 1.5 0 0
              0 0 0 1 0 "
        />
      </filter>
    </defs>
    <g id="Camera" class="camera">
      <g id="Camera_2">
        <g id="Shot button">
          <g id="shotButton">
            <path
              ref="shotButton"
              d="M8.43494 13.4126C8.43494 12.8603 8.88265 12.4126 9.43494 12.4126H11.9049C12.4572 12.4126 12.9049 12.8603 12.9049 13.4126V14.529C12.9049 15.0813 12.4572 15.529 11.9049 15.529H9.43494C8.88265 15.529 8.43494 15.0813 8.43494 14.529V13.4126Z"
              class="shot-button stroke"
            />
          </g>
          <g id="Rectangle 21">
            <path
              d="M7.43494 15.0693C7.43494 14.5601 7.84778 14.1472 8.35704 14.1472H12.9854C13.4946 14.1472 13.9075 14.5601 13.9075 15.0693V15.0693C13.9075 15.5786 13.4946 15.9914 12.9854 15.9914H8.35704C7.84778 15.9914 7.43494 15.5786 7.43494 15.0693V15.0693Z"
              class="stroke"
              fill="#DDDDDD"
            />
          </g>
        </g>
        <g id="Rectangle 25">
          <path
            d="M15.0949 14.6167C15.0949 14.0644 15.5426 13.6167 16.0949 13.6167H23.479C24.0313 13.6167 24.479 14.0644 24.479 14.6167V16.1789C24.479 16.7312 24.0313 17.1789 23.479 17.1789H16.0949C15.5426 17.1789 15.0949 16.7312 15.0949 16.1789V14.6167Z"
            fill="#DDDDDD"
            class="stroke"
          />
        </g>
        <g id="Rectangle 29">
          <path
            d="M57.5498 12.935C57.9048 12.5119 58.5356 12.4567 58.9586 12.8117L61.982 15.3486C62.4051 15.7036 62.4603 16.3344 62.1053 16.7575L61.8643 17.0446C61.5093 17.4677 60.8786 17.5229 60.4555 17.1679L57.4321 14.6309C57.009 14.2759 56.9539 13.6452 57.3089 13.2221L57.5498 12.935Z"
            fill="#DDDDDD"
            class="stroke"
          />
        </g>
        <g id="Camera body">
          <rect
            id="camera body color"
            class="stroke camera-body"
            x="2.64368"
            y="24.2903"
            width="59.5243"
            height="25.6345"
          />
          <path
            id="Rectangle 23"
            d="M2.64368 49.6145H62.168V50.6239C62.168 51.7285 61.2726 52.6239 60.168 52.6239H4.64368C3.53911 52.6239 2.64368 51.7285 2.64368 50.6239V49.6145Z"
            class="stroke camera-metal"
          />
          <path
            id="Union"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M27.177 12.8502C26.6247 12.8502 26.177 13.2979 26.177 13.8502V15.3348H3.64368C3.09139 15.3348 2.64368 15.7825 2.64368 16.3348V24.5863H62.168V16.3348C62.168 15.7825 61.7203 15.3348 61.168 15.3348H58.9964V13.8502C58.9964 13.2979 58.5487 12.8502 57.9964 12.8502H27.177Z"
            class="stroke camera-metal"
          />
        </g>
        <g id="ellipse-rect">
          <g id="Rectangle 30">
            <path
              d="M48.1646 36.8982C47.6863 36.622 47.5225 36.0104 47.7986 35.5321L50.0343 31.6598C50.3105 31.1815 50.9221 31.0176 51.4004 31.2937L52.2906 31.8077C52.7689 32.0838 52.9327 32.6954 52.6566 33.1737L50.4209 37.0461C50.1447 37.5244 49.5331 37.6883 49.0548 37.4121L48.1646 36.8982Z"
              fill="#EEEEEE"
              stroke="#121629"
              stroke-width="0.5"
            />
          </g>
          <circle
            id="Ellipse 22"
            cx="49.0501"
            cy="36.4279"
            r="1.35928"
            fill="#EEEEEE"
            class="stroke"
          />
        </g>
        <g id="Camera lens ring">
          <circle cx="34.4699" cy="36.1547" r="13.3344" fill="#EEEEEE" />
          <circle cx="34.4699" cy="36.1547" r="13.3344" class="stroke" />
        </g>
        <circle
          id="cameraLensBg"
          class="camera-lens-bg stroke"
          cx="34.4699"
          cy="36.1546"
          r="10.5846"
        />
        <circle
          id="cameraLens"
          ref="cameraLens"
          class="camera-lens stroke"
          cx="34.4699"
          cy="36.1546"
          r="10.5846"
        />
        <rect
          x="46.8669"
          y="14.3821"
          width="9.54494"
          height="7.00063"
          rx="0.875"
          fill="#232946"
          stroke="#121629"
          stroke-width="0.5"
        />
        <g id="ellipse">
          <circle
            cx="19.2531"
            cy="36.1546"
            r="1.63238"
            fill="#EEEEEE"
            class="stroke"
          />
          <circle
            cx="19.2531"
            cy="36.1547"
            r="0.494962"
            fill="#EEBBC3"
            stroke="#121629"
            stroke-width="0.15"
          />
        </g>
        <circle
          class="camera-logo stroke"
          cx="30.9292"
          cy="17.8826"
          r="2.22831"
        />
        <g id="Flash">
          <rect
            x="36.7203"
            y="15.3682"
            width="7.70425"
            height="5.02875"
            rx="0.875"
            fill="#FFE5C3"
            class="stroke"
          />
          <g id="lines">
            <line
              id="Line 24"
              class="line"
              x1="37.2"
              y1="20.3503"
              x2="37.2"
              y2="15.5003"
            />
            <line
              id="Line 28"
              class="line"
              x1="37.45"
              y1="20.3503"
              x2="37.45"
              y2="15.5003"
            />
            <line
              id="Line 26"
              class="line"
              x1="37.7"
              y1="20.3503"
              x2="37.7"
              y2="15.5003"
            />
            <line
              id="Line 3"
              class="line"
              x1="37.95"
              y1="20.3503"
              x2="37.95"
              y2="15.5003"
            />
            <line
              id="Line 27"
              class="line"
              x1="38.2"
              y1="20.3503"
              x2="38.2"
              y2="15.5003"
            />
            <line
              id="Line 4"
              class="line"
              x1="38.45"
              y1="20.3503"
              x2="38.45"
              y2="15.5003"
            />
            <line
              id="Line 5"
              class="line"
              x1="38.7"
              y1="20.3503"
              x2="38.7"
              y2="15.5003"
            />
            <line
              id="Line 6"
              class="line"
              x1="38.95"
              y1="20.3503"
              x2="38.95"
              y2="15.5003"
            />
            <line
              id="Line 31"
              class="line"
              x1="39.2"
              y1="20.3503"
              x2="39.2"
              y2="15.5003"
            />
            <line
              id="Line 7"
              class="line"
              x1="39.45"
              y1="20.3503"
              x2="39.45"
              y2="15.5003"
            />
            <line
              id="Line 8"
              class="line"
              x1="39.7"
              y1="20.3503"
              x2="39.7"
              y2="15.5003"
            />
            <line
              id="Line 11"
              class="line"
              x1="39.95"
              y1="20.3503"
              x2="39.95"
              y2="15.5003"
            />
            <line
              id="Line 9"
              class="line"
              x1="40.2"
              y1="20.3503"
              x2="40.2"
              y2="15.5003"
            />
            <line
              id="Line 12"
              class="line"
              x1="40.45"
              y1="20.3503"
              x2="40.45"
              y2="15.5003"
            />
            <line
              id="Line 29"
              class="line"
              x1="40.7"
              y1="20.3503"
              x2="40.7"
              y2="15.5003"
            />
            <line
              id="Line 10"
              class="line"
              x1="40.95"
              y1="20.3503"
              x2="40.95"
              y2="15.5003"
            />
            <line
              id="Line 13"
              class="line"
              x1="41.2"
              y1="20.3503"
              x2="41.2"
              y2="15.5003"
            />
            <line
              id="Line 14"
              class="line"
              x1="41.45"
              y1="20.3503"
              x2="41.45"
              y2="15.5003"
            />
            <line
              id="Line 15"
              class="line"
              x1="41.7"
              y1="20.3503"
              x2="41.7"
              y2="15.5003"
            />
            <line
              id="Line 30"
              class="line"
              x1="41.95"
              y1="20.3503"
              x2="41.95"
              y2="15.5003"
            />
            <line
              id="Line 16"
              class="line"
              x1="42.2"
              y1="20.3503"
              x2="42.2"
              y2="15.5003"
            />
            <line
              id="Line 20"
              class="line"
              x1="42.45"
              y1="20.3503"
              x2="42.45"
              y2="15.5003"
            />
            <line
              id="Line 17"
              class="line"
              x1="42.7"
              y1="20.3503"
              x2="42.7"
              y2="15.5003"
            />
            <line
              id="Line 19"
              class="line"
              x1="42.95"
              y1="20.3503"
              x2="42.95"
              y2="15.5003"
            />
            <line
              id="Line 18"
              class="line"
              x1="43.2"
              y1="20.3503"
              x2="43.2"
              y2="15.5003"
            />
            <line
              id="Line 23"
              class="line"
              x1="43.45"
              y1="20.3503"
              x2="43.45"
              y2="15.5003"
            />
            <line
              id="Line 21"
              class="line"
              x1="43.7"
              y1="20.3503"
              x2="43.7"
              y2="15.5003"
            />
            <line
              id="Line 22"
              class="line"
              x1="43.95"
              y1="20.3503"
              x2="43.95"
              y2="15.5003"
            />
          </g>
          <path
            id="light"
            ref="flash"
            class="flash-light"
            d="M40.3763 6.77707C40.419 6.56257 40.7257 6.56257 40.7685 6.77707L42.0477 13.1889C42.0783 13.3421 42.2647 13.4027 42.3795 13.2967L47.1832 8.86131C47.3439 8.71293 47.592 8.8932 47.5005 9.09188L44.7666 15.031C44.7013 15.1729 44.8166 15.3316 44.9717 15.3133L51.465 14.5485C51.6822 14.5229 51.777 14.8146 51.5862 14.9216L45.8835 18.1195C45.7472 18.1959 45.7472 18.392 45.8835 18.4684L51.5862 21.6663C51.777 21.7733 51.6822 22.065 51.465 22.0394L44.9717 21.2746C44.8166 21.2563 44.7013 21.415 44.7666 21.5568L47.5005 27.496C47.592 27.6947 47.3439 27.875 47.1832 27.7266L42.3795 23.2912C42.2647 23.1852 42.0783 23.2458 42.0477 23.399L40.7685 29.8108C40.7257 30.0253 40.419 30.0253 40.3763 29.8108L39.0971 23.399C39.0665 23.2458 38.88 23.1852 38.7653 23.2912L33.9616 27.7266C33.8009 27.875 33.5528 27.6947 33.6443 27.496L36.3782 21.5568C36.4435 21.415 36.3282 21.2563 36.1731 21.2746L29.6798 22.0394C29.4626 22.065 29.3678 21.7733 29.5586 21.6663L35.2613 18.4684C35.3975 18.392 35.3975 18.1959 35.2613 18.1195L29.5586 14.9216C29.3678 14.8146 29.4626 14.5229 29.6798 14.5485L36.1731 15.3133C36.3282 15.3316 36.4435 15.1729 36.3782 15.031L33.6443 9.09188C33.5528 8.8932 33.8009 8.71293 33.9616 8.86131L38.7653 13.2967C38.88 13.4027 39.0665 13.3421 39.0971 13.1889L40.3763 6.77707Z"
          />
        </g>
      </g>
    </g>
  </svg>
</template>

<script lang="ts">
import Vue from 'vue';
import { gsap } from 'gsap';

export default Vue.extend({
  name: 'SvgCamera',
  mounted() {
    const tl = gsap.timeline({ repeat: -1 });
    const button = this.$refs.shotButton as Element;
    const lens = this.$refs.cameraLens as Element;
    const flash = this.$refs.flash as Element;
    const camera = this.$refs.camera as Element;
    tl.add(this.pressButton(button));
    tl.add(this.closeDiaphragm(lens), 'releaseButton-=1');
    tl.add(this.flash(flash), '<');
    tl.add(this.lightenCamera(camera), '<=+0.05');
  },
  methods: {
    pressButton(button: Element): gsap.core.Timeline {
      const tl = gsap.timeline();
      tl.to(button, {
        yPercent: 30,
        ease: 'easeOut',
        duration: 0.5,
      });
      tl.to(button, {
        yPercent: 60,
        ease: 'easeOut',
        duration: 0.5,
      });
      tl.to(button, {
        yPercent: 0,
        ease: 'elastic',
        duration: 1,
      }).addLabel('releaseButton');
      return tl;
    },
    closeDiaphragm(lens: Element): gsap.core.Timeline {
      const tl = gsap.timeline({ ease: 'linear' });
      tl.to(lens, {
        transformOrigin: 'center',
        scale: 0,
        duration: 0.1,
      });
      tl.to(
        lens,
        {
          scale: 1,
          duration: 0.1,
        },
        '<0.15'
      );
      return tl;
    },
    flash(flash: Element): gsap.core.Timeline {
      const tl = gsap.timeline({ ease: 'elastic' });
      tl.to(flash, {
        transformOrigin: 'center',
        scale: 1.5,
        opacity: 0.75,
        duration: 0.25,
      });
      tl.to(flash, {
        scale: 1,
        opacity: 0,
        duration: 0.15,
      });
      return tl;
    },
    lightenCamera(camera: Element): gsap.core.Timeline {
      const tl = gsap.timeline({ ease: 'elastic' });
      tl.to(camera, {
        filter: 'url(#lighten)',
        duration: 0.1,
        ease: 'elastic',
      });
      tl.to(
        camera,
        {
          filter: 'none',
          duration: 0.1,
          ease: 'elastic',
        },
        '<0.15'
      );
      return tl;
    },
  },
});
</script>

<style scoped lang="scss">
@use '~/assets/styles/global/variables' as *;
.svg {
  width: 100%;
  height: 100%;
}
.stroke {
  stroke: var(--stroke);
  stroke-width: 0.5;
}
.line {
  stroke: var(--stroke);
  stroke-width: 0.1;
}
.camera-body {
  fill: $tertiary;
}
.camera-metal {
  fill: var(--secondary-light);
}
.camera-lens {
  fill: var(--primary-dark);
}
.camera-lens-bg {
  fill: var(--stroke);
}
.camera-logo {
  fill: var(--primary-light);
}
.shot-button {
  fill: var(--primary);
}

.flash-light {
  opacity: 0;
  fill: var(--secondary);
}
</style>

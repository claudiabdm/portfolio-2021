<template>
  <div class="rich-text">
    <RichTextRenderer :document="text" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    text: {
      type: Object,
      default: () => {},
    },
  },
});
</script>

<style scoped lang="scss">
@use '~/assets/styles/global/variables' as *;
@use '~/assets/styles/mixins/mixins' as *;
.rich-text {
  font-weight: 300;
  transition: color 0.5s linear;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: var(--font-family-secondary);
  }

  p {
    line-height: 1.5;
  }

  img {
    @include size(75%, 75%);
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  b {
    font-weight: 700;
  }

  i {
    font-style: italic;
  }

  u {
    text-decoration-color: var(--secondary);
    text-decoration-skip-ink: none;
    text-decoration-thickness: from-font;
  }

  ul {
    list-style: disc outside none;
    padding-left: 15px;
  }

  ol {
    list-style: decimal outside none;
    padding-left: 15px;
  }

  li {
    display: list-item;
    margin-top: 10px;
    counter-increment: ol;
    &::marker {
      color: var(--error);
    }
  }
}

.text-xs {
  font-size: $text-xs;
}

.text-sm {
  font-size: $text-sm;
}

.text-base {
  font-size: $text-base;
}
.text-lg {
  font-size: $text-lg;
}

.text-xl {
  font-size: $text-xl;
}

.text-2xl {
  font-size: $text-2xl;
}
.text-3xl {
  font-size: $text-3xl;
}
.text-4xl {
  font-size: $text-4xl;
}
.text-5xl {
  font-size: $text-5xl;
}
.text-6xl {
  font-size: $text-6xl;
}

.text-6xl + .dot {
  color: var(--tertiary);
  font-size: $text-6xl;
}
.text-4xl + .dot {
  color: var(--tertiary);
  font-size: $text-4xl;
}
</style>

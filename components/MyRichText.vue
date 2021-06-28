<template>
  <div class="rich-text">
    <RichTextRenderer :document="blok" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    blok: {
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
$text-xs: 0.75rem;
$text-sm: 0.875rem;
$text-base: 1rem;
$text-lg: 1.125rem;
$text-xl: 1.25rem;
$text-2xl: clamp(1.25rem, 5vw, 1.5rem);
$text-3xl: clamp(1.5rem, 5vw, 1.875rem);
$text-4xl: clamp(1.75rem, 5vw, 2.5rem);
$text-5xl: clamp(2.8rem, 5vw, 3rem);
$text-6xl: clamp(2rem, 10vw, 4.5rem);

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
</style>

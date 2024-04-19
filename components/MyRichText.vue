<template>
  <div class="rich-text">
    <RichTextRenderer :document="text" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import scss from 'highlight.js/lib/languages/scss';
import 'highlight.js/styles/github.css';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('scss', scss);

export default Vue.extend({
  props: {
    text: {
      type: Object as () => { content: any[] },
      default: () => ({ content: [] }),
    },
  },
  mounted() {
    hljs.highlightAll();
  },
});
</script>
<style scoped lang="scss">
@use '~/assets/styles/global/variables' as *;
@use '~/assets/styles/mixins/mixins' as *;

.rich-text {
  font-weight: var(--font-weight-normal);
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
    line-height: 1.75;
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
      font-weight: 700;
      color: var(--secondary);
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
  line-height: 1.5;
}

.text-6xl+.dot {
  color: var(--tertiary);
  font-size: $text-6xl;
}

.text-4xl+.dot {
  color: var(--tertiary);
  font-size: $text-4xl;
}
</style>

<style lang="scss">
@use '~/assets/styles/global/variables' as *;

.hljs {
  font-size: 0.875rem;
  font-family: monospace;
  border-radius: $border-radius;
  background-color: var(--stroke);
  color: var(--secondary-light);

  &-keyword,
  &-name,
  &-attribute {
    color: var(--primary-light);
    font-weight: 700;
  }

  &-attr,
  &-number,
  &-variable,
  &-title.class_,
  &-variable.language_ {
    color: var(--secondary-light);
  }

  &-string,
  &-title.function_,
  &-selector-class,
  &-selector-pseudo,
  &-property,
  &-built_in {
    color: var(--tertiary-light);
  }

  &-built_in,
  &-property {
    font-style: italic;
  }
}
</style>

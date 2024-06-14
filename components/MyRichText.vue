<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { type ISbRichtext } from '@storyblok/js';
import { useStoryblokApi } from '@storyblok/vue';
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


const props = defineProps<{ text: ISbRichtext }>();

const el = ref<Element | null>(null);

const text = ref<string>(useStoryblokApi().richTextResolver.render(props.text));

defineExpose({
  el
})

onMounted(() => {
  hljs.highlightAll();

})
</script>

<template>
  <div
    class="rich-text"
    ref="el"
    v-html="text"
  ></div>
</template>


<style lang="scss">
@use 'sass:list';

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
    line-height: 1.75;
  }

  img {
    width: 100%;
    height: 100%;
    display: block;
    margin-left: auto;
    margin-right: auto;
    border-radius: var(--border-radius);
    border: var(--border);
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

  code:not(.hljs) {
    padding: var(--space-3xs) var(--space-3xs);
    color: var(--primary-dark);
    background-color: var(--secondary-light);
    font-size: var(--font-xs);
    border-radius: 5px;
    border: var(--border);
    opacity: 0.8;
  }
}

.hljs {
  font-size: 0.875rem;
  font-family: monospace;
  border-radius: var(--border-radius);
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

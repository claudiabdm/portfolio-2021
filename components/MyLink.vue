<script lang="ts" setup>

withDefaults(defineProps<{ link: string }>(), {
  link: ''
});

</script>
<template>
  <a
    class="link"
    :href="link"
    target="_blank"
    rel="noopener"
  >
    <slot></slot>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      class="link__arrow"
    >
      <path
        d="M14.29,5.71L14.29,5.71c-0.39,0.39-0.39,1.02,0,1.41L18.17,11H3c-0.55,0-1,0.45-1,1v0c0,0.55,0.45,1,1,1h15.18l-3.88,3.88 c-0.39,0.39-0.39,1.02,0,1.41l0,0c0.39,0.39,1.02,0.39,1.41,0l5.59-5.59c0.39-0.39,0.39-1.02,0-1.41L15.7,5.71 C15.32,5.32,14.68,5.32,14.29,5.71z"
      />
    </svg>
  </a>
</template>

<style scoped lang="scss">

.link {
  display: inline-flex;
  align-items: center;
  text-decoration-color: rgba(0, 0, 0, 0);

  &:hover {
    text-decoration-color: var(--tertiary);
    transition: none;

    .link__arrow {
      animation: elastic 0.75s linear forwards;
    }
  }

  &__arrow {
    width: 20px;
    height: 20px;
    margin-top: 2px;
    fill: var(--secondary);
    margin-left: 5px;
  }
}

@keyframes elastic {
  0% {
    transform: translate3d(0%, 0, 0);
  }

  16% {
    transform: translate3d(52.27%, 0, 0);
  }

  28% {
    transform: translate3d(4.88%, 0, 0);
  }

  44% {
    transform: translate3d(36.63%, 0, 0);
  }

  59% {
    transform: translate3d(18.36%, 0, 0);
  }

  73% {
    transform: translate3d(20.58%, 0, 0);
  }

  88% {
    transform: translate3d(19.8%, 0, 0);
  }

  100% {
    transform: translate3d(20.8%, 0, 0);
  }
}
</style>

<style lang="scss">
a {
  color: var(--primary);
  background-color: transparent;
  font-weight: 700;
  font-family: var(--font-family-secondary);
  line-height: 1.5;
  text-decoration: underline;
  text-decoration-color: var(--tertiary);
  text-decoration-skip-ink: none;
  text-decoration-thickness: 2px;
  text-underline-offset: 5px;
  transition: text-decoration-color 0.15s ease-out;

  &:hover {
    text-decoration-color: var(--secondary);
  }

  &:visited {
    color: var(--primary);
  }
}
</style>

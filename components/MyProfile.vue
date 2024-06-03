<script lang="ts" setup>
import MyImage from '@/components/MyImage.vue';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import type { MyProfile } from '~/types/components';
import { elevateAnimationObserver } from '~/utils/gsap-animations';

const props = defineProps<{ blok: MyProfile }>();

const profileImgObserver = ref<IntersectionObserver>();
const linksObserver = ref<IntersectionObserver>();

const profileImgRef = ref<{el: Element}>();
const linksRef = ref<Element>();

const links = computed(() => [
  { ...props.blok.linkedin, id: 'linkedin' },
  { ...props.blok.github, id: 'github' },
  { ...props.blok.codepen, id: 'codepen' },
  { ...props.blok.mastodon, id: 'mastodon' },
])

onMounted(() => {
  if (profileImgRef.value) {
    profileImgObserver.value = elevateAnimationObserver(profileImgRef.value.el);
  }
  if (linksRef.value) {
    linksObserver.value = elevateAnimationObserver(linksRef.value);
  }
})


onBeforeUnmount(() => {
  profileImgObserver.value?.disconnect();
  linksObserver.value?.disconnect();
})

function iconPath(icon: string): string {
  return '/sprite.svg' + '#' + icon;
}
</script>

<template>
  <div v-editable="blok" class="profile">
    <div class="profile__wrapper profile__wrapper--round">
      <MyImage
        ref="profileImgRef"
        class="profile__img"
        :blok="{ image: blok.profileImg, width: 230, height: 230 }"
        :size-list="[200, 500]"
        :breakpoints="[375, 768]"
        border-radius="50%"
      />
    </div>
    <div class="profile__wrapper">
      <ul
        ref="linksRef"
        class="profile__links"
      >
        <li
          v-for="link in links"
          :key="link.id"
          class="profile__link"
        >
          <a
            class="profile__a"
            :href="link.url"
            target="_blank"
            rel="me noopener"
            :aria-label="`Go to ${link.id}`"
          >
            <svg class="profile__svg">
              <use :href="iconPath(link.id)" />
            </svg>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>


<style scoped lang="scss">
@use '~/assets/styles/variables' as *;

.profile {
  padding-left: 20px;

  &__wrapper {
    width: 100%;
    height: 100%;
    background-color: var(--shadow);
    border-radius: var(--border-radius);

    &--round {
      border-radius: 50%;
    }
  }

  &__img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 10px solid var(--secondary);
    box-shadow: 0 0 0 2px var(--stroke);

    @media screen and (min-width: $max-width) {
      width: 250px;
      height: 250px;
    }
  }

  &__links {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 100%;
    margin-top: 25px;
    background-color: var(--tertiary);
    border-radius: var(--border-radius);
    border: var(--border);
  }

  &__a {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__link {
    margin: 10px 0;
  }

  &__svg {
    width: 32px;
    height: 32px;
    color: var(--secondary);
    stroke: var(--stroke);
    stroke-width: 10;
    transition: color 0.15s ease-in-out;

    &:hover {
      color: var(--primary-light);
    }
  }
}
</style>

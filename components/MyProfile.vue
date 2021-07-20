<template>
  <div class="profile">
    <div class="profile__wrapper profile__wrapper--round">
      <MyImage
        ref="profileImg"
        class="profile__img"
        :blok="{ image: blok.profileImg, width: 300, height: 300 }"
        border-radius="50%"
      />
    </div>
    <div class="profile__wrapper">
      <ul ref="profileLinks" class="profile__links">
        <li v-for="link in links" :key="link.id" class="profile__link">
          <a
            class="profile__a"
            :href="link.url"
            target="_blank"
            rel="noopener"
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

<script lang="ts">
import Vue from 'vue';
import MyImage from '@/components/MyImage.vue';

export default Vue.extend({
  name: 'MyProfile',
  components: { MyImage },
  props: {
    blok: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      profileImgObserver: null as unknown as IntersectionObserver,
      linksObserver: null as unknown as IntersectionObserver,
    };
  },
  computed: {
    links() {
      return [
        { ...this.blok.linkedin, id: 'linkedin' },
        { ...this.blok.github, id: 'github' },
        { ...this.blok.codepen, id: 'codepen' },
      ];
    },
  },
  mounted() {
    const profile = this.$refs.profileImg as Vue;
    const links = this.$refs.profileLinks as Element;
    this.profileImgObserver = this.$elevateAnimationObserver(profile.$el);
    this.linksObserver = this.$elevateAnimationObserver(links);
  },
  beforeDestroy() {
    this.profileImgObserver.disconnect();
    this.linksObserver.disconnect();
  },
  methods: {
    iconPath(icon: string): string {
      return require('@/assets/sprite.svg') + '#' + icon;
    },
  },
});
</script>

<style scoped lang="scss">
@use '~/assets/styles/global/variables' as *;
@use '~/assets/styles/mixins/mixins' as *;
.profile {
  padding-left: rem(20px);
  &__wrapper {
    @include size(100%, 100%);
    background-color: var(--shadow);
    border-radius: $border-radius;
    &--round {
      border-radius: 50%;
    }
  }
  &__img {
    @include size(rem(200px), rem(200px));
    border-radius: 50%;
    border: rem(10px) solid var(--secondary);
    box-shadow: 0 0 0 rem(2px) var(--stroke);
    @media screen and (min-width: 1024px) {
      @include size(rem(250px), rem(250px));
    }
  }
  &__links {
    @include flex(center, space-around);
    @include size(100%, 100%);
    margin-top: rem(25px);
    background-color: var(--tertiary);
    border-radius: $border-radius;
    border: $border;
  }
  &__a {
    @include flex(center, center);
  }
  &__link {
    margin: rem(10px) 0;
  }
  &__svg {
    @include size(rem(32px), rem(32px));
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

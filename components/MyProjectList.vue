<template>
  <section v-editable="blok" class="projects">
    <MyProjectFilter :blok="blok.filter[0]" @filterSelected="changeFilter" />
    <div ref="projectList" class="projects__list-wrapper">
      <transition-group
        tag="ul"
        name="list-complete"
        class="projects__list"
        @before-enter="setOverflow('hidden')"
        @before-leave="setOverflow('hidden')"
        @after-enter="refreshScroll"
        @after-leave="refreshScroll"
      >
        <li
          v-for="project in filteredProjects"
          :key="project.uuid"
          class="projects__project list-complete-item"
        >
          <MyProject
            :ref="project.uuid"
            :animate="filteredProjectsChanged"
            :blok="project.content"
          />
        </li>
      </transition-group>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { gsap } from 'gsap';
import { StoryData } from 'storyblok-js-client/types';
import MyProject from './MyProject.vue';
import { FilterButton, MyProjectBlok, ProjectList } from '~/types/components';

export default Vue.extend({
  name: 'MyProjectList',
  components: { MyProject },
  props: {
    blok: {
      type: Object as () => ProjectList,
      default: () => ({} as ProjectList),
    },
  },
  data() {
    return {
      projects: [] as MyProjectBlok[],
      projectsUuid: [] as string[],
      selectedFilter: 'show-all',
      filteredProjectsChanged: false,
    };
  },
  async fetch() {
    this.projects = await this.fetchProjects(this.blok.body);
  },
  computed: {
    filteredProjects(): MyProjectBlok[] {
      return this.projects.filter((project) =>
        project.content.tagList?.includes(this.selectedFilter)
      );
    },
  },
  mounted() {
    gsap.set(this.$refs.projectList as Element, {
      autoAlpha: 0,
    });
    gsap.to(this.$refs.projectList as Element, {
      autoAlpha: 1,
      duration: 1,
      delay: 2,
    });
  },
  methods: {
    async fetchProjects(uuids: string[]): Promise<MyProjectBlok[]> {
      const version =
        this.$nuxt.context.query._storyblok || this.$nuxt.context.isDev
          ? 'draft'
          : 'published';
      const { data } = await this.$nuxt.context.app.$storyapi.get(
        'cdn/stories/',
        {
          by_uuids: uuids.join(','),
          version,
          language: this.$i18n.locale,
        }
      );
      const projects = data.stories.map((story: StoryData) => ({
        ...story,
        order: uuids.indexOf(story.uuid),
        content: {
          ...story.content,
          tagList: [...story.tag_list, 'show-all'],
          visible: true,
        },
      })) as MyProjectBlok[];
      return projects.sort((a, b) => a.order - b.order);
    },
    changeFilter(tag: FilterButton['tag']) {
      this.selectedFilter = tag;
    },
    setSearchParams(tag: FilterButton['tag']) {
      if (tag === 'show-all') {
        return {
          starts_with: 'projects/',
        };
      }
      return {
        starts_with: 'projects/',
        with_tag: tag,
      };
    },
    setOverflow(value: string): void {
      document.documentElement.style.overflow = value;
    },
    refreshScroll(): void {
      this.setOverflow('auto');
    },
  },
});
</script>

<style lang="scss" scoped>
@use '~/assets/styles/global/variables' as *;
@use '~/assets/styles/mixins/mixins' as *;
.projects {
  @include size(100%, auto);
  padding: 0 rem(25px) rem($nav-height);
  &__list-wrapper {
    visibility: hidden;
  }
  &__list {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(max(250px, calc((100% - 50px) / 2)), 1fr)
    );
    justify-content: center;
    gap: rem(50px);
    margin-top: rem(100px);
    @media screen and (min-width: 1024px) {
      grid-template-columns: repeat(auto-fit, minmax(370px, 1fr));
      justify-content: flex-start;
      gap: rem(100px);
    }
  }
}

.list-complete {
  will-change: transform;
  &-item {
    transition-property: opacity, transform;
    transition-duration: 0.75s;
    transition-timing-function: ease-in-out;
  }
  &-enter {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
    &-item {
      transition-delay: 0.5s;
    }
  }

  &-leave-active {
    position: absolute;
    visibility: hidden;
  }
}
</style>

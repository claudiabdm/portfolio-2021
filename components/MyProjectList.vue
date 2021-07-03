<template>
  <section v-editable="blok" class="projects">
    <MyProjectFilter :blok="blok.filter[0]" @filterSelected="changeFilter" />
    <template v-if="projects.length > 0">
      <transition-group name="fade" tag="ul" class="projects__list">
        <li
          v-for="project in filteredProjects"
          :key="project.uuid"
          class="projects__project"
        >
          <MyProject :blok="project.content" />
        </li>
      </transition-group>
    </template>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { StoryData } from 'storyblok-js-client/types';
import { FilterButton, MyProjectBlok, ProjectList } from '~/types/components';

export default Vue.extend({
  name: 'MyProjectList',
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
    };
  },
  async fetch() {
    this.projects = await this.fetchProjects(this.blok.body);
  },
  computed: {
    filteredProjects(): MyProjectBlok[] {
      if (this.selectedFilter !== 'show-all') {
        return this.projects.filter((project) =>
          project.tag_list.includes(this.selectedFilter)
        );
      }
      return this.projects;
    },
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
        }
      );
      const projects = data.stories.map(
        (story: StoryData) => story as MyProjectBlok
      );
      return projects;
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
  },
});
</script>

<style lang="scss" scoped>
@use '~/assets/styles/global/variables' as *;
@use '~/assets/styles/mixins/mixins' as *;

.projects {
  @include size(100%, auto);
  padding: 0 rem(25px) rem($nav-height);
  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(rem(250px), 1fr));
    justify-content: center;
    gap: rem(100px);
    margin-top: rem(50px);
    @media screen and (min-width: 1024px) {
      grid-template-columns: repeat(auto-fill, minmax(rem(370px), 1fr));
      justify-content: flex-start;
    }
  }
  &__project {
    @media screen and (min-width: 1024px) {
      max-width: 50vw;
    }
  }
}
</style>

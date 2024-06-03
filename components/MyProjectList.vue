<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import type { FilterButton, MyProjectList } from '~/types/components';

const props = defineProps<{ blok: MyProjectList }>();

const projectListRef = ref<Element>();
const selectedFilter = ref<FilterButton['tag']>('show-all');

onMounted(() => {
  if (window.innerWidth < 1024) {
    animateFading(1);
  } else {
    animateFading(2);
  }
})

const filteredProjects = computed(() => {
  return props.blok.body.filter((project) => {
    return selectedFilter.value === 'show-all' ?
      project :
      project.tag_list?.includes(String(selectedFilter.value))
  }
  ).map((p => p.content))
})

function animateFading(delay: number) {
  if (projectListRef.value) {
    gsap.set(projectListRef.value, {
      autoAlpha: 0,
    })
    gsap.to(projectListRef.value, {
      autoAlpha: 1,
      duration: 1,
      delay,
    })
  }
}

function setOverflow(value: string) {
  document.documentElement.style.overflow = value;
}

function refreshScroll() {
  setOverflow('auto');
}

function changeFilter(tag: FilterButton['tag']) {
  selectedFilter.value = tag;
}
</script>

<template>
  <section
    v-editable="blok"
    class="projects page__component"
  >
    <MyProjectFilter
      :blok="blok.filter[0]"
      @filterSelected="changeFilter"
    />
    <div
      ref="projectListRef"
      class="projects__list-wrapper"
    >
      <TransitionGroup
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
          :key="project._uid"
          class="projects__project list-complete-item"
        >
          <MyProject
            :key="`${project._uid}-component`"
            :ref="project._uid"
            :blok="project"
          />
        </li>
      </TransitionGroup>
    </div>
  </section>
</template>


<style lang="scss" scoped>
.projects {
  width: 100%;
  height: auto;
  padding: 0 25px var(--nav-height);

  &__list-wrapper {
    visibility: hidden;
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fit,
        minmax(max(250px, calc((100% - 50px) / 2)), 1fr));
    justify-content: center;
    gap: 50px;
    margin-top: 50px;

    @media screen and (min-width: 1024px) {
      grid-template-columns: repeat(auto-fit, minmax(370px, 1fr));
      justify-content: flex-start;
      gap: 100px;
      margin-top: 100px;
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

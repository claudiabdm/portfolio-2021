<script lang="ts" setup>
import type { NuxtError } from '#app'
import type { MyParagraph } from './types/components';

defineProps({
  error: Object as () => NuxtError
})
</script>

<template>
  <NuxtLayout>
    <MyPage :blok="{
      title: 'Oh no!',
      seo: {
        title: String(error?.statusCode),
        description: String(error?.message),
        og_image: '',
        og_title: '',
        og_description: String(error?.message),
      },
      body: [{
        _uid: 'Something-went-wrong',
        component: 'MyParagraph',
        text: {
          type: 'doc',
          content: [
            {
              type: 'heading',
              attrs: { level: 2 },
              content: [
                {
                  type: 'text',
                  text: 'Error ' + error?.statusCode,
                  marks: [
                    {
                      type: 'bold'
                    },
                    {
                      type: 'styled',
                      attrs: {
                        class: 'text-4xl'
                      }
                    }
                  ]
                },
                {
                  text: '.',
                  type: 'text',
                  marks: [
                    {
                      type: 'bold'
                    },
                    {
                      type: 'styled',
                      attrs: {
                        class: 'dot'
                      }
                    }
                  ]
                }
              ]
            },
            {
              type: 'hard_break'
            },
            {
              text: error?.message,
              type: 'text'
            },
            {
              type: 'hard_break'
            },
            {
              type: 'hard_break'
            },
          ]
        },
        figure: [
          {
            name: 'Error',
            component: 'MyAnimatedSvg'
          }
        ],
        link: {
          url: './',
          linktype: 'story',
          cached_url: './'
        },
        linkText: $t('backToHome')
      } as MyParagraph],
    }" />
  </NuxtLayout>
</template>

<style lang="scss" scoped>
.error {
  font-size: var(--font-3xl);
  padding-top: var(--space-3xl);
}
</style>
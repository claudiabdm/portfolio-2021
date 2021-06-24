import { mount } from '@vue/test-utils';
import MyButton from '@/components/MyButton.vue';

describe('MyButton', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(MyButton);
    expect(wrapper.vm).toBeTruthy();
  });
});

import { RouterLinkStub, shallowMount, Wrapper } from '@vue/test-utils';
import TheHeader from '@/components/TheHeader.vue';
describe('TheHeader', () => {
  let wrapper: Wrapper<any>;

  beforeEach(() => {
    wrapper = shallowMount(TheHeader, {
      stubs: {
        NuxtLink: RouterLinkStub,
        MyButtonDarkMode: {
          template: '<div></div>',
        },
      },
    });
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('should match the snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should return string with icon name', () => {
    const iconPath = wrapper.vm.iconPath('home');
    expect(iconPath).toContain('#home');
  });
});

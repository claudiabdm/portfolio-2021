import { shallowMount, Wrapper } from '@vue/test-utils';
import MyButtonDarkMode from '@/components/MyButtonDarkMode.vue';
describe('MyButtonDarkMode', () => {
  let wrapper: Wrapper<any>;
  window.matchMedia = () => {
    return {
      matches: false,
      addEventListener(_ev: string, cb: (e: MediaQueryListEvent) => void) {
        const event = {
          matches: false,
        } as MediaQueryListEvent;
        return cb(event);
      },
      removeEventListener() {},
    } as unknown as MediaQueryList;
  };
  beforeEach(() => {
    wrapper = shallowMount(MyButtonDarkMode, {
      propsData: {
        isDark: false,
      },
    });
  });

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('should match the snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should toggle dark theme', () => {
    const clickEvent = new MouseEvent('click');
    wrapper.vm.toggleDarkMode(clickEvent);
    expect(wrapper.vm.isDark).toBe(true);
  });

  it('should toggle light theme', () => {
    const clickEvent = new MouseEvent('click');
    wrapper.vm.toggleDarkMode(clickEvent);
    expect(wrapper.vm.isDark).toBe(true);
    wrapper.vm.toggleDarkMode(clickEvent);
    expect(wrapper.vm.isDark).toBe(false);
  });
});

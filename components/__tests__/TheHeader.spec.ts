import { createLocalVue, shallowMount, Wrapper } from '@vue/test-utils';
import TheHeader from '@/components/TheHeader.vue';
import VueRouter from 'vue-router';

describe('TheHeader', () => {
  let wrapper: Wrapper<any>;

  beforeEach(() => {
    wrapper = shallowMount(TheHeader, {
      mocks: {
        $route: {
          path: '/',
          to: '/',
        },
      },
      stubs: {
        MyButtonDarkMode: {
          template: '<div></div>',
        },
      },
    });
    jest.resetAllMocks();
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

  it('should call animation functions if window when innerWdith is smaller thant 1024', () => {
    const animateNavSpy = jest.spyOn(wrapper.vm, 'animateNav');
    global.innerWidth = 375;
    global.dispatchEvent(new Event('resize'));
    wrapper.vm.animateHeader();
    expect(animateNavSpy).toHaveBeenCalledWith(
      wrapper.vm.$refs.nav,
      100,
      0.5,
      2
    );
  });

  it('should change selected route when route changes', async () => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);
    const router = new VueRouter({
      routes: [
        {
          path: '/',
          name: 'home',
          component: {
            template: 'home',
          },
        },
        {
          path: '/projects',
          name: 'projects',
          component: {
            template: 'projects',
          },
        },
      ],
    });
    const wrapperRouter: Wrapper<any> = shallowMount(TheHeader, {
      localVue,
      router,
      stubs: {
        MyButtonDarkMode: {
          template: '<div></div>',
        },
      },
    });
    wrapperRouter.setData({ selectedRoute: '/projects' });
    await router.push('/projects');
    expect(wrapperRouter.vm.selectedRoute).toBe('/projects');
    await router.push('/');
    expect(wrapperRouter.vm.selectedRoute).toBe('/');
  });
});

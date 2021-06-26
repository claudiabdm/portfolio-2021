import { RouterLinkStub, shallowMount, Wrapper } from '@vue/test-utils';
import MyButton from '@/components/MyButton.vue';
describe('MyButton', () => {
  let wrapper: Wrapper<any>;

  beforeEach(() => {
    wrapper = shallowMount(MyButton, {
      stubs: {
        NuxtLink: RouterLinkStub,
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

  it('should emit buttonClicked event', () => {
    const emitSpy = jest.spyOn(wrapper.vm, '$emit');
    const clickEvent = new MouseEvent('click');
    wrapper.vm.onClick(clickEvent);
    expect(emitSpy).toHaveBeenCalledWith('buttonClicked', clickEvent);
  });

  it('should render button if is not link', async () => {
    await wrapper.setProps({
      blok: {
        isLink: false,
        link: {
          cached_url: '',
          linktype: '',
        },
      },
    });
    const button = wrapper.find('button.button').exists();
    const anchor = wrapper.find('a.button').exists();
    expect(button).toBeTruthy();
    expect(anchor).toBeFalsy();
  });

  it('should render anchor if is link', () => {
    wrapper = shallowMount(MyButton, {
      stubs: {
        NuxtLink: RouterLinkStub,
      },
      propsData: {
        blok: {
          isLink: true,
          link: {
            cached_url: '',
            linktype: 'story',
          },
        },
      },
    });
    const button = wrapper.find('button.button').exists();
    const anchor = wrapper.find('a.button').exists();
    expect(button).toBeFalsy();
    expect(anchor).toBeTruthy();
  });

  it('should render button with selected class if isSelected is true', async () => {
    await wrapper.setProps({
      blok: {
        isLink: false,
      },
      isSelected: true,
    });
    const button = wrapper.find('button.button.button--selected').exists();
    expect(button).toBeTruthy();
  });

  it('should render button with round class if isRound is true', async () => {
    await wrapper.setProps({
      blok: {
        isLink: false,
        isRound: true,
      },
    });
    const button = wrapper.find('button.button.button--round').exists();
    const buttonContainer = wrapper
      .find('.button-container.button-container--round')
      .exists();
    expect(button).toBeTruthy();
    expect(buttonContainer).toBeTruthy();
  });
});

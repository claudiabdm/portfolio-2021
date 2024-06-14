import type { StoryblokComponentType, ISbRichtext, ISbStoryData } from '@storyblok/js';

export interface MyButton extends StoryblokComponentType<'MyButton'> {
  text: string;
  isRound: boolean;
  isLink: boolean;
  link: {
    url: string;
    linktype: 'story';
    cached_url: string;
    story: {
      full_slug: string;
      slug: string;
    };
  };
}

export interface FilterButton extends MyButton {
  isRound: true;
  tag: 'vue' | 'angular' | 'nuxt' | 'vanilla' | 'show-all';
}

export interface MyButtonList extends StoryblokComponentType<'MyButtonList'> {
  buttons: MyButton[];
}

export interface MyHero extends StoryblokComponentType<'MyHero'> {
  text: ISbRichtext;
  buttonList: MyButtonList[];
}

export interface MyPage extends StoryblokComponentType<'MyPage'> {
  seo: Seo;
  body: StoryblokComponentType<
    | 'MyButton'
    | 'MyButtonList'
    | 'MyHero'
    | 'MyPage'
    | 'Config'
    | 'MyProject'
    | 'MyProjectList'
    | 'MyAnimatedSvg'
    | 'MyAnimatedSvg'
    | 'MyParagraph'
    | 'MyProfile'>[];
  title?: string;
}

export interface Config extends StoryblokComponentType<'Config'> {
  pages: ISbStoryData[];
}

export interface MyProject extends StoryblokComponentType<'MyProject'> {
  title: string;
  description: string;
  demo: {
    url: string;
    linktype: 'url';
  };
  code: {
    url: string;
    linktype: 'url';
  };
  media: MyImage['image'];
}

export interface MyProjectFilter {
  _uid: string;
  buttonList: FilterButton[];
}

export interface MyProjectList extends StoryblokComponentType<'MyProjectList'> {
  _uid: string;
  filter: [MyProjectFilter];
  body: {
    content: MyProject, tag_list?: string[];
    order?: number;
  }[];
}


export interface MyImage {
  width: number;
  height: number;
  image: {
    id: string;
    alt: string;
    filename: string;
  };
}

export interface MyAnimatedSvg extends StoryblokComponentType<'MyAnimatedSvg'> {
  name: 'Computer' | 'TechCompanies' | 'Camera' | 'Error';
}

export interface Figure extends MyAnimatedSvg { }
export interface Figure extends MyImage { }

export interface MyParagraph extends StoryblokComponentType<'MyParagraph'> {
  isReversed?: boolean;
  showScroll?: boolean;
  text: ISbRichtext;
  figure?: Figure[];
  linkText?: string;
  link?: {
    url: string;
    linktype: 'url' | 'asset' | 'story';
    cached_url: string;
  };
}

export interface MyProfile extends StoryblokComponentType<'MyProfile'> {
  profileImg: MyImage['image'],
  github: { url: string, id: 'github' };
  linkedin: { url: string, id: 'linkedin' };
  codepen: { url: string, id: 'codepen' };
  mastodon: { url: string, id: 'mastodon' };
}

export interface MyPost extends StoryblokComponentType<'MyPost'>, ISbStoryData<MyPost> {
  title: string;
  intro: string;
  longText: ISbRichtext;
  author: string;
  image: string;
  seo: Seo
}

interface Seo {
  title: string,
  description: string,
  og_image: string,
  og_title: string,
  og_description: string,
}


export interface MyPostList extends StoryblokComponentType<'MyPostList'> {
  posts: Array<MyPost | string>;
}
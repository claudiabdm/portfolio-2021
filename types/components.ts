export interface Button {
  _uid: string;
  text: string;
  isRound: boolean;
  isLink: boolean;
  link: {
    url: string;
    linktype: 'story';
    // eslint-disable-next-line camelcase
    cached_url: string;
  };
}

export interface FilterButton extends Button {
  isRound: true;
  tag: 'vue' | 'angular' | 'nuxt' | 'vanilla' | 'show-all';
}

export interface Hero {
  _uid: string;
  text: {
    type: 'doc';
    content: Object[];
  };
  buttonList: {
    _uid: string;
    buttons: Button[];
  };
}

export interface Page {
  title: string;
  body: Object;
}
export interface Project {
  _uid: string;
  title: string;
  description: string;
  demo: string;
  code: string;
  media: string;
}

export interface ProjectFilter {
  _uid: string;
  buttonList: FilterButton[];
}

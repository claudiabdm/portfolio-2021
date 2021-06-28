export interface Button {
  _uid: string;
  text: string;
  round: boolean;
  isLink: boolean;
  link: {
    url: string;
    linktype: 'story';
    // eslint-disable-next-line camelcase
    cached_url: string;
  };
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

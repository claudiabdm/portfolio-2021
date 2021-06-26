export interface Button {
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

export function getBreadcrumbList(path: string) {
  const pathArr = path.split('/').filter((elem) => elem !== '');
  const breadcrumbList = pathArr.reduce(
    (itemList: any[], elem: string, idx: number) => {
      const currentPath = pathArr.slice(0, idx + 1).join('/');
      itemList.push({
        '@type': 'ListItem',
        position: idx + 1,
        name: elem,
        item: `https://www.claudiabdm.com/${currentPath}`,
      });
      return itemList;
    },
    []
  );
  return {
    type: 'application/ld+json',
    json: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbList,
    },
  };
}
const siteinfo = {
  title: "Coheleth's Next Boilerplate",
  description: "Minimalist next.js SSG Boilerplate with SASS support and simple blog functionalities.",
  lang: "en",
  owner: "Coheleth",
  copyright: {
    name: "Diogo Piccirillo",
    year: new Date().getFullYear(),
  },
  home: {
    topPosts: 3,
  },
  blog: {
    thumbnails: true,
    pagination: {
      items: 3,
      maxPages: 1,
      prevNext: true,
      firstLast: true,
      centralised: true,
    },
  },
};
export default siteinfo;

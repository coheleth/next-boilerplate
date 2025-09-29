const siteinfo = {
  title: "Coheleth's Next Boilerplate",
  description:
    "Minimal next.js SSR Boilerplate with SASS support and simple blog functionalities.",
  lang: "en",
  owner: "Coheleth",
  copyright: {
    name: "Diogo Piccirillo",
    year: new Date().getFullYear(),
  },
  home: {
    topPosts: 2, // Number of blog posts shown in the home page
  },
  blog: {
    thumbnails: true,
    pagination: {
      items: 4, // Number of posts per page
      maxPages: 1, // Number of previous and next pages shown in pagination
      prevNext: true, // Show previous/next page link in pagination
      firstLast: true, // Show first/last page link in pagination
      centralised: true, // Centralise pagination links
    },
  },
};

export default siteinfo;

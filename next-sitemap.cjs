/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.accessexperts.com.au",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/api/*"],
  generateIndexSitemap: false,
};

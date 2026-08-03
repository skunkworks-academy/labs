const {themes: prismThemes} = require('prism-react-renderer');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Skunkworks Academy Labs',
  tagline: 'Practical, evidence-led technical labs',
  favicon: '/assets/icons/favicon-black.png',
  url: 'https://labs.skunkworksacademy.com',
  baseUrl: '/',
  organizationName: 'skunkworks-academy',
  projectName: 'labs',
  trailingSlash: true,
  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'skunkworks-page-head',
        content: 'mandatory-v1',
        'data-skunkworks-head': 'mandatory-v1',
      },
    },
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: 'labs/api-description',
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/skunkworks-academy/labs/edit/main/site/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.7,
          ignorePatterns: ['/search/**'],
        },
      },
    ],
  ],
  themeConfig: {
    image: 'https://raw.githubusercontent.com/skunkworks-academy/.github/refs/heads/main/images/favicon-black.png',
    metadata: [
      {name: 'description', content: 'Skunkworks Academy guided labs for APIs, cloud, security, data, networking and enterprise technology.'},
      {name: 'keywords', content: 'API labs, SOAP, OpenAPI, Swagger, GraphQL, WSDL, WADL, cybersecurity training, Skunkworks Academy'},
    ],
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Skunkworks Academy Labs',
      logo: {
        alt: 'Skunkworks Academy',
        src: 'https://raw.githubusercontent.com/skunkworks-academy/.github/refs/heads/main/images/favicon-black.png',
        srcDark: 'https://raw.githubusercontent.com/skunkworks-academy/.github/refs/heads/main/images/favicon-white.png',
      },
      items: [
        {to: '/labs/api-description/', label: 'API Description Labs', position: 'left'},
        {to: '/labs/api-description/capstone/', label: 'Capstone', position: 'left'},
        {href: 'https://labs.skunkworksacademy.com/labs/bits-and-bytes-101/', label: 'Existing Labs', position: 'left'},
        {href: 'https://portal.skunkworksacademy.com/', label: 'Portal', position: 'right'},
        {href: 'https://github.com/skunkworks-academy/labs', label: 'GitHub', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Labs',
          items: [
            {label: 'API Description Track', to: '/labs/api-description/'},
            {label: 'SOAP', to: '/labs/api-description/soap/'},
            {label: 'Swagger / OpenAPI', to: '/labs/api-description/openapi/'},
            {label: 'GraphQL', to: '/labs/api-description/graphql/'},
          ],
        },
        {
          title: 'Academy',
          items: [
            {label: 'Academy Home', href: 'https://skunkworksacademy.com/'},
            {label: 'Learner Portal', href: 'https://portal.skunkworksacademy.com/'},
            {label: 'Course Catalogue', href: 'https://catalog.skunkworksacademy.com/'},
          ],
        },
        {
          title: 'Standards',
          items: [
            {label: 'W3C SOAP', href: 'https://www.w3.org/TR/soap12/'},
            {label: 'OpenAPI Specification', href: 'https://spec.openapis.org/oas/'},
            {label: 'GraphQL Specification', href: 'https://spec.graphql.org/'},
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Skunkworks Academy. Dream. Design. Deliver.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'graphql', 'json', 'yaml'],
    },
  },
};

module.exports = config;

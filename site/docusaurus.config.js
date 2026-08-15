const {themes: prismThemes} = require('prism-react-renderer');

const GLOBAL_SHELL_LOADER_URL = 'https://www.skunkworksacademy.com/assets/academy-navigation.js';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Skunkworks Academy Labs',
  tagline: 'Practical, evidence-led technical labs',
  favicon: '/favicon.ico',
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
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        href: '/favicon.ico',
        sizes: 'any',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'shortcut icon',
        href: '/favicon.ico',
      },
    },
    {
      tagName: 'script',
      attributes: {
        src: GLOBAL_SHELL_LOADER_URL,
        defer: 'true',
        'data-skunkworks-global-shell': 'central',
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
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'security-tools',
        path: 'docs-security-tools',
        routeBasePath: 'labs/security-tools',
        sidebarPath: './sidebars-security-tools.js',
        editUrl: 'https://github.com/skunkworks-academy/labs/edit/main/site/',
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
      },
    ],
  ],
  themeConfig: {
    image: '/favicon.ico',
    metadata: [
      {name: 'description', content: 'Skunkworks Academy guided labs for APIs, vulnerability scanning, web security, CMS assessment, wireless analysis, Linux auditing and controlled exploitation.'},
      {name: 'keywords', content: 'API labs, SOAP, OpenAPI, GraphQL, OpenVAS, Nmap NSE, Burp Suite, OWASP ZAP, Nikto, Wapiti, WPScan, Aircrack-ng, Kismet, Lynis, Metasploit, cybersecurity training'},
    ],
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'graphql', 'json', 'yaml'],
    },
  },
};

module.exports = config;

const {themes: prismThemes} = require('prism-react-renderer');

const GLOBAL_SHELL_VERSION = '2026.08.15.2';
const GLOBAL_SHELL_URL = `https://skunkworksacademy.com/assets/academy-navigation.js?v=${GLOBAL_SHELL_VERSION}`;

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
        src: GLOBAL_SHELL_URL,
        defer: 'true',
        'data-skunkworks-global-shell': GLOBAL_SHELL_VERSION,
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
    image: 'https://raw.githubusercontent.com/skunkworks-academy/.github/refs/heads/main/images/favicon-black.png',
    metadata: [
      {name: 'description', content: 'Skunkworks Academy guided labs for APIs, vulnerability scanning, web security, CMS assessment, wireless analysis, Linux auditing and controlled exploitation.'},
      {name: 'keywords', content: 'API labs, SOAP, OpenAPI, GraphQL, OpenVAS, Nmap NSE, Burp Suite, OWASP ZAP, Nikto, Wapiti, WPScan, Aircrack-ng, Kismet, Lynis, Metasploit, cybersecurity training'},
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
        {to: '/labs/security-tools/', label: 'Security Tool Labs', position: 'left'},
        {to: '/labs/api-description/', label: 'API Description Labs', position: 'left'},
        {href: 'https://labs.skunkworksacademy.com/labs/bits-and-bytes-101/', label: 'Existing Labs', position: 'left'},
        {href: 'https://portal.skunkworksacademy.com/', label: 'Portal', position: 'right'},
        {href: 'https://github.com/skunkworks-academy/labs', label: 'GitHub', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Security labs',
          items: [
            {label: 'Security Tool Track', to: '/labs/security-tools/'},
            {label: 'Network Scanning', to: '/labs/security-tools/openvas/'},
            {label: 'Web Scanning', to: '/labs/security-tools/burp-suite/'},
            {label: 'Assessment Capstone', to: '/labs/security-tools/capstone/'},
          ],
        },
        {
          title: 'API labs',
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
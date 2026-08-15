/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  securityToolsSidebar: [
    'index',
    {
      type: 'category',
      label: 'Network vulnerability scanning',
      collapsed: false,
      items: ['openvas', 'nmap-nse'],
    },
    {
      type: 'category',
      label: 'Web application scanning',
      collapsed: false,
      items: ['burp-suite', 'owasp-zap', 'nikto', 'wapiti'],
    },
    {
      type: 'category',
      label: 'CMS scanning',
      collapsed: false,
      items: ['wpscan', 'droopescan', 'cmsmap'],
    },
    {
      type: 'category',
      label: 'Wireless assessment',
      collapsed: false,
      items: ['aircrack-ng', 'kismet'],
    },
    {
      type: 'category',
      label: 'System auditing and validation',
      collapsed: false,
      items: ['lynis', 'metasploit'],
    },
    'capstone',
  ],
};

module.exports = sidebars;

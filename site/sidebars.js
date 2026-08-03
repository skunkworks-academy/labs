/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  apiDescriptionSidebar: [
    'index',
    {
      type: 'category',
      label: 'API description and discovery',
      collapsed: false,
      items: ['soap', 'openapi', 'graphql', 'wsdl', 'wadl'],
    },
    'capstone',
  ],
};

export default sidebars;

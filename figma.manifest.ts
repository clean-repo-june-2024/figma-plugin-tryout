// https://www.figma.com/plugin-docs/manifest/
export default {
  name: "Hello-Frigma",
  id: "1222852692367737513",
  api: "1.0.0",
  main: "plugin.js",
  ui: "index.html",
  capabilities: [],
  enableProposedApi: false,
  editorType: ["figma", "figjam"],
  networkAccess: {
    "devAllowedDomains": [
      "localhost"
    ],
    "allowedDomains": [
      "none"
    ]
  }
};

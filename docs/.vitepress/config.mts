import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Sun's Blog",
  description: "前端开发工程师🧑‍💻",
  themeConfig: {
    logo: { src: "/lpz_transparent.webp", width: 24, height: 24 },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/sun-unc" },
    ],

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2023-present Sun",
    },
  },
  base: "/sun-blog/",
});

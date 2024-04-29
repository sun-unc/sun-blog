import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Sun's Blog",
  description: "前端开发工程师🧑‍💻",
  themeConfig: {
    logo: { src: "/lpz_transparent.webp", width: 24, height: 24 },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "主页", link: "/" },
      { text: "JavaScript", link: "/JavaScript/base/作用域和作用域链" },
      { text: "TypeScript", link: "/TypeScript/" },
      { text: "Vue", link: "/Vue/" },
      { text: "前端工程化", link: "/Engineering/" },
      { text: "其他", link: "/Other/" },
      { text: "个人简历", link: "/Resume/" },
    ],

    sidebar: {
      "/JavaScript/": [
        {
          text: "基础",
          items: [
            {
              text: "作用域和作用域链",
              link: "/JavaScript/base/作用域和作用域链",
            },
            {
              text: "执行上下文和执行栈",
              link: "/JavaScript/base/执行上下文和执行栈",
            },
            {
              text: "词法环境、变量环境及this指向",
              link: "/JavaScript/base/词法环境、变量环境及this指向",
            },
          ],
        },
        {
          text: "进阶",
          items: [
            {
              text: "垃圾回收机制",
              link: "/JavaScript/advance/垃圾回收机制",
            },
          ],
        },
      ],
    },

    outline: {
      level: "deep",
      label: "概要 📖",
    },

    socialLinks: [{ icon: "github", link: "https://github.com/sun-unc" }],

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2023-present Sun",
    },

    lastUpdated: {
      text: "上次编辑于",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium",
      },
    },
  },
  base: "/sun-blog/",
});

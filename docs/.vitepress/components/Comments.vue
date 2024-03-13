<script setup lang="ts">
import { useData } from "vitepress";

const { frontmatter, title } = useData();
/**
 * 通过MutationObserver监听html标签属性变化
 */
const observer = new MutationObserver((mutations) => {
  const attributes = Array.from((mutations[0].target as HTMLElement).classList);
  if (attributes.includes("dark")) {
    changeGiscusTheme("dark");
  } else {
    changeGiscusTheme("light");
  }
});
const html = document.getElementsByTagName("html")[0];
observer.observe(html, { attributes: true });

/**
 * 手动切换主题
 */
function changeGiscusTheme(theme) {
  sendMessage({
    setConfig: {
      theme: theme,
    },
  });
}

/**
 * 通过iframe通信与giscus通信
 */
function sendMessage(message) {
  const iframe = document.querySelector("iframe.giscus-frame") as any;
  if (!iframe) return;
  iframe.contentWindow.postMessage({ giscus: message }, "https://giscus.app");
}
</script>

<template>
  <div v-if="frontmatter.comments !== false" :key="title" class="giscus">
    <component
      :is="'script'"
      src="https://giscus.app/client.js"
      data-repo="sun-unc/sun-blog"
      data-repo-id="R_kgDOKXjjXg"
      data-category="Announcements"
      data-category-id="DIC_kwDOKXjjXs4Cd52f"
      data-mapping="pathname"
      data-strict="0"
      data-reactions-enabled="1"
      data-emit-metadata="0"
      data-input-position="top"
      data-lang="zh-CN"
      data-loading="lazy"
      crossorigin="anonymous"
      async
    />
  </div>
</template>

<style scoped>
.giscus {
  margin-top: 24px;
}
</style>

// https://vitepress.dev/guide/custom-theme
import Theme from "vitepress/theme";
import Layout from "../layout/Layout.vue";
import "./style.css";

export default {
  extends: Theme,
  Layout,
  enhanceApp({ app, router, siteData }) {
    // ...
  },
};

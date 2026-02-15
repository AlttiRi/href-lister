import {createApp} from "vue";
import App from "./App.vue";

createApp(App).mount("#app");

// Instead of
// <link href="https://alttiri.github.io/3rd-party-libs/bootstrap.css" rel="stylesheet"
//       integrity="sha256-IrRkRhwdO2IcP2+1tni2UxqwpwTQ4b0Hjd03G4dHPbA=" crossorigin="anonymous">
import "./style/bootstrap.scss";

import "@alttiri/popup-enhance/css/popup.css";

import "./style/main.scss";
import "./style/tag.scss";

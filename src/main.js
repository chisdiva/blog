import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import Prism from 'prismjs';

import VMdPreviewHtml from '@kangc/v-md-editor/lib/preview-html'
import '@kangc/v-md-editor/lib/style/preview-html.css';

import router from "@/router";

axios.interceptors.request.use(config => {
  let url = config.url;
  //判断是否为manager页面
  if(router.currentRoute.path.split('/').pop() === 'manager') {
    let token = localStorage.getItem('token')
    console.log(token)
    if(token) {
      config.headers['Access-Token'] = token
      console.log(config)
    }
  }
  return config
},function(error) {
  return Promise.reject(error);
})

// axios.interceptors.response.use(config => {
//   if(config.headers.code === '2') {
//     router.replace('/login')
//   }
//   else {
//     return config
//   }
// })
axios.defaults.baseURL = 'http://110.42.141.74:7866/'
Vue.prototype.$axios = axios
Vue.config.productionTip = false

VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});

Vue.use(VueMarkdownEditor);
Vue.use(VMdPreviewHtml);

Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

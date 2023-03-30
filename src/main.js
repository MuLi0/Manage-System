import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./utils/directives";

Vue.use(ElementUI);

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  // 对页面的标题进行设置，获取路由元信息当中的 title
  document.title = `${to.meta.title} | vue-manage-system`;
  // 获取本地存储的用户名
  const role = localStorage.getItem("ms_username");
  // 判断是否存在用户名以及下一个钩子是否是跳转到 '/login'
  if (!role && to.path !== "/login") {
    // 跳转到 '/login'
    next("/login");
  } else {
    next();
  }
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

Vue.prototype.$ELEMENT = { size: "small", zIndex: 3000 };

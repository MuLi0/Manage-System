import Vue from "vue";
import VueRouter from "vue-router";
// import vHome from "../components/common/Home.vue";
// import vLogin from "../components/page/Login.vue";
// import vChild from "../components/page/Children.vue";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "/",
      // 设置重定向，将 Dashboard 组件设为默认路由组件
      redirect: "/dashboard",
    },
    {
      path: "/",
      component: () => import("../components/common/Home.vue"),
      meta: { title: "自述" },
      children: [
        {
          // 此时的系统首页是嵌套在 Home 组件当中的
          path: "/dashboard",
          component: () => import("../components/page/Dashboard.vue"),
          meta: { title: "系统首页" },
        },
        {
          path: "tabs",
          component: () => import("../components/page/Tabs.vue"),
          meta: { title: "tab选项卡" },
        },
        {
          path: "table",
          component: () => import("../components/page/BaseTable.vue"),
          meta: { title: "基础表格" },
        },
        {
          // 拖拽列表组件
          path: "drag",
          component: () => import("../components/page/DragList.vue"),
          meta: { title: "拖拽列表" },
        },
        {
          // 拖拽 Dialog 组件
          path: "dialog",
          component: () => import("../components/page/DragDialog.vue"),
          meta: { title: "拖拽弹框" },
        },
      ],
    },
    {
      path: "/login",
      component: () => import("../components/page/Login.vue"),
    },
  ],
});
// routes: [
//   // 设置路由配置
//   {
//     // 设置 URL
//     path: "/home",
//     // 设置对应组件
//     component: vHome,
//     // 设置相应元信息
//     meta: {
//       title: "Home组件",
//     },
//     children: [
//       {
//         path: "child",
//         component: vChild,
//       },
//       {
//         path: "child1",
//         component: () => import("../components/page/Children1.vue"),
//       },
//       {
//         path: "first",
//         component: () => import("../components/page/First.vue"),
//       },
//       {
//         path: "second",
//         component: () => import("../components/page/Second.vue"),
//       },
//     ],
//   },
//   {
//     path: "/login",
//     component: vLogin,
//     meta: {
//       title: "Login组件",
//     },
//   },
//   {
//     path: "/demo",
//     component: () => import("../components/page/EleDemo.vue"),
//   },
// ],

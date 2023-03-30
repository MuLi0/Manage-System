<template>
    <!-- 拖拽列表组件 -->
    <section class="main">
      <!-- 面包屑 -->
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item
            ><i class="el-icon-rank"></i> 拖拽组件</el-breadcrumb-item
          >
          <el-breadcrumb-item>拖拽排序</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="container">
        <!-- 提示栏 -->
        <div class="plugins-tips">
          Vue.Draggable：基于 Sortable.js 的 Vue 拖拽组件。 访问地址：<a
            href="https://github.com/SortableJS/Vue.Draggable"
            target="_blank"
            >Vue.Draggable</a
          >
        </div>
        <!-- 拖拽列表区域 -->
        <div class="drag-box">
          <!-- 第一个拖拽区域 -->
          <div class="drag-box-item">
            <!-- 区域标题 -->
            <div class="item-title">todo</div>
            <!-- 拖拽容器 v-model 绑定 todo 数组。remove 从列表中移除元素时触发。 :options：通过绑定 options 来设置配置项-->
            <draggable
              v-model="todo"
              @remove="removeHandle"
              :options="dragOptions"
            >
              <!-- 列表过渡  tag：指定 transition-group 渲染为指定的元素 -->
              <transition-group tag="div" id="todo" class="item-ul">
                <!-- 循环 todo 列表，渲染 todo 列表的内容 -->
                <div v-for="item in todo" class="drag-list" :key="item.id">
                  {{item.content}}
                </div>
              </transition-group>
            </draggable>
          </div>
          <!-- 第二个拖拽区域 -->
          <div class="drag-box-item">
            <div class="item-title">doing</div>
            <draggable
              v-model="doing"
              @remove="removeHandle"
              :options="dragOptions"
            >
              <transition-group tag="div" id="doing" class="item-ul">
                <div v-for="item in doing" class="drag-list" :key="item.id">
                  {{item.content}}
                </div>
              </transition-group>
            </draggable>
          </div>
          <!-- 第三个拖拽区域 -->
          <div class="drag-box-item">
            <div class="item-title">done</div>
            <draggable
              v-model="done"
              @remove="removeHandle"
              :options="dragOptions"
            >
              <transition-group tag="div" id="done" class="item-ul">
                <div v-for="item in done" class="drag-list" :key="item.id">
                  {{item.content}}
                </div>
              </transition-group>
            </draggable>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
    import draggable from "vuedraggable";
    export default {
      name: "draglist",
      data() {
        return {
          dragOptions: {
            // 动画时间 单位：ms
            animation: 120,
            // 当排序的容器是个可滚动的区域，拖放可以引起区域滚动
            scroll: true,
            // 分组用的，同一组的不同 list 可以相互拖动
            group: "sortlist",
            // selector 格式为简单 css 选择器的字符串，当拖动列表单元时会生成一个副本作为影子单元来模拟被拖动单元排序的情况
            // 此配置项就是来给这个影子单元添加一个 class，我们可以通过这种方式来给影子元素进行编辑样式
            ghostClass: "ghost-style",
          },
          todo: [
            {
              id: 1,
              content: "开发图表组件",
            },
            {
              id: 2,
              content: "开发拖拽组件",
            },
            {
              id: 3,
              content: "开发权限测试组件",
            },
          ],
          doing: [
            {
              id: 1,
              content: "开发登录注册页面",
            },
            {
              id: 2,
              content: "开发头部组件",
            },
            {
              id: 3,
              content: "开发表格相关组件",
            },
            {
              id: 4,
              content: "开发表单相关组件",
            },
          ],
          done: [
            {
              id: 1,
              content: "初始化项目，生成工程目录，完成相关配置",
            },
            {
              id: 2,
              content: "开发项目整体框架",
            },
          ],
        };
      },
      components: {
        draggable,
      },
      methods: {
        removeHandle(event) {
          console.log(event);
          this.$message.success(`从 ${event.from.id} 移动到 ${event.to.id} `);
        },
      },
    };
  </script>
  
  <style scoped>
    .drag-box {
      display: flex;
      user-select: none;
    }
    .drag-box-item {
      flex: 1;
      max-width: 330px;
      min-width: 300px;
      background-color: #eff1f5;
      margin-right: 16px;
      border-radius: 6px;
      border: 1px #e1e4e8 solid;
    }
    .item-title {
      padding: 8px 8px 8px 12px;
      font-size: 14px;
      line-height: 1.5;
      color: #24292e;
      font-weight: 600;
    }
    .item-ul {
      padding: 0 8px 8px;
      height: 500px;
      overflow-y: scroll;
    }
    .item-ul::-webkit-scrollbar {
      width: 0;
    }
    .drag-list {
      border: 1px #e1e4e8 solid;
      padding: 10px;
      margin: 5px 0 10px;
      list-style: none;
      background-color: #fff;
      border-radius: 6px;
      cursor: pointer;
      -webkit-transition: border 0.3s ease-in;
      transition: border 0.3s ease-in;
    }
    .drag-list:hover {
      border: 1px solid #20a0ff;
    }
    .drag-title {
      font-weight: 400;
      line-height: 25px;
      margin: 10px 0;
      font-size: 22px;
      color: #1f2f3d;
    }
    .ghost-style {
      display: block;
      color: transparent;
      border-style: dashed;
    }
  </style>
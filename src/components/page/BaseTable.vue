<template>
    <!-- 基础表格组件 -->
    <div>
      <!-- 面包屑导航 -->
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <i class="el-icon-lx-cascades"></i> 基础表格
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="container">
        <!-- 操作栏 -->
        <div class="handle-box">
          <!-- 批量删除按钮 type="primary" 设置风格为主要按钮 -->
          <el-button
            type="primary"
            icon="el-icon-delete"
            class="handle-del mr10"
            @click="delAllSelection"
            >批量删除</el-button
          >
  
          <!-- 地址下拉栏 v-model 的值为被选中的 el-option 的 value 属性值 -->
          <el-select
            v-model="query.address"
            placeholder="地址"
            class="handle-select mr10"
          >
            <!-- 下拉选项一 -->
            <el-option key="1" label="广东省" value="广东省"></el-option>
            <!-- 下拉选项二 -->
            <el-option key="2" label="湖南省" value="湖南省"></el-option>
          </el-select>
  
          <!-- 搜索输入框 双向绑定数据，实时搜索 -->
          <el-input
            v-model="query.name"
            placeholder="用户名"
            class="handle-input mr10"
          ></el-input>
          <!-- 搜索按钮 type="primary" 设置风格为主要按钮 -->
          <el-button type="primary" icon="el-icon-search" @click="handleSearch"
            >搜索</el-button
          >
        </div>
        <!-- 表格 el-table 绑定 data 对象后，el-table-column 可以通过 prop 键入对象中的键名，从而引入对应的值 -->
        <!-- border：是否带有纵向边框 -->
        <!-- header-cell-class-name：表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className -->
        <!-- selection-change：当选择项发生变化时，触发该事件 -->
        <el-table
          :data="tableData"
          border
          class="table"
          ref="multipleTable"
          header-cell-class-name="table-header"
          @selection-change="handleSelectionChange"
        >
          <!-- type="selection" 设置多选框，如果设置了 index 则显示该行的索引（从 1 开始计算）；如果设置了 expand 则显示为一个可展开的按钮-->
          <el-table-column
            type="selection"
            width="55"
            align="center"
          ></el-table-column>
          <!-- id -->
          <el-table-column
            prop="id"
            label="ID"
            width="55"
            align="center"
          ></el-table-column>
          <!-- 用户名 -->
          <el-table-column prop="name" label="用户名"></el-table-column>
          <!-- 余额 -->
          <el-table-column label="账户余额">
            <!-- 作用域插槽 -->
            <template v-slot="scope">￥{{scope.row.money}}</template>
          </el-table-column>
          <!-- 头像 -->
          <el-table-column label="头像(查看大图)" align="center">
            <template v-slot="scope">
              <el-image
                class="table-td-thumb"
                :src="scope.row.thumb"
                :preview-src-list="[scope.row.thumb]"
              ></el-image>
            </template>
          </el-table-column>
          <!-- 地址 -->
          <el-table-column prop="address" label="地址"></el-table-column>
          <!-- 状态 -->
          <el-table-column label="状态" align="center">
            <template v-slot="scope">
              <el-tag
                :type="scope.row.state==='成功'?'success':(scope.row.state==='失败'?'danger':'')"
                >{{scope.row.state}}</el-tag
              >
            </template>
          </el-table-column>
          <!-- 注册时间 -->
          <el-table-column prop="date" label="注册时间"></el-table-column>
          <!-- 操作 -->
          <el-table-column label="操作" width="180" align="center">
            <template v-slot="scope">
              <el-button
                type="text"
                icon="el-icon-edit"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                type="text"
                icon="el-icon-delete"
                class="red"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页导航 -->
        <div class="pagination">
          <!-- background：是否添加背景色。layout：组件布局，子组件名用逗号分隔。current-page：当前页数。page-size：每页显示条目个数。total：总条目数。current-change：currentPage 改变时会触发  -->
          <el-pagination
            background
            layout="total, prev, pager, next"
            :current-page="query.pageIndex"
            :page-size="query.pageSize"
            :total="pageTotal"
            @current-change="handlePageChange"
          ></el-pagination>
        </div>
      </div>
  
      <!-- 编辑弹出框 title：弹出对话框的标题。visible：是否显示 Dialog，支持 .sync 修饰符 -->
      <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
        <el-form ref="form" :model="form" label-width="70px">
          <el-form-item label="用户名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </template>
  
  <script>
    import { fetchData } from "../../api/index.js";
    export default {
      name: "basetable",
      data() {
        return {
          query: {
            address: "",
            name: "",
            pageIndex: 1,
            pageSize: 10,
          },
          tableData: [],
          multipleSelection: [],
          delList: [],
          editVisible: false,
          pageTotal: 0,
          form: {},
          idx: -1,
          id: -1,
        };
      },
      created() {
        this.getData();
      },
      methods: {
        // 获取模拟数据
        getData() {
          fetchData(this.query).then((res) => {
            this.tableData = res.list;
            this.pageTotal = res.pageTotal || 50;
          });
        },
        // 触发搜索按钮
        handleSearch() {
          this.$set(this.query, "pageIndex", 1);
          this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
          // 二次确认删除
          this.$confirm("确定要删除吗？", "提示", {
            type: "warning",
          })
            .then(() => {
              this.$message.success("删除成功");
              this.tableData.splice(index, 1);
            })
            .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        delAllSelection() {
          const length = this.multipleSelection.length;
          if (length) {
            let str = "";
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
              str += this.multipleSelection[i].name + " ";
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
          } else {
            this.$message.error(`未选中列表`);
          }
        },
  
        // 编辑操作
  
        handleEdit(index, row) {
          this.idx = index;
          this.form = row;
          this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
          this.editVisible = false;
          this.$message.success(`修改第 ${this.idx + 1} 行成功`);
          this.$set(this.tableData, this.idx, this.form);
        },
        // 分页导航
        handlePageChange(val) {
          this.$set(this.query, "pageIndex", val);
          this.getData();
        },
      },
    };
  </script>
  
  <style scoped>
    .handle-box {
      margin-bottom: 20px;
    }
  
    .handle-select {
      width: 120px;
    }
  
    .handle-input {
      width: 300px;
      display: inline-block;
    }
    .table {
      width: 100%;
      font-size: 14px;
    }
    .red {
      color: #ff0000;
    }
    .mr10 {
      margin-right: 10px;
    }
    .table-td-thumb {
      display: block;
      margin: auto;
      width: 40px;
      height: 40px;
    }
  </style>
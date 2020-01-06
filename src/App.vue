<template>
  <div id="app">
    <el-container>
      <el-header>
        <div class="header">
          <div class="menu">
            <i class="el-icon-menu head-icon"></i>
          </div>
          <div class="title">{{msg}}</div>
        </div>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      msg: "实时热点"
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
  computed: {
    isBack() {
      return ["/"].indexOf(this.$route.path) < 0;
    }
  }
};
</script>

<style>
.el-header {
  padding: 0 5px;
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
.el-main{
  padding: 0 5px;
}
.el-col {
  border-radius: 4px;
}
.el-image{
  width: 100%;
  height: 100%;
}
.image-slot{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #f5f7fa;
  color: #909399;
}
.head_title {
  text-align: center;
}
.header {
  display: flex;
  align-items: center;
}
.menu {
  text-align: center;
  width: 10%;
}
.title {
  text-align: center;
  width: 90%;
}
</style>

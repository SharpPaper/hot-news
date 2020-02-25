<template>
  <div id="app">
    <el-container style="heigth:100%; direction:vertical">
      <el-header height="45px">
        <div class="header">
          <div class="menu">
            <i v-if="isBack" class="el-icon-back head-icon" @click="goBack"></i>
            <i v-else class="el-icon-setting head-icon" @click="showSettings"></i>
          </div>
          <div class="title">{{settings.msg}}</div>
        </div>
      </el-header>
      <el-main style="width:100%">
        <keep-alive>
          <router-view v-if="this.$route.meta && this.$route.meta.keepAlive" style="width:100%" v-on:change-page="pageChange" />
        </keep-alive>
        <router-view v-if="!this.$route.meta || !this.$route.meta.keepAlive" style="width:100%" v-on:change-page="pageChange"/>
      </el-main>
    </el-container>
    <el-drawer title="设置" :visible.sync="showDrawer" direction="ltr" size="60%" :show-close="false">
      <el-form ref="form" v-model="settings" label-width="40px" class="form">
        <el-form-item label="标题">
          <el-input v-model="settings.msg" :clearable="true"></el-input>
        </el-form-item>
        <el-form-item label="请求方式">
          <el-switch v-model="settings.isHttps"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="Save">保存</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      showDrawer: false,
      settings: {
        msg: "",
        isHttps: true
      }
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    showSettings() {
      this.showDrawer = true;
    },
    closeSettings() {
      this.showDrawer = false;
    },
    pageChange(str) {
      if (str === "news-item") {
        this.msg = "热点详情";
      }
    },
    setSettings() {
      var settings = this.settings;
      console.log(settings);
      localStorage.setItem("settings", JSON.stringify(settings));
    },
    getSettings() {
      let str = localStorage.getItem("settings");
      let settings = str
        ? JSON.parse(str)
        : { msg: "实时热点", isHttps: true };
      return settings;
    },
    Save() {
      this.setSettings();
      this.settings = this.getSettings();
      this.getBaseUrl();
      this.closeSettings();
      this.reload()
    },
    getBaseUrl(){
      let baseUrl = this.$ajax.defaults.baseURL;
      let protocal = this.settings.isHttps ? "https" : "http";
      let index = baseUrl.indexOf(":");
      baseUrl = protocal + baseUrl.slice(index);
      console.log(baseUrl);
      this.$ajax.defaults.baseURL = baseUrl;
    },
    reload(){
      this.$nextTick(()=>{
        location.reload();
      })
    }
  },
  created() {
    this.settings = this.getSettings();
    this.getBaseUrl();
    console.log(this.$ajax.defaults);
  },
  computed: {
    isBack() {
      return ["/"].indexOf(this.$route.path) < 0;
    }
  },
  watch: {
    $route(to, from) {
      if (to.name === "NewsList") {
        this.msg = "实时热点";
      }
    },
    'settings.isHttps'(isHttps){
      console.log(isHttps);
    }
  }
};
</script>

<style>
.el-header {
  padding: 0;
  background-color: #b3c0d1;
  color: #333;
  line-height: 45px;
}
.el-main {
  padding: 0;
}
.el-col {
  border-radius: 4px;
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
:focus {
  outline: 0;
}
.form {
  padding: 0 15px;
}
</style>

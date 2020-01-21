<template>
  <vertical-pull :down-func="pulldown" ref="verticalpull">
    <ul>
      <li v-for="(item,index) in newsList" :key="index">
        <el-row :gutter="10">
          <el-col :span="6">
            <div class="pic">
              <el-image
                class="image"
                :src="item.image"
                fit="scale-down"
                :preview-src-list="srcList"
              >
                <div slot="error">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </div>
          </el-col>
          <el-col :span="18">
            <div class="introduction">
              <router-link v-if="item.link" class="item-title" :to="{ path :'/NewsItem',query:{url:item.link}}">{{item.keyword}}&gt;&gt;</router-link>
              <router-link v-else class="item-title" :to="{ path :'/NewsItem',query:{url:'https://www.baidu.com/s?wd='+item.keyword}}">{{item.keyword}}&nbsp;<i class="el-icon-search"></i></router-link>
              
              <p class="description">{{item.title}}</p>
            </div>
          </el-col>
        </el-row>
        <el-divider></el-divider>
      </li>
    </ul>
  </vertical-pull>
</template>

<script>
export default {
  name: "NewsList",
  data() {
    return {
      msg: "实时热点",
      newsList: [],
      srcList: [],
      wrapperHeight: 0
    };
  },
  methods: {
    refresh: function() {
      var self = this;
      this.$ajax
        .get("GetNewsList")
        .then(res => {
          self.srcList = [];
          res.data.forEach(item => {
            if (item.image) {
              self.srcList.push(item.image);
            } else {
              item.image = "";
            }
          });
          self.newsList = res.data;
        })
        .finally(() => {
          self.$refs.verticalpull.onDownFunc();
        });
    },
    pulldown() {
      this.refresh();
    },
    show: function() {
      // const viewer = this.$el.querySelector(".img-radius").$viewer;
      // viewer.show();
    }
  },
  created: function() {
  },
  mounted: function() {
    this.refresh();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.image {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #f5f7fa;
  color: #909399;
}
.item-title {
  font-size: 16px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
  font-size: 0.8em;
}
a {
  text-decoration: none;
  color: #0366d6;
}
a:hover {
  text-decoration: underline;
}
.el-divider {
  margin: 12px 0;
}
.el-col {
  height: 75px;
}
/* .el-image {
  height: 100%;
  width: 100px;
} */
.pic {
  display: flex;
  height: 100%;
}
.introduction {
  height: 100%;
}
.description {
  margin: 0 auto;
}
</style>

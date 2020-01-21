<template>
  <div class="content" :style="{ 'transform': transform }">
    <div class="down-pull" v-if="downFunc" 
        v-loading="loading"
        :element-loading-text="downText||upText"
        element-loading-spinner="el-icon-loading">
    </div>
    <slot></slot>
    <div class="up-pull" v-if="upFunc"></div>
  </div>
</template>

<script>
import Vue from "vue";
import { Loading } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;
export default {
  name: "vertical-pull",
  props: {
    downPullText: {
      type: String,
      default: "下拉刷新"
    },
    downDropText: {
      type: String,
      default: "释放刷新"
    },
    downLoadingText: {
      type: String,
      default: "加载中..."
    },
    downFunc: {
      type: Function
    },
    upPullText: {
      type: String,
      default: "上拉加载"
    },
    upDropText: {
      type: String,
      default: "释放加载"
    },
    upLoadingText: {
      type: String,
      default: "加载中..."
    },
    upFunc: {
      type: Function
    },
    distance: {
      type: Number,
      default: 70
    }
  },
  data() {
    return {
      loading: true,
      translate: 0,
      downText: "",
      downDropped: false,
      upText: "",
      upDropped: false,
      direction: "",
      startY: 0,
      startScrollTop: 0,
      currentY: 0,
      downStatus: "",
      upStatus: ""
    };
  },
  computed: {
    transform() {
      return this.translate === 0
        ? null
        : "translate3d(0, " + this.translate + "px, 0)";
    }
  },
  watch: {
    downStatus(val){
      switch(val){
        case 'drop':
          this.downText = this.downDropText;
          break;
        case 'loading':
          this.downText = this.downLoadingText;
          break;
        default:
          this.downText = this.downPullText;
          break;
      }
    }
  },
  methods: {
    onDownFunc() {
      this.translate = 0;
      //this.downStatus = "pull";
      setTimeout(() => {
        this.downStatus = "pull";
      }, 200);
    },
    init() {
      this.downText = this.downPullText;
      if (typeof this.downFunc === "function") {
        this.bindTouchEvents();
      }
    },
    bindTouchEvents() {
      this.$el.addEventListener("touchstart", this.handleTouchStart);
      this.$el.addEventListener("touchmove", this.handleTouchMove);
      this.$el.addEventListener("touchend", this.handleTouchEnd);
    },
    handleTouchStart(event) {
      
      this.startY = event.touches[0].clientY;
      if (this.downStatus !== "loading") {
        this.downStatus = "pull";
        this.downDropped = false;
      }
      if (this.upStatus !== "loading") {
        this.upStatus = "pull";
        this.upDropped = false;
      }
    },
    handleTouchMove(event) {
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop > 0) return;
      // 在包裹元素外则返回
      if (
        this.startY < this.$el.getBoundingClientRect().top &&
        this.startY > this.$el.getBoundingClientRect().bottom
      ) {
        return;
      }
      this.currentY = event.touches[0].clientY;
      let distanceY = (this.currentY - this.startY) / 2;
      this.direction = distanceY > 0 ? "down" : "up";
      if (
        typeof this.downFunc === "function" &&
        this.direction === "down" &&
        this.downStatus !== "loading"
      ) {
        event.preventDefault();
        event.stopPropagation();
        this.translate = distanceY;
        this.downStatus = this.translate > 80 ? "drop" : "pull";
      }
    },
    handleTouchEnd(event) {
      if (this.direction === "down" && this.translate > 0) {
        this.downDropped = true;
        if (this.downStatus === "drop") {
          this.translate = "50";
          this.downStatus = "loading";
          this.downFunc();
        } else {
          this.translate = "0";
          this.downStatus = "pull";
        }
      }
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style>
.down-pull {
  height: 50px;
  margin-top: -50px;
}
.up-pull {
  margin-bottom: -50px;
}
</style>
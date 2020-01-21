<template>
  <div class="item">
    <iframe :src="url" class="view" ref="view">

    </iframe>
  </div>
</template>

<script>

export default {
  name:'NewsItem',
  data(){
    return {
      url:'',
    }
  },
  created(){
    this.$emit('change-page','news-item');
    this.url = this.$route.query.url;
  },
  mounted(){
    var ifr = this.$refs.view;
    var doc = ifr.contentDocument || ifr.document;
    var height = window.outerHeight - 45;
    ifr.height = height;
  }
};
</script>

<style>
.item{
  width: 100%
}
.view{
  padding: 0;
  margin: 0 auto;
  border: none;
  width: 100%;
}
</style>
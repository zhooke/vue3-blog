<template>
  <div>
    <el-input
      v-model="search_data"
      class="header-search"
      size="large"
      placeholder="请输入搜索内容"
      prefix-icon="Search"
      clearable
      @change="search"
    ></el-input>
  </div>
</template>

<script>

export default {
  name: 'HeaderCard',
  data() {
    return {
      search_data: ''
    }
  },
  methods: {
    search() {
      this.$router.push({ path: '/blog/list', query: { title: this.search_data } })
    }
  }
}
</script>

<style scoped>
.header-search {
  width: 100%;
  padding: 3px 0;
}

</style>

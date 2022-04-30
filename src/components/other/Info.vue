<template>
<!--  因为父级使用了el-backtop .page-component__scroll .el-scrollbar__wrap 在此需要使用el-scrollbar-->
  <el-scrollbar>
  <div v-for="item in contents" :key="item" class="info-content">
    <VueShowdown :markdown="item.typeValue"/>
  </div>
  </el-scrollbar>
</template>

<script>
import { getDictionaryApi } from '@/utils/api';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Info',
  data() {
    return {
      contents: []
    }
  },
  methods: {
    async getDictionary(param){
      const { data: result } =  await getDictionaryApi(param)
      this.contents = result.data
    }
  },
  mounted() {
    this.getDictionary('blog_info')
  }
}
</script>

<style lang="less" scoped>
.info-content{
  text-align: initial;
  margin: 20px;
}
</style>

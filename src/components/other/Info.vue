<template>
  <!--  因为父级使用了el-backtop .page-component__scroll .el-scrollbar__wrap 在此需要使用el-scrollbar-->
  <div style="height: 100%">
    <el-scrollbar>
      <div v-for="item in contents" :key="item" class="info-content">
        <VueShowdown :markdown="item.typeValue"/>
      </div>
      <comment :blog="blog"/>
    </el-scrollbar>
  </div>

</template>

<script>
import { getDictionaryApi } from '@/utils/api';
import Comment from '@/components/other/Comment';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Info',
  components: { Comment },
  data() {
    return {
      contents: [],
      blog: {
        createUserId: 1000000
      }
    }
  },
  methods: {
    async getDictionary(param) {
      const { data: result } = await getDictionaryApi(param)
      this.contents = result.data
      this.blog.id = result.data.id
    }
  },
  mounted() {
    this.getDictionary('blog_info')
  }
}
</script>

<style lang="less" scoped>
.info-content {
  text-align: initial;
  margin: 20px;
}
</style>

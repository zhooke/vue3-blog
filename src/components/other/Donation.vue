<template>
  <el-scrollbar>
    <div v-for="item in contents" :key="item" class="info-content">
      <VueShowdown :markdown="item.typeValue"/>
    </div>
  </el-scrollbar>
</template>

<script>
import { getDictionaryApi } from '@/utils/api.js';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Donation',
  data() {
    return {
      contents: []
    }
  },
  methods: {
    async getDictionary(param) {
      const { data: result } = await getDictionaryApi(param)
      this.contents = result.data
    }
  },
  mounted() {
    this.getDictionary('blog_donation')
  }
}
</script>

<style lang="less" scoped>
.info-content {
  text-align: initial;
  margin: 20px;
}
</style>

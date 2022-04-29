<template>
  <div>
    <VueShowdown :markdown="blog.content"/>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Info',
  data() {
    return {
      blog: { content: '' }
    }
  }
}
</script>

<style lang="less" scoped>

</style>

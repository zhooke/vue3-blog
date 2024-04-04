<script setup>

</script>

<template>
  <div id="userInfo">
    <van-nav-bar title="我的资料" right-text="编辑" @click-right="onClickRight"/>
    <van-row>
      <van-col span="10">
        <van-image
          round
          width="7rem"
          height="7rem"
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        />
      </van-col>
      <van-col span="12">
        <van-cell-group>
          <van-cell title="用户名" value="zhooke"/>
          <van-cell title="文章数量" value="12"/>
        </van-cell-group>
      </van-col>
    </van-row>
    <van-divider/>

    <van-cell-group>
      <van-cell icon="newspaper" title="我的文章" is-link />
      <van-cell icon="todo-list" title="草稿" is-link />
      <van-cell icon="fire" title="沸点" is-link />
    </van-cell-group>

  </div>

</template>

<style scoped lang="less">
#userInfo {
  margin: 0 10px;
  //padding: 10px;
}
</style>

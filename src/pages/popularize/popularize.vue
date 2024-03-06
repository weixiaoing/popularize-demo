<script setup lang="ts">
//
let array = new Array(10).fill(1).map((item, index) => index)
const goKeyWords = () => {
  uni.navigateTo({ url: '/pages/keyWords/keyWords' })
}
</script>

<template>
  <view class="card"
    ><image
      style="width: 40px; height: 40px"
      src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
      mode="scaleToFill"
    /><view class="content"
      ><text>{{ 'XX' }}小说</text> <text style="color: red">拉新结算{{ 'xx' }}人</text>
    </view>
    <button
      type="primary"
      style="width: 80px; height: 40px; font-size: 12px; margin: 0; padding: 5px; line-height: 30px"
      @click="goKeyWords"
    >
      <text>开始推广</text>
    </button></view
  >
</template>

<style lang="scss">
.card {
  display: flex;
  padding: 10px;
  border-radius: 10px;
  margin: 10px;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #f5f5f5;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.content {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  text {
    font-size: 16px;
  }
}
//
</style>

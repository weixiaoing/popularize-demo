<template>
  <view class="details">
    <view class="row">
      <view class="title">{{ '书名:' }}</view
      ><text>{{ 'content' }}</text></view
    >
    <view class="row">
      <view class="title">{{ '审核状态:' }}</view
      ><text>{{ '审核状态' }}</text></view
    >
    <view class="row">
      <view class="title">{{ '申请时间:' }}</view
      ><text>{{ '申请时间' }}</text></view
    >
    <view class="row">
      <view class="title">{{ '审核说明:' }}</view
      ><text>{{ '审核说明' }}</text></view
    >
  </view>
  <uni-card title="作品"
    ><view class="content"
      ><text>推广链接:{{ 'content' }}</text
      ><text>上传时间:{{ '2022.22.22' }}</text></view
    >
  </uni-card>
</template>

<script lang="ts" setup>
let array = new Array(10).fill(1).map((item, index) => index)
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  height: 60px;
  justify-content: space-around;
}
.details {
  border-radius: 10px;
  margin: 10px;
  height: 200px;
  background-color: white;
  display: flex;
  padding: 10px;
  flex-direction: column;
  justify-content: space-between;
  .row {
    display: flex;
    align-items: center;
    border-bottom: 1px rgba(208, 177, 177, 0.218) solid;
    .title {
      width: 80px;
    }
  }
}
</style>

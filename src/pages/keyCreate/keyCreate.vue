<template>
  <scroll-view style="overflow: hidden; height: 70vh" scroll-y>
    <view class="card"
      ><view class="header"><text>关键词</text><uni-icons type="trash-filled" size="24" /></view
      ><view class="content"
        ><view class="row"
          ><text>书名</text
          ><uni-combox
            label="所在城市"
            :candidates="candidates"
            placeholder="请选择所在城市"
            v-model="city"
          ></uni-combox> </view
        ><view class="row"
          ><text>关键词</text><input placeholder="关键词" type="text" /></view></view
    ></view>
  </scroll-view>
  <button><text>添加关键词</text></button>
  <button
    style="position: fixed; bottom: 10px; width: 100%; height: 40px; background-color: #007aff"
    :disabled="false"
    @click="submit"
  >
    <text style="color: white">确认</text>
  </button>
</template>

<script lang="ts" setup>
const submit = () => {}
</script>

<style lang="scss" scoped>
.card {
  background-color: white;
  border-radius: 10px;
  margin: 10px;
  height: 150px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  .header {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #2c232337;
  }
  .content {
    height: 110px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .row {
      display: flex;
      align-items: center;
      text {
        width: 70px;
      }
    }
  }
}
</style>

<script setup lang="ts">
import { novelEaringAPI } from '@/services/pagesAPI'
import type { novelEaringType } from '@/types'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'

const earnList = ref<novelEaringType[]>([])
const getList = async () => {
  const res = await novelEaringAPI()
  earnList.value = res.data
}
const goEarnDetails = (id: number) => {
  uni.navigateTo({ url: `/pages/keysData/keysData?id=${id}` })
}
onShow(() => {
  getList()
})
</script>

<template>
  <view class="container">
    <h1 v-if="earnList.length == 0">暂无收益数据</h1>
    <view class="card" v-for="item in earnList" :key="item.bookId"
      ><image style="width: 50px; height: 50px" :src="item.coverImage" mode="scaleToFill" /><view
        class="content"
        ><text>{{ item.bookName }}小说</text>
        <text>最新收益: ¥{{ item.latestEarnings }}</text>
        <text
          >收益日期:{{
            item.latestEarningsDate.split(' ')[0].split('-')[1] +
            '月' +
            item.latestEarningsDate.split(' ')[0].split('-')[2] +
            '日'
          }}</text
        >
        <text>累计收益:{{ item.totalEarnings }}</text>
      </view>
      <button
        type="primary"
        style="
          width: 80px;
          height: 40px;
          font-size: 12px;
          margin: 0;
          padding: 5px;
          line-height: 30px;
        "
        @click="goEarnDetails(item.bookId)"
      >
        <text>查看明细></text>
      </button></view
    ></view
  >
</template>

<style lang="scss">
.container {
  padding: 5px;
}
.card {
  display: flex;
  padding: 10px;
  border-radius: 10px;
  margin: 10px;
  align-items: center;
  border: 1px solid #f5f5f5;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  height: 100px;
  gap: 20px;
  .content {
    font-size: 10px;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    flex: 2;
  }
  button {
    flex: 1;
    max-width: 100px;
    min-width: 60px;
  }
}
</style>

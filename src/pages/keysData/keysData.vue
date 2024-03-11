<script lang="ts" setup>
import { keyEarnAPI } from '@/services/pagesAPI'
import type { keyEarnType } from '@/types'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
let bookId = ref(0)
let loading = ref(false)
let keyEarns = ref<keyEarnType[]>([])
const dateChange = () => {
  keySearch()
}
let range = ref<string[]>([])
let keyName = ref('')
const keySearch = async () => {
  loading.value = true
  const res = await keyEarnAPI({
    id: bookId.value,
    name: keyName.value,
    beginTime: range.value[0],
    endTime: range.value[1],
  })
  keyEarns.value = res.data
  loading.value = false
}

onLoad((options) => {
  bookId.value = options?.id
  keySearch()
})

const sumData = (arr: Array<number>) => {
  var s = 0
  arr.forEach(function (val, idx, arr) {
    s += val
  }, 0)

  return s
}
</script>
<template>
  <view class="container">
    <view class="row">
      <uni-datetime-picker v-model="range" type="daterange" @change="dateChange" />
    </view>
    <view class="row"
      ><view class="text">关键词查询</view
      ><uni-easyinput
        v-model="keyName"
        type="text"
        placeholder="请输入关键词"
        @confirm="keySearch" /></view
  ></view>
  <view class="keyList"
    ><text>当前筛选下拉新数为:{{ sumData(keyEarns.map((item) => item.pullNewSum)) }}</text>
    <uni-table :loading="loading" border stripe emptyText="暂无更多数据">
      <!-- 表头行 -->
      <uni-tr>
        <uni-th width="40" align="center">日期</uni-th>
        <uni-th width="50" align="center">关键词</uni-th>
        <uni-th width="20" align="center">拉新数</uni-th>
        <uni-th width="20" align="center">拉新收益</uni-th>
      </uni-tr>
      <!-- 表格数据行 -->
      <uni-tr v-for="item in keyEarns" :key="item.id">
        <uni-td align="center">{{ item.date }}</uni-td>
        <uni-td align="center">{{ item.keyword }}</uni-td>
        <uni-td align="center">{{ item.pullNewSum }}</uni-td>
        <uni-td align="center">{{ item.pullNewSum * item.pullNewSum }}</uni-td>
      </uni-tr>
    </uni-table>
  </view>
</template>

<style lang="scss" scoped>
.container {
  .row {
    display: flex;
    align-items: center;
    padding: 10px;
    gap: 10px;
    .text {
      width: 100px;
    }
  }
  background-color: white;
}
.keyList {
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 10px;
  padding: 5px;
  min-height: 80vh;
}
</style>

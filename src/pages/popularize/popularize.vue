<script setup lang="ts">
import { getProjectList } from '@/services/pagesAPI'
import type { novelEaringType, novelPopularizeType } from '@/types'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

//

const goKeyWords = () => {
  uni.navigateTo({ url: '/pages/keyWords/keyWords' })
}
let list = ref<novelPopularizeType[]>([])
const getList = async () => {
  const res = await getProjectList('')
  console.log(res.data)
  list.value = res.data
}
onLoad(() => {
  getList()
})
</script>

<template>
  <view class="card" v-for="item in list" :key="item.id"
    ><image style="width: 40px; height: 40px" :src="item.coverImage" mode="scaleToFill" /><view
      class="content"
      ><text>{{ item.name }}小说</text>
      <text style="color: red">拉新结算{{ item.intro }}元/人</text>
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
  height: 100px;
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

<script setup lang="ts">
import { getNoticeList } from '@/services/pagesAPI'
import { useMemberStore } from '@/stores'
import type { notice } from '@/types'
import { computed, onBeforeMount, onMounted, ref } from 'vue'
// 获取全局用户信息
let memberStore = useMemberStore()
// 计算是否展示,无用户token时不展示
let noshow = computed(() => {
  if (memberStore.profile?.token) return true
  else return false
})
let list = ref<notice[]>([])
onBeforeMount(() => {
  // 挂载前获取公告列表
  getList()
})
// 获取公告列表函数
const getList = async () => {
  // 发送公告列表请求
  const res = await getNoticeList()

  list.value = res.data
}
// 跳转登录
const goLogin = () => {
  uni.navigateTo({
    url: '/pages/login/login',
  })
}
// 跳转公告详情
const goDetails = (id: number) => {
  uni.navigateTo({
    url: `/pages/announceDetails/announceDetails?id=${id}`,
  })
}
</script>

<template>
  <uni-card v-if="!list.length" title="暂无公告"> </uni-card>
  <uni-card @click="goDetails(item.id)" v-for="item in list" :key="item.id" :title="item.title"
    ><text>{{ item.updateTime.split(' ')[0] }}</text></uni-card
  >
  <button style="btn" v-if="!noshow" @click="goLogin">进入登录</button>
</template>

<style lang="scss">
.btn {
  position: fixed;
  bottom: 0px;
}
</style>

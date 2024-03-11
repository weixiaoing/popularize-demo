<script setup lang="ts">
import { getNoticeList } from '@/services/pagesAPI'
import { useMemberStore } from '@/stores'
import type { notice } from '@/types'
import { computed, onBeforeMount, onMounted, ref } from 'vue'

let memberStore = useMemberStore()

let noshow = computed(() => {
  if (memberStore.profile?.token) return true
  else return false
})
let list = ref<notice[]>([])
onBeforeMount(() => {
  getList()
})
const getList = async () => {
  const res = await getNoticeList()
  console.log(res.data)

  list.value = res.data
}
const goLogin = () => {
  uni.navigateTo({
    url: '/pages/login/login',
  })
}
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

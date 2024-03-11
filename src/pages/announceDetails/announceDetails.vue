<template>
  <view class="container">
    <rich-text :nodes="content" space="emsp"></rich-text>
  </view>
</template>

<script lang="ts" setup>
import { getNotice } from '@/services/pagesAPI'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
let content = ref('content')

const getAnnounceDetails = async (id: number) => {
  const res = await getNotice({ id })
  content.value = res.data.content
}

onLoad((options) => {
  getAnnounceDetails(Number(options?.id))
})
</script>

<style lang="scss" scoped>
.container {
  padding: 10px;
  background-color: white;
  min-height: 100vh;
}
</style>

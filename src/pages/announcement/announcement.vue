<script setup lang="ts">
const goLogin = () => {
  uni.navigateTo({
    url: '/pages/login/login',
  })
}

let list = new Array(10).fill(1).map((item, index) => index)
</script>

<template>
  <uni-card v-for="item in list" :key="item" title="公告"><text>2022-24-11</text></uni-card>
  <button @click="goLogin">进入登录</button>
</template>

<style lang="scss">
//
</style>

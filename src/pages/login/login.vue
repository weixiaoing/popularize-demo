<script setup lang="ts">
import { loginAPI } from '@/services/userAPI'
import { ref } from 'vue'

let email = ref('2218407970@qq.com')
let password = ref('12345')
console.log('test1')

const login = async () => {
  const res = await loginAPI(email.value, password.value)
  console.log(email.value, password.value)
  console.log(res)
}

const goregister = () => {
  uni.navigateTo({
    url: '/pages/sign/sign',
  })
}

const goForget = () => {
  uni.navigateTo({
    url: '/pages/forget/forget',
  })
}
</script>

<template>
  <view class="content">
    <view class="row-input">
      <uni-icons type="mail-open-filled" size="24"></uni-icons>

      <input placeholder="请输入邮箱" :maxlength="18" v-model="email" />
    </view>
    <view class="row-input">
      <uni-icons type="eye-filled" size="24" />
      <input type="safe-password" placeholder="请输入您的密码" :maxlength="18" v-model="password" />
    </view>
    <view class="login-btn" @click="login"> 确认登录 </view>
    <view class="function-link">
      <text @click="goregister">新用户注册</text>
      <text @click="goForget">忘记密码</text>
    </view>
  </view>
</template>

<style lang="scss">
/* 最大的父元素 */
.content {
  padding: 100rpx 60rpx;
  display: flex;
  flex-direction: column;
}

.row-input {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: 30rpx;
  height: 100rpx;
  border-bottom: 1rpx solid #818181;

  input {
    font-size: 30rpx;
    padding-left: 30rpx;
    width: 500rpx;
  }
}

.login-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10rpx;
  margin-top: 80rpx;
  height: 80rpx;
  font-size: 30rpx;
  background-color: $app-bg-color;
  color: #ffffff;
}

.function-link {
  margin: 0 20rpx;
  height: 70rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 26rpx;
  color: $app-bg-color;
}
</style>

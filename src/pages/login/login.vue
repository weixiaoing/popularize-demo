<script setup lang="ts">
import { loginAPI } from '@/services/userAPI'
import { useMemberStore } from '@/stores'
import { ref } from 'vue'

let email = ref('')
let password = ref('')

const MemberStore = useMemberStore()
MemberStore.setProfile(null)

const login = async () => {
  if (!email.value) {
    uni.showToast({
      title: '请输入邮箱',
      icon: 'none',
      duration: 2000,
    })
    return
  }
  if (!password.value) {
    uni.showToast({
      title: '请输入密码',
      icon: 'none',
      duration: 2000,
    })
    return
  }

  const res = await loginAPI(email.value, password.value)
  if (res.code === 200) {
    MemberStore.setProfile(res.data)
    uni.reLaunch({
      url: '/pages/announcement/announcement',
    })
    uni.showToast({
      title: '登录成功',
      icon: 'success',
      duration: 2000,
    })
  }
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
      <input password placeholder="请输入您的密码" :maxlength="18" v-model="password" />
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

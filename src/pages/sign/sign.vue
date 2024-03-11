<script lang="ts" setup>
import { getCodeAPI, registerAPI } from '@/services/userAPI'
import { useMemberStore } from '@/stores'
import { delayCode } from '@/utils/code'
import { ref } from 'vue'

let email = ref('')
let code = ref('')
let password = ref('')
let nickname = ref('')
let secoundPassword = ref('')
let flag = 0
let MemberStore = useMemberStore()
const delayGetCode = delayCode(async () => {
  const res = await getCodeAPI(email.value, 0)
  if (res.code == 200) {
    uni.showToast({
      title: '验证码发送成功',
      icon: 'none',
      duration: 2000,
    })
  }
}, 10000)
let getCode = async () => {
  if (!email.value) {
    uni.showToast({
      title: '请输入邮箱',
      icon: 'none',
      duration: 2000,
    })
    return
  }
  delayGetCode()
}
let register = async () => {
  if (!email.value || !password.value || !nickname.value || !secoundPassword.value) {
    uni.showToast({
      title: '信息不能为空',
      icon: 'none',
      duration: 2000,
    })
    return
  }
  if (/(?=.*[a-z])(?=.*\d)(?=.*[#@!~%^&*])[a-z\d#@!~%^&*]{8,16}/i.test(password.value) === false) {
    uni.showToast({
      title: '密码格式不正确',
      icon: 'none',
      duration: 2000,
    })
    return
  }
  if (password.value !== secoundPassword.value) {
    uni.showToast({
      title: '两次密码不一致',
      icon: 'none',
      duration: 2000,
    })
    return
  }
  if (nickname.value.length < 2 || nickname.value.length > 8) {
    uni.showToast({
      title: '昵称,2~8位',
      duration: 2000,
    })
  }
  const res = await registerAPI(
    email.value,
    password.value,
    code.value,
    nickname.value,
    secoundPassword.value,
  )
  if (res.code === 200) {
    uni.showToast({
      title: '注册成功',
      icon: 'success',
      duration: 2000,
    })
    MemberStore.setProfile({ token: res.data.token })
    uni.reLaunch({
      url: '/pages/announcement/announcement',
    })
  }
}
</script>
<template>
  <view class="content">
    <view class="row-input">
      <text>邮箱</text>
      <view class="input-box">
        <input placeholder="请输入邮箱" v-model="email" />
      </view>
    </view>
    <view class="row-input2">
      <text>验证码</text>
      <view class="input-box2">
        <input class="input2" placeholder="请输入您的验证码" v-model="code" :maxlength="6" />
        <view @click="getCode()" class="code">
          <text>获取验证码</text>
        </view>
      </view>
    </view>
    <view class="row-input">
      <text>登录密码</text>
      <view class="input-box">
        <input
          placeholder="输入密码:包含数字,符号,字母,共8-16位"
          v-model="password"
          type="safe-password"
          :maxlength="18"
        />
      </view>
    </view>
    <view class="row-input">
      <text>确认密码</text>
      <view class="input-box">
        <input
          placeholder="再次输入登录密码"
          v-model="secoundPassword"
          type="safe-password"
          :maxlength="18"
        />
      </view>
    </view>
    <view class="row-input">
      <text>昵称</text>
      <view class="input-box">
        <input placeholder="请输入昵称,2-8个字符" v-model="nickname" :maxlength="10" />
      </view>
    </view>
    <view class="register-btn" @click="register"> 注册 </view>
  </view>
</template>

<style lang="scss" scoped>
.content {
  padding: 0 40rpx;
  .row-input {
    display: flex;
    flex-direction: column;
    font-size: 30rpx;

    text {
      font-size: 28rpx;
      line-height: 100rpx;
      font-weight: bold;
    }

    .input-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20rpx;
      height: 80rpx;
      border-radius: 8rpx;
      background-color: #f2f3f4;

      .code {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 28rpx;
        letter-spacing: 3rpx;
        width: 200rpx;
        height: 80rpx;
        border-radius: 8rpx;
        background-color: $app-bg-color;
        color: #ffffff;
      }
    }
  }

  .row-input2 {
    display: flex;
    flex-direction: column;
    font-size: 30rpx;

    text {
      font-size: 28rpx;
      line-height: 100rpx;
      font-weight: bold;
    }

    .input-box2 {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .input2 {
        padding: 0 20rpx;
        width: 400rpx;
        height: 80rpx;
        border-radius: 8rpx;
        background-color: #f2f3f4;
      }

      .code {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        letter-spacing: 3rpx;
        width: 200rpx;
        height: 80rpx;
        border-radius: 8rpx;
        background-color: $app-bg-color;
        color: white;
      }
    }
  }

  .register-btn {
    margin-top: 60rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100rpx;
    background-color: $app-bg-color;
    color: #ffffff;
    letter-spacing: 10rpx;
    font-size: 30rpx;
    border-radius: 10rpx;
  }
}
</style>

<script lang="ts" setup>
import { updatePasswordAPI } from '@/services/userAPI'
import { reactive, ref } from 'vue'
let email = ref('')
let password = ref('')
let secoundPassword = ref('')
let code = ref('')
let updatePassword = async () => {
  await updatePasswordAPI({
    email: email.value,
    password: password.value,
    secoundPassword: secoundPassword.value,
    code: code.value,
  })
}
</script>
<template>
  <view class="content">
    <view class="row-input">
      <uni-icons type="mail-open-filled" size="24" />
      <input placeholder="请输入邮箱" :maxlength="18" v-model="email" />
    </view>
    <view class="row-input">
      <uni-icons type="paperplane" size="24" />
      <input placeholder="请输入验证码" :maxlength="18" v-model="code" />
    </view>

    <view class="row-input">
      <uni-icons type="eye-filled" size="24" />
      <input type="safe-password" placeholder="请输入您的密码" :maxlength="18" v-model="password" />
    </view>
    <view class="row-input">
      <uni-icons type="eye-filled" size="24" />
      <input type="safe-password" placeholder="请再次输入密码" :maxlength="18" v-model="password" />
    </view>
    <view class="login-btn" @click="updatePassword"> 修改密码 </view>
  </view>
</template>

<style lang="scss" scoped>
.content {
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  .row-input {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-top: 30rpx;
    height: 100rpx;
    border-bottom: 1px solid black;
    input {
      flex: 1;
      height: 100%;
      padding-left: 20px;
    }
  }
  .login-btn {
    margin-top: 40px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-color: $app-bg-color;
    color: white;
    border-radius: 10px;
  }
}
</style>

<script lang="ts" setup>
import { getCodeAPI, updatePasswordAPI } from '@/services/userAPI'
import { delayCode } from '@/utils/code'
import { reactive, ref } from 'vue'
let email = ref('')
let password = ref('')
let secondPassword = ref('')
let code = ref('')

const delayGetCode = delayCode(async () => {
  const res = await getCodeAPI(email.value, 1)
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
const updatePassword = async () => {
  if (!email.value || !password.value || !secondPassword.value || !code.value) {
    uni.showToast({
      title: '信息不能为空',
      icon: 'none',
      duration: 2000,
    })
    return
  }
  if (password.value !== secondPassword.value) {
    console.log(password.value, secondPassword.value)

    uni.showToast({
      title: '两次密码不一致',
      icon: 'none',
      duration: 2000,
    })
    return
  }
  if (/(?=.*[a-z])(?=.*\d)(?=.*[#@!~%^&*])[a-z\d#@!~%^&*]{8,16}/i.test(password.value) === false) {
    uni.showToast({
      title: '密码格式需要包含数字,符号,字符,且是8到16位',
      icon: 'none',
      duration: 2000,
    })
    return
  }
  const res = await updatePasswordAPI({
    email: email.value,
    password: password.value,
    secondPassword: secondPassword.value,
    code: code.value,
  })
  if (res.code === 200) {
    uni.navigateTo({
      url: '/pages/login/login',
    })
  }
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
      <button class="btn" @click="getCode"><text>获取验证码</text></button>
    </view>

    <view class="row-input">
      <uni-icons type="eye-filled" size="24" />
      <input password placeholder="输入新密码" :maxlength="18" v-model="password" />
    </view>
    <view class="row-input">
      <uni-icons type="eye-filled" size="24" />
      <input password placeholder="请再次输入密码" :maxlength="18" v-model="secondPassword" />
    </view>
    <view class="login-btn" @click="updatePassword"> <text>修改密码</text> </view>
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
    padding-top: 20rpx;
    height: 100rpx;
    border-bottom: 1px solid black;
    .btn {
      background-color: $app-bg-color;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 15px;
    }
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

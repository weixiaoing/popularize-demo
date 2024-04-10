<script lang="ts" setup>
import { getCodeAPI, updateEmail } from '@/services/userAPI'
import { delayCode } from '@/utils/code'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

let oldEmail = ref('')
let newEmail = ref('')
let code = ref('')
// 确认
const confirm = async () => {
  // 发送更改邮箱请求
  const res = await updateEmail({
    oldEmail: oldEmail.value,
    newEmail: newEmail.value,
    code: code.value,
  })
  if (res.code == 200) {
    uni.showToast({
      title: '修改成功',
      icon: 'none',
      duration: 2000,
    })
    // 跳转登录
    uni.reLaunch({ url: '/pages/login/login' })
  }
}
// 验证码
const getCode = async () => {
  // 发送验证码请求
  const res = await getCodeAPI(newEmail.value, 0)
  if (res.code == 200) {
    uni.showToast({
      title: '验证码发送成功',
      icon: 'none',
      duration: 2000,
    })
  }
}
//getcode函数30s调用一次
const delayGetCode = delayCode(getCode, 30000)
// 获取路由参数,赋值邮箱给老邮箱变量
onLoad((options) => {
  oldEmail.value = options?.email
})
</script>

<template>
  <view class="container">
    <view class="row"
      ><text>新邮箱:</text
      ><uni-easyinput style="input" v-model="newEmail" type="text" placeholder="请输入新邮箱" />
    </view>
    <view class="row"
      ><text>验证码:</text><uni-easyinput v-model="code" type="text" placeholder="请输入验证码 " />
      <button type="primary" @click="delayGetCode">获取验证码</button></view
    >
    <button type="primary" @click="confirm" class="confirm">确认</button>
  </view>
</template>

<style lang="scss" scoped>
.container {
  background-color: white;
  padding: 5px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  .row {
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: flex-start;
    text {
      width: 60px;
    }
    button {
      width: 100px;
      font-size: 14px;
    }
    .input {
      width: 200px;
    }
  }
}
.confirm {
  margin-top: 20px;
  width: 200px;
}
</style>

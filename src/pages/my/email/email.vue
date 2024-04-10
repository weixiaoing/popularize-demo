<script lang="ts" setup>
import { getCodeAPI, testEmail } from '@/services/userAPI'
import { delayCode } from '@/utils/code'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
let code = ref('')
let email = ref('')
// 获取关键词
const getCode = async () => {
  // 请求
  const res = await getCodeAPI(email.value, 1)
  if (res.code == 200) {
    uni.showToast({
      title: '验证码发送成功',
      icon: 'none',
      duration: 2000,
    })
  }
}
// 30s请求
const delayGetCode = delayCode(getCode, 30000)
// 确认
const confirm = async () => {
  // 发送检验邮箱验证码请求
  const res = await testEmail({ email: email.value, code: code.value })
  // 跳转到修改邮箱界面
  if (res.code == 200) {
    uni.navigateTo({ url: `/pages/my/email/updateEmail/updateEmail?email=${email.value}` })
  }
}
// 将路由参数中邮箱信息赋值给邮箱变量
onLoad((options) => {
  email.value = options?.email
})
</script>
<template>
  <view class="container">
    <view class="row"
      ><text>更改邮箱后,下次登录可使用新邮箱登录</text><br /><text>当前邮箱:{{ email }}</text
      ><view class="email">
        <uni-easyinput v-model="code" type="text" placeholder="请输入验证码" /><button
          type="primary"
          @click="delayGetCode"
        >
          获取验证码
        </button>
      </view></view
    ><button type="primary" @click="confirm">确认</button>
  </view>
</template>

<style lang="scss" scoped>
.container {
  background-color: white;
  .row {
    padding: 10px 20px;
    border-bottom: 1px solid #f5f5f5;
    gap: 10px;
    .email {
      padding-top: 30px;
      padding-bottom: 30px;
      display: flex;
      justify-content: space-between;
      gap: 5px;
      button {
        width: 80px;
        font-size: 10px;
        padding: 5px;
      }
    }
  }
}
</style>

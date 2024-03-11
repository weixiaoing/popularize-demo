<script lang="ts" setup>
import { getCodeAPI, testEmail } from '@/services/userAPI'
import { delayCode } from '@/utils/code'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
let code = ref('')
let email = ref('')
const getCode = async () => {
  const res = await getCodeAPI(email.value, 1)
  if (res.code == 200) {
    uni.showToast({
      title: '验证码发送成功',
      icon: 'none',
      duration: 2000,
    })
  }
}
const delayGetCode = delayCode(getCode, 10000)
const confirm = async () => {
  const res = await testEmail({ email: email.value, code: code.value })
  if (res.code == 200) {
    uni.navigateTo({ url: `/pages/my/email/updateEmail/updateEmail?email=${email.value}` })
  }
}
onLoad((options) => {
  email.value = options?.email
  console.log(email.value)
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

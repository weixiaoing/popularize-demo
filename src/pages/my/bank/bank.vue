<script lang="ts" setup>
import { getBankAPI, updateBankAPI } from '@/services/userAPI'
import type { userBankInfo } from '@/types'
import { onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'
let bankAddress = ref('')
let bankName = ref('')
let cardNumber = ref('')
let phoneNumber = ref('')
let province = ref('')
// 获取银行信息
const getbankInfo = async () => {
  // 获取信息请求
  const res = await getBankAPI()
  if (res.code == 200) {
    bankAddress.value == res.data.bankAddress
    bankName.value = res.data.bankName
    cardNumber.value = res.data.cardNumber
    phoneNumber.value = res.data.phoneNumber
    province.value = res.data.province
  }
}
// 提交
const submit = async () => {
  // 更新银行信息请求
  const res = await updateBankAPI({
    bankAddress: bankAddress.value,
    bankName: bankName.value,
    cardNumber: cardNumber.value,
    phoneNumber: phoneNumber.value,
    province: province.value,
  })
  if (
    bankAddress.value == '' ||
    bankName.value == '' ||
    cardNumber.value == '' ||
    phoneNumber.value == '' ||
    province.value == ''
  ) {
    uni.showToast({
      title: '信息不能为空',
      icon: 'none',
      duration: 2000,
    })
    return
  }

  if (res.code == 200) {
    uni.showToast({
      title: '绑定成功',
      icon: 'none',
      duration: 2000,
    })
    uni.navigateBack({ delta: 1 })
  }
}
// 初始获取银行信息
onShow(() => {
  getbankInfo()
})
</script>

<template>
  <view class="container">
    <view class="row"
      ><text>开户地址:</text
      ><uni-easyinput v-model="bankAddress" type="text" placeholder="请输入银行地址"
    /></view>
    <view class="row"
      ><text>开户行:</text
      ><uni-easyinput v-model="bankName" type="text" placeholder="请输入银行名称"
    /></view>
    <view class="row"
      ><text>银行卡号:</text
      ><uni-easyinput v-model="cardNumber" type="text" placeholder="请输入卡号"
    /></view>
    <view class="row"
      ><text>手机号:</text
      ><uni-easyinput v-model="phoneNumber" type="text" placeholder="请输入手机号"
    /></view>
    <view class="row"
      ><text>开户省份:</text
      ><uni-easyinput v-model="province" type="text" placeholder="请输入开户省份"
    /></view>
    <view class="class">
      <button type="primary" @click="submit">确认</button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.container {
  background-color: white;
  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    border-bottom: 1px solid #f5f5f5;
    gap: 10px;
    text {
      width: 70px;
    }
  }
}
</style>

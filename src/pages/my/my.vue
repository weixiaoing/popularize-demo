<script setup lang="ts">
import { useMemberStore } from '@/stores'
import { http } from '@/utils/http'
const memberStore = useMemberStore()
const getData = async () => {
  const res = await http({
    method: 'GET',
    url: '/home/banner',
  })
}
let email = '123456789'
</script>

<template>
  <uni-card
    title="用户名"
    thumbnail="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
    :sub-title="`uid:1234`"
    :border="false"
  >
    <view class="container">
      <view class="row"
        ><span>银行卡绑定</span
        ><span class="warring">去绑定 <uni-icons type="right" size="12" /></span
      ></view>
      <view class="row"
        ><span>协议签署</span><span class="warring">去签署<uni-icons type="right" size="12" /></span
      ></view>
      <view class="row"
        ><span>邮箱号</span
        ><span>
          <span>{{ email }}</span
          ><span class="default">{{ '\t更换绑定' }}<uni-icons type="right" size="12" /></span></span
      ></view>
      <view class="row"
        ><span>用户协议</span><span><uni-icons type="right" size="12" /></span
      ></view>
      <view class="row"
        ><span>隐私政策</span><span><uni-icons type="right" size="12" /></span
      ></view>
      <view class="row"
        ><span>退出登录</span><span><uni-icons type="right" size="12" /></span
      ></view>
    </view>
  </uni-card>
</template>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    line-height: 40px;
    height: 40px;
    border-bottom: 1px solid #f5f5f5;
  }
  .warring {
    color: red;
  }
  .default {
    color: blue;
  }
}
</style>

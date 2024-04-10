<script lang="ts" setup>
import { getKeyDeatils, postBack, postCancel } from '@/services/pagesAPI'
import type { keyDeatils } from '@/types'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'
let id = ref('')
let popup = ref()
let info = ref<keyDeatils>()
let keyName = ref('')
let workLink = ref('')
// 发送回传函数
const sendBack = async () => {
  // 发送 发送回传请求
  const res = await postBack({
    keywordId: info.value?.id as number,
    name: keyName.value,
    promotionLink: workLink.value,
  })
  if (res.code == 200) {
    uni.showToast({
      title: '提交成功',
      icon: 'none',
      duration: 2000,
    })
    popup.value.close()
    keyName.value = ''
    workLink.value = ''
    // 发送获取关键词详情数据,重新刷新页面
    const res = await getKeyDeatils(id.value)
    info.value = res.data
  }
}
// 取消关键词
const keyCancel = async () => {
  // 发送取消关键词请求
  const res = await postCancel(String(info.value?.id))
  if (res.code == 200) {
    uni.navigateBack({ delta: 1 })
  }
}
// 将状态码转换成文字
const getStatus = (status?: number) => {
  let statusList = ['审核中', '已通过', '已驳回', '已取消', '已发布', '已失效']
  return statusList[status as number]
}
// 打开弹窗
const popShow = () => {
  popup.value.open()
}
// 启动时,获取路由参数并赋值给key id
onLoad(async (options) => {
  id.value = options?.id
})
// 展示时,发送获取关键词详情请求
onShow(async () => {
  const res = await getKeyDeatils(id.value)
  info.value = res.data
})
</script>
<template>
  <view class="details">
    <view class="row">
      <view class="title">{{ '书名:' }}</view
      ><text>{{ info?.bookName }}</text></view
    >
    <view class="row">
      <view class="title">{{ '关键词:' }}</view
      ><text>{{ info?.keyword }}</text></view
    >

    <view class="row">
      <view class="title">{{ '审核状态:' }}</view
      ><text
        :style="{ color: info?.keywordStatus == 2 || info?.keywordStatus == 5 ? 'red' : 'green' }"
        >{{ getStatus(info?.keywordStatus) }}</text
      ></view
    >
    <view class="row">
      <view class="title">{{ '申请时间: ' }}</view
      ><text>{{ info?.applicationTime }}</text></view
    >
    <view class="row">
      <view class="title">{{ '审核说明:' }}</view
      ><text>{{ '无' }}</text></view
    >
  </view>
  <scroll-view scroll-y style="padding-bottom: 50px"
    ><uni-card :title="item.name" v-for="(item, index) in info?.workInfoVOS" :key="index"
      ><view class="content"
        ><text>推广链接:{{ item.promotionLink }}</text
        ><text>上传时间:{{ item.uploadTime }}</text></view
      >
    </uni-card>
  </scroll-view>

  <!-- 发布回填 -->
  <button
    v-if="info?.keywordStatus == 1 || info?.keywordStatus == 4"
    style="
      position: fixed;
      bottom: 10px;
      width: 100%;
      line-height: 35px;
      height: 40px;
      background-color: #007aff;
    "
    @click="popShow"
  >
    <text style="color: white">发布回填</text>
  </button>
  <!-- 取消申请 -->
  <button
    v-if="info?.keywordStatus == 0"
    style="
      position: fixed;
      bottom: 10px;
      width: 100%;
      line-height: 35px;
      height: 40px;
      background-color: #007aff;
    "
    @click="keyCancel"
  >
    <text style="color: white">取消申请</text>
  </button>
  <view>
    <uni-popup type="dialog" mode="input" animation ref="popup">
      <view class="pop">
        <view
          ><uni-easyinput
            v-model="keyName"
            type="text"
            :clearable="false"
            placeholder="输入作品名称"
        /></view>
        <view
          ><uni-easyinput
            v-model="workLink"
            type="text"
            :clearable="false"
            placeholder="输入作品链接"
        /></view>

        <button type="primary" @click="sendBack">确认</button></view
      ></uni-popup
    >
  </view>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  height: 60px;
  justify-content: space-around;
}
.details {
  border-radius: 10px;
  margin: 10px;
  background-color: white;
  display: flex;
  padding: 10px;
  flex-direction: column;
  gap: 20px;
  .row {
    display: flex;
    align-items: center;
    border-bottom: 1px rgba(208, 177, 177, 0.218) solid;
    .title {
      min-width: 80px;
    }
    text {
      word-wrap: break-word;
      word-break: break-all;
    }
  }
}
.pop {
  width: 100vw;
  height: 50vh;
  background-color: white;
  padding: 10px;
  display: flex;
  flex-direction: column;
  // gap: 10px;
  justify-content: space-around;
  align-items: center;
}
</style>

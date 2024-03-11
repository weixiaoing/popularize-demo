<script setup lang="ts">
import { getUserInfo, quitAPI } from '@/services/userAPI'
import { useMemberStore } from '@/stores'
import type { userType } from '@/types'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'
let dialog = ref()
const openDialog = () => {
  dialog.value.open()
}
const memberStore = useMemberStore()
let userInfo = ref<userType>()
const popShow = () => {
  uni.chooseImage({
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    count: 1,
    success: ({ tempFilePaths, tempFiles }) => {
      console.log(tempFilePaths)

      handleUploadFile('/file/uploadImg', tempFilePaths[0])
    },
  })
}
function handleUploadFile(url: string, filePath: string) {
  uni.uploadFile({
    url: url,
    filePath,
    name: 'file',
    formData: {},
    header: {
      token: 'Bearer:' + uni.getStorageSync('token'),
    },
    success: (uploadFileRes) => {
      let data = JSON.parse(uploadFileRes.data)
      if (data?.code === 200) {
        uni.showToast({
          title: '上传成功',
          icon: 'none',
          duration: 2000,
        })
        getData()
      } else if (data?.code === 500) {
        uni.showToast({
          title: data?.msg,
          icon: 'none',
          duration: 2000,
        })
      }
    },
    fail: (res) => {
      uni.showToast({
        title: '上传失败',
        icon: 'none',
        duration: 2000,
      })
    },
  })
}

const getData = async () => {
  const res = await getUserInfo()
  userInfo.value = res.data
  if (userInfo.value?.avatarUrl == null) {
    userInfo.value.avatarUrl = '/static/images/default.jpg'
  }
}
const goBank = () => {
  if (userInfo.value?.bankCard == null) {
    uni.navigateTo({ url: '/pages/my/bank/bank' })
  }
}
const goEmail = () => {
  uni.navigateTo({ url: `/pages/my/email/email?email=${userInfo.value?.email}` })
}
const goSigned = () => {
  uni.navigateTo({ url: '/pages/my/agreementSigned/agreementSigned' })
}
const goAgreement = () => {
  uni.navigateTo({ url: '/pages/my/userAgreement/userAgreement' })
}
const logOut = async () => {
  const res = await quitAPI()
  if (res.code == 200) {
    console.log(memberStore.profile)
    memberStore.clearProfile()
    uni.reLaunch({
      url: '/pages/login/login',
    })
    uni.showToast({
      title: '退出成功',
      icon: 'success',
      duration: 2000,
    })
  }
}

onShow(() => {
  getData()
})
</script>

<template>
  <uni-card :border="false">
    <template #title
      ><view class="header">
        <img
          :src="userInfo?.avatarUrl"
          style="width: 50px; height: 50px; border-radius: 50%"
          alt="点击更改头像"
          @click="popShow"
        />
        <view
          ><text class="name">{{ userInfo?.nickname }}</text
          ><text class="uid">uid:{{ userInfo?.id }}</text></view
        >
      </view></template
    >
    <view class="container">
      <view class="row"
        ><span>银行卡绑定</span
        ><span @click="goBank" class="warring"
          >{{ userInfo?.bankCard == null ? '去绑定' : '已绑定' }}
          <uni-icons type="right" size="12" /></span
      ></view>
      <view class="row"
        ><span>协议签署</span
        ><span @click="goSigned" class="warring"
          >{{ userInfo?.contractStatus == 0 ? '去签约' : '已签约'
          }}<uni-icons type="right" size="12" /></span
      ></view>
      <view class="row"
        ><span>邮箱号</span
        ><span>
          <span>{{ userInfo?.email }}</span
          ><span @click="goEmail" class="default"
            >{{ '\t更换绑定' }}<uni-icons type="right" size="12" /></span></span
      ></view>
      <view class="row"
        ><span>用户协议</span><span><uni-icons @click="goAgreement" type="right" size="12" /></span
      ></view>
      <view class="row"
        ><span>隐私政策</span><span><uni-icons @click="goAgreement" type="right" size="12" /></span
      ></view>
      <view class="row"
        ><span>退出登录</span><span><uni-icons @click="openDialog" type="right" size="12" /></span
      ></view>
    </view>
  </uni-card>
  <!-- 弹出对话框 -->
  <view>
    <!-- 输入框示例 -->
    <uni-popup ref="dialog" type="dialog">
      <uni-popup-dialog
        ref="inputClose"
        mode="base"
        title="退出"
        content="确认退出账号"
        @confirm="logOut"
      ></uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<style lang="scss">
.header {
  padding: 5px;
  display: flex;
  align-items: center;
  view {
    padding: 5px 0px 5px 20px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
}
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

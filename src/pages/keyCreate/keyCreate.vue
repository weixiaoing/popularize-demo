<script lang="ts" setup>
import { createKeyAPI, getProjectList } from '@/services/pagesAPI'
import type { keyWord, novelPopularizeType } from '@/types'
import { onLoad } from '@dcloudio/uni-app'
import { computed, ref } from 'vue'
import keyWords from '../keyWords/keyWords.vue'
let key = ref<keyWord>({
  bookName: '',
  bookId: 0,
  keyWord: '',
})
let selected = ref('')
let bookList = ref<string[]>([])
// 获取数据列表
const getBookList = async () => {
  // 发送请求
  const res = await getProjectList('')
  bookList.value = res.data.map((item) => {
    return item.id + ': ' + item.name
  })
}
// 启动时调用获取数据列表函数
onLoad(() => {
  getBookList()
})
// 提交函数
const submit = async () => {
  // 切割书籍id和名称
  key.value.bookId = Number(selected.value.split(': ')[0])
  key.value.bookName = selected.value.split(' ')[1]
  if (key.value.bookName.length == 0 || key.value.keyWord.length == 0) {
    uni.showToast({
      title: '书名和关键词不能为空',
      icon: 'none',
      duration: 2000,
    })
    return
  }
  if (/[\u4E00-\u9FA5]{4,20}/.test(key.value.keyWord) == false) {
    uni.showToast({
      title: `关键词格式不正确${key.value.keyWord}`,
      icon: 'none',
      duration: 2000,
    })
    return
  }
  // 发送创建关键词请求
  const res = await createKeyAPI([key.value])
  if (res.code == 200) {
    uni.showToast({
      title: '添加成功',
      icon: 'none',
      duration: 2000,
    })
  }
}
</script>
<template>
  <scroll-view style="overflow: hidden; height: 70vh" scroll-y>
    <view class="card"
      ><view class="header"><text>关键词</text><uni-icons type="trash-filled" size="24" /></view
      ><view class="content"
        ><view class="row"
          ><text>书名</text
          ><uni-combox
            :candidates="bookList"
            placeholder="请输入书名"
            v-model="selected"
          ></uni-combox> </view
        ><view class="row" style="z-index: 0"
          ><text>关键词</text
          ><input
            type="text"
            v-model="key.keyWord"
            placeholder="4个字以上的中文"
            style="
              border: 1px solid #007aff;
              box-sizing: border-box;
              border-radius: 1px;
              padding: 5px;
              height: 30px;
            " /></view></view
    ></view>
  </scroll-view>
  <button
    style="
      position: fixed;
      bottom: 10px;
      width: 100%;
      line-height: 35px;
      height: 40px;
      background-color: #007aff;
    "
    :disabled="false"
    @click="submit"
  >
    <text style="color: white">确认</text>
  </button>
</template>

<style lang="scss" scoped>
.card {
  background-color: white;
  border-radius: 10px;
  margin: 10px;
  height: 150px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  .header {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #2c232337;
  }
  .content {
    height: 110px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .row {
      display: flex;
      align-items: center;
      text {
        box-sizing: border-box;
        width: 80px;
      }
    }
  }
}
</style>
